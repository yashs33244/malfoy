"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className = "", fill = "rgba(120, 119, 198, 0.3)" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const containerSize = useRef({ w: 0, h: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const onMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const { w, h } = containerSize.current
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (x < 0 || x > w || y < 0 || y > h) {
      setIsVisible(false)
      return
    }
    setIsVisible(true)
    mousePosition.current.x = x
    mousePosition.current.y = y
  }

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    containerSize.current.w = rect.width
    containerSize.current.h = rect.height

    window.addEventListener("mousemove", onMouseMove)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  useEffect(() => {
    const updateMouse = () => {
      if (!isVisible) return
      mouse.current.x += (mousePosition.current.x - mouse.current.x) * 0.1
      mouse.current.y += (mousePosition.current.y - mouse.current.y) * 0.1
      if (containerRef.current) {
        const spotlightEl = containerRef.current.querySelector("div") as HTMLDivElement
        if (spotlightEl) {
          spotlightEl.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
        }
      }
      requestAnimationFrame(updateMouse)
    }

    requestAnimationFrame(updateMouse)
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
    >
      <div
        className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle at center, ${fill} 0%, transparent 65%)`,
        }}
      />
    </div>
  )
}
