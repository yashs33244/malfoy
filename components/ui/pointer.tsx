"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface PointerProps {
  className?: string
  size?: number
  color?: string
  ringColor?: string
  ringSize?: number
  duration?: number
}

export function Pointer({
  className,
  size = 12,
  color = "hsl(var(--primary))",
  ringColor = "rgba(120, 119, 198, 0.3)",
  ringSize = 40,
  duration = 1000,
}: PointerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const pointerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, duration)
    }, duration * 3)

    return () => clearInterval(interval)
  }, [duration])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <div
        ref={pointerRef}
        className="absolute rounded-full transition-opacity duration-500"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="absolute rounded-full transition-all"
        style={{
          width: isAnimating ? ringSize : size,
          height: isAnimating ? ringSize : size,
          backgroundColor: ringColor,
          opacity: isAnimating ? 1 : 0,
          transform: `translate(-${(ringSize - size) / 2}px, -${(ringSize - size) / 2}px)`,
          transition: `width ${duration}ms ease-out, height ${duration}ms ease-out, opacity ${duration}ms ease-out`,
        }}
      />
    </div>
  )
}
