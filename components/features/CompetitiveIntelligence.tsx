"use client";

import { useState, useEffect } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Pointer } from "@/components/ui/pointer";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  ArrowRight,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart,
  TrendingUp,
  Zap,
  Bell,
  Globe,
  Info,
} from "lucide-react";
import { TextReveal } from "@/components/magicui/text-reveal";
import {
  LineChart,
  RadarChart,
  RadialChart,
  chartColors,
} from "@/components/ui/shadcn-charts";
import PriceComparisonChart from "./PriceComparisonChart";
import MarketPositioningMap from "./MarketPositioningMap";
import CompetitorTimeline from "./CompetitorTimeline";
import { marketZones, timelinePoints } from "@/lib/landing";
import { generateMarketData } from "./generateMarketData";

// Define custom colors for each line in graphs
const customColors = {
  yourStore: chartColors.primary,
  competitorA: chartColors.tertiary,
  competitorB: chartColors.quaternary,
  competitorC: chartColors.secondary,
};

interface CompetitiveIntelligenceProps {
  triggerPriceAlert: () => void;
}

export default function CompetitiveIntelligence({
  triggerPriceAlert,
}: CompetitiveIntelligenceProps) {
  // Time period for live comparison slider
  const [timePeriod, setTimePeriod] = useState(5); // 0-10 representing last day to last year
  const timeLabels = ["1d", "3d", "1w", "2w", "1m", "3m", "6m", "9m", "1y"];

  // Price trend data
  const [priceTrendData, setPriceTrendData] = useState(
    generateMarketData(30, 130, 5)
  );
  const [competitorTrendData, setCompetitorTrendData] = useState(
    generateMarketData(30, 150, 8)
  );

  // Timeline hover state
  const [activeTimelinePoint, setActiveTimelinePoint] = useState<number | null>(
    null
  );

  // Market position data for heatmap
  const [selectedMarketZone, setSelectedMarketZone] = useState<{
    id: number;
    name: string;
    price: string;
    competitors: number;
    opportunity: string;
  } | null>(null);

  // Define market zones for the positioning map

  // Sample competitors price data
  const [competitorData, setCompetitorData] = useState([
    { name: "Your Store", price: "$129.99", change: "+0%" },
    { name: "Competitor A", price: "$149.99", change: "+15%" },
    { name: "Competitor B", price: "$119.99", change: "-8%" },
    { name: "Competitor C", price: "$139.99", change: "+8%" },
  ]);

  // Update competitor data based on time period
  useEffect(() => {
    // Simulate competitor price changes over time
    const variations = [
      {
        name: "Your Store",
        basePrice: 129.99,
        timeTrend: [0, 0, 0, 0, 0, +2, +4, +5, +8],
      },
      {
        name: "Competitor A",
        basePrice: 149.99,
        timeTrend: [0, -1, -2, -3, -5, -8, -10, -12, -15],
      },
      {
        name: "Competitor B",
        basePrice: 119.99,
        timeTrend: [0, +1, +2, +3, +5, +7, +9, +12, +15],
      },
      {
        name: "Competitor C",
        basePrice: 139.99,
        timeTrend: [0, -2, -4, -5, -3, 0, +3, +5, +8],
      },
    ];

    const trendIndex = Math.min(timePeriod, variations[0].timeTrend.length - 1);

    const updatedData = variations.map((item) => {
      const percentChange = item.timeTrend[trendIndex];
      const newPrice = item.basePrice * (1 + percentChange / 100);

      return {
        name: item.name,
        price: `$${newPrice.toFixed(2)}`,
        change: `${percentChange >= 0 ? "+" : ""}${percentChange}%`,
      };
    });

    setCompetitorData(updatedData);

    // Update price trend data
    const volatility = 5 + timePeriod * 0.5;
    const yourBasePrice = 130 + timePeriod * 2;
    const competitorBasePrice = 150 - timePeriod * 3;

    setPriceTrendData(generateMarketData(30, yourBasePrice, volatility));
    setCompetitorTrendData(
      generateMarketData(30, competitorBasePrice, volatility)
    );
  }, [timePeriod]);

  return (
    <div className="space-y-24 ">
      {/* Real-time Market Analysis with Price Comparison Chart */}
      <div className="mb-16">
        <PriceComparisonChart onTriggerAlert={triggerPriceAlert} />
      </div>

      {/* Market Positioning Map */}
      <div className="mb-16">
        <MarketPositioningMap />
      </div>

      {/* Competitor Timeline */}
      <div className="mb-16">
        <h4 className="text-xl font-semibold mb-4">
          Competitor Price Timeline
        </h4>
        <CompetitorTimeline
          points={timelinePoints}
          startDate="Jan 12"
          endDate="Apr 18"
        />
      </div>
    </div>
  );
}
