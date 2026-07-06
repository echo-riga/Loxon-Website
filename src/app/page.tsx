import Link from "next/link";
import { getProjects, getOurCompany, getClients } from "@/lib/api";
import FeaturedProjects from '@/components/FeaturedProjects';
import HeroWithVideo from '@/components/HeroWithVideo';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Marquee from '@/components/Marquee';

export default async function HomePage() {
  const [projects, company, clients] = await Promise.all([
    getProjects(),
    getOurCompany(),
    getClients(),
  ]);

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <HeroWithVideo />

      {/* Company Stats - Projects Completed & Years Only */}
      <section className="py-20 bg-white w-full border-b border-gray-200">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Reveal animation="fade-up" className="text-center py-12 bg-gray-50 hover:shadow-xl transition duration-300">
              <div className="text-7xl font-bold text-sky-600 mb-4">
                <CountUp end={projects.length} suffix="+" />
              </div>
              <div className="text-2xl text-gray-800 font-semibold">
                Projects Completed
              </div>
              <div className="text-gray-500 mt-2">Across the Philippines</div>
            </Reveal>
            <Reveal animation="fade-up" delay={150} className="text-center py-12 bg-gray-50 hover:shadow-xl transition duration-300">
              <div className="text-7xl font-bold text-sky-600 mb-4">
                <CountUp end={43} suffix="+" />
              </div>
              <div className="text-2xl text-gray-800 font-semibold">
                Years of Excellence
              </div>
              <div className="text-gray-500 mt-2">Since 1983</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal animation="fade-right">
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">
                About Loxon Philippines
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Building Excellence Since 1983
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Loxon Philippines Inc. stands as a premier engineering and
                construction firm with over 43 years of excellence in delivering
                infrastructure, industrial, and commercial projects across the
                Philippine archipelago.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our commitment to quality, safety, and innovation has
                established us as a trusted partner for both government agencies
                and private sector clients.
              </p>
              <Link
                href="/our-company"
                className="text-sky-600 font-semibold text-lg hover:text-sky-700 transition duration-300"
              >
                READ MORE
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              <Reveal animation="fade-left" className="bg-gray-100 p-8 text-center hover:shadow-xl transition duration-300">
                <div className="text-4xl font-bold text-sky-600 mb-2">ISO</div>
                <div className="text-gray-700 font-semibold">9001:2015</div>
                <div className="text-sm text-gray-500 mt-1">Certified</div>
              </Reveal>
              <Reveal animation="fade-left" delay={150} className="bg-gray-100 p-8 text-center hover:shadow-xl transition duration-300">
                <div className="text-4xl font-bold text-sky-600 mb-2">PCAB</div>
                <div className="text-gray-700 font-semibold">AAA License</div>
                <div className="text-sm text-gray-500 mt-1">Contractor</div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 md:py-32 bg-gray-50 w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <Reveal animation="fade-up" className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-gray-900">
              Core Capabilities
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive engineering and construction services tailored to
              the Philippine landscape.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Structural Engineering",
                desc: "Robust structural design for commercial and industrial buildings with seismic considerations.",
              },
              {
                title: "Industrial Construction",
                desc: "Full-scale industrial facilities and manufacturing plants built to international standards.",
              },
              {
                title: "Infrastructure Development",
                desc: "Bridges, highways, and public infrastructure projects that connect communities.",
              },
              {
                title: "Project Management",
                desc: "End-to-end construction management and supervision ensuring timely delivery.",
              },
            ].map((service, idx) => (
              <Reveal
                key={idx}
                animation="fade-up"
                delay={idx * 100}
                className="bg-white p-8 hover:shadow-xl transition duration-300"
              >
                <div className="w-16 h-1 bg-sky-600 mb-6"></div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <Reveal animation="fade-up" className="flex justify-between items-end mb-16 flex-wrap gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase">Portfolio</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-2">Featured Projects</h2>
              <p className="text-xl text-gray-600 mt-3 max-w-2xl">Delivering engineering excellence across the Philippines.</p>
            </div>
            <Link href="/projects" className="text-sky-600 font-semibold text-lg hover:text-sky-700 transition duration-300 inline-flex items-center group">
              VIEW ALL PROJECTS
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <FeaturedProjects projects={featuredProjects} />
        </div>
      </section>

      {/* Partners Section */}
      {clients.length > 0 && (
        <section className="py-24 md:py-32 bg-gray-50 w-full">
          <div className="w-full px-8 md:px-16 lg:px-32">
            <Reveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase mb-3 block">
                Trusted by Industry Leaders
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-gray-900">
                Our Partners
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We collaborate with the most respected names in engineering,
                construction, and building technology.
              </p>
            </Reveal>
            <Reveal animation="fade-up" delay={200}>
              <Marquee speed={30} direction="left" pauseOnHover>
                {clients.map((client: any) => (
                  <div
                    key={client.id}
                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mx-4 w-64 shrink-0"
                  >
                    <div className="h-32 w-full flex items-center justify-center mb-4">
                      {client.image_url ? (
                        <img
                          src={client.image_url}
                          alt={client.title}
                          className="max-h-24 max-w-full object-contain transition duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-24 w-full flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-sky-50 transition">
                          <span className="text-gray-500 group-hover:text-sky-600 font-semibold text-center px-2">
                            {client.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-center text-gray-600 text-sm font-medium group-hover:text-sky-600 transition">
                      {client.title}
                    </p>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                ))}
              </Marquee>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-sky-700 w-full">
        <Reveal animation="scale" className="w-full px-8 md:px-16 lg:px-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
            Contact us today for a consultation and let us help bring your
            vision to life.
          </p>
          <Link
            href="/contact"
            className="bg-white text-sky-700 hover:bg-gray-100 px-10 py-4 text-lg font-semibold transition duration-300 inline-block"
          >
            CONTACT US TODAY
          </Link>
        </Reveal>
      </section>
    </>
  );
}