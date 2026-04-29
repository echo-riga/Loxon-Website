// app/page.tsx
import Link from 'next/link'
import { getProjects, getOurCompany, getClients } from '@/lib/api'

export default async function HomePage() {
  const [projects, company, clients] = await Promise.all([
    getProjects(),
    getOurCompany(),
    getClients(),
  ])

  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      {/* Hero Section - Full Width */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Construction site"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-32 animate-fade-in-up">
          <div className="max-w-5xl">
            <span className="text-sky-400 text-lg md:text-xl font-semibold tracking-wider mb-4 block">
              ESTABLISHED 1998
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
              Engineering the<br />
              <span className="text-sky-400">Philippines' Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed">
              Loxon Philippines Inc. delivers world-class engineering and construction solutions from infrastructure to industrial projects with unwavering quality and safety.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/projects" className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-4 text-lg font-semibold transition duration-300 inline-block">
                VIEW OUR WORK
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg font-semibold transition duration-300 inline-block">
                REQUEST A QUOTE
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-slow">
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full mt-3 animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Company Stats - Projects Completed & Years Only */}
      <section className="py-20 bg-white w-full border-b border-gray-200">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center py-12 bg-gray-50 hover:shadow-xl transition duration-300">
              <div className="text-7xl font-bold text-sky-600 mb-4">350+</div>
              <div className="text-2xl text-gray-800 font-semibold">Projects Completed</div>
              <div className="text-gray-500 mt-2">Across the Philippines</div>
            </div>
            <div className="text-center py-12 bg-gray-50 hover:shadow-xl transition duration-300">
              <div className="text-7xl font-bold text-sky-600 mb-4">25+</div>
              <div className="text-2xl text-gray-800 font-semibold">Years of Excellence</div>
              <div className="text-gray-500 mt-2">Since 1998</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-right">
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">About Loxon Philippines</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Building Excellence Since 1998
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Loxon Philippines Inc. stands as a premier engineering and construction firm with over 25 years of excellence in delivering infrastructure, industrial, and commercial projects across the Philippine archipelago.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our commitment to quality, safety, and innovation has established us as a trusted partner for both government agencies and private sector clients.
              </p>
              <Link href="/our-company" className="text-sky-600 font-semibold text-lg hover:text-sky-700 transition duration-300">
                READ MORE
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 animate-fade-in-left">
              <div className="bg-gray-100 p-8 text-center hover:shadow-xl transition duration-300">
                <div className="text-4xl font-bold text-sky-600 mb-2">ISO</div>
                <div className="text-gray-700 font-semibold">9001:2015</div>
                <div className="text-sm text-gray-500 mt-1">Certified</div>
              </div>
              <div className="bg-gray-100 p-8 text-center hover:shadow-xl transition duration-300">
                <div className="text-4xl font-bold text-sky-600 mb-2">PCAB</div>
                <div className="text-gray-700 font-semibold">AAA License</div>
                <div className="text-sm text-gray-500 mt-1">Contractor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 md:py-32 bg-gray-50 w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
            <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-gray-900">Core Capabilities</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive engineering and construction services tailored to the Philippine landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Structural Engineering', desc: 'Robust structural design for commercial and industrial buildings with seismic considerations.' },
              { title: 'Industrial Construction', desc: 'Full-scale industrial facilities and manufacturing plants built to international standards.' },
              { title: 'Infrastructure Development', desc: 'Bridges, highways, and public infrastructure projects that connect communities.' },
              { title: 'Project Management', desc: 'End-to-end construction management and supervision ensuring timely delivery.' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 hover:shadow-xl transition duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-16 h-1 bg-sky-600 mb-6"></div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <div>
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">Featured Projects</h2>
              <p className="text-xl text-gray-600 mt-3">Delivering excellence across the nation.</p>
            </div>
            <Link href="/projects" className="text-sky-600 font-semibold text-lg hover:text-sky-700 transition duration-300">
              VIEW ALL PROJECTS
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((project: any, idx: number) => (
              <div key={project.id} className="group bg-white overflow-hidden shadow-md hover:shadow-2xl transition duration-500 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="overflow-hidden h-72">
                  {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>
                  {project.video_url && (
                    <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-sky-600 font-semibold hover:text-sky-700 transition duration-300">
                      WATCH VIDEO
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {clients.length > 0 && (
        <section className="py-24 md:py-32 bg-gray-50 w-full">
          <div className="w-full px-8 md:px-16 lg:px-32">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">Partners & Affiliations</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-gray-900">Trusted Partners</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We collaborate with industry leaders across the Philippines and beyond.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 items-center">
              {clients.slice(0, 5).map((client: any, idx: number) => (
                <div key={client.id} className="text-center group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {client.image_url ? (
                    <img src={client.image_url} alt={client.title} className="h-20 object-contain mx-auto mb-4 grayscale hover:grayscale-0 transition duration-300" />
                  ) : (
                    <div className="h-20 flex items-center justify-center bg-gray-200 mb-4 px-4">
                      <span className="text-gray-500 font-semibold text-center">{client.title}</span>
                    </div>
                  )}
                  <p className="text-gray-600 font-medium">{client.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-sky-700 w-full">
        <div className="w-full px-8 md:px-16 lg:px-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
            Contact us today for a consultation and let us help bring your vision to life.
          </p>
          <Link href="/contact" className="bg-white text-sky-700 hover:bg-gray-100 px-10 py-4 text-lg font-semibold transition duration-300 inline-block">
            CONTACT US TODAY
          </Link>
        </div>
      </section>
    </>
  )
}