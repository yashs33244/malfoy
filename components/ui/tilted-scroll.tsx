"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TiltedScrollProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  perspective?: number
  speed?: number
}

export function TiltedScroll({
  children,
  className,
  tiltAmount = 5,
  perspective = 1000,
  speed = 0.05,
}: TiltedScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isInView, setIsInView] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const updateDimensions = () => {
      if (containerRef.current && contentRef.current) {
        setContainerHeight(containerRef.current.offsetHeight)
        setContentHeight(contentRef.current.offsetHeight)
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [children])

  useEffect(() => {
    if (!isInView) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      // Calculate tilt based on mouse position
      const tiltX = (y - 0.5) * tiltAmount
      const tiltY = (0.5 - x) * tiltAmount

      setTilt({ x: tiltX, y: tiltY })
    }

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollPercentage = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      )
      setScrollPosition(scrollPercentage)
    }

    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize scroll position

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isInView, tiltAmount])

  // Calculate the transform based on tilt and scroll position
  const transform = `
    perspective(${perspective}px)
    rotateX(${tilt.x}deg)
    rotateY(${tilt.y}deg)
    translateY(${scrollPosition * (contentHeight - containerHeight) * speed}px)
  `

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height: containerHeight > 0 ? `${containerHeight}px` : "auto" }}
    >
      <div
        ref={contentRef}
        className="transition-transform duration-300 ease-out"
        style={{
          transform: isInView ? transform : "none",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  )
}
