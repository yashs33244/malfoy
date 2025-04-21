"use client";

import { useState } from "react";
import SimpleHeading from "./SimpleHeading";
import { RadarChart, chartColors } from "@/components/ui/shadcn-charts";
import { Check } from "lucide-react";
import { SmallFeatureItem } from "./small-featureitem";
import { TextRevealByWord } from "../ui/text-reveal";
import { Text_03 } from "../ui/wave-text";

interface MarketZone {
  id: number;
  name: string;
  price: string;
  competitors: number;
  opportunity: string;
  className: string;
  gridPosition: string;
  textColor: string;
  indicators?: {
    color: string;
    opacity?: number;
  }[];
}

interface MarketPositioningMapProps {
  marketZones: MarketZone[];
  className?: string;
}

export default function MarketPositioningMap({
  marketZones = [],
  className = "",
}: MarketPositioningMapProps) {
  const [selectedMarketZone, setSelectedMarketZone] =
    useState<MarketZone | null>(marketZones[0]);

  // Create radar chart data from market zones
  const radarData = [
    {
      name: "Quality",
      Your_Product: 80,
      Premium_Market: 90,
      Value_Market: 60,
      Budget_Market: 40,
      Luxury_Market: 95,
    },
    {
      name: "Price",
      Your_Product: 65,
      Premium_Market: 75,
      Value_Market: 55,
      Budget_Market: 30,
      Luxury_Market: 90,
    },
    {
      name: "Features",
      Your_Product: 75,
      Premium_Market: 85,
      Value_Market: 60,
      Budget_Market: 35,
      Luxury_Market: 95,
    },
    {
      name: "Support",
      Your_Product: 85,
      Premium_Market: 80,
      Value_Market: 60,
      Budget_Market: 40,
      Luxury_Market: 90,
    },
    {
      name: "Brand",
      Your_Product: 70,
      Premium_Market: 85,
      Value_Market: 65,
      Budget_Market: 40,
      Luxury_Market: 95,
    },
    {
      name: "Market Share",
      Your_Product: 60,
      Premium_Market: 70,
      Value_Market: 75,
      Budget_Market: 60,
      Luxury_Market: 45,
    },
  ];

  // Transform market zones for the bar chart
  const competitorData = [
    {
      name: "Premium Market",
      competitors:
        marketZones.find((z) => z.name === "Premium Market")?.competitors || 3,
    },
    {
      name: "Value Market",
      competitors:
        marketZones.find((z) => z.name === "Value Market")?.competitors || 8,
    },
    {
      name: "Budget Market",
      competitors:
        marketZones.find((z) => z.name === "Budget Market")?.competitors || 5,
    },
    {
      name: "Luxury Market",
      competitors:
        marketZones.find((z) => z.name === "Luxury Market")?.competitors || 2,
    },
    {
      name: "Mass Market",
      competitors:
        marketZones.find((z) => z.name === "Mass Market")?.competitors || 12,
    },
  ];

  const handleZoneClick = (zone: MarketZone) => {
    setSelectedMarketZone(zone);
  };

  return (
    <div>
      <TextRevealByWord
        text="Visualize your position in the market across different regions and product categories."
        className="text-2xl md:text-3xl font-bold mb-4"
      />
      <div className={`grid md:grid-cols-2 gap-8 items-start ${className}`}>
        <div className="order-2 md:order-1">
          {/* Fixed height container to prevent layout shifts */}
          <div className="flex flex-col space-y-4">
            {/* Radar Chart with increased height */}
            <div className="relative h-96 rounded-xl overflow-hidden bg-[#f3f3f3] m-2">
              <RadarChart
                data={radarData}
                keys={[
                  "Your_Product",
                  "Premium_Market",
                  "Value_Market",
                  "Budget_Market",
                  "Luxury_Market",
                ]}
                height={380}
                colors={[
                  chartColors.primary,
                  chartColors.secondary,
                  chartColors.tertiary,
                  chartColors.quaternary,
                  chartColors.accent1,
                ]}
                showGrid={true}
                showTooltip={true}
                showLegend={true}
              />
            </div>
            {/* List of clickable market zones */}
            <div className="grid grid-cols-5 gap-2">
              {marketZones.map((zone) => {
                const isSelected = selectedMarketZone?.id === zone.id;
                return (
                  <div
                    key={zone.id}
                    className={`transition-all duration-200 ease-in-out transform cursor-pointer 
          hover:scale-[1.03] 
          rounded-full p-2 text-center text-sm
          ${zone.className}
          ${isSelected ? "shadow-[0_0_0.2rem] shadow-current" : ""}
          hover:shadow-[0_0_0.6rem] hover:shadow-current`}
                    onClick={() => handleZoneClick(zone)}
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        isSelected ? "" : zone.textColor
                      }`}
                    >
                      {zone.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Fixed height container for selected zone info to prevent layout shifts */}
            <div className="h-32">
              {selectedMarketZone && (
                <div className="bg-[#f3f3f3] shadow border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-lg font-medium">
                      {selectedMarketZone.name}
                    </h4>
                    <button
                      onClick={() => setSelectedMarketZone(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium">{selectedMarketZone.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Competitors</p>
                      <p className="font-medium">
                        {selectedMarketZone.competitors}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Opportunity</p>
                      <p className="font-medium">
                        {selectedMarketZone.opportunity}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <ul className="space-y-8 mt-10">
            <SmallFeatureItem
              icon={<Check className="w-4 h-4 text-blue-500 font-bold" />}
              title="Track price changes "
              subtitle="Monitor competitors in real-time"
              description="Track price changes across multiple marketplaces"
            />
            <SmallFeatureItem
              icon={<Check className="w-4 h-4 text-blue-500 font-bold" />}
              title="Analyze pricing trends and patterns"
              subtitle="Identify market opportunities"
              description="Analyze pricing trends and patterns"
            />
            <SmallFeatureItem
              icon={<Check className="w-4 h-4 text-blue-500 font-sm" />}
              title="Receive alerts"
              subtitle="Stay ahead of market changes"
              description="Receive alerts for significant market movements"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
