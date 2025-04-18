"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  className?: string
  duration?: number
  delay?: number
  formatter?: (value: number) => string
}

export function NumberTicker({
  value,
  className,
  duration = 1000,
  delay = 0,
  formatter = (value) => Math.round(value).toString(),
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const startAnimation = () => {
      setIsAnimating(true)

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        setDisplayValue(progress * value)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    const timer = setTimeout(startAnimation, delay)

    return () => {
      clearTimeout(timer)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, delay])

  return <span className={cn("", className)}>{formatter(displayValue)}</span>
}
