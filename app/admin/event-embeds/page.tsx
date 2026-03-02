'use client'

import { useAppState } from '@/hooks/useAppState'
import EventEmbedConfig from '@/components/admin/config/EventEmbedConfig'

export default function EventPage() {
  const {
    eventEmbed,
    setEventEmbed,
    saveEventEmbed,
  } = useAppState()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Nhúng Sự kiện</h1>

      <EventEmbedConfig
        config={eventEmbed}
        onUpdate={setEventEmbed}
      />

      <button
        onClick={saveEventEmbed}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Lưu cấu hình Sự kiện
      </button>
    </div>
  )
}