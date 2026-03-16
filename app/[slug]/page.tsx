import { notFound, redirect } from "next/navigation"
import connectDB from "@/lib/connectDB"
import EmbeddedPage from "@/models/EmbeddedPage"
import { adminDb } from "@/lib/firebase-admin"
import EventEmbed from "@/models/EventEmbed"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {

  const slug = params.slug

  /* 1️⃣ CHECK CATEGORY (FIREBASE) */
  const menuSnapshot = await adminDb
    .collection("menus")
    .where("slug", "==", slug)
    .limit(1)
    .get()

  if (!menuSnapshot.empty) {
  redirect(`/danh-muc/${slug}`)
}

  /* 2️⃣ CHECK EMBEDDED PAGE (MONGODB) */
  await connectDB()

  const page = await EmbeddedPage.findOne({
    slug,
    isActive: true
  })

  /* 3️⃣ CHECK EVENT EMBED */

const event = await EventEmbed.findOne({
  slug,
  isActive: true
})

if (event) {
  return (
    <div className="w-full h-screen">
      <iframe
        src={event.externalUrl}
        className="w-full h-full border-0"
      />
    </div>
  )
}

  if (!page) return notFound()

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  )
}