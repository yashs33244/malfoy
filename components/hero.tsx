"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { IconUsers } from "@tabler/icons-react";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import WorldMap from "@/components/ui/world-map";

export function WorldMapDemo() {
  return (
    <div className="py-6 w-full h-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Smarter{" "}
          <span className="text-neutral-400">
            {"Pricing  Intelligence".split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-1"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          AI-powered tools enabling e-commerce brands to <br />{" "}
          <span className="font-bold">price intelligently</span> and scale
          swiftly.
        </p>
      </div>
      <div className="mt-6 md:mt-10 w-full h-[500px] md:h-[600px] lg:h-[700px]">
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Smooth scroll function for buttons
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: "smooth",
      });
    }
  };

  // Handle direct Calendly schedule button click
  const handleScheduleClick = () => {
    if (isLoggedIn) {
      // If signed in, open Calendly directly in a new tab
      window.open("https://calendly.com/yashs3324/interview", "_blank");
    } else {
      // If not signed in, show authentication message
      toast.error("Authentication required", {
        description: "You need to sign in before scheduling",
        action: {
          label: "Sign In",
          onClick: () => {
            router.push("/login");
          },
        },
        duration: 5000,
      });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-20 py-8 md:py-12 gap-8 md:gap-12 bg-[#f3f3f3] dark:bg-[#121212] m-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
        {/* Left Column: Text */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 z-10">
          <div className="inline-flex items-center px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <IconUsers className="mr-2 h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300 mona-sans-medium">
              30k+ people joined worldwide
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Save time and money.
            <br />
            AI-powered pricing optimization
          </p>
          <div className="flex gap-6 pt-4">
            <InteractiveHoverButton
              className="px-8 py-4 text-base font-medium bg-black text-white rounded-full transition-colors duration-200 hover:bg-[#03c76e] hover:text-black"
              onClick={() => scrollToSection("how-it-works")}
            >
              View Demo
            </InteractiveHoverButton>
            <InteractiveHoverButton
              className="px-8 py-4 text-base font-medium bg-white text-black border border-slate-300 dark:border-slate-600 rounded-full transition-colors duration-200 hover:bg-[#03c76e] hover:text-white"
              onClick={handleScheduleClick}
            >
              Schedule a Call
            </InteractiveHoverButton>
          </div>

          {/* <p className="text-sm md:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Leverage the power of AI in <AvatarCircles avatarUrls={avatars} />{" "}
            aircraft parts procurement
          </p> */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white leading-tight pt-10">
            Optimize,
            <br />
            Outperform
          </h1>
        </div>

        {/* Right Column: WorldMap Visualization */}
        <div className="w-full md:w-1/2 relative h-[600px] md:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center flex-col ">
            <div className="text-base md:text-lg font-medium text-center text-neutral-600 dark:text-neutral-300 mt-40 mr-5 mb-10">
              Trusted by teams and individuals across the globe
            </div>
            {/* Colored background with rounded borders for the world map */}
            {/* WorldMap component positioned to fill the container */}
            <div className="relative w-full h-full">
              <WorldMapDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
