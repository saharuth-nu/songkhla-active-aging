import { ContactPageView } from "@/features/public/contact/ContactPageView"
import { partners } from "@/features/public/mocks/public-data"

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ partner?: string; subject?: string }>
}) {
  const query = await searchParams
  const partner = partners.find(([id]) => id === query.partner)
  const subject = partner ? `ติดต่อภาคี: ${partner[2]}` : query.subject
  return <ContactPageView initialSubject={subject} />
}
