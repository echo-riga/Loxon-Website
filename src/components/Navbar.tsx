// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Products & Services', href: '/products-services' },
  { name: 'Company Membership', href: '/company-membership' },
  { name: 'Our Company', href: '/our-company' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Join Us', href: '/join-us' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="w-full px-8 md:px-16 lg:px-32">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/loxon-logo.png"
                alt="Loxon Philippines Inc. Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Loxon Philippines, Inc.
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-all duration-300 hover:text-sky-400 ${
                  pathname === item.href
                    ? 'text-sky-400 border-b-2 border-sky-400 pb-1'
                    : scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded transition-colors ${
              scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              <span className={`block w-6 h-0.5 transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              <span className={`block w-6 h-0.5 transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4 mt-3">
          <div className="px-8 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium py-2 transition-colors hover:text-sky-600 ${
                  pathname === item.href ? 'text-sky-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}