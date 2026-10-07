import JoinUsContent from '@/components/JoinUsContent'
import { getBuildJobs } from '@/lib/build-content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/join-us', 'Join Our Team | Loxon Philippines Inc.', 'Explore career opportunities at Loxon Philippines. Join a leading engineering and construction company.')

export default async function Page() {
  return <JoinUsContent initialJobs={await getBuildJobs()} />
}
