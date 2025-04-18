"use client";

import { useTheme } from "next-themes";
import { GradientText } from "@/components/ui/gradient-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { RainbowButton } from "@/components/ui/rainbow-button";

import { cn } from "@/lib/utils";

import { DotPattern } from "./magicui/dot-pattern";
import { AuroraText } from "./magicui/aurora-text";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { Chip } from "./chip";
import { Heading } from "./Heading";

export default function Hero() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <Chip />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            <Heading />
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            The all-in-one platform for competitive pricing intelligence, market
            analysis, and automated pricing optimization.
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
  );
}
