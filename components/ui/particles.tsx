"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface ParticlesProps {
  className?: string
  quantity?: number
  ease?: number
  color?: string
  refresh?: boolean
}

export const Particles = ({
  className = "",
  quantity = 30,
  ease = 50,
  color = "#ffffff",
  refresh = false,
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<any[]>([])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMouseOver, setIsMouseOver] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      setContext(ctx)
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!context || !canvasRef.current) return

    const createParticles = () => {
      const particles = []
      for (let i = 0; i < quantity; i++) {
        const x = Math.random() * canvasRef.current!.width
        const y = Math.random() * canvasRef.current!.height
        const size = Math.random() * 2 + 1
        const vx = (Math.random() - 0.5) * 0.5
        const vy = (Math.random() - 0.5) * 0.5
        particles.push({ x, y, size, vx, vy })
      }
      return particles
    }

    setParticles(createParticles())
  }, [context, quantity, refresh, resolvedTheme])

  useEffect(() => {
    if (!context || !canvasRef.current || particles.length === 0) return

    let animationFrameId: number

    const render = () => {
      if (!context || !canvasRef.current) return

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      context.fillStyle = color
      context.strokeStyle = color

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvasRef.current!.width
        if (particle.x > canvasRef.current!.width) particle.x = 0
        if (particle.y < 0) particle.y = canvasRef.current!.height
        if (particle.y > canvasRef.current!.height) particle.y = 0

        // Draw particle
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x
          const dy = particle.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            context.beginPath()
            context.lineWidth = 0.2
            context.globalAlpha = 1 - distance / 100
            context.moveTo(particle.x, particle.y)
            context.lineTo(particles[j].x, particles[j].y)
            context.stroke()
            context.globalAlpha = 1
          }
        }

        // Mouse interaction
        if (isMouseOver) {
          const dx = particle.x - mouse.x
          const dy = particle.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = 100
          const force = (maxDistance - distance) / maxDistance

          if (distance < maxDistance) {
            particle.vx += (forceDirectionX * force) / ease
            particle.vy += (forceDirectionY * force) / ease
          }
        }
      })

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [context, particles, mouse, isMouseOver, color, ease])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    />
  )
}
