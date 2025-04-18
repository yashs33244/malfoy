"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface TestimonialProps {
  className?: string
  testimonials: {
    content: string
    author: string
    role?: string
    company?: string
    avatar?: string
  }[]
}

export function Testimonial({ className, testimonials }: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-card p-6 shadow-sm", className)}>
      <div className="absolute top-4 right-4 text-primary opacity-20">
        <Quote size={48} />
      </div>

      <div className="relative z-10">
        <div className="min-h-[200px]">
          <div className="transition-opacity duration-300" style={{ opacity: 1 }}>
            <p className="mb-4 text-muted-foreground">{testimonials[activeIndex].content}</p>
            <div className="flex items-center">
              {testimonials[activeIndex].avatar && (
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[activeIndex].author}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium">{testimonials[activeIndex].author}</h4>
                {(testimonials[activeIndex].role || testimonials[activeIndex].company) && (
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role}
                    {testimonials[activeIndex].role && testimonials[activeIndex].company && ", "}
                    {testimonials[activeIndex].company}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="rounded-full p-1 hover:bg-muted"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="rounded-full p-1 hover:bg-muted"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
