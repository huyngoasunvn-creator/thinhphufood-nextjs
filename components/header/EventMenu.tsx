'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

interface Event {
  _id: string
  title: string
  slug: string
}

export default function EventMenu() {

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadEvents() {
      try {

        const res = await fetch("/api/events")

        if (!res.ok) return

        const data = await res.json()

        if (Array.isArray(data)) {
          setEvents(data)
        }

      } catch (err) {
        console.error("Load events failed", err)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()

  }, [])

  if (loading || events.length === 0) return null

  return (
    <>
      {events.map(event => (
        <Link
          key={event._id}
          href={`/${event.slug}`}
          className="text-sm font-bold text-slate-600 hover:text-green-600"
        >
          {event.title}
        </Link>
      ))}
    </>
  )
}