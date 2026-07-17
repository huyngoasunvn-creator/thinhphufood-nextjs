"use client";

import { useEffect, useRef } from "react";

type TetItem = {
  x: number;
  y: number;
  baseX: number;
  type: "lixi" | "mai";
  size: number;
  speedY: number;
  angle: number;
  angleSpeed: number;
  sway: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
};

const getItemCount = (width: number) => {
  if (width < 640) return 4;
  if (width < 1024) return 6;
  return 8;
};

const createItems = (width: number, height: number): TetItem[] =>
  Array.from({ length: getItemCount(width) }, () => {
    const isLixi = Math.random() > 0.92;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      type: isLixi ? "lixi" : "mai",
      size: isLixi ? Math.random() * 5 + 11 : Math.random() * 4 + 7,
      speedY: Math.random() * 0.28 + 0.22,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: Math.random() * 0.004 + 0.004,
      sway: isLixi ? Math.random() * 6 + 4 : Math.random() * 8 + 6,
      rotation: Math.random() * 360,
      rotationSpeed: isLixi ? Math.random() * 0.08 + 0.04 : Math.random() * 0.12 + 0.05,
      opacity: isLixi ? Math.random() * 0.08 + 0.16 : Math.random() * 0.1 + 0.1,
    };
  });

export default function Tet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context as CanvasRenderingContext2D;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let items = createItems(width, height);
    let animationFrameId = 0;

    const maiImg = new Image();
    maiImg.src = "/mai.png";

    const lixiImg = new Image();
    lixiImg.src = "/lixi.png";

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      items = createItems(width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      items.forEach((item) => {
        ctx.save();

        item.x = item.baseX + Math.sin(item.angle) * item.sway;
        item.angle += item.angleSpeed;

        ctx.globalAlpha = item.opacity;
        ctx.translate(item.x, item.y);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.shadowBlur = item.type === "lixi" ? 2 : 1;
        ctx.shadowColor =
          item.type === "lixi"
            ? "rgba(248, 113, 113, 0.18)"
            : "rgba(250, 204, 21, 0.14)";

        const image = item.type === "mai" ? maiImg : lixiImg;
        ctx.drawImage(image, -item.size / 2, -item.size / 2, item.size, item.size);
        ctx.restore();

        item.y += item.speedY;
        item.rotation += item.rotationSpeed;

        if (item.y > height + 30) {
          item.y = -30;
          item.baseX = Math.random() * width;
        }
      });

      animationFrameId = window.requestAnimationFrame(draw);
    };

    let loaded = 0;
    const startIfReady = () => {
      loaded += 1;
      if (loaded === 2) {
        resizeCanvas();
        draw();
      }
    };

    maiImg.onload = startIfReady;
    lixiImg.onload = startIfReady;

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      maiImg.onload = null;
      lixiImg.onload = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full max-w-full opacity-35"
    />
  );
}
