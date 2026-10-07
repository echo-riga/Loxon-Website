import type { Client, Job, ProductService, Project } from '@/types/loxon'

const configuredApiBase = process.env.NEXT_PUBLIC_ADMIN_API_BASE?.trim().replace(/\/$/, '') || ''

export type ProjectWithImages = Project & { images: Array<{ id: number; image_url: string; caption: string | null }> }

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

async function collection<T>(path: string, signal?: AbortSignal): Promise<T[]> {
  const data = await request<unknown>(path, { signal })
  if (!Array.isArray(data)) throw new ApiRequestError('The website service returned invalid content.', 502)
  return data as T[]
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

export const getProjects = (signal?: AbortSignal) => collection<ProjectWithImages>('/api/projects', signal)
export const getProductsServices = (signal?: AbortSignal) => collection<ProductService>('/api/products-services', signal)
export const getClients = (signal?: AbortSignal) => collection<Client>('/api/clients', signal)
export const getJobs = (signal?: AbortSignal) => collection<Job>('/api/jobs', signal)

export const submitContactForm = (data: ContactFormData) => request<{ success: true; id: number }>('/api/contact-submissions', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const submitJobApplication = (data: JobApplicationData) => request<{ success: true; id: number }>('/api/job-applications', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const sendChatMessage = (messages: ChatMessage[]) => request<{ reply: string }>('/api/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }),
})
