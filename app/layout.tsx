import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "MindMate | Digital Mental Health Support for Students",
  description:
    "A safe, accessible platform providing mental health support, resources, and professional connections for students. Chat with AI-Companion, book appointments, and access wellness resources.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
