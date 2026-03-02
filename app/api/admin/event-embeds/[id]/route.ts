import EventEmbed from "@/models/EventEmbed"

interface RouteProps {
  params: {
    id: string
  }
}

export async function PUT(
  req: Request,
  { params }: RouteProps
) {
  const body = await req.json()

  const updated = await EventEmbed.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  )

  return Response.json(updated)
}

interface RouteProps {
  params: {
    id: string
  }
}
  export async function DELETE(
  req: Request,
  { params }: RouteProps
) {
  await EventEmbed.findByIdAndDelete(params.id)
  return Response.json({ success: true })
}