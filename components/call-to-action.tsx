"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { GradientText } from "@/components/ui/gradient-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useTheme } from "next-themes";

export default function CallToAction() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="py-20 relative overflow-hidden">
      <Spotlight
        className="top-40 left-0"
        fill={
          resolvedTheme === "dark"
            ? "rgba(121, 82, 179, 0.4)"
            : "rgba(26, 54, 93, 0.4)"
        }
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <GradientText
              text="Ready to Transform Your Pricing Strategy?"
              from={resolvedTheme === "dark" ? "#7952b3" : "#1a365d"}
              to={resolvedTheme === "dark" ? "#ff5252" : "#00b8d4"}
            />
          </h2>

          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of businesses already using Malfoy to optimize their
            pricing and increase profits.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <RainbowButton href="#early-access" className="px-8 py-4 text-lg">
              Get Early Access
            </RainbowButton>

            <button className="px-8 py-4 text-lg border border-border rounded-md hover:bg-muted/50 transition-colors">
              Schedule a Demo
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                  >
                    <span className="text-xs">U{i}</span>
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="font-medium">500+ Businesses</p>
                <p className="text-sm text-muted-foreground">Trust Malfoy</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 12 13.14 12 22" />
                  </svg>
                ))}
              </div>
              <div className="ml-4">
                <p className="font-medium">4.9/5 Rating</p>
                <p className="text-sm text-muted-foreground">
                  From our customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
