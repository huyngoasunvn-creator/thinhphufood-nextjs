'use client';

import EventEmbedConfig from '@/components/admin/config/EventEmbedConfig';
import { useEventEmbed } from '@/hooks/useEventEmbed';

export default function EventPage() {
  const { eventEmbed, setEventEmbed, saveEventEmbed } = useEventEmbed();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Nhung Su Kien</h1>

      <EventEmbedConfig config={eventEmbed} onUpdate={setEventEmbed} />

      <button
        onClick={saveEventEmbed}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Luu cau hinh Su kien
      </button>
    </div>
  );
}
