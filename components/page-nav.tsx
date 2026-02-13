"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Mail, Camera, Sparkles, Heart, MessageCircleHeart, ChevronLeft, ChevronRight } from "lucide-react"

const routes = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/letter", icon: Mail, label: "จดหมายรัก" },
  { href: "/gallery", icon: Camera, label: "ความทรงจำ" },
  { href: "/reasons", icon: Sparkles, label: "เหตุผลที่รัก" },
  { href: "/scratch", icon: Heart, label: "ข้อความลับ" },
  { href: "/quiz", icon: MessageCircleHeart, label: "ควิซ" },
]

export function PageNav() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const currentIndex = routes.findIndex((r) => r.href === pathname)
  const prevPage = currentIndex > 0 ? routes[currentIndex - 1] : null
  const nextPage = currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null
  const currentRoute = routes[currentIndex]

  return (
    <>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-12 sm:h-14">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            aria-label="Back to home"
          >
            <ChevronLeft size={16} />
            <Home size={13} />
          </Link>

          <span className="text-xs sm:text-sm text-foreground font-medium">
            {currentRoute?.label}
          </span>

          <span className="text-[10px] sm:text-xs text-muted-foreground/60 tabular-nums">
            {currentIndex} / {routes.length - 1}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[1.5px] bg-border/50">
          <div
            className="h-full bg-primary/70 transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / (routes.length - 1)) * 100}%` }}
          />
        </div>
      </nav>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/40 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-12 sm:h-14">
          {prevPage ? (
            <Link
              href={prevPage.href}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            >
              <ChevronLeft size={14} />
              <span className="text-xs sm:text-sm">{prevPage.label}</span>
            </Link>
          ) : (
            <div />
          )}

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {routes.slice(1).map((route, i) => (
              <Link
                key={route.href}
                href={route.href}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === i + 1
                    ? "w-5 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground/30"
                }`}
                aria-label={route.label}
              />
            ))}
          </div>

          {nextPage ? (
            <Link
              href={nextPage.href}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            >
              <span className="text-xs sm:text-sm">{nextPage.label}</span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors active:scale-95"
            >
              <span className="text-xs sm:text-sm font-medium">{"กลับหน้าหลัก"}</span>
              <Home size={12} />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
