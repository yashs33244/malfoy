"use client";

import { useState } from "react";
import SimpleHeading from "./SimpleHeading";
import { RadarChart, chartColors } from "@/components/ui/shadcn-charts";

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
    useState<MarketZone | null>(null);

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
    <div className={`grid md:grid-cols-2 gap-8 items-center ${className}`}>
      <div className="order-2 md:order-1 relative">
        <div className="relative h-80 rounded-xl overflow-hidden bg-muted/50">
          {/* Radar Chart for Market Positioning */}
          <RadarChart
            data={radarData}
            keys={[
              "Your_Product",
              "Premium_Market",
              "Value_Market",
              "Budget_Market",
              "Luxury_Market",
            ]}
            height={310}
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
        <div className="mt-4 grid grid-cols-5 gap-2">
          {marketZones.map((zone) => (
            <div
              key={zone.id}
              className={`${
                zone.className
              } cursor-pointer hover:brightness-105 rounded-md p-2 text-center text-sm ${
                selectedMarketZone?.id === zone.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleZoneClick(zone)}
            >
              <span className={zone.textColor}>{zone.name}</span>
            </div>
          ))}
        </div>

        {/* Market zone info overlay - Positioned BELOW the radar chart */}
        {selectedMarketZone && (
          <div className="mt-4 bg-card shadow-lg border border-border p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <h4 className="text-lg font-medium">{selectedMarketZone.name}</h4>
              <button
                onClick={() => setSelectedMarketZone(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-medium">{selectedMarketZone.price}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Competitors</p>
                <p className="font-medium">{selectedMarketZone.competitors}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Opportunity</p>
                <p className="font-medium">{selectedMarketZone.opportunity}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="order-1 md:order-2">
        <SimpleHeading>Market Positioning Map</SimpleHeading>
        <p className="text-muted-foreground mb-6">
          Visualize your position in the market relative to competitors across
          different regions and product categories.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-primary">✓</span>
            Identify underserved market segments
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-primary">✓</span>
            Spot pricing opportunities by region
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-primary">✓</span>
            Track market share changes over time
          </li>
        </ul>
        <p className="text-sm mt-4 bg-muted/50 p-3 rounded-lg">
          <span className="font-medium">Try it:</span> View the radar chart to
          see how your product compares to different market segments across
          multiple factors.
        </p>
      </div>
    </div>
  );
}
