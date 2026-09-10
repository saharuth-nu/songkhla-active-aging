import { ContentDetailPageView } from "@/features/public/content/ContentPages"

export default async function KnowledgeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ContentDetailPageView id={id} kind="knowledge" />
}
