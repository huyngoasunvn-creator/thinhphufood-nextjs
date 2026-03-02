'use client'

import { useEffect, useState } from 'react'

export interface EventEmbedConfig {
  title: string
  slug: string
  externalUrl: string
  showOnHeader: boolean
  isActive: boolean
  order: number
}

// 🔥 Tạo slug tự động
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export const useEventEmbed = () => {
  const [eventEmbed, setEventEmbed] = useState<EventEmbedConfig>({
    title: 'Sự kiện',
    slug: 'su-kien',
    externalUrl: '',
    showOnHeader: true,
    isActive: true,
    order: 0,
  })

  // ✅ Load từ DB khi vào trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/event-embeds')
        if (!res.ok) return

        const data = await res.json()
        if (data) setEventEmbed(data)
      } catch (err) {
        console.error('Load event embed error:', err)
      }
    }

    fetchData()
  }, [])

  // ✅ Update field an toàn
  const updateEventEmbed = (data: Partial<EventEmbedConfig>) => {
    setEventEmbed((prev) => {
      const updated = { ...prev, ...data }

      // Nếu đổi title → tự cập nhật slug
      if (data.title) {
        updated.slug = generateSlug(data.title)
      }

      return updated
    })
  }

  // ✅ Save xuống MongoDB
  const saveEventEmbed = async () => {
    try {
      const res = await fetch('/api/admin/event-embeds', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(eventEmbed),
})

      if (!res.ok) throw new Error('Save failed')

      const savedData = await res.json()
      setEventEmbed(savedData)

      alert('Đã lưu cấu hình Nhúng Sự kiện!')
    } catch (err) {
      console.error('Save event embed error:', err)
      alert('Lưu thất bại!')
    }
  }

  return {
    eventEmbed,
    setEventEmbed: updateEventEmbed,
    saveEventEmbed,
  }
}