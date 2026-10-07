import type { Metadata } from 'next'

export const siteUrl = 'https://new.loxon.com.ph'
export const siteName = 'Loxon Philippines Inc.'

export function pageMetadata(route: string, title: string, description: string): Metadata {
  const url = `${siteUrl}${route === '/' ? '/' : `${route.replace(/\/$/, '')}/`}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName, type: 'website', locale: 'en_PH',
      images: [{ url: `${siteUrl}/loxon-logo.png`, alt: siteName }],
    },
    twitter: { card: 'summary', title, description, images: [`${siteUrl}/loxon-logo.png`] },
  }
}
