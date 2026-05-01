// lib/api.ts

// Admin API (external) – GET only
const ADMIN_API_BASE = 'https://loxon-admin.vercel.app'

// Frontend API (your own server) – POST endpoints
const FRONTEND_API_BASE = '' // relative URLs will use the same origin

export async function getProjects() {
  const res = await fetch(`${ADMIN_API_BASE}/api/projects`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function getProductsServices() {
  const res = await fetch(`${ADMIN_API_BASE}/api/products-services`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch products/services')
  return res.json()
}

export async function getClients() {
  const res = await fetch(`${ADMIN_API_BASE}/api/clients`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch clients')
  return res.json()
}

export async function getOurCompany() {
  const res = await fetch(`${ADMIN_API_BASE}/api/our-company`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch company data')
  return res.json()
}

export async function getJobs() {
  const res = await fetch(`${ADMIN_API_BASE}/api/jobs`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch jobs')
  return res.json()
}

// ─── NEW: POST to your own frontend API ─────────────────────────────────────

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

type JobApplicationData = {
  job_id: number
  full_name: string
  email: string
  phone?: string
  cover_letter?: string
  resume_url?: string
}

export async function submitContactForm(data: ContactFormData) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit contact form')
  return res.json()
}

export async function submitJobApplication(data: JobApplicationData) {
  const res = await fetch('/api/job-applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit job application')
  return res.json()
}