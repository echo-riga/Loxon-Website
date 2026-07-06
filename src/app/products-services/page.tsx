import { getProductsServices } from '@/lib/api'
import Reveal from '@/components/Reveal'

export const metadata = {
  title: 'Products & Services | Loxon Philippines Inc.',
  description: 'Engineering solutions, construction services, and industrial products offered by Loxon Philippines.',
}

export default async function ProductsServicesPage() {
  const items = await getProductsServices()

  return (
    <>
      {/* Hero with Cover Image */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <img
      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
alt="Engineering products and services"
          className="w-full h-full object-cover"
        />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {items.map((item: any, idx: number) => (
              <Reveal
                key={item.id}
                animation="fade-up"
                delay={idx * 120}
                className="bg-gray-50 overflow-hidden shadow-md hover:shadow-xl transition duration-500"
              >
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full h-64 object-cover" />
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
          {items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No products or services listed yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}