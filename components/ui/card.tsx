"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  gradientClassName?: string
  borderRadius?: number
  glowAmount?: number
  glowColor?: string
  hoverEffect?: boolean
}

export function GradientCard({
  children,
  className,
  gradientClassName,
  borderRadius = 8,
  glowAmount = 15,
  glowColor = "rgba(120, 119, 198, 0.3)",
  hoverEffect = true,
  ...props
}: GradientCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !hoverEffect) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setPosition({ x, y })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
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
  }, [hoverEffect])

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${position.x * 100}% ${
      position.y * 100
    }%, var(--gradient-start, hsl(var(--primary))), var(--gradient-end, hsl(var(--secondary))))`,
    borderRadius: `${borderRadius}px`,
    boxShadow: isHovered ? `0 0 ${glowAmount}px ${glowColor}` : "none",
    transition: "box-shadow 0.3s ease-out",
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-card text-card-foreground",
        hoverEffect && "transition-shadow duration-300",
        className,
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-20",
          isHovered && hoverEffect ? "opacity-30" : "opacity-20",
          "transition-opacity duration-300",
          gradientClassName,
        )}
        style={gradientStyle}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
