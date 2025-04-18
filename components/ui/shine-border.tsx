"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  borderRadius?: number
  speed?: number
  intensity?: number
  color?: string
}

export function ShineBorder({
  children,
  className,
  borderWidth = 1,
  borderRadius = 8,
  speed = 1,
  intensity = 0.2,
  color = "rgba(255, 255, 255, 0.5)",
}: ShineBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

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
      setOpacity(intensity)
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
  }, [intensity])

  return (
    <div
      ref={containerRef}
      className={cn("relative rounded-lg p-[1px] overflow-hidden", className)}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${color} 0%, transparent 70%)`,
          opacity: opacity,
          transition: `opacity ${speed * 0.3}s ease-out`,
        }}
      />
      <div
        className="relative z-10 rounded-[calc(theme(borderRadius.lg)-1px)]"
        style={{ borderRadius: `${borderRadius - borderWidth}px` }}
      >
        {children}
      </div>
    </div>
  )
}
