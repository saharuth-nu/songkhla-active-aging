import { RegistrationPageView } from "@/features/public/registration/RegistrationPageView"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ item?: string; service?: string }>
}) {
  const query = await searchParams
  return <RegistrationPageView selectedService={query.service || query.item} />
}
