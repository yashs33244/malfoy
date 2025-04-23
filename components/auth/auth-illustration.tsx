"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface AuthIllustrationProps {
  className?: string;
}

export function AuthIllustration({ className }: AuthIllustrationProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={cn(
        "relative h-full w-full bg-white dark:bg-gray-950 flex flex-col items-center justify-center rounded-2xl bg-[#f3f3f3] overflow-hidden",
        className
      )}
    >
      {/* Animated clouds */}
      <div className="absolute w-full h-full">
        <div
          className={`absolute top-12 left-8 opacity-70 transition-all duration-1000 ${
            animate ? "translate-x-4" : "-translate-x-4"
          }`}
        >
          <Cloud size="lg" />
        </div>
        <div
          className={`absolute top-24 right-16 opacity-60 transition-all duration-1500 delay-300 ${
            animate ? "-translate-x-6" : "translate-x-2"
          }`}
        >
          <Cloud size="md" />
        </div>
        <div
          className={`absolute bottom-32 left-16 opacity-50 transition-all duration-2000 delay-500 ${
            animate ? "translate-x-5" : "-translate-x-3"
          }`}
        >
          <Cloud size="sm" />
        </div>
      </div>

      {/* Main logo */}
      <div className="relative w-1/2 flex items-center justify-center mb-8">
        <img
          src="login_illustration.png"
          alt="Pricing Intelligence Logo"
          className="w-full h-full object-contain z-10"
        />
      </div>

      {/* Tagline */}
      <div className="relative mt-4 px-8 text-center">
        <h2 className="text-black font-bold text-xl mb-2">
          AI-Powered Pricing Intelligence
        </h2>
        <p className="text-black/80 text-sm max-w-md">
          Optimize pricing decisions with real-time AI analytics to drive
          revenue, margins, and market share
        </p>
      </div>
    </div>
  );
}

// Cloud component
function Cloud({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-16 h-8",
    md: "w-24 h-12",
    lg: "w-32 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-white rounded-full flex items-center justify-center`}
    >
      <div
        className={`${
          size === "sm" ? "-mt-4" : size === "md" ? "-mt-6" : "-mt-8"
        } ${
          size === "sm"
            ? "w-10 h-10"
            : size === "md"
            ? "w-14 h-14"
            : "w-20 h-20"
        } bg-white rounded-full`}
      ></div>
      <div
        className={`${
          size === "sm"
            ? "-mt-3 -ml-4"
            : size === "md"
            ? "-mt-5 -ml-6"
            : "-mt-6 -ml-8"
        } ${
          size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16"
        } bg-white rounded-full`}
      ></div>
    </div>
  );
}
