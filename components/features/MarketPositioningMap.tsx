"use client";

import { useState } from "react";
import SimpleHeading from "./SimpleHeading";
import { RadarChart, chartColors } from "@/components/ui/shadcn-charts";
import { Check } from "lucide-react";
import { SmallFeatureItem } from "./small-featureitem";
import { TextRevealByWord } from "../ui/text-reveal";
import { Text_03 } from "../ui/wave-text";
import { FeatureItem } from "../featureItem";

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
      <div className="text-center pt-10 mb-40">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-medium leading-tight">
          <span className="font-extrabold text-black dark:text-white">
            Discover your edge
          </span>{" "}
          <br />
          <span className="text-gray-400">in a competitive landscape</span>{" "}
          <br />
          <span className="font-extrabold text-black dark:text-white">
            across global markets
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

      <div className={` gap-8 items-start ${className}`}>
        <div className="order-2 md:order-1">
          {/* Fixed height container to prevent layout shifts */}
          <div className="flex flex-col space-y-4">
            {/* Radar Chart with increased height */}
            <div className="relative h-100 rounded-xl overflow-hidden bg-[#151531] mt-4 pb-4">
              <RadarChart
                data={radarData}
                keys={[
                  "Your_Product",
                  "Premium_Market",
                  "Value_Market",
                  "Budget_Market",
                  "Luxury_Market",
                ]}
                height={500}
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
            <div className="grid grid-cols-6 gap-6">
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
            {/* Fixed height container for selected zone info to prevent layout shifts */}
            <div className="w-full h-48 flex justify-center">
              {selectedMarketZone && (
                <div
                  className={`shadow border border-gray-200 p-4 rounded-xl w-full transition-all duration-300 ${selectedMarketZone.className} hover:bg-opacity-15`}
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="text-lg font-medium flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${selectedMarketZone.className} opacity-80`}
                      ></span>
                      {selectedMarketZone.name}
                    </h4>
                  </div>

                  {/* Main content grid with 3 columns */}
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all">
                      <p className="text-gray-500 dark:text-gray-300">
                        Price Point
                      </p>
                      <p className="font-medium flex items-center">
                        {selectedMarketZone.price}
                        <span className="ml-1 text-xs text-gray-400">USD</span>
                      </p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all">
                      <p className="text-gray-500 dark:text-gray-300">
                        Competitors
                      </p>
                      <p className="font-medium flex items-center">
                        {selectedMarketZone.competitors}
                        <span
                          className={`ml-2 text-xs ${
                            selectedMarketZone.competitors > 5
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {selectedMarketZone.competitors > 5 ? "High" : "Low"}
                        </span>
                      </p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all">
                      <p className="text-gray-500 dark:text-gray-300">
                        Opportunity
                      </p>
                      <p className="font-medium">
                        {selectedMarketZone.opportunity}
                      </p>
                    </div>
                  </div>

                  {/* Additional content section */}
                  <div className="mt-2 border-t border-gray-200 border-opacity-20 pt-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer">
                          <span className="w-1 h-1 rounded-full bg-blue-400 mr-1"></span>
                          Market Share: {selectedMarketZone.id * 5 + 10}%
                        </span>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer">
                          <span className="w-1 h-1 rounded-full bg-green-400 mr-1"></span>
                          Growth: {selectedMarketZone.id * 2 + 5}%
                        </span>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer">
                          <span className="w-1 h-1 rounded-full bg-purple-400 mr-1"></span>
                          ROI: {selectedMarketZone.id * 3 + 12}%
                        </span>
                      </div>
                      <button
                        className={`text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${selectedMarketZone.className} text-black shadow-sm hover:shadow-md`}
                      >
                        View Analysis
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <ul className="space-y-8 mt-10">
            <FeatureItem
              icon={<Check className="w-4 h-4 text-blue-500 font-bold" />}
              title="Track price changes "
              subtitle="Monitor competitors in real-time"
              description="Track price changes across multiple marketplaces"
            />
            <FeatureItem
              icon={<Check className="w-4 h-4 text-blue-500 font-bold" />}
              title="Analyze pricing trends and patterns"
              subtitle="Identify market opportunities"
              description="Analyze pricing trends and patterns"
            />
            <FeatureItem
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
