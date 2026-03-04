"use client"

import { useEffect, useState } from "react"

export default function AdminTheme() {
  const [theme, setTheme] = useState<any>(null)

  useEffect(() => {
    fetch("/api/theme")
      .then(res => res.json())
      .then(setTheme)
  }, [])

  const updateTheme = async (data: any) => {
    const res = await fetch("/api/theme", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const updated = await res.json()
    setTheme(updated)
  }

  if (!theme) return <div>Loading...</div>

  return (
  <div style={{ padding: 40 }}>
    <h1>Quản lý Theme</h1>

    <div style={{ marginTop: 20 }}>
      <select
        value={theme.type}
        onChange={(e) =>
          updateTheme({ ...theme, type: e.target.value })
        }
      >
        <option value="none">Không hiệu ứng</option>
        <option value="snow">Snow</option>
        <option value="tet">Tết</option>
      </select>

      <label style={{ marginLeft: 20 }}>
        <input
          type="checkbox"
          checked={theme.enabled}
          onChange={(e) =>
            updateTheme({ ...theme, enabled: e.target.checked })
          }
        />
        Bật hiệu ứng
      </label>
    </div>

    {/* 🔥 THÊM PHẦN NÀY */}
    <div style={{ marginTop: 30 }}>
      <label>
        <input
          type="checkbox"
          checked={theme.adminEnabled ?? true}
          onChange={(e) =>
            updateTheme({ ...theme, adminEnabled: e.target.checked })
          }
        />
        Bật Admin
      </label>
    </div>
  </div>
)}