"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  className?: string
  revealTime?: number
  delay?: number
}

export function TextReveal({ text, className, revealTime = 1000, delay = 0 }: TextRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsRevealed(true)
            }, delay)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <span ref={elementRef} className={cn("inline-block overflow-hidden", className)}>
      <span
        className={cn("inline-block transform transition-transform", isRevealed ? "translate-y-0" : "translate-y-full")}
        style={{ transitionDuration: `${revealTime}ms` }}
      >
        {text}
      </span>
    </span>
  )
}
