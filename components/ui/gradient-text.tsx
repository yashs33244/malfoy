"use client"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  text: string
  className?: string
  from?: string
  to?: string
  animate?: boolean
}

export function GradientText({
  text,
  className,
  from = "#1a365d",
  to = "#00b8d4",
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        animate && "animate-text-gradient bg-[length:200%]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to}, ${from})`,
      }}
    >
      {text}
    </span>
  )
}
