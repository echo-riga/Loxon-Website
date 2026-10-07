'use client'

import { useCollection } from '@/lib/use-collection'
import CollectionStatus from '@/components/CollectionStatus'
import { getProductsServices } from '@/lib/api'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import type { ProductService } from '@/types/loxon'

export default function ProductsServicesContent({ initialItems }: { initialItems: ProductService[] }) {
  const content = useCollection(getProductsServices, initialItems)
  const items = content.data

  return (
    <>
      {/* Hero with Cover Image */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80" alt="Engineering products and services" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Products & Services
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
              Comprehensive engineering solutions tailored to your project needs.
            </p>
          </div>
        </div>
      </div>

      <section className="py-24 md:py-32 bg-white w-full">
        <div className="w-full px-8 md:px-16 lg:px-32">
          <CollectionStatus {...content} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {items.map((item, idx) => (
              <Reveal
                key={item.id}
                animation="fade-up"
                delay={idx * 120}
                className="bg-gray-50 overflow-hidden shadow-md hover:shadow-xl transition duration-500"
              >
                {item.image_url && (
                  <Image src={item.image_url} alt={item.title} width={900} height={500} sizes="(min-width: 768px) 50vw, 100vw" className="h-64 w-full object-cover" />
                )}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  {item.video_url && (
                    <a
                      href={item.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 text-sky-600 font-semibold hover:text-sky-700 transition"
                    >
                      WATCH OVERVIEW
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          {!content.loading && !content.error && items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No products or services listed yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
