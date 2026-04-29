// lib/api.ts
const BASE_URL = 'https://loxon-admin.vercel.app'

export async function getProjects() {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function getProductsServices() {
  const res = await fetch(`${BASE_URL}/api/products-services`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch products/services')
  return res.json()
}

export async function getClients() {
  const res = await fetch(`${BASE_URL}/api/clients`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch clients')
  return res.json()
}

export async function getOurCompany() {
  const res = await fetch(`${BASE_URL}/api/our-company`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch company data')
  return res.json()
}

export async function getJobs() {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error('Failed to fetch jobs')
  return res.json()
}