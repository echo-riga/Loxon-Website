import ProductsServicesContent from '@/components/ProductsServicesContent'
import { getBuildProductsServices } from '@/lib/build-content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/products-services', 'Products & Services | Loxon Philippines Inc.', 'Engineering solutions, construction services, and industrial products offered by Loxon Philippines.')

export default async function Page() {
  return <ProductsServicesContent initialItems={await getBuildProductsServices()} />
}
