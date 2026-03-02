import { notFound } from "next/navigation"
import connectDB from "@/lib/connectDB"
import EmbeddedPage from "@/models/EmbeddedPage"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function EmbeddedPageView({ params }: PageProps) {
  await connectDB()

  const page = await EmbeddedPage.findOne({
    slug: params.slug,
    isActive: true
  })

  if (!page) return notFound()

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  )
}