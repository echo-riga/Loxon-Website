import Link from "next/link";
import { getProjects, getOurCompany, getClients } from "@/lib/api";
import FeaturedProjects from '@/components/FeaturedProjects';
import HeroWithVideo from '@/components/HeroWithVideo';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Marquee from '@/components/Marquee';
import CoreCapabilities from '@/components/CoreCapabilities';

export default async function HomePage() {
  const [projects, company, clients] = await Promise.all([
    getProjects(),
    getOurCompany(),
    getClients(),
  ]);

  const featuredProjects = projects.slice(0, 3);
  const businessPartners = clients.filter((client: any) => client.entity_type === 'partner');

  return (
    <>
      <HeroWithVideo />
      <CoreCapabilities />

      {/* About Section */}
      <section className="relative py-24 md:py-32 bg-white w-full overflow-hidden">
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-32">
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
              <Reveal animation="fade-left" className="group relative overflow-hidden bg-white p-8 text-center border border-sky-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                <div className="text-4xl font-bold text-sky-600 mb-2">ISO</div>
                <div className="text-gray-700 font-semibold">9001:2015</div>
                <div className="text-sm text-gray-500 mt-1">Certified</div>
              </Reveal>
              <Reveal animation="fade-left" delay={150} className="group relative overflow-hidden bg-white p-8 text-center border border-sky-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                <div className="text-4xl font-bold text-sky-600 mb-2">PCAB</div>
                <div className="text-gray-700 font-semibold">AAA License</div>
                <div className="text-sm text-gray-500 mt-1">Contractor</div>
              </Reveal>
              <Reveal animation="fade-left" delay={200} className="group relative overflow-hidden bg-white p-8 text-center border border-sky-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                <div className="text-4xl font-bold text-sky-600 mb-2"><CountUp end={projects.length} suffix="+" /></div>
                <div className="text-gray-700 font-semibold">Projects Completed</div>
                <div className="text-sm text-gray-500 mt-1">Across the Philippines</div>
              </Reveal>
              <Reveal animation="fade-left" delay={300} className="group relative overflow-hidden bg-white p-8 text-center border border-sky-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                <div className="text-4xl font-bold text-sky-600 mb-2"><CountUp end={43} suffix="+" /></div>
                <div className="text-gray-700 font-semibold">Years of Excellence</div>
                <div className="text-sm text-gray-500 mt-1">Since 1983</div>
              </Reveal>            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative py-24 md:py-32 bg-white w-full overflow-hidden">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <Reveal animation="fade-up" className="flex justify-between items-end mb-16 flex-wrap gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="text-sky-600 text-base font-semibold tracking-wider uppercase">Portfolio</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-2">Featured Projects</h2>
              <p className="text-xl text-gray-600 mt-3 max-w-2xl">Delivering engineering excellence across the Philippines.</p>
            </div>
            <Link href="/projects" className="text-sky-600 font-semibold text-lg hover:text-sky-700 transition duration-300 inline-flex items-center group">
              VIEW ALL PROJECTS
              <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
          <FeaturedProjects projects={featuredProjects} />
        </div>
      </section>

      {/* Partners Section */}
      {businessPartners.length > 0 && (
        <section className="relative py-24 md:py-32 bg-gray-50 w-full overflow-hidden">
          <div className="relative z-10 w-full px-8 md:px-16 lg:px-32">
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
                {businessPartners.map((client: any) => (
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
      <section className="relative py-24 bg-sky-700 w-full overflow-hidden">
        <Reveal animation="scale" className="relative z-10 w-full px-8 md:px-16 lg:px-32 text-center">
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



