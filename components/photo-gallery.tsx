"use client"

import React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { Camera, ChevronLeft, ChevronRight, Heart, X } from "lucide-react"
import Image from "next/image"

const photos = [
  { src: "/gallery/photo-6.jpg", caption: "รักเบ๊บๆคับ" },
  { src: "/gallery/photo-2.jpg", caption: "รักเบ๊บๆมากๆ" },
  { src: "/gallery/photo-3.jpg", caption: "รักโอที่สุดดดด" },
  { src: "/gallery/photo-4.jpg", caption: "รักโอตลอดปายยยย" },
  { src: "/gallery/photo-5.jpg", caption: "จะอยู่กับโอคับ" },
  { src: "/gallery/photo-1.jpg", caption: "จะอยู่ซื้อดอกไม้ไปให้เรื่อยๆเยย" },
]

export function PhotoGallery(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const goNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % photos.length)
  }, [selectedIndex])

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
  }, [selectedIndex])

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedIndex, goNext, goPrev])

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedIndex])

  return (
    <section ref={ref} className="px-5 py-10 sm:px-6 sm:py-16 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Camera className="text-accent" size={22} />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 text-balance">
          {"ความทรงจำของเรา"}
        </h2>
        <p className="text-muted-foreground font-sans text-xs sm:text-sm font-light">
          {"กดที่รูปเพื่อดูเต็ม ๆ"}
        </p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedIndex(index) }}
            className={`group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-lg active:scale-[0.97] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.caption}
              fill
              priority={index < 2}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-foreground/50 to-transparent">
              <p className="text-primary-foreground font-sans text-[10px] sm:text-xs text-left leading-snug font-light">
                {photo.caption}
              </p>
            </div>

            {/* Like button */}
            <button
              type="button"
              onClick={(e) => toggleLike(index, e)}
              className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={liked.has(index) ? "เอาหัวใจออก" : "กดหัวใจ"}
            >
              <Heart
                size={13}
                className={liked.has(index) ? "text-primary" : "text-muted-foreground"}
                fill={liked.has(index) ? "hsl(346, 55%, 52%)" : "none"}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/90 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="ดูรูปภาพ"
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/25 transition-colors z-10"
            aria-label="ปิด"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/25 transition-colors z-10"
            aria-label="รูปก่อนหน้า"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/25 transition-colors z-10"
            aria-label="รูปถัดไป"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedIndex].src || "/placeholder.svg"}
              alt={photos[selectedIndex].caption}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-foreground/70 to-transparent">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-primary-foreground font-sans text-sm sm:text-base leading-snug">
                    {photos[selectedIndex].caption}
                  </p>
                  <p className="text-primary-foreground/50 font-sans text-[10px] sm:text-xs mt-1 tabular-nums">
                    {selectedIndex + 1} / {photos.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedIndex, e)}
                  className="w-9 h-9 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shrink-0"
                  aria-label="กดหัวใจ"
                >
                  <Heart
                    size={16}
                    className={liked.has(selectedIndex) ? "text-primary" : "text-primary-foreground"}
                    fill={liked.has(selectedIndex) ? "hsl(346, 55%, 52%)" : "none"}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
