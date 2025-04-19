"use client";

import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";
import { IntegrationIcons } from "./IntegrationIcons";

interface IntegrationOrbitsProps {
  className?: string;
  primaryIconSize?: number;
  secondaryIconSize?: number;
  primaryRadius?: number;
  secondaryRadius?: number;
  primarySpeed?: number;
  secondarySpeed?: number;
  primaryReverse?: boolean;
  secondaryReverse?: boolean;
}

export function IntegrationOrbits({
  className = "",
  primaryIconSize = 40,
  secondaryIconSize = 30,
  primaryRadius = 130,
  secondaryRadius = 80,
  primarySpeed = 1,
  secondarySpeed = 1.5,
  primaryReverse = false,
  secondaryReverse = true,
}: IntegrationOrbitsProps) {
  return (
    <div
      className={`relative h-80 w-full flex items-center justify-center ${className}`}
    >
      {/* Center PriceIQ logo */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
        <IntegrationIcons.shein className="text-lg" />
      </div>

      {/* Primary orbit */}
      <OrbitingCircles
        iconSize={primaryIconSize}
        radius={primaryRadius}
        speed={primarySpeed}
        reverse={primaryReverse}
      >
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.shopify className="w-6 h-6 text-[#95BF47]" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.amazon className="w-6 h-6 text-[#FF9900]" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.airbnb className="w-6 h-6 text-[#7F54B3]" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.costco className="w-6 h-6 text-[#F26322]" />
        </div>
      </OrbitingCircles>

      {/* Secondary orbit */}
      <OrbitingCircles
        iconSize={secondaryIconSize}
        radius={secondaryRadius}
        speed={secondarySpeed}
        reverse={secondaryReverse}
      >
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.blinkit className="w-5 h-5 text-[#2A6FBB]" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.instacart className="w-5 h-5 text-[#E53238]" />
        </div>
      </OrbitingCircles>
    </div>
  );
}
