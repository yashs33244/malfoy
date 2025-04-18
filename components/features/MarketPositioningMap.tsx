"use client";

import { useState } from "react";
import SimpleHeading from "./SimpleHeading";

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

  return (
    <div className={`grid md:grid-cols-2 gap-8 items-center ${className}`}>
      <div className="order-2 md:order-1 relative">
        <div className="relative h-80 rounded-xl overflow-hidden bg-muted">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-2 p-4">
            {/* Market positioning heatmap */}
            {marketZones.map((zone) => (
              <div
                key={zone.id}
                className={`${zone.gridPosition} ${zone.className} hover:brightness-105 rounded-lg flex items-center justify-center cursor-pointer transition-colors relative`}
                onClick={() => setSelectedMarketZone(zone)}
              >
                <span className={`${zone.textColor} font-medium`}>
                  {zone.name}
                </span>

                {/* Show indicators if any */}
                {zone.indicators?.map((indicator, i) => (
                  <div
                    key={i}
                    className="absolute top-2 right-2 h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: indicator.color,
                      right: `${2 + i * 4}px`,
                      opacity: indicator.opacity || 1,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Quality Scale - properly centered with proper rotation */}
            <div className="col-span-1 row-span-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="flex items-center justify-center h-full w-full">
                <span className="text-gray-800 font-medium transform -rotate-90 whitespace-nowrap">
                  Quality Scale
                </span>
              </div>
            </div>

            {/* Price Scale - centered horizontally */}
            <div className="col-span-4 row-span-1 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-800 font-medium">Price Scale</span>
            </div>
          </div>
        </div>

        {/* Market zone info overlay - Positioned BELOW the heatmap */}
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
          <span className="font-medium">Try it:</span> Click on different market
          segments in the interactive map to see competitor details and
          opportunity analysis.
        </p>
      </div>
    </div>
  );
}
