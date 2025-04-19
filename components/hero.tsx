"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { IconUsers } from "@tabler/icons-react";
import Link from "next/link";

// Import existing components
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { Globe } from "./magicui/globe";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { Chip } from "./chip";

// Custom button that wraps InteractiveHoverButton for links
interface CustomButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const CustomButton = ({
  href,
  children,
  className,
  containerClassName,
}: CustomButtonProps) => {
  return (
    <Link href={href} className={cn("block", containerClassName)}>
      <InteractiveHoverButton className={className}>
        {children}
      </InteractiveHoverButton>
    </Link>
  );
};

// Avatar data for the AvatarCircles component
const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden p-4 sm:p-20 bg-white dark:bg-black/90">
      {/* Background with dots pattern */}
      <div className="absolute inset-0 bg-white dark:bg-black/90">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-sgbus_green-500/5 to-transparent"></div>
      <div className="absolute right-0 inset-y-0 w-40 bg-gradient-to-l from-viridian-500/5 to-transparent"></div>
      <div className="absolute left-0 inset-y-0 w-40 bg-gradient-to-r from-cyan-500/5 to-transparent"></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side content */}
        <div className="flex-1 max-w-2xl">
          {/* Users counter */}
          <div className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-viridian-900/10 dark:bg-viridian-100/10 border border-viridian-500/20 animate-fade-in">
            <IconUsers className="mr-2 h-4 w-4 text-cyan-500" />
            <span className="text-sm font-medium text-viridian-700 dark:text-viridian-300">
              30k+ people joined worldwide
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="block text-black dark:text-white mb-2">
              Intelligent Pricing
            </span>
            <AnimatedGradientText
              className="font-extrabold"
              colorFrom={isLight ? "#1B7D5E" : "#4fd8ad"}
              colorTo={isLight ? "#00D8FF" : "#12ffeb"}
            >
              for the AI Era
            </AnimatedGradientText>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 animate-slide-up-delay">
            The next generation of AI-powered pricing intelligence for
            e-commerce. Make real-time decisions that drive revenue, margin, and
            market share.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up-delay-2">
            <InteractiveHoverButton
              onClick={() => (window.location.href = "#early-access")}
            >
              Get Early Access
            </InteractiveHoverButton>

            <InteractiveHoverButton
              className="px-8 py-3 text-lg font-medium border border-viridian-200 dark:border-viridian-800 text-viridian-700 dark:text-viridian-300 bg-white/200 dark:bg-black/20 backdrop-blur-sm"
              onClick={() => (window.location.href = "#demo")}
            >
              Watch Demo
            </InteractiveHoverButton>
          </div>

          {/* Avatar circles */}
          <div className="mb-6 animate-slide-up-delay-3">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Join thousands of professionals already using our platform
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center animate-fade-in-delay">
            <Chip givenText="ML-Driven Pricing" />
            <Chip givenText="Real-Time Market Analysis" />
            <Chip givenText="AI-Powered Optimization" />
          </div>
        </div>

        {/* Right side globe visualization */}
        <div className="flex-1 relative h-[450px] md:h-[600px] w-full max-w-[550px] mt-12 md:-mt-8 mx-auto md:mx-0 animate-fade-in-slow">
          {/* Decorative circular gradient behind the globe */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-cyan-500/10 to-sgbus_green-500/5 blur-2xl"></div>

          {/* Globe container with proper sizing */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-full h-full scale-110 md:scale-125 transform" />
          </div>

          {/* Radial glow effect */}
        </div>
      </div>
    </section>
  );
}
