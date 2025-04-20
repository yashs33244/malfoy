"use client";

import { useState, useEffect } from "react";
import { Bell, Check } from "lucide-react";
import { LineChart, chartColors } from "@/components/ui/shadcn-charts";
import { FeatureItem } from "../featureItem";

// Define custom colors for each line in graphs
const customColors = {
  yourStore: chartColors.primary,
  competitorA: chartColors.tertiary,
  competitorB: chartColors.quaternary,
  competitorC: chartColors.secondary,
};

interface CompetitorData {
  name: string;
  price: string;
  change: string;
}

interface PriceComparisonChartProps {
  title?: string;
  onTriggerAlert?: () => void;
  className?: string;
}

// Function to generate chart data in the format needed for shadcn charts
const generateChartData = (
  days: number,
  baseValue: number,
  volatility: number
) => {
  const data = [];
  let currentValue = baseValue;

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * volatility;
    currentValue = Math.max(50, currentValue + change);

    data.push({
      name: `Day ${i + 1}`,
      value: currentValue,
    });
  }

  return data;
};

export default function PriceComparisonChart({
  title = "Real-time Market Analysis",
  onTriggerAlert,
  className = "",
}: PriceComparisonChartProps) {
  // Time period for live comparison slider
  const [timePeriod, setTimePeriod] = useState(5); // 0-10 representing last day to last year
  const timeLabels = ["1d", "3d", "1w", "2w", "1m", "3m", "6m", "9m", "1y"];

  // Price trend data formatted for shadcn charts
  const [chartData, setChartData] = useState<any[]>([]);

  // Sample competitors price data
  const [competitorData, setCompetitorData] = useState<CompetitorData[]>([
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

    // Generate chart data for the LineChart component
    // Creating 30 data points for a smooth chart
    const days = 30;
    const dataPoints = Array.from({ length: days }).map((_, i) => {
      // Create a data point for each day
      return {
        name: `Day ${i + 1}`,
        "Your Store": Math.round(
          120 + Math.sin(i / 3) * 10 + (timePeriod * i) / 20
        ),
        "Competitor A": Math.round(150 - (i * timePeriod) / 5),
        "Competitor B": Math.round(
          110 + (i * timePeriod) / 10 + Math.cos(i / 2) * 5
        ),
        "Competitor C": Math.round(
          135 + Math.cos(i / 4) * 15 - (timePeriod * (days - i)) / 40
        ),
      };
    });

    setChartData(dataPoints);
  }, [timePeriod]);

  return (
    <div className={`w-full space-y-8 ${className}`}>
      {/* Main content section */}
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">
          Monitor your competitors' pricing strategies in real-time and identify
          market opportunities before they do.
        </p>

        {/* Feature list */}
        <ul className="space-y-3 mb-6">
          <FeatureItem
            icon={<Check />}
            title="Track price changes across multiple marketplaces"
            subtitle="Track price changes across multiple marketplaces"
            description="Track price changes across multiple marketplaces"
          />
          <FeatureItem
            icon={<Check />}
            title="Analyze pricing trends and patterns"
            subtitle="Analyze pricing trends and patterns"
            description="Analyze pricing trends and patterns"
          />
          <FeatureItem
            icon={<Check />}
            title="Receive alerts for significant market movements"
            subtitle="Receive alerts for significant market movements"
            description="Receive alerts for significant market movements"
          />
        </ul>

        {/* Live Comparison Time Slider */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="block text-sm">Historical Time Period</label>
            <span className="text-primary font-bold">
              {timeLabels[timePeriod]}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            value={timePeriod}
            onChange={(e) => setTimePeriod(parseInt(e.target.value))}
            className="w-full accent-primary"
            style={{
              height: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>1 day</span>
            <span>1 year</span>
          </div>
        </div>

        {/* Price trend chart with ShadCN LineChart */}
        <div className="mb-6 bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Price Trends</h4>
          <div className="h-[220px]">
            <LineChart
              data={chartData}
              keys={[
                "Your Store",
                "Competitor A",
                "Competitor B",
                "Competitor C",
              ]}
              height={220}
              colors={[
                customColors.yourStore,
                customColors.competitorA,
                customColors.competitorB,
                customColors.competitorC,
              ]}
              showLegend={true}
              interactive={true}
              dotSize={4}
              className="mt-4"
            />
          </div>
        </div>

        {/* Price Alert Demo Button */}
        {onTriggerAlert && (
          <button
            onClick={onTriggerAlert}
            className="flex items-center bg-muted hover:bg-muted/80 rounded-md px-4 py-2 text-sm"
          >
            <Bell className="h-4 w-4 mr-2" />
            Trigger Demo Price Alert
          </button>
        )}
      </div>

      {/* Competitor Price Comparison section - now positioned below and full width */}
      <div className="w-full border border-border rounded-xl bg-card p-6">
        <h3 className="text-xl font-bold mb-3">Competitor Price Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {competitorData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-3 rounded bg-background"
            >
              <div className="flex items-center">
                <span
                  className="h-3 w-3 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      i === 0
                        ? customColors.yourStore
                        : i === 1
                        ? customColors.competitorA
                        : i === 2
                        ? customColors.competitorB
                        : customColors.competitorC,
                  }}
                ></span>
                <span>{item.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">{item.price}</span>
                <span
                  className={`text-xs ${
                    item.change.startsWith("+")
                      ? "text-green-500"
                      : item.change === "+0%"
                      ? "text-muted-foreground"
                      : "text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
