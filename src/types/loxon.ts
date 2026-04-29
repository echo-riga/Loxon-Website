// types/loxon.ts
export type Project = {
  id: number
  title: string
  image_url: string | null
  description: string | null
  video_url: string | null
  created_at: string
}

export type ProductService = {
  id: number
  title: string
  image_url: string | null
  description: string | null
  video_url: string | null
  created_at: string
}

export type Client = {
  id: number
  title: string
  image_url: string | null
  description: string | null
  link: string | null
  created_at: string
}

export type CompanySection = {
  id: number
  our_company_id: number
  title: string | null
  description: string | null
  image_url: string | null
  created_at: string
}

export type OurCompany = {
  id: number
  cover_pic: string | null
  description: string | null
  updated_at: string
  sections: CompanySection[]
}

export type Job = {
  id: number
  title: string
  description: string | null
  created_at: string
}