"use client";

import { useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import CompetitiveIntelligence from "@/components/features/CompetitiveIntelligence";
import PricingSimulations from "@/components/features/PricingSimulations";
import AutomatedPricing from "@/components/features/AutomatedPricing";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Zap, TrendingUp, PieChart, BarChart } from "lucide-react";

import PriceAlert from "@/components/features/PriceAlert";

export default function ProductShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    "Competitive Intelligence",
    "Pricing Simulations",
    "Automated Dynamic Pricing",
  ];

  // Function to simulate price alert
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const triggerPriceAlert = () => {
    setShowPriceAlert(true);
  };

  const handleAlertClose = () => {
    setShowPriceAlert(false);
  };

  return (
    <section id="features" className="py-20 relative">
      {/* <PriceAlert /> */}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-viridian-50 to-white dark:from-slate-900/80 dark:to-black overflow-hidden shadow-lg border border-viridian-100 dark:border-viridian-900">
          <div className="p-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-8xl md:text-6xl font-bold mb-4 py-10">
                <TextAnimate>Powerful Features</TextAnimate>
              </h2>
              <p className="text-muted-foreground">
                Our platform provides comprehensive tools to help you make
                data-driven pricing decisions with AI-powered intelligence.
              </p>
            </div>

            {/* Feature Cards in BentoGrid */}
            <div className="mb-12">
              <BentoGrid className="max-w-6xl mx-auto">
                <BentoGridItem
                  title="Competitive Intelligence"
                  description="Monitor competitor pricing in real-time and get alerts when they change their strategies."
                  icon={<Zap className="h-6 w-6 text-cyan-500" />}
                  className="bg-white/60 dark:bg-slate-800/40 border-transparent shadow-md hover:shadow-lg transition-all"
                />
                <BentoGridItem
                  title="Pricing Simulations"
                  description="Simulate different pricing strategies and forecast their impact on your revenue and profit."
                  icon={<TrendingUp className="h-6 w-6 text-viridian-500" />}
                  className="bg-white/60 dark:bg-slate-800/40 border-transparent shadow-md hover:shadow-lg transition-all"
                />
                <BentoGridItem
                  title="Automated Dynamic Pricing"
                  description="Let AI automatically adjust your prices based on market conditions and business rules."
                  icon={<BarChart className="h-6 w-6 text-sgbus_green-500" />}
                  className="bg-white/60 dark:bg-slate-800/40 border-transparent shadow-md hover:shadow-lg transition-all"
                />
              </BentoGrid>
            </div>

            <div className="mb-8">
              <div className="flex justify-center mb-6 flex-wrap gap-4">
                {features.map((feature, index) => (
                  <button
                    key={feature}
                    className={`px-6 py-3 rounded-full transition-colors ${
                      activeFeature === index
                        ? "bg-primary text-white shadow-md"
                        : "bg-white/70 dark:bg-slate-800/60 hover:bg-white/90 dark:hover:bg-slate-800/80 shadow-sm"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/40 rounded-xl p-6 shadow-md">
              {activeFeature === 0 && (
                <CompetitiveIntelligence
                  triggerPriceAlert={triggerPriceAlert}
                />
              )}
              {activeFeature === 1 && <PricingSimulations />}
              {activeFeature === 2 && <AutomatedPricing />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
