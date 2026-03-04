"use client"

import { useEffect, useRef } from "react"

export default function Tet() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
if (!context) return

const ctx = context as CanvasRenderingContext2D

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const maiImg = new Image()
    maiImg.src = "/mai.png"

    const lixiImg = new Image()
    lixiImg.src = "/lixi.png"

    const items = Array.from({ length: 36 }).map(() => {
  const isLixi = Math.random() > 0.6 // tăng tỷ lệ lì xì (40%)

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    baseX: Math.random() * width,
    type: isLixi ? "lixi" : "mai",

    // 🌼 Hoa giữ nhỏ
    size: isLixi
      ? Math.random() * 12 + 16   // 🧧 lì xì nhỏ lại
      : Math.random() * 8 + 10,   // 🌼 hoa

    speedY: Math.random() * 1 + 0.8,
    angle: Math.random() * Math.PI * 2,
    rotation: Math.random() * 360,

    // lì xì đậm màu hơn chút
    opacity: isLixi
      ? Math.random() * 0.3 + 0.8
      : Math.random() * 0.4 + 0.6,
  }
})

    function draw() {
      ctx.clearRect(0, 0, width, height)

      items.forEach((item) => {
        ctx.save()

        // hiệu ứng lắc ngang dạng sóng
        item.x = item.baseX + Math.sin(item.angle) * 20
        item.angle += 0.02

        ctx.globalAlpha = item.opacity
        ctx.translate(item.x, item.y)
        ctx.rotate((item.rotation * Math.PI) / 180)

        ctx.shadowBlur = 6
        ctx.shadowColor = "rgba(255, 200, 0, 0.4)"

        const img = item.type === "mai" ? maiImg : lixiImg

        ctx.drawImage(
          img,
          -item.size / 2,
          -item.size / 2,
          item.size,
          item.size
        )

        ctx.restore()

        // update
        item.y += item.speedY
        item.rotation += item.type === "mai" ? 0.6 : 0.3

        if (item.y > height) {
          item.y = -40
          item.baseX = Math.random() * width
        }
      })

      requestAnimationFrame(draw)
    }

    let loaded = 0
    const checkLoaded = () => {
      loaded++
      if (loaded === 2) draw()
    }

    maiImg.onload = checkLoaded
    lixiImg.onload = checkLoaded

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
    />
  )
}