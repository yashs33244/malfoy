"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface BentoGridProps {
  className?: string
  children: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>{children}</div>
}

interface BentoGridItemProps {
  className?: string
  title?: string
  description?: string
  header?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode
}

export function BentoGridItem({ className, title, description, header, icon, children }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-card border border-border",
        className,
      )}
    >
      {header}
      <div className="flex flex-col h-full justify-between">
        <div>
          {icon && <div className="mb-2">{icon}</div>}
          {title && <h3 className="font-semibold text-lg mb-1 tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
