import { getOurCompany } from '@/lib/api'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Our Company | Loxon Philippines Inc.',
  description: 'Learn about our vision, mission, values, and engineering leadership.',
}

export default async function OurCompanyPage() {
  const company = await getOurCompany()
  if (!company) return notFound()

  const sections = company.sections || []

  return (
    <>
      {/* Cover Image */}
      {company.cover_pic && (
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <img
            src={company.cover_pic}
            alt="Company cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
              Our Company
            </h1>
          </div>
        </div>
      )}

      {/* Main Description */}
      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              {company.description ||
                'Loxon Philippines Inc. is built on a foundation of engineering excellence, integrity, and innovation.'}
            </p>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="space-y-24">
            {sections.map((section: any, idx: number) => (
              <div
                key={section.id}
                className={`flex flex-col ${
                  idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                } gap-12 items-center animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{section.description}</p>
                </div>
                {section.image_url && (
                  <div className="flex-1">
                    <img
                      src={section.image_url}
                      alt={section.title || ''}
                      className="rounded-lg shadow-xl w-full object-cover max-h-96"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Office
          </h2>
          <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg mb-2">
              23rd Floor, One Corporate Centre
            </p>
            <p className="text-gray-700 text-lg mb-2">
              Meralco Avenue, Ortigas Center
            </p>
            <p className="text-gray-700 text-lg mb-6">
              Pasig City, Metro Manila, Philippines
            </p>
            <div className="h-64 w-full rounded-lg overflow-hidden">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.4343!2d121.055!3d14.590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7f6b2d8c6c9%3A0x5b8f3e2d1c4a7e9!2sOne%20Corporate%20Centre!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}