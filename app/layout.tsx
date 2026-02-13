import React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_Thai, Caveat } from "next/font/google"

import "./globals.css"
import { FloatingHearts } from "@/components/floating-hearts"
import { PageNav } from "@/components/page-nav"

const _notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-thai",
})
const _caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
})

export const metadata: Metadata = {
  title: "Happy Valentine's Day",
  description: "A love letter for you on Valentine's Day",
}

export const viewport: Viewport = {
  themeColor: "#d4607a",
  viewportFit: "cover",
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className="font-sans antialiased overflow-x-hidden">
        <FloatingHearts />
        <PageNav />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
