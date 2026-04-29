'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV = [
  { label: 'Home',                href: '/' },
  { label: 'Projects',            href: '/projects' },
  { label: 'Products & Services', href: '/products-services' },
  { label: 'Company Membership',  href: '/company-membership' },
  { label: 'Our Company',         href: '/our-company' },
  { label: 'Join Us',             href: '/join-us' },
  { label: 'Contact Us',          href: '/contact-us' },
]

export default function Header() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(10,22,40,0.97)' : 'rgba(10,22,40,1)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(0,180,216,0.2)' : '1px solid rgba(0,180,216,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Image src="/loxon_logo.png" alt="Loxon Philippines" width={40} height={40} style={{ objectFit: 'contain' }} />
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              color: '#fff',
              fontSize: '1.05rem',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '0.01em',
            }}>Loxon Philippines</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--cyan)',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>Inc.</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {NAV.map(({ label, href }) => {
            const active = path === href
            return (
              <Link key={href} href={href} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--cyan)' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = '#fff' }}
              onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)' }}
              >
                {label}
                {active && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '0.75rem',
                    right: '0.75rem',
                    height: '2px',
                    background: 'var(--cyan)',
                    borderRadius: '1px',
                  }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#fff',
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--navy)',
          borderTop: '1px solid rgba(0,180,216,0.15)',
          padding: '1rem 2rem 1.5rem',
        }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                color: path === href ? 'var(--cyan)' : 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                padding: '0.65rem 0',
                fontSize: '0.95rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  )
}