"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Mail } from "lucide-react"

const letterParagraphs = [
  "Happy Valentine ในปีแรกของเรานะคะ ดีใจนะคับที่อยู่ด้วยกันมาอีกเดือนแล้ว",
  "เบ๊บๆยังคอยดูแลเค้าเสมอเยย ถึงเค้าจะดื้อไปหน่อย แต่เบ๊บๆก็ยังโอ๋ๆตลอด",
  "ขอบคุณทุกอย่างที่ทำให้นะคับ เค้าอยู่ข้างๆเบ๊บๆเสมอ",
]

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [revealedParagraphs, setRevealedParagraphs] = useState<Set<number>>(new Set())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen) {
      letterParagraphs.forEach((_, index) => {
        setTimeout(() => {
          setRevealedParagraphs((prev) => new Set([...prev, index]))
        }, 500 * (index + 1))
      })
    } else {
      setRevealedParagraphs(new Set())
    }
  }, [isOpen])

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center px-5 py-8 sm:px-6 sm:py-14"
    >
      <div
        className={`w-full max-w-sm transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary" size={20} />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-2">
            {"จดหมายรัก"}
          </h2>
          <p className="text-muted-foreground text-[11px] sm:text-xs">
            {"กดซองจดหมายเพื่อเปิดอ่าน"}
          </p>
        </div>

        {/* Envelope button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full transition-all duration-500 cursor-pointer ${
            isOpen ? "scale-[0.97] opacity-40" : "hover:scale-[1.01] active:scale-[0.99]"
          }`}
          aria-label={isOpen ? "ปิดจดหมาย" : "เปิดจดหมาย"}
        >
          <div className="bg-card border border-border/70 rounded-2xl px-5 py-5 sm:px-7 sm:py-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="flex items-center justify-center gap-2">
              <Heart size={12} className="text-primary" fill="currentColor" />
              <span className="text-sm sm:text-[15px] text-foreground font-medium">
                {"ถึงคนที่รักที่สุด"}
              </span>
              <Heart size={12} className="text-primary" fill="currentColor" />
            </div>
            <p className="text-muted-foreground/60 text-[10px] mt-1.5">
              {isOpen ? "กดเพื่อปิด" : "กดเพื่อเปิดอ่าน"}
            </p>
          </div>
        </button>

        {/* Letter */}
        <div
          className={`transition-all duration-700 ease-out overflow-hidden ${
            isOpen ? "max-h-[700px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-card border border-border/70 rounded-2xl p-5 sm:p-7 shadow-sm relative">
            <Heart
              size={10}
              className="absolute top-4 right-4 text-primary/15"
              fill="currentColor"
            />

            <div className="space-y-4 text-foreground leading-relaxed text-[13px] sm:text-sm">
              {/* Greeting */}
              <p
                className={`font-serif text-xl sm:text-2xl text-primary transition-all duration-700 ease-out ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {"ถึงเบ๊บๆของเค้า,"}
              </p>

              {letterParagraphs.map((paragraph, index) => (
                <p
                  key={`p-${index}`}
                  className={`transition-all duration-700 ease-out ${
                    revealedParagraphs.has(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <p
                className={`font-serif text-lg sm:text-xl text-primary pt-3 transition-all duration-700 ease-out ${
                  revealedParagraphs.has(letterParagraphs.length - 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${letterParagraphs.length * 500}ms` }}
              >
                {"รักเบ๊บๆเสมอ,"}
                <br />
                <span className="text-foreground text-[13px] sm:text-sm font-sans">
                  {"จากคนที่เบ๊บๆรักที่สุด"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
