'use client'

import { useEventEmbed } from '@/hooks/useEventEmbed'

export default function EventPage() {
  const { eventEmbed } = useEventEmbed()

  if (!eventEmbed?.isActive) {
    return null
  }

  return (
    <div className="w-full h-screen">

      <iframe
        src={eventEmbed.externalUrl}
        className="w-full h-full border-0"
      />

    </div>
  )
}