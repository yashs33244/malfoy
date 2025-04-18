"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface InteractiveGridPatternProps {
  className?: string
  containerClassName?: string
  dotClassName?: string
  dotSize?: number
  dotSpacing?: number
  dotColor?: string
  hoverColor?: string
  size?: number
  speed?: number
}

export function InteractiveGridPattern({
  className,
  containerClassName,
  dotClassName,
  dotSize = 2,
  dotSpacing = 30,
  dotColor = "rgba(255, 255, 255, 0.3)",
  hoverColor = "rgba(255, 255, 255, 0.8)",
  size = 100,
  speed = 0.15,
}: InteractiveGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dots, setDots] = useState<{ x: number; y: number; opacity: number }[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const cols = Math.floor(width / dotSpacing) + 1
    const rows = Math.floor(height / dotSpacing) + 1

    const newDots = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        newDots.push({
          x: i * dotSpacing,
          y: j * dotSpacing,
          opacity: 0.3,
        })
      }
    }
    setDots(newDots)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [dotSpacing])

  useEffect(() => {
    if (!dots.length) return

    const updateDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => {
          const distance = Math.sqrt(Math.pow(dot.x - mousePosition.x, 2) + Math.pow(dot.y - mousePosition.y, 2))
          const maxDistance = size
          let opacity = 0.3

          if (distance < maxDistance) {
            opacity = 0.3 + (1 - distance / maxDistance) * 0.7
          }

          return {
            ...dot,
            opacity: dot.opacity + (opacity - dot.opacity) * speed,
          }
        }),
      )
    }

    const intervalId = setInterval(updateDots, 16)
    return () => clearInterval(intervalId)
  }, [dots, mousePosition, size, speed])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
      <div className={cn("absolute inset-0", className)}>
        {dots.map((dot, index) => (
          <div
            key={index}
            className={cn("absolute rounded-full", dotClassName)}
            style={{
              width: dotSize,
              height: dotSize,
              left: dot.x,
              top: dot.y,
              backgroundColor: dotColor,
              opacity: dot.opacity,
              transition: "opacity 0.1s ease-out",
            }}
          />
        ))}
      </div>
    </div>
  )
}
