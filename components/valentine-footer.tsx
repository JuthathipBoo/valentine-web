"use client"

import { Heart } from "lucide-react"

export function ValentineFooter() {
  return (
    <footer className="py-10 sm:py-14 text-center px-6">
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <div className="w-8 h-[1px] bg-border" />
        <Heart size={10} className="text-primary/30" fill="currentColor" />
        <div className="w-8 h-[1px] bg-border" />
      </div>
      <p className="font-serif text-base text-muted-foreground/50 mb-1">
        {"Made with love"}
      </p>
      <p className="text-muted-foreground/40 text-[10px] tracking-wider uppercase">
        {"Happy Valentine's Day 2026"}
      </p>
    </footer>
  )
}
