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

// Helper function to generate market data
const generateMarketData = (
  basePrice: number,
  range: number = 10,
  pointCount: number = 10
) => {
  return Array.from({ length: pointCount }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (pointCount - i - 1) * 3);
    return {
      date: date.toISOString().split("T")[0],
      price: basePrice + Math.random() * range - range / 2,
    };
  });
};

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
  const marketZones = [
    {
      id: 1,
      name: "Premium Market",
      price: "High",
      competitors: 3,
      opportunity: "Medium",
      className: "col-span-2 row-span-1 bg-blue-100",
      gridPosition: "col-span-2 row-span-1",
      textColor: "text-blue-800",
    },
    {
      id: 2,
      name: "Value Market",
      price: "Medium",
      competitors: 8,
      opportunity: "Low",
      className: "bg-yellow-100",
      gridPosition: "col-span-2 row-span-1",
      textColor: "text-yellow-800",
      indicators: [{ color: "#4F46E5" }, { color: "#4F46E5", opacity: 0.8 }],
    },
    {
      id: 3,
      name: "Budget Market",
      price: "Low",
      competitors: 5,
      opportunity: "Medium",
      className: "bg-red-100",
      gridPosition: "col-span-1 row-span-1",
      textColor: "text-red-800",
    },
    {
      id: 4,
      name: "Luxury Market",
      price: "Very High",
      competitors: 2,
      opportunity: "High",
      className: "bg-green-100",
      gridPosition: "col-span-2 row-span-2",
      textColor: "text-green-800",
      indicators: [{ color: "#22C55E" }],
    },
    {
      id: 5,
      name: "Mass Market",
      price: "Medium-Low",
      competitors: 12,
      opportunity: "Medium",
      className: "bg-orange-100",
      gridPosition: "col-span-1 row-span-1",
      textColor: "text-orange-800",
    },
  ];

  // Define timeline points for competitor timeline
  const timelinePoints = [
    {
      id: 0,
      date: "Jan 12, 2025",
      description: "No significant changes",
      isHighlighted: false,
    },
    {
      id: 1,
      date: "Feb 03, 2025",
      description: "No significant changes",
      isHighlighted: false,
    },
    {
      id: 2,
      date: "Feb 27, 2025",
      description: "Competitor A dropped prices by 15%",
      isHighlighted: true,
    },
    {
      id: 3,
      date: "Mar 15, 2025",
      description: "No significant changes",
      isHighlighted: false,
    },
    {
      id: 4,
      date: "Apr 02, 2025",
      description: "Competitor B increased prices by 8%",
      isHighlighted: true,
    },
    {
      id: 5,
      date: "Apr 17, 2025",
      description: "No significant changes",
      isHighlighted: false,
    },
  ];

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
        <MarketPositioningMap marketZones={marketZones} />
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

      {/* <h3 className="text-2xl font-bold mb-8">Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-slate-50 dark:bg-slate-800/60 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start mb-4">
            <div className="mr-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Price Alerts</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Get notified when competitors change their prices beyond your
                set thresholds.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start mb-4">
            <div className="mr-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Trend Analysis</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Identify pricing patterns and seasonal trends to stay ahead of
                the market.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start mb-4">
            <div className="mr-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
              <PieChart className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Market Share Tracking
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor how your pricing strategy affects your market position
                over time.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start mb-4">
            <div className="mr-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
              <LineChartIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Competitor Timeline
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                View historical pricing data to understand competitor
                strategies.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
