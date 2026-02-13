"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Heart,
  Mail,
  Camera,
  Sparkles,
  MessageCircleHeart,
  ArrowRight,
} from "lucide-react"

const pages = [
  {
    href: "/letter",
    icon: Mail,
    title: "จดหมายรัก",
    desc: "กดเปิดซองจดหมายเพื่ออ่านข้อความจากใจ",
    accent: "bg-primary/10 text-primary",
  },
  {
    href: "/gallery",
    icon: Camera,
    title: "ความทรงจำของเรา",
    desc: "แกลเลอรี่รูปภาพช่วงเวลาดี ๆ ที่มีกัน",
    accent: "bg-accent/15 text-accent-foreground",
  },
  {
    href: "/reasons",
    icon: Sparkles,
    title: "เหตุผลที่รักเบ๊บๆ",
    desc: "พลิกการ์ดเพื่ออ่านเหตุผลที่ซ่อนอยู่",
    accent: "bg-primary/10 text-primary",
  },
  {
    href: "/scratch",
    icon: Heart,
    title: "ข้อความลับ",
    desc: "ขูดเพื่อเปิดเผยข้อความสุดพิเศษ",
    accent: "bg-accent/15 text-accent-foreground",
  },
  {
    href: "/quiz",
    icon: MessageCircleHeart,
    title: "เบ๊บๆรู้จักเค้าดีแค่ไหน?",
    desc: "ตอบคำถามเกี่ยวกับเราสองคน",
    accent: "bg-primary/10 text-primary",
  },
]

export default function HomePage() {
  const [visible, setVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200)
    const t2 = setTimeout(() => setCardsVisible(true), 800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-4 sm:pt-20 sm:pb-8">
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative hearts */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <Heart
              className="text-primary/60 animate-pulse-soft"
              size={14}
              fill="currentColor"
            />
            <Heart
              className="text-primary animate-pulse-soft"
              size={24}
              fill="currentColor"
              style={{ animationDelay: "0.3s" }}
            />
            <Heart
              className="text-primary/60 animate-pulse-soft"
              size={14}
              fill="currentColor"
              style={{ animationDelay: "0.6s" }}
            />
          </div>

          <p className="text-muted-foreground text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-5 font-medium">
            {"14 February 2026"}
          </p>

          <h1 className="font-serif text-[3.2rem] sm:text-7xl md:text-8xl text-foreground leading-[1.05] mb-6 text-balance">
            Happy
            <br />
            <span className="text-primary">{"Valentine's"}</span>
            <br />
            Day
          </h1>

          <div className="w-16 h-[1.5px] bg-primary/30 mx-auto mb-6" />

          <p className="text-sm sm:text-base text-muted-foreground max-w-[280px] sm:max-w-sm mx-auto leading-relaxed">
            {"สำหรับคนพิเศษที่ทำให้ทุกวันเป็นวันแห่งความรัก"}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="px-5 pb-10 sm:px-6 sm:pb-16">
        <div className="max-w-md mx-auto">
          <p
            className={`text-center text-[11px] sm:text-xs text-muted-foreground/70 mb-6 transition-all duration-700 tracking-wide ${
              cardsVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {"~ กดเปิดดูแต่ละหน้าได้เลยนะ ~"}
          </p>

          <div className="flex flex-col gap-3">
            {pages.map((page, index) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`group relative bg-card/80 backdrop-blur-sm border border-border/70 rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:bg-card hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/20 active:scale-[0.98] ${
                    cardsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${page.accent} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-[15px] text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">
                        {page.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-1">
                        {page.desc}
                      </p>
                    </div>

                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border/60 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowRight
                        size={13}
                        className="text-muted-foreground/50 group-hover:text-primary-foreground transition-all duration-300"
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`pb-10 sm:pb-14 text-center transition-all duration-700 delay-[1000ms] ${
          cardsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="w-6 h-[1px] bg-border" />
          <Heart size={10} className="text-primary/40" fill="currentColor" />
          <div className="w-6 h-[1px] bg-border" />
        </div>
        <p className="font-serif text-sm text-muted-foreground/60">made with love</p>
      </div>
    </main>
  )
}
