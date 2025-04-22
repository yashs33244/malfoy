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
      {/* Center Shein logo */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
        <div className="text-sm font-bold">Integration</div>
      </div>

      {/* Primary orbit */}
      <OrbitingCircles
        iconSize={primaryIconSize}
        radius={primaryRadius}
        speed={primarySpeed}
        reverse={primaryReverse}
      >
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.shopify className="w-6 h-6 object-contain" />
        </div>
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.amazon className="w-6 h-6 object-contain" />
        </div>
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.airbnb className="w-6 h-6 object-contain" />
        </div>
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.costco className="w-6 h-6 object-contain" />
        </div>
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.googleanalytics className="w-6 h-6 object-contain" />
        </div>
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.walmart className="w-6 h-6 object-contain" />
        </div>
        <div className="bg-card p-2 rounded-full flex items-center justify-center">
          <IntegrationIcons.doordash className="w-6 h-6 object-contain" />
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
          <IntegrationIcons.blinkit className="w-5 h-5 object-contain" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.instacart className="w-5 h-5 object-contain" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.commerceiq className="w-5 h-5 object-contain" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.wholefoods className="w-5 h-5 object-contain" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.uber className="w-5 h-5 object-contain" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.ola className="w-5 h-5 object-contain" />
        </div>
        <div className="bg-card p-1 rounded-full flex items-center justify-center">
          <IntegrationIcons.flipkart className="w-5 h-5 object-contain" />
        </div>
      </OrbitingCircles>
    </div>
  );
}
