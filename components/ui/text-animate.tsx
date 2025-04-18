"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextAnimateProps {
  children: React.ReactNode
  className?: string
  blurAmount?: number
  duration?: number
  delay?: number
}

export function TextAnimate({ children, className, blurAmount = 10, duration = 1500, delay = 0 }: TextAnimateProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, delay])

  return (
    <div ref={elementRef} className={cn("relative overflow-hidden", className)}>
      <div
        className="transition-all"
        style={{
          filter: isAnimated ? "blur(0px)" : `blur(${blurAmount}px)`,
          opacity: isAnimated ? 1 : 0,
          transform: isAnimated ? "translateY(0)" : "translateY(10px)",
          transition: `filter ${duration}ms ease-out, opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
