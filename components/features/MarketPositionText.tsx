"use client";

import { cn } from "@/lib/utils";
import { TextRevealByWord } from "../ui/text-reveal";

export function TextRevealDemo() {
  return (
    <div className="min-h-[200vh] w-full relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-5xl mx-auto p-4">
          <div
            className={cn(
              "rounded-lg w-full h-[500px]",
              "border border-neutral-200 dark:border-neutral-800",
              "bg-white/50 dark:bg-black/50 backdrop-blur-sm",
              "flex items-center justify-center",
              "pointer-events-auto"
            )}
          >
            <TextRevealByWord text="Visualize your position in the market across different regions and product categories." />
          </div>
        </div>
      </div>

      <div className="h-[200vh]" aria-hidden="true" />
    </div>
  );
}
