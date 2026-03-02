import { slugify } from "@/lib/utils/slugify"
import EmbeddedPage from "@/models/EmbeddedPage"

export async function POST(req: Request) {
  const body = await req.json()

  const slug = slugify(body.title)

  const page = await EmbeddedPage.create({
    title: body.title,
    slug,
    externalUrl: body.externalUrl,
    showOnHeader: body.showOnHeader,
    isActive: body.isActive,
    order: body.order
  })

  return Response.json(page)
}