const ADMIN_API_BASE = (process.env.NEXT_PUBLIC_ADMIN_API_BASE || 'https://loxon-admin.vercel.app').replace(/\/$/, '')

type ContactFormData = { name: string; email: string; subject: string; message: string; inquiryType?: string }
type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }
type JobApplicationData = { job_id: number; full_name: string; email: string; phone?: string; cover_letter?: string; resume_url?: string }

async function request(path: string, options?: RequestInit) {
  const response = await fetch(`${ADMIN_API_BASE}${path}`, options)
  if (!response.ok) throw new Error(`Admin API request failed: ${path}`)
  return response.json()
}

export const getProjects = () => request('/api/projects', { cache: 'no-store' })
export const getProductsServices = () => request('/api/products-services', { cache: 'no-store' })
export const getClients = () => request('/api/clients', { cache: 'no-store' })
export const getJobs = () => request('/api/jobs', { cache: 'no-store' })

export const submitContactForm = (data: ContactFormData) => request('/api/contact-submissions', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const submitJobApplication = (data: JobApplicationData) => request('/api/job-applications', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const sendChatMessage = (messages: ChatMessage[]) => request('/api/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }),
}) as Promise<{ reply: string }>
