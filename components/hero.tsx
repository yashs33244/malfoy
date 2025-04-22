"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { IconUsers } from "@tabler/icons-react";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Globe } from "@/components/ui/globe";

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
            Automated Inventory Management
          </p>
          <div className="flex gap-6 pt-4">
            <InteractiveHoverButton className="px-8 py-4 text-base font-medium bg-black text-white rounded-full transition-colors duration-200 hover:bg-[#03c76e] hover:text-black">
              View Demo
            </InteractiveHoverButton>
            <InteractiveHoverButton className="px-8 py-4 text-base font-medium bg-white text-black border border-slate-300 dark:border-slate-600 rounded-full transition-colors duration-200 hover:bg-[#03c76e] hover:text-white">
              Learn More
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

        {/* Right Column: Globe Visualization */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center flex-col ">
            <div className="text-sm text-center mt-5 mr-5">
              Our customers are all over the world
            </div>
            {/* Colored background with rounded borders for the globe */}
            {/* Globe component positioned to fill the container */}
            <div className="relative w-full h-full">
              <Globe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
