// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://loxon-ph.vercel.app'),
  title: 'Loxon Philippines Inc. | Engineering & Construction Excellence',
  description: 'Loxon Philippines Inc. is a premier engineering and construction company delivering infrastructure, industrial, and civil engineering projects across the Philippines.',
  keywords: 'engineering, construction, Philippines, infrastructure, civil engineering, industrial construction',
  authors: [{ name: 'Loxon Philippines Inc.' }],
  openGraph: {
    title: 'Loxon Philippines Inc. | Engineering & Construction Excellence',
    description: 'Premier engineering and construction company in the Philippines.',
    type: 'website',
    locale: 'en_PH',
    url: 'https://loxon-ph.vercel.app',
    siteName: 'Loxon Philippines',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loxon Philippines Inc. | Engineering & Construction',
    description: 'Premier engineering and construction company in the Philippines.',
  },
  icons: {
    icon: '/loxon-logo.png',
    apple: '/loxon-logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON‑LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EngineeringCompany",
    "name": "Loxon Philippines Inc.",
    "url": "https://loxon-ph.vercel.app",
    "logo": "https://loxon-ph.vercel.app/loxon-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "23rd Floor, One Corporate Centre, Meralco Ave",
      "addressLocality": "Pasig City",
      "addressRegion": "Metro Manila",
      "addressCountry": "PH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63281234567",
      "contactType": "customer service"
    }
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/loxon-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/loxon-logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}