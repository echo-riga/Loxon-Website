import { getClients } from '@/lib/api'

export const metadata = {
  title: 'Company Membership & Partners | Loxon Philippines Inc.',
  description: 'Our business partners, industry memberships, and professional affiliations.',
}

export default async function CompanyMembershipPage() {
  const clients = await getClients()

  const memberships = clients.filter((c: any) => c.entity_type === 'membership')
  const partners = clients.filter((c: any) => c.entity_type === 'partner')

  return (
    <>
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
          alt="Business partners and memberships"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Company Membership & Partners
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
              We are proud to work alongside industry leaders and maintain active memberships in professional organizations.
            </p>
          </div>
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          {memberships.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Company Membership</h2>
              <div className="w-20 h-1 bg-sky-600 mb-10"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {memberships.map((client: any, idx: number) => (
                  <div
                    key={client.id}
                    className="bg-gray-50 p-8 hover:shadow-xl transition duration-300 animate-fade-in-up text-center flex flex-col h-full"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {client.image_url && (
                      <div className="flex justify-center mb-5">
                        <img
                          src={client.image_url}
                          alt={client.title}
                          className="w-24 h-24 rounded-full object-cover border-2 border-sky-200"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-3 text-gray-900">{client.title}</h2>
                    <p className="text-gray-600 mb-5 leading-relaxed flex-grow">{client.description}</p>
                    {client.link && (
                      <a
                        href={client.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-semibold hover:underline inline-block mt-auto"
                      >
                        VISIT WEBSITE
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {partners.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Business Partners</h2>
              <div className="w-20 h-1 bg-sky-600 mb-10"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {partners.map((client: any, idx: number) => (
                  <div
                    key={client.id}
                    className="bg-gray-50 p-8 hover:shadow-xl transition duration-300 animate-fade-in-up text-center flex flex-col h-full"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {client.image_url && (
                      <div className="flex justify-center mb-5">
                        <img
                          src={client.image_url}
                          alt={client.title}
                          className="w-24 h-24 rounded-full object-cover border-2 border-sky-200"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-3 text-gray-900">{client.title}</h2>
                    <p className="text-gray-600 mb-5 leading-relaxed flex-grow">{client.description}</p>
                    {client.link && (
                      <a
                        href={client.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 font-semibold hover:underline inline-block mt-auto"
                      >
                        VISIT WEBSITE
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {memberships.length === 0 && partners.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No memberships or partners to display.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}