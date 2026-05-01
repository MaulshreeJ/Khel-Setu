import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "KhelSetu - AI-Powered Sports Assessment Platform",
  description:
    "Empowering Indian athletes with comprehensive fitness assessments, performance analytics, and world-class sports science tools.",
  generator: "v0.app",
  keywords: "sports, fitness, assessment, India, athletes, performance, analytics, AI",
  authors: [{ name: "KhelSetu Team" }],
  openGraph: {
    title: "KhelSetu - AI-Powered Sports Assessment Platform",
    description: "Empowering Indian athletes with comprehensive fitness assessments and performance analytics.",
    type: "website",
    locale: "en_IN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
