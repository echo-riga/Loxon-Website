import CompanyMembershipContent from '@/components/CompanyMembershipContent'
import { getBuildClients } from '@/lib/build-content'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/company-membership', 'Company Membership | Loxon Philippines Inc.', 'Our industry memberships and professional affiliations.')

export default async function Page() {
  return <CompanyMembershipContent initialClients={await getBuildClients()} />
}
