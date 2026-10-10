// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import Chatbot from '@/components/Chatbot'
import { siteUrl, siteName } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Loxon Philippines Inc. | Engineering & Construction Excellence',
  description: 'Loxon Philippines Inc. is a premier engineering and construction company delivering infrastructure, industrial, and civil engineering projects across the Philippines.',
  keywords: 'engineering, construction, Philippines, infrastructure, civil engineering, industrial construction',
  authors: [{ name: 'Loxon Philippines Inc.' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Loxon Philippines Inc. | Engineering & Construction Excellence',
    description: 'Premier engineering and construction company in the Philippines.',
    type: 'website',
    locale: 'en_PH',
    url: siteUrl,
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
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": siteName,
    "url": `${siteUrl}/`,
    "logo": `${siteUrl}/loxon-logo.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "LPI Centre, 324 Capt. Henry Javier St., Oranbo",
      "addressLocality": "Pasig City",
      "addressRegion": "Metro Manila",
      "addressCountry": "PH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63 (2) 8470-3912",
      "email": "lpie@loxon.com.ph",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="font-sans bg-white text-gray-900">
        <noscript><style>{'.collection-placeholder { display: none !important; } .collection-pending { position: static !important; visibility: visible !important; pointer-events: auto !important; } .smooth-image-pending { opacity: 1 !important; } .reveal-hidden { opacity: 1 !important; transform: none !important; filter: none !important; }'}</style></noscript>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
        <Chatbot />
      </body>
    </html>
  )
}
