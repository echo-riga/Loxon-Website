// components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="w-full px-8 md:px-16 lg:px-32 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/loxon-logo.png" alt="Loxon Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-white">
                Loxon Philippines, Inc.
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Premier engineering and construction company delivering excellence across the Philippines since 1983.
            </p>
            <p className="text-gray-400 text-sm">
              PCAB License No. 12345<br />
              ISO 9001:2015 Certified
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/projects" className="text-gray-400 hover:text-sky-400 transition duration-300">Projects</Link></li>
              <li><Link href="/products-services" className="text-gray-400 hover:text-sky-400 transition duration-300">Products & Services</Link></li>
              <li><Link href="/company-membership" className="text-gray-400 hover:text-sky-400 transition duration-300">Company Membership</Link></li>
              <li><Link href="/our-company" className="text-gray-400 hover:text-sky-400 transition duration-300">Our Company</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-sky-400 transition duration-300">Contact</Link></li>
              <li><Link href="/join-us" className="text-gray-400 hover:text-sky-400 transition duration-300">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="leading-relaxed">
                LPI Centre, 324 capt. Henry Javier St., Oranbo,<br />
                Pasig City, NCR, Philippines 1600
              </li>
              <li>
                Tel: +63 (2) 8470-3912 to 15
              </li>
              <li>
                Email: lpie@loxon.com.ph
              </li>
              <li className="text-gray-500 text-sm pt-2">
                Warehouse: Two LPI Centre, 3 Luis St. San Miguel, Pasig City
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Business Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Loxon Philippines Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}