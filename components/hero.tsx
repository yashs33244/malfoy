"use client"

import { useTheme } from "next-themes"
import { GradientText } from "@/components/ui/gradient-text"
import { TextReveal } from "@/components/ui/text-reveal"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"

export default function Hero() {
  const { resolvedTheme } = useTheme()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <InteractiveGridPattern
        containerClassName="absolute inset-0 w-full h-full"
        dotColor={resolvedTheme === "dark" ? "rgba(121, 82, 179, 0.3)" : "rgba(26, 54, 93, 0.3)"}
        hoverColor={resolvedTheme === "dark" ? "rgba(121, 82, 179, 0.8)" : "rgba(26, 54, 93, 0.8)"}
        dotSize={2}
        dotSpacing={30}
        size={150}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <TextReveal
            text="Revolutionize Your Pricing Strategy"
            className="text-lg font-medium text-muted-foreground mb-4"
          />

          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            <GradientText
              text="Price Smarter. Profit Faster."
              className="font-kanit"
              from={resolvedTheme === "dark" ? "#7952b3" : "#1a365d"}
              to={resolvedTheme === "dark" ? "#ff5252" : "#00b8d4"}
            />
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            The all-in-one platform for competitive pricing intelligence, market analysis, and automated pricing
            optimization.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <RainbowButton href="#early-access" className="px-8 py-3 text-lg">
              Get Early Access
            </RainbowButton>

            <button className="px-8 py-3 text-lg border border-border rounded-md hover:bg-muted/50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
