'use client'

interface EventEmbedConfigProps {
  config: {
    title: string
    externalUrl: string
    isActive: boolean
  }
  onUpdate: (data: {
    title: string
    externalUrl: string
    isActive: boolean
  }) => void
}

export default function EventEmbedConfig({
  config,
  onUpdate,
}: EventEmbedConfigProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">
      <h2 className="text-lg font-semibold mb-4">
        Cấu hình Trang Sự kiện (Nhúng)
      </h2>

      {/* Tiêu đề menu */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          TIÊU ĐỀ HIỂN THỊ (MENU)
        </label>
        <input
          type="text"
          value={config?.title || ''}
          onChange={(e) =>
            onUpdate({
              ...config,
              title: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* External URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          ĐƯỜNG DẪN NHÚNG (EXTERNAL URL)
        </label>
        <input
          type="text"
          value={config?.externalUrl || ''}
          onChange={(e) =>
            onUpdate({
              ...config,
              externalUrl: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Trạng thái */}
      <div className="mb-6 flex items-center justify-between bg-gray-50 p-4 rounded-xl">
        <span className="font-medium">Kích hoạt trang Sự kiện</span>
        <input
          type="checkbox"
          checked={config?.isActive || false}
          onChange={(e) =>
            onUpdate({
              ...config,
              isActive: e.target.checked,
            })
          }
          className="w-5 h-5"
        />
      </div>
    </div>
  )
}