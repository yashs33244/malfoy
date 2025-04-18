"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GlowingEffectProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  glowIntensity?: number
  glowDuration?: number
}

export function GlowingEffect({
  children,
  className,
  glowColor = "rgba(120, 119, 198, 0.5)",
  glowSize = 300,
  glowIntensity = 0.6,
  glowDuration = 1000,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setPosition({ x, y })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      setOpacity(glowIntensity)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setOpacity(0)
    }

    const element = containerRef.current
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [glowIntensity])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${position.x - glowSize / 2}px`,
          top: `${position.y - glowSize / 2}px`,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          opacity: opacity,
          transition: `opacity ${glowDuration}ms ease-out`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
