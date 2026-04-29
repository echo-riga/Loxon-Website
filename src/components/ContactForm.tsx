'use client'

import { useState } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  firstName?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Replace with your actual form submission logic (e.g. API route, EmailJS, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', background: 'var(--steel)',
          border: '2px solid var(--blue)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900,
          color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0,
        }}>Message Sent</h4>
        <p style={{
          fontFamily: 'var(--font-body)', color: 'var(--gray)',
          fontSize: '1rem', margin: 0, lineHeight: 1.75,
        }}>
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    )
  }

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--off-white)',
    border: `1px solid ${hasError ? '#E24B4A' : 'var(--gray-border)'}`,
    borderRadius: '2px',
    padding: '0.7rem 0.9rem',
    fontSize: '0.95rem',
    color: 'var(--ink)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--gray)',
    marginBottom: '0.4rem',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: '#E24B4A',
    marginTop: '0.3rem',
    letterSpacing: '0.05em',
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle} htmlFor="firstName">First Name *</label>
          <input
            id="firstName" name="firstName" type="text"
            placeholder="Juan"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle(errors.firstName)}
          />
          {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle} htmlFor="lastName">Last Name</label>
          <input
            id="lastName" name="lastName" type="text"
            placeholder="dela Cruz"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle()}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle} htmlFor="email">Email Address *</label>
        <input
          id="email" name="email" type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle(errors.email)}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle} htmlFor="phone">Phone Number</label>
        <input
          id="phone" name="phone" type="tel"
          placeholder="+63 9XX XXX XXXX"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle()}
        />
      </div>

      {/* Service */}
      <div>
        <label style={labelStyle} htmlFor="service">Service of Interest</label>
        <select
          id="service" name="service"
          value={formData.service}
          onChange={handleChange}
          style={{ ...inputStyle(), cursor: 'pointer' }}
        >
          <option value="">Select a service...</option>
          <option value="structural">Structural Engineering</option>
          <option value="civil">Civil Engineering</option>
          <option value="mechanical">Mechanical Engineering</option>
          <option value="electrical">Electrical Engineering</option>
          <option value="pm">Project Management</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle} htmlFor="message">Message *</label>
        <textarea
          id="message" name="message"
          placeholder="Tell us about your project..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: '120px' }}
        />
        {errors.message && <p style={errorStyle}>{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? 'var(--gray)' : 'var(--blue)',
          color: '#fff',
          border: 'none',
          borderRadius: '2px',
          padding: '0.9rem 2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          transition: 'background 0.15s',
        }}
      >
        {loading ? (
          'Sending...'
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Message
          </>
        )}
      </button>

    </form>
  )
}