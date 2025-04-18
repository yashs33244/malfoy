"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface TextShimmerProps {
  children: React.ReactNode
  className?: string
}

export function TextShimmer({ children, className }: TextShimmerProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  )
}
