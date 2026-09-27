import type { Client, Job, ProductService, Project } from '@/types/loxon'

const configuredApiBase = process.env.NEXT_PUBLIC_ADMIN_API_BASE?.trim().replace(/\/$/, '') || ''

type ProjectWithImages = Project & { images: Array<{ id: number; image_url: string; caption: string | null }> }

type ContactFormData = { name: string; email: string; subject: string; message: string }
type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }
type JobApplicationData = { job_id: number; full_name: string; email: string; phone?: string; cover_letter?: string; resume_url?: string }

export class ApiRequestError extends Error {
  constructor(message: string, public readonly status = 500, public readonly retryAfter?: number) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!configuredApiBase) throw new ApiRequestError('The website API is not configured.', 503)
  let response: Response
  try {
    response = await fetch(`${configuredApiBase}${path}`, options)
  } catch {
    throw new ApiRequestError('The website service is temporarily unavailable.', 503)
  }
  const data = await response.json().catch(() => ({})) as { error?: string; retryAfter?: number }
  if (!response.ok) throw new ApiRequestError(data.error || 'The request could not be completed.', response.status, data.retryAfter)
  return data as T
}

async function localRequest<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, options)
  } catch {
    throw new ApiRequestError('The website service is temporarily unavailable.', 503)
  }
  const data = await response.json().catch(() => ({})) as { error?: string; retryAfter?: number }
  if (!response.ok) throw new ApiRequestError(data.error || 'The request could not be completed.', response.status, data.retryAfter)
  return data as T
}

async function collection<T>(path: string): Promise<T[]> {
  try {
    const data = await request<unknown>(path, { next: { revalidate: 60 } } as RequestInit)
    return Array.isArray(data) ? data as T[] : []
  } catch (error) {
    console.error(`Unable to load ${path}:`, error instanceof Error ? error.message : error)
    return []
  }
}

export function apiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiRequestError && error.status === 429) {
    const wait = error.retryAfter ? ` Try again in about ${Math.ceil(error.retryAfter / 60)} minute(s).` : ''
    return `Too many requests.${wait}`
  }
  if (error instanceof ApiRequestError && (error.status === 400 || error.status === 413)) {
    return error.message
  }
  return fallback
}

export const getProjects = () => collection<ProjectWithImages>('/api/projects')
export const getProductsServices = () => collection<ProductService>('/api/products-services')
export const getClients = () => collection<Client>('/api/clients')
export const getJobs = () => collection<Job>('/api/jobs')

export const submitContactForm = (data: ContactFormData) => request<{ success: true; id: number }>('/api/contact-submissions', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const submitJobApplication = (data: JobApplicationData) => request<{ success: true; id: number }>('/api/job-applications', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const sendChatMessage = (messages: ChatMessage[]) => localRequest<{ reply: string }>('/api/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }),
})
