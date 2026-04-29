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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}