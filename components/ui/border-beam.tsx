"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  children: React.ReactNode
  className?: string
  beamColor?: string
  beamSize?: number
  beamDuration?: number
  borderWidth?: number
}

export function BorderBeam({
  children,
  className,
  beamColor = "rgba(120, 119, 198, 0.8)",
  beamSize = 100,
  beamDuration = 2000,
  borderWidth = 1,
}: BorderBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !isHovered) return

    const container = containerRef.current
    const perimeter = 2 * (container.offsetWidth + container.offsetHeight)

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % beamDuration) / beamDuration
      setPosition(progress * perimeter)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isHovered, beamDuration])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const getBeamPosition = (position: number) => {
    if (!containerRef.current) return { x: 0, y: 0 }

    const container = containerRef.current
    const width = container.offsetWidth
    const height = container.offsetHeight
    const perimeter = 2 * (width + height)

    const normalizedPosition = position % perimeter

    if (normalizedPosition < width) {
      // Top edge
      return { x: normalizedPosition, y: 0 }
    } else if (normalizedPosition < width + height) {
      // Right edge
      return { x: width, y: normalizedPosition - width }
    } else if (normalizedPosition < 2 * width + height) {
      // Bottom edge
      return { x: width - (normalizedPosition - (width + height)), y: height }
    } else {
      // Left edge
      return { x: 0, y: height - (normalizedPosition - (2 * width + height)) }
    }
  }

  const beamPosition = getBeamPosition(position)

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${beamPosition.x - beamSize / 2}px`,
          top: `${beamPosition.y - beamSize / 2}px`,
          width: `${beamSize}px`,
          height: `${beamSize}px`,
          background: `radial-gradient(circle at center, ${beamColor} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `${borderWidth}px solid transparent`,
          borderRadius: "inherit",
          backgroundClip: "padding-box",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
