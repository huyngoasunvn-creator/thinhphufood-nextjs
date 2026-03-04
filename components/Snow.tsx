"use client"

import { useEffect, useRef } from "react"

export default function Snow() {
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

    const snowflakes = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 0.5 - 0.25, // gió nhẹ ngang
    }))

    function draw() {
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = "rgba(255,255,255,0.9)"
  ctx.beginPath()

  snowflakes.forEach((flake) => {
    ctx.moveTo(flake.x, flake.y)
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
  })

  ctx.fill()
  update()
}

    function update() {
      snowflakes.forEach((flake) => {
        flake.y += flake.speedY
        flake.x += flake.speedX

        // reset khi rơi xuống
        if (flake.y > height) {
          flake.y = -5
          flake.x = Math.random() * width
        }

        // reset nếu bay ngang ra ngoài
        if (flake.x > width) flake.x = 0
        if (flake.x < 0) flake.x = width
      })
    }

    let animationFrameId: number

    function animate() {
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}