"use client"

import { useEffect, useState } from "react"

interface HeartData {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartData[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    const count = isMobile ? 6 : 10
    const generated: HeartData[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: isMobile ? Math.random() * 8 + 6 : Math.random() * 10 + 8,
      delay: Math.random() * 12,
      duration: Math.random() * 6 + 8,
      opacity: Math.random() * 0.08 + 0.03,
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: "-10%",
            animation: `float-up ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="hsl(348, 62%, 48%)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
