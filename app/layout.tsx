import type React from "react"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothCursor } from "@/components/ui/smooth-cursor"

// Import Kanit font with all specified weights
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PriceIQ - Price Smarter. Profit Faster.",
  description: "Advanced pricing intelligence platform for competitive market analysis and dynamic pricing strategies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${kanit.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SmoothCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
