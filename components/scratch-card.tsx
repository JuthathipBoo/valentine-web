"use client"

import React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Heart, Sparkles } from "lucide-react"

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "hsl(346, 55%, 52%)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalAlpha = 0.12
    const heartCount = canvas.width < 300 ? 12 : 24
    for (let i = 0; i < heartCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.font = `${Math.random() * 12 + 8}px serif`
      ctx.fillStyle = "#fff"
      ctx.fillText("\u2764", x, y)
    }
    ctx.globalAlpha = 1

    ctx.fillStyle = "#fff"
    const fontSize = canvas.width < 300 ? 13 : 16
    ctx.font = `500 ${fontSize}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(
      "\u0E02\u0E39\u0E14\u0E15\u0E23\u0E07\u0E19\u0E35\u0E49\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E25\u0E31\u0E1A",
      canvas.width / 2,
      canvas.height / 2
    )
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(initCanvas, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, initCanvas])

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const cx = x - rect.left
    const cy = y - rect.top

    const radius = canvas.width < 300 ? 22 : 28
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++
    }
    const percent = cleared / (imageData.data.length / 4)
    if (percent > 0.45) {
      setIsRevealed(true)
    }
  }

  const handleMouseDown = () => setIsDrawing(true)
  const handleMouseUp = () => setIsDrawing(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) scratch(e.clientX, e.clientY)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    scratch(touch.clientX, touch.clientY)
  }

  const handleReset = () => {
    setIsRevealed(false)
    initCanvas()
  }

  return (
    <section ref={sectionRef} className="px-5 py-10 sm:px-6 sm:py-16 max-w-md mx-auto">
      <div
        className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="text-accent" size={22} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 text-balance">
            {"ข้อความลับ"}
          </h2>
          <p className="text-muted-foreground font-sans text-xs sm:text-sm font-light">
            {"ใช้นิ้วขูดเพื่อเปิดข้อความลับ"}
          </p>
        </div>

        {/* Scratch area */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-sm select-none touch-none"
        >
          {/* Hidden message */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-5 text-center">
            <Sparkles size={24} className="text-primary mb-3 opacity-50" />
            <p className="font-serif text-2xl sm:text-3xl text-primary mb-2 text-balance">
              {"เบ๊บๆคือคนที่ดีที่สุด"}
            </p>
            <p className="font-sans text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-[240px] font-light">
              {"ดีใจที่เราได้มาเจอกันนะคับ เค้าจะตั้งใจรักเบ๊บๆเหมือนที่เบ๊บๆตั้งใจรักเค้านะคะ"}
            </p>
            <p className="font-serif text-base sm:text-lg text-primary mt-3">{"I love you 3000"}</p>
          </div>

          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 cursor-grab active:cursor-grabbing transition-opacity duration-700 ${isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
          />
        </div>

        {isRevealed && (
          <div className="text-center mt-5">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-sans text-xs hover:bg-secondary/80 active:scale-95 transition-all font-medium"
            >
              <Sparkles size={13} />
              {"ขูดอีกครั้ง"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
