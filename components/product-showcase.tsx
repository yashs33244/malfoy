"use client";

import { useState } from "react";
import CompetitiveIntelligence from "@/components/features/CompetitiveIntelligence";
import PricingSimulations from "@/components/features/PricingSimulations";
import AutomatedPricing from "@/components/features/AutomatedPricing";
import { ArrowDown } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section id="features" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
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

        {/* Feature 2: Pricing Simulations */}
        <div className="mb-32">
          <div className="flex-1 flex flex-col md:flex-row items-center py-8 md:py-12 gap-8 md:gap-12 bg-[#f3f3f3] dark:bg-[#121212] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Pricing Simulations
              </h3>

              <div className="dark:bg-slate-800/40 p-6 rounded-xl">
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
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Automated Dynamic Pricing
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Set up rule-based pricing automation that responds to market
                  conditions, optimizing your prices 24/7 without manual
                  intervention.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl">
                <AutomatedPricing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
