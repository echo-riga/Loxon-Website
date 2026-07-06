'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitContactForm } from '@/lib/api'
import Reveal from '@/components/Reveal'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'sales',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Pre‑select the toggle based on URL parameter
  useEffect(() => {
    if (typeParam === 'service') {
      setFormData((prev) => ({ ...prev, inquiryType: 'service' }))
    } else if (typeParam === 'sales') {
      setFormData((prev) => ({ ...prev, inquiryType: 'sales' }))
    }
  }, [typeParam])

  // Scroll to contact form when URL contains ?type=sales or ?type=service
  useEffect(() => {
    if (typeParam === 'sales' || typeParam === 'service') {
      const formElement = document.getElementById('contact-form')
      if (formElement) {
        // Small delay to ensure the page has fully rendered
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200)
      }
    }
  }, [typeParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm(formData)
      setSubmitStatus({ type: 'success', message: 'Thank you for reaching out. We will respond within 24 hours.' })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'sales',
      })
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero with Cover Image */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <img
          src="https://loxon.com.ph/wp-content/uploads/2020/01/1048-1.png"
          alt="Contact Loxon Philippines"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
              Ready to start your next project? Reach out to our engineering team.
            </p>
          </div>
        </div>
      </div>

      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <Reveal animation="fade-right" className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800">Main Office</h3>
                  <p className="text-gray-600 mt-1">
                    LPI Centre, 324 capt. Henry Javier St., Oranbo,<br />
                    Pasig City, NCR, Philippines 1600
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Warehouse</h3>
                  <p className="text-gray-600 mt-1">
                    Two LPI Centre, 3 Luis St. San Miguel, Pasig City
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600 mt-1">
                    +63 (2) 8470-3912 to 15
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-1">
                    lpie@loxon.com.ph
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Business Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday – Friday: 8:00 AM – 6:00 PM<br />
                    Saturday: 9:00 AM – 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact Form with Left Border Accent */}
            <Reveal animation="fade-left" delay={150}>
              <div
                id="contact-form"
                className="bg-white border border-gray-200 border-l-8 border-l-sky-600 p-8 shadow-sm rounded-lg scroll-mt-20"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Modern segmented toggle for inquiry type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I am contacting for *</label>
                  <div className="flex rounded-md shadow-sm border border-gray-300 p-1 bg-gray-50 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: 'sales' })}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded transition ${
                        formData.inquiryType === 'sales'
                          ? 'bg-sky-600 text-white'
                          : 'bg-transparent text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Sales
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: 'service' })}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded transition ${
                        formData.inquiryType === 'service'
                          ? 'bg-sky-600 text-white'
                          : 'bg-transparent text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Service / Support
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded transition disabled:opacity-70"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
                {submitStatus && (
                  <p className={`text-center text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus.message}
                  </p>
                )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}