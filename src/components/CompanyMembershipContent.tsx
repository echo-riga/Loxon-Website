'use client'

import { useCollection } from '@/lib/use-collection'
import CollectionStatus from '@/components/CollectionStatus'
import { getClients } from '@/lib/api'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import type { Client } from '@/types/loxon'

export default function CompanyMembershipContent({ initialClients }: { initialClients: Client[] }) {
  const content = useCollection(getClients, initialClients)
  const clients = content.data

  const memberships = clients.filter((c) => c.entity_type === 'membership')

  return (
    <>
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80" alt="Company memberships" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Company Membership
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
              We are proud to maintain active memberships in professional organizations.
            </p>
          </div>
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <CollectionStatus {...content} />
          {memberships.length > 0 && (
            <div className="w-full">
              <Reveal animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Company Membership</h2>
                <div className="w-20 h-1 bg-sky-600 mb-10"></div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {memberships.map((client, idx) => (
                  <Reveal
                    key={client.id}
                    animation="fade-up"
                    delay={idx * 120}
                    className="bg-gray-50 p-8 hover:shadow-xl transition duration-300 text-center flex flex-col h-full"
                  >
                    {client.image_url && (
                      <div className="flex justify-center mb-5">
                        <div className="w-40 h-40 flex items-center justify-center bg-white rounded-lg p-2">
                          <Image src={client.image_url} alt={client.title} width={160} height={160} sizes="160px" className="max-h-full max-w-full object-contain" />
                        </div>
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
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {!content.loading && !content.error && memberships.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No memberships to display.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
