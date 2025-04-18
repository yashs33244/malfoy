"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GlobeProps {
  className?: string
  dotColor?: string
  glowColor?: string
  backgroundColor?: string
  size?: number
  dotSize?: number
  dotCount?: number
  speed?: number
}

export function Globe({
  className,
  dotColor = "#ffffff",
  glowColor = "rgba(255, 255, 255, 0.5)",
  backgroundColor = "transparent",
  size = 400,
  dotSize = 2,
  dotCount = 50,
  speed = 0.005,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Create dots
    const dots: { x: number; y: number; z: number; radius: number }[] = []
    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = (size / 2) * 0.8 // 80% of the globe radius

      dots.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        radius: dotSize * (Math.random() * 0.5 + 0.5), // Random size between 50% and 100% of dotSize
      })
    }

    let rotation = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Draw globe
      const centerX = size / 2
      const centerY = size / 2

      // Sort dots by z-index for proper rendering
      const sortedDots = [...dots].sort((a, b) => a.z - b.z)

      // Draw dots
      sortedDots.forEach((dot) => {
        // Rotate around Y axis
        const cosRotation = Math.cos(rotation)
        const sinRotation = Math.sin(rotation)
        const x = dot.x * cosRotation - dot.z * sinRotation
        const z = dot.z * cosRotation + dot.x * sinRotation

        // Project 3D to 2D
        const scale = size / 2 / (size / 2 - z)
        const projectedX = centerX + x * scale
        const projectedY = centerY + dot.y * scale

        // Draw dot
        ctx.beginPath()
        ctx.arc(projectedX, projectedY, dot.radius * scale, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()

        // Draw glow
        const gradient = ctx.createRadialGradient(
          projectedX,
          projectedY,
          0,
          projectedX,
          projectedY,
          dot.radius * scale * 3,
        )
        gradient.addColorStop(0, glowColor)
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(projectedX, projectedY, dot.radius * scale * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Update rotation
      rotation += speed

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size, dotSize, dotCount, dotColor, glowColor, backgroundColor, speed])

  return <canvas ref={canvasRef} className={cn("", className)} style={{ width: size, height: size }} />
}
