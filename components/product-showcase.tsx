"use client";

import { useState } from "react";
import CompetitiveIntelligence from "@/components/features/CompetitiveIntelligence";
import PricingSimulations from "@/components/features/PricingSimulations";
import AutomatedPricing from "@/components/features/AutomatedPricing";
import { ArrowDown } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section id="features" className="py-12 md:py-20 relative">
      <div className="m-5">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Platform Features
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Discover how our powerful solutions can transform your pricing
            strategy and boost your business performance.
          </p>
        </div>

        {/* Feature 1: Competitive Intelligence */}
        <div className="mb-32">
          <div className="mx-auto ">
            <div className="p-8 md:p-12 ">
              <div className="mb-8">
                <h3 className="text-2xl md:text-4xl lg:text-6xl font-medium leading-tight">
                  <span className="font-extrabold text-black dark:text-white">
                    Competitive Intelligence
                  </span>{" "}
                </h3>
              </div>
              <div className="dark:bg-slate-800/40 p-6 rounded-xl">
                <CompetitiveIntelligence triggerPriceAlert={() => {}} />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <ArrowDown className="h-10 w-10 text-slate-400 animate-bounce" />
          </div>
        </div>

        <h1 className="text-center md:text-4xl lg:text-6xl font-medium leading-tight mb-60">
          <span className="font-extrabold text-black dark:text-white text-8xl">
            Optimize
          </span>{" "}
          <span className="font-extrabold text-black dark:text-white">
            your pricing
          </span>{" "}
          <br />
          <span className="text-gray-400">with intelligent insights</span>{" "}
          <br />
          <span className="font-extrabold text-black dark:text-white">
            that drive growth
          </span>
        </h1>

        {/* Feature 2: Pricing Simulations */}
        <div className="mb-32">
          <div className="flex-1 flex flex-col md:flex-row items-center py-8 md:py-12 gap-8 md:gap-12 bg-[#f3f3f3] dark:bg-[#121212] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="ml-8">
              <div className="">
                <PricingSimulations />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <ArrowDown className="h-10 w-10 text-slate-400 animate-bounce" />
          </div>
        </div>

        {/* Feature 3: Automated Dynamic Pricing */}
        <div className="mb-16">
          <div className="">
            <div className="">
              <div className="text-center pt-10 mb-60">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-medium leading-tight">
                  <span className="font-extrabold text-black dark:text-white text-8xl">
                    Dynamic
                  </span>{" "}
                  <span className="text-gray-400">
                    Pricing <br /> Intelligence
                  </span>
                  <br />
                  <span className="font-extrabold text-black dark:text-white">
                    Platform
                  </span>
                </h1>

                {/* Colored Chips */}
                {/* <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 bg-pink-100 rounded-2xl border border-pink-300">
                    <span>🧭</span> Efficiency
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-2xl border border-purple-300">
                    <span>🔗</span> Streamline
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-2xl border border-green-300">
                    <span>⭐</span> Automation
                  </span>
                </div> */}
              </div>
              <div className="flex-1 flex flex-col md:flex-row items-center py-8 md:py-12 gap-8 md:gap-12 bg-[#f3f3f3] dark:bg-[#121212] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg m-2">
                <div className="container mx-auto px-4 ">
                  <AutomatedPricing />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
