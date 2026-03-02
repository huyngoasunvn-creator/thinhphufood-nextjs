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

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  return (
    <>
      {events.map(event => (
        <Link
          key={event._id}
          href={`/event/${event.slug}`}
          className="text-sm font-bold text-slate-600 hover:text-green-600"
        >
          {event.title}
        </Link>
      ))}
    </>
  )
}