"use client";

import { useEffect, useRef } from "react";

type Snowflake = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
};

const getSnowflakeCount = (width: number) => {
  if (width < 640) return 24;
  if (width < 1024) return 40;
  return 60;
};

const createSnowflakes = (width: number, height: number): Snowflake[] =>
  Array.from({ length: getSnowflakeCount(width) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.6,
    speedY: Math.random() * 0.8 + 0.35,
    speedX: Math.random() * 0.3 - 0.15,
    opacity: Math.random() * 0.28 + 0.12,
  }));

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context as CanvasRenderingContext2D;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let snowflakes = createSnowflakes(width, height);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      snowflakes = createSnowflakes(width, height);
    };

    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const update = () => {
      snowflakes.forEach((flake) => {
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        if (flake.y > height + 6) {
          flake.y = -6;
          flake.x = Math.random() * width;
        }

        if (flake.x > width + 6) flake.x = -6;
        if (flake.x < -6) flake.x = width + 6;
      });
    };

    let animationFrameId = 0;

    const animate = () => {
      draw();
      update();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9] h-full w-full max-w-full opacity-60"
    />
  );
}
