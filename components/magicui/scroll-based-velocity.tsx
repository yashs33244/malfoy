"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultVelocity?: number;
  className?: string;
  numRows?: number;
  children: React.ReactNode;
}

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity: number;
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({
  children,
  baseVelocity = 100,
  ...props
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;
        // Calculate how many copies we need to fill the container plus some overflow
        // Add extra repetitions to ensure smooth scrolling
        const newRepetitions = Math.max(
          3,
          Math.ceil((containerWidth * 2) / contentWidth)
        );
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  // The trick is to transform in a continuous loop and use modulo arithmetic
  // to create the illusion of infinite scrolling
  const x = useTransform(baseX, (v) => {
    // This creates a seamless loop effect
    return `${wrap(0, -100, v)}%`;
  });

  const directionFactor = useRef<number>(baseVelocity > 0 ? 1 : -1);

  useAnimationFrame((t, delta) => {
    let moveBy =
      directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);

    // Apply scroll velocity influence if desired
    if (velocityFactor.get() !== 0) {
      const scrollInfluence =
        directionFactor.current * moveBy * velocityFactor.get() * 0.2;
      moveBy += scrollInfluence;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="flex w-full overflow-hidden whitespace-nowrap"
      {...props}
    >
      <motion.div className="flex flex-nowrap items-center" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? contentRef : undefined}
            className="flex flex-nowrap items-center min-w-max"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  defaultVelocity = 5,
  numRows = 1,
  children,
  className,
  ...props
}: VelocityScrollProps) {
  // Convert children to array if it's not already
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("relative w-full", className)} {...props}>
      {Array.from({ length: numRows }).map((_, i) => {
        // Get the child for this row, or use child at index modulo length to cycle
        const childIndex = i % childrenArray.length;
        const child = childrenArray[childIndex];
        // Alternate direction based on odd/even index
        const velocity = defaultVelocity * (i % 2 === 0 ? 1 : -1);

        return (
          <ParallaxText key={i} baseVelocity={velocity} className="py-3">
            {child}
          </ParallaxText>
        );
      })}
    </div>
  );
}
