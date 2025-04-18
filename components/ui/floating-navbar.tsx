"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Create an optimized spring animation with higher performance values
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 100, // Reduced stiffness for smoother motion
    damping: 30, // Better damping for more natural feel
    mass: 0.5, // Lower mass for faster response
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  // Transform values based on scroll position - narrower when scrolled
  const width = useTransform(
    scrollYSpring,
    [0, 100],
    ["95%", "75%"] // Narrower when fully resized
  );

  const padding = useTransform(scrollYSpring, [0, 100], ["1rem", "0.5rem"]);

  const scale = useTransform(scrollYSpring, [0, 100], [1, 0.9]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 50) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });

  return (
    <motion.div
      className={cn(
        "flex fixed top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/80 bg-white/90 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-6 py-3 items-center justify-between",
        hasScrolled ? "shadow-lg" : "shadow-md",
        className
      )}
      style={{
        width,
        padding,
        scale,
        transformOrigin: "top center",
        willChange: "transform, width, padding",
        transform: "translate3d(0, 0, 0)",
      }}
      transition={{
        width: { type: "spring", stiffness: 100, damping: 30 },
        scale: { type: "spring", stiffness: 100, damping: 30 },
      }}
    >
      <div className="flex items-center">
        <a href="/" className="text-lg font-semibold mr-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Malfoy
          </span>
        </a>

        <div className="hidden md:flex space-x-6">
          {navItems.map((navItem: any, idx: number) => (
            <a
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors"
              )}
            >
              {navItem.icon && <span className="block">{navItem.icon}</span>}
              <span className="text-sm font-medium">{navItem.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="text-sm font-medium text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors">
          Login
        </button>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 transform">
          Get Started
        </button>
      </div>
    </motion.div>
  );
};
