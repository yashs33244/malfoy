"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  href?: string
}

export function RainbowButton({ children, className, href, ...props }: RainbowButtonProps) {
  const buttonClasses = cn(
    "relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
    className,
  )

  const innerClasses = cn(
    "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[calc(theme(borderRadius.md)-1px)] bg-slate-900 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl",
  )

  const gradientClasses = cn(
    "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]",
  )

  const Component = href ? "a" : "button"

  return (
    <Component href={href} className={buttonClasses} {...props}>
      <span className={gradientClasses} />
      <span className={innerClasses}>{children}</span>
    </Component>
  )
}
