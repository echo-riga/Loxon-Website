// app/our-company/page.tsx
export const metadata = {
  title: 'Our Company | Loxon Philippines Inc.',
  description: 'Learn about our vision, mission, values, and engineering leadership.',
}

export default function OurCompanyPage() {
  return (
    <>
      {/* Cover Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src="https://loxon.com.ph/wp-content/uploads/2020/01/new.png"
          alt="Company cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
            Our Company
          </h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Who We Are
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Loxon Philippines, Inc. was established on February 23, 1983 headed by Mr. Ed C. Esmerio. 
                It was launched as the “Fire Protection Company”; with no track records to boost and armed 
                only with wealth of contacts, professional experience, dedication, commitment and strong 
                determination to succeed. It grew in a span of few years and has been known in the market 
                as a reputable and a leading fire protection company.
              </p>
              <p>
                Now, LPI has been providing Integrated Building Technology Solutions for the protection of 
                life and property for 40 years. Our passion and dedication in serving our customers with 
                safety, premium quality, time and cost efficiency sets us apart from our competitors.
              </p>
              <p>
                Through the years, we have established strong relationship with our customers that makes us 
                the top-of-mind company in providing fire safety systems. Together with our foreign business 
                partners and guided by International Standards, we deliver quality products and services in 
                the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 bg-gray-50 w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <img
                src="https://loxon.com.ph/wp-content/uploads/2022/04/Compliance.jpg"
                alt="Compliance certification"
                className="rounded-lg shadow-xl w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Compliance & Standards</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                LOXON’s installations strictly comply and exceed the minimum statutory requirements of 
                the Fire Code of the Philippines (PD1185), as well as the international codes and standards 
                such as the National Fire Protection Association, Japanese Industrial Standards and American 
                Society of Heating, Refrigerating and Air-Conditioning Engineers.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                Loxon is the FIRST Fire Protection company to achieve ISO Certification. Loxon conforms to 
                ISO 9001:2015 standards which operates in risk-based management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Engineers Section */}
      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1">
              <img
                src="https://loxon.com.ph/wp-content/uploads/2022/04/OurEngineers.jpg"
                alt="Our engineers"
                className="rounded-lg shadow-xl w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Engineers</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                LOXON Engineers have been trained extensively overseas in America, England, Spain, Japan, 
                Singapore and Hong Kong in the modern discipline of fire protection, building management 
                and security management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-gray-50 w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-xl leading-relaxed italic">
                "The leader in reliable and sustainable Integrated Building Management and Fire Safety Systems."
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed font-semibold mb-2">
                In pursuing our vision – we aim to:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li><span className="font-bold text-sky-600">P</span>rovide best quality products and services</li>
                <li><span className="font-bold text-sky-600">R</span>esponsibly comply with codes and standards</li>
                <li><span className="font-bold text-sky-600">O</span>bserve safety and functionality</li>
                <li><span className="font-bold text-sky-600">T</span>imely delivery</li>
                <li><span className="font-bold text-sky-600">E</span>fficient project management</li>
                <li><span className="font-bold text-sky-600">C</span>are for our people and the environment</li>
                <li><span className="font-bold text-sky-600">T</span>otal technology innovation</li>
              </ul>
              <p className="text-gray-800 font-bold text-xl mt-4 text-sky-700">
                WE PROTECT LIFE AND PROPERTY!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Values Section */}
      <section className="py-24 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Corporate Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <img
                src="https://loxon.com.ph/wp-content/uploads/2020/01/viber_image_2023-08-31_15-05-28-970-768x576.png"
                alt="Corporate values"
                className="rounded-lg shadow-md w-full mb-6"
              />
              <p className="text-gray-700 text-lg leading-relaxed">
                LOXON employees value punctuality, dependability, commitment, loyalty, professionalism, 
                and leadership - the key ingredients that propel LOXON to growth and development.
              </p>
            </div>
            <div>
              <img
                src="https://loxon.com.ph/wp-content/uploads/2020/01/viber_image_2023-08-31_15-06-56-121.jpg"
                alt="Team values"
                className="rounded-lg shadow-md w-full mb-6"
              />
              <p className="text-gray-700 text-lg leading-relaxed">
                As members of TEAM LOXON, values include love of God, respect, integrity, understanding, 
                compassion, sincerity and "Malasakit". These are reflected in the relationship with 
                co-employees, customers and stakeholders.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                As members of society, LOXON employees value beliefs, traditions and customs of the Philippine 
                society and its environmental, social and cultural needs. These values are reflected in the 
                day-to-day activities which help to become more responsible individuals which when taken in 
                totality contribute to the well-being of the community.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* Office Location */}
<section className="py-24 bg-gray-50 w-full">
  <div className="w-full px-8 md:px-16 lg:px-32">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
      Our Office
    </h2>
    <div className="bg-white rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto shadow-md">
      <p className="text-gray-700 text-lg mb-2">
        LPI Centre, 324 capt. Henry Javier St., Oranbo, Pasig City, NCR, Philippines 1600
      </p>
      <p className="text-gray-500 text-md mt-4">
        Warehouse: Two LPI Centre, 3 Luis St. San Miguel, Pasig City
      </p>
      <div className="h-64 w-full rounded-lg overflow-hidden mt-6">
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