"use client";

import { useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import CompetitiveIntelligence from "@/components/features/CompetitiveIntelligence";
import PricingSimulations from "@/components/features/PricingSimulations";
import AutomatedPricing from "@/components/features/AutomatedPricing";

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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextAnimate>Powerful Features</TextAnimate>
          </h2>
          <p className="text-muted-foreground">
            Our platform provides comprehensive tools to help you make
            data-driven pricing decisions with AI-powered intelligence.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-center mb-8 flex-wrap gap-4">
            {features.map((feature, index) => (
              <button
                key={feature}
                className={`px-6 py-3 rounded-full transition-colors ${
                  activeFeature === index
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {activeFeature === 0 && (
          <CompetitiveIntelligence triggerPriceAlert={triggerPriceAlert} />
        )}
        {activeFeature === 1 && <PricingSimulations />}
        {activeFeature === 2 && <AutomatedPricing />}
      </div>
    </section>
  );
}
