"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Star, Sparkles, Sun, Coffee, Music } from "lucide-react"

const reasons = [
  {
    icon: Heart,
    title: "รอยยิ้มของเบ๊บๆ",
    front: "กดเพื่ออ่าน",
    back: "เค้าน่ะชอบตอนเบ๊บๆยิ้มมากๆเยย",
  },
  {
    icon: Star,
    title: "ความเข้าใจ",
    front: "กดเพื่ออ่าน",
    back: "เวลาเค้ามะโอเค เบ๊บๆจะคอยโอ๋เค้าตลอดเยย",
  },
  {
    icon: Sparkles,
    title: "เสียงหัวเราะ",
    front: "กดเพื่ออ่าน",
    back: "หัวเราะทีลักยิ้มขึ้นที",
  },
  {
    icon: Sun,
    title: "ความอบอุ่น",
    front: "กดเพื่ออ่าน",
    back: "ชอบกอดเบ๊บๆคับ กอดแล้วหายเหนื่อยเยย",
  },
  {
    icon: Coffee,
    title: "ช่วงเวลาเล็ก ๆ",
    front: "กดเพื่ออ่าน",
    back: "ชอบทุกช่วงที่ได้อยู่กับเบ๊บๆ",
  },
  {
    icon: Music,
    title: "จังหวะหัวใจ",
    front: "กดเพื่ออ่าน",
    back: "รักเบ๊บๆตะเม๋ออออ",
  },
]

export function ReasonsSection() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.15 }
      )
      observer.observe(ref)
      return observer
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <section className="px-5 py-10 sm:px-6 sm:py-16 max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="text-primary" size={22} />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 text-balance">
          {"เหตุผลที่รักเบ๊บๆ"}
        </h2>
        <p className="text-muted-foreground font-sans text-xs sm:text-sm font-light">
          {"กดการ์ดแต่ละใบเพื่ออ่านเหตุผล"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {reasons.map((reason, index) => {
          const Icon = reason.icon
          const isFlipped = flipped.has(index)
          return (
            <div
              key={reason.title}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`transition-all duration-700 ease-out ${visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
              style={{
                transitionDelay: `${index * 80}ms`,
                perspective: "800px",
              }}
            >
              <button
                type="button"
                onClick={() => toggleFlip(index)}
                className="relative w-full h-36 sm:h-44 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                aria-label={isFlipped ? "ปิดการ์ด" : `เปิดอ่าน: ${reason.title}`}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-secondary flex items-center justify-center mb-2.5">
                    <Icon size={16} className="text-primary sm:[&]:w-[18px] sm:[&]:h-[18px]" />
                  </div>
                  <h3 className="font-sans font-semibold text-xs sm:text-sm text-foreground mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-[9px] sm:text-[10px] font-light">
                    {reason.front}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-primary rounded-xl p-4 flex flex-col items-center justify-center text-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Icon size={14} className="text-primary-foreground mb-2 opacity-50" />
                  <p className="text-primary-foreground font-sans text-[10px] sm:text-xs leading-relaxed font-light">
                    {reason.back}
                  </p>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <p className="text-center text-muted-foreground font-sans text-[10px] mt-5 font-light">
        {"กดการ์ดอีกครั้งเพื่อพลิกกลับ"}
      </p>
    </section>
  )
}
