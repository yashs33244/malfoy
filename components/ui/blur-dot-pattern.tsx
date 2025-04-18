"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useId, useRef, useState } from "react";

interface BlurDotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  textSelector?: string;
  dotSize?: number;
  dotSpacing?: number;
  blurAmount?: number;
  dotOpacity?: number;
  dotColor?: string;
  animated?: boolean;
}

export function BlurDotPattern({
  textSelector = "h1, h2, h3, p, a, button, span",
  dotSize = 1,
  dotSpacing = 16,
  blurAmount = 70,
  dotOpacity = 0.4,
  dotColor = "rgb(var(--primary))",
  animated = true,
  className,
  children,
  ...props
}: BlurDotPatternProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [observer, setObserver] = useState<MutationObserver | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Apply clip-path to text elements to keep them clear
    const applyClipPathToText = () => {
      if (containerRef.current) {
        // Find all text elements within the container
        const textElements =
          containerRef.current.querySelectorAll(textSelector);

        textElements.forEach((element) => {
          // Add CSS classes to text elements
          (element as HTMLElement).style.position = "relative";
          (element as HTMLElement).style.zIndex = "2";

          // Add a semi-transparent backdrop to make text more readable
          if (!(element as HTMLElement).querySelector(".text-backdrop")) {
            const backdrop = document.createElement("div");
            backdrop.className = "text-backdrop";
            backdrop.style.position = "absolute";
            backdrop.style.inset = "-8px -12px";
            backdrop.style.borderRadius = "4px";
            backdrop.style.backdropFilter = "blur(5px)";
            backdrop.style.backgroundColor = "rgba(var(--background), 0.3)";
            backdrop.style.zIndex = "-1";

            // Insert the backdrop before the text content
            (element as HTMLElement).style.position = "relative";
            (element as HTMLElement).insertBefore(
              backdrop,
              (element as HTMLElement).firstChild
            );
          }
        });
      }
    };

    updateDimensions();
    applyClipPathToText();

    // Set up mutation observer to handle dynamically added content
    const mutationObserver = new MutationObserver(() => {
      applyClipPathToText();
    });

    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
      setObserver(mutationObserver);
    }

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer?.disconnect();
    };
  }, [textSelector, observer]);

  // Calculate number of dots based on container dimensions and spacing
  const columns = Math.ceil(dimensions.width / dotSpacing) + 1;
  const rows = Math.ceil(dimensions.height / dotSpacing) + 1;

  // Create an array of dots
  const dots = Array.from({ length: columns * rows }, (_, i) => {
    const col = i % columns;
    const row = Math.floor(i / columns);

    return {
      x: col * dotSpacing,
      y: row * dotSpacing,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    };
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* The blurred dot pattern background */}
      <div
        className="absolute inset-0 blur-lg"
        style={{
          filter: `blur(${blurAmount}px)`,
          zIndex: 0,
        }}
      >
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
          {dots.map((dot, index) =>
            animated ? (
              <motion.circle
                key={`dot-${index}`}
                cx={dot.x}
                cy={dot.y}
                r={dotSize}
                fill={dotColor}
                opacity={dotOpacity}
                initial={{ opacity: dotOpacity }}
                animate={{
                  opacity: [dotOpacity, dotOpacity * 2, dotOpacity],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: dot.delay,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <circle
                key={`dot-${index}`}
                cx={dot.x}
                cy={dot.y}
                r={dotSize}
                fill={dotColor}
                opacity={dotOpacity}
              />
            )
          )}
        </svg>
      </div>

      {/* Content that should stay clear */}
      <div className="relative z-1">{children}</div>
    </div>
  );
}
