"use client";

import { useTheme } from "next-themes";
import { GradientText } from "@/components/ui/gradient-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

import { cn } from "@/lib/utils";

import { DotPattern } from "./magicui/dot-pattern";
import { AuroraText } from "./magicui/aurora-text";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { Chip } from "./chip";
import { Heading } from "./Heading";
import { FlickeringGrid } from "./magicui/flickering-grid";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden p-20">
      {/* Positioned flickering grid background behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute size-full w-full h-full overflow-hidden">
          <FlickeringGrid
            className="absolute inset-0 z-0 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.9}
            flickerChance={0.6}
            height={1200}
            width={1200}
          />
        </div>
      </div>

      {/* Overlay gradient to improve content visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background/50 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <Chip text="AI-Powered Pricing Intelligence" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            <span className="block text-foreground mb-2">
              Intelligent Pricing
            </span>
            <AnimatedGradientText
              className="font-extrabold"
              fromColor={isLight ? "from-emerald-600" : "from-emerald-400"}
              toColor={isLight ? "to-green-400" : "to-green-300"}
            >
              for the AI Era
            </AnimatedGradientText>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            The next generation of AI-powered pricing intelligence for
            e-commerce. Make real-time decisions that drive revenue, margin, and
            market share.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <InteractiveHoverButton
              className="px-8 py-3 text-lg font-medium bg-gradient-to-br from-emerald-500 to-green-600 text-white"
              containerClassName="shadow-xl shadow-emerald-500/20"
              href="#early-access"
            >
              Get Early Access
            </InteractiveHoverButton>

            <InteractiveHoverButton
              className="px-8 py-3 text-lg font-medium border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-white"
              containerClassName="shadow-lg"
              href="#demo"
            >
              Watch Demo
            </InteractiveHoverButton>
          </div>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              ML-Driven Pricing
            </div>
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Real-Time Market Analysis
            </div>
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              AI-Powered Optimization
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
