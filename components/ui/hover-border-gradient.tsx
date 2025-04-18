"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverBorderGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  containerClassName?: string
  gradientClassName?: string
  borderWidth?: number
  duration?: number
  href?: string
}

export const HoverBorderGradient = React.forwardRef<HTMLButtonElement, HoverBorderGradientProps>(
  (
    {
      as: Component = "button",
      children,
      className,
      containerClassName,
      gradientClassName,
      borderWidth = 1,
      duration = 500,
      href,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const containerClasses = cn("relative rounded-lg p-[1px] overflow-hidden group", containerClassName)

    const gradientClasses = cn(
      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
      `duration-${duration}`,
      gradientClassName || "bg-gradient-to-r from-primary via-secondary to-accent",
    )

    const contentClasses = cn(
      "relative z-10 rounded-[calc(theme(borderRadius.lg)-1px)]",
      "transition-all duration-200",
      className,
    )

    const ElementType = href ? "a" : Component

    return (
      <div
        className={containerClasses}
        style={{ padding: `${borderWidth}px` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={gradientClasses} />
        <ElementType ref={ref as any} className={contentClasses} href={href} {...props}>
          {children}
        </ElementType>
      </div>
    )
  },
)

HoverBorderGradient.displayName = "HoverBorderGradient"
