import { NextResponse } from 'next/server'
import { applyChatRateLimits } from '@/lib/rate-limit'
import { chatValidationResponse, readChatMessages } from '@/lib/chat-validation'

const ADMIN_API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_BASE?.trim().replace(/\/$/, '') || ''

// Fetch live company data from the admin API to build a context-rich system prompt.
async function buildSystemPrompt(): Promise<string> {
  const baseInfo = `You are the customer service assistant for Loxon Philippines Inc., a premier engineering and construction firm established on February 23, 1983. Originally launched as a "Fire Protection Company," Loxon now provides Integrated Building Technology Solutions for the protection of life and property, with over 40 years of experience.

Company identity:
- Name: Loxon Philippines Inc. (LPI)
- Founded: February 23, 1983 by Mr. Ed C. Esmerio
- Certifications: ISO 9001:2015 (FIRST Fire Protection company to achieve ISO Certification), PCAB AAA License
- Compliance: Fire Code of the Philippines (PD1185), NFPA, Japanese Industrial Standards, ASHRAE
- Vision: "The leader in reliable and sustainable Integrated Building Management and Fire Safety Systems."
- Engineers trained overseas in America, England, Spain, Japan, Singapore, and Hong Kong.

Contact information:
- Main Office: LPI Centre, 324 Capt. Henry Javier St., Oranbo, Pasig City, NCR, Philippines 1600
- Warehouse: Two LPI Centre, 3 Luis St. San Miguel, Pasig City
- Phone: +63 (2) 8470-3912 to 15
- Email: lpie@loxon.com.ph
- Business Hours: Monday–Friday 8:00 AM – 6:00 PM, Saturday 9:00 AM – 1:00 PM, Sunday Closed
- Website pages: /projects (project portfolio), /products-services (offerings), /our-company (about us), /contact (sales inquiry form), /join-us (careers)

Guidelines:
- Be professional, concise, and helpful. Keep answers focused and not overly long.
- You can answer questions about the company, services, projects, contact info, business hours, and careers.
- For sales inquiries that need human follow-up (quotes, new projects), direct users to the Contact Us page (/contact) or the phone number.
- For service/support requests (maintenance, malfunctions, repairs), provide the service phone number and email, and ask for location, issue description, and contact details. Emphasize urgency for safety-critical issues.
- For careers questions, direct users to the Join Us page (/join-us).
- If a question is completely out of scope (e.g., weather, news, unrelated companies), politely explain you can only help with Loxon-related questions and offer the contact info.
- Do not invent project names, service names, or facts not provided in the context below. If you don't have specific information, say so and direct the user to the contact info.`

  // Fetch live data in parallel (best-effort; failures degrade gracefully)
  const [projectsRes, servicesRes, jobsRes, clientsRes] = ADMIN_API_BASE ? await Promise.allSettled([
    fetch(`${ADMIN_API_BASE}/api/projects`, { next: { revalidate: 60 } }),
    fetch(`${ADMIN_API_BASE}/api/products-services`, { next: { revalidate: 60 } }),
    fetch(`${ADMIN_API_BASE}/api/jobs`, { next: { revalidate: 60 } }),
    fetch(`${ADMIN_API_BASE}/api/clients`, { next: { revalidate: 60 } }),
  ]) : [null, null, null, null]

  let projectsSection = ''
  if (projectsRes?.status === 'fulfilled' && projectsRes.value.ok) {
    try {
      const projects = await projectsRes.value.json()
      if (Array.isArray(projects) && projects.length > 0) {
        const lines = projects.map((p: any) => {
          const parts = [p.title]
          if (p.project_type) parts.push(`Type: ${p.project_type}`)
          if (p.location) parts.push(`Location: ${p.location}`)
          if (p.constructed_date) parts.push(`Year: ${String(p.constructed_date).slice(0, 4)}`)
          if (p.client_name) parts.push(`Client: ${p.client_name}`)
          if (p.description) parts.push(`Description: ${String(p.description).slice(0, 1_200)}`)
          return `- ${parts.join(' | ')}`
        })
        projectsSection = `\n\nNotable projects (from our database):\n${lines.join('\n')}`
      }
    } catch {
      // ignore parse errors
    }
  }

  let servicesSection = ''
  if (servicesRes?.status === 'fulfilled' && servicesRes.value.ok) {
    try {
      const services = await servicesRes.value.json()
      if (Array.isArray(services) && services.length > 0) {
        const lines = services.map((s: any) => {
          const desc = s.description ? ` — ${String(s.description).slice(0, 200)}` : ''
          return `- ${s.title}${desc}`
        })
        servicesSection = `\n\nProducts & Services we offer (from our database):\n${lines.join('\n')}`
      }
    } catch {
      // ignore parse errors
    }
  }

  let jobsSection = ''
  if (jobsRes?.status === 'fulfilled' && jobsRes.value.ok) {
    try {
      const jobs = await jobsRes.value.json()
      if (Array.isArray(jobs) && jobs.length > 0) {
        jobsSection = `\n\nCurrent job openings:\n${jobs.map((job: any) => `- ${job.title}${job.description ? ` — ${String(job.description).slice(0, 1_200)}` : ''}`).join('\n')}`
      }
    } catch {
      // Ignore malformed optional context.
    }
  }

  let clientsSection = ''
  if (clientsRes?.status === 'fulfilled' && clientsRes.value.ok) {
    try {
      const clients = await clientsRes.value.json()
      if (Array.isArray(clients) && clients.length > 0) {
        const groups = { partner: [] as string[], membership: [] as string[] }
        for (const client of clients) {
          const type = client.entity_type === 'membership' ? 'membership' : 'partner'
          groups[type].push(`- ${client.title}${client.description ? ` — ${String(client.description).slice(0, 600)}` : ''}`)
        }
        clientsSection = `\n\nClients and partners:\n${groups.partner.join('\n') || '- None listed'}\n\nMemberships:\n${groups.membership.join('\n') || '- None listed'}`
      }
    } catch {
      // Ignore malformed optional context.
    }
  }

  return `${baseInfo}${servicesSection}${projectsSection}${jobsSection}${clientsSection}`
}

export async function POST(request: Request) {
  try {
    const limited = await applyChatRateLimits(request)
    if (limited) return limited
    const messages = await readChatMessages(request)

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Chat service is not configured' }, { status: 500 })
    }

    const systemPrompt = await buildSystemPrompt()

    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        temperature: 0.5,
        max_tokens: 600,
      }),
    })

    if (!groqRes.ok) {
      console.error('Groq API error:', groqRes.status)
      return NextResponse.json({ error: 'Failed to get a response from the assistant' }, { status: 502 })
    }

    const data = await groqRes.json()
    const reply = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json({ reply })
  } catch (error) {
    const invalid = chatValidationResponse(error)
    if (invalid) return invalid
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
