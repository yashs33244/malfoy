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
      name: `${i + 1}`,
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
        name: `${i + 1}`,
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
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main content section */}
      <div className="w-full">
        {/* Feature list */}
        <ul className="space-y-3 mb-6">
          <FeatureItem
            icon={<Check className="w-6 h-6 text-blue-500 font-bold" />}
            title="Track price changes across multiple marketplaces"
            subtitle="Monitor competitors in real-time"
            description="Track price changes across multiple marketplaces"
          />
          <FeatureItem
            icon={<Check className="w-6 h-6 text-blue-500 font-bold" />}
            title="Analyze pricing trends and patterns"
            subtitle="Identify market opportunities"
            description="Analyze pricing trends and patterns"
          />
          <FeatureItem
            icon={<Check className="w-6 h-6 text-blue-500 font-bold" />}
            title="Receive alerts for significant market movements"
            subtitle="Stay ahead of market changes"
            description="Receive alerts for significant market movements"
          />
        </ul>

        {/* Live Comparison Time Slider */}
        <div className="mt-4 mb-4 px-4 py-3 ">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium">
              Historical Time Period
            </label>
            <span className="text-black font-bold">
              {timeLabels[timePeriod]}
            </span>
          </div>
          <div className="relative">
            <div className="absolute w-full flex justify-between px-[8px] -mt-1">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="w-1 h-1 bg-gray-400 rounded-full z-10"
                />
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="any"
              value={timePeriod}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                const roundedValue = Math.round(value);
                setTimePeriod(roundedValue);
              }}
              className="w-full appearance-none bg-gray-200 rounded-full h-2 cursor-pointer transition-all duration-200 mt-2"
              style={{
                background: `linear-gradient(to right, black 0%, black ${
                  (timePeriod / 8) * 100
                }%, #e5e7eb ${(timePeriod / 8) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 50%;
                background: rgb(0, 0, 0);
                cursor: pointer;
                transition: all 0.2s ease;
              }
              input[type="range"]:hover::-webkit-slider-thumb {
                box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
                transform: scale(1.1);
              }
              input[type="range"]::-moz-range-thumb {
                height: 16px;
                width: 16px;
                border-radius: 50%;
                background: rgb(0, 0, 0);
                cursor: pointer;
                border: none;
                transition: all 0.2s ease;
              }
              input[type="range"]:hover::-moz-range-thumb {
                box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
                transform: scale(1.1);
              }
              input[type="range"] {
                border-radius: 8px;
                height: 8px;
              }
            `}</style>
          </div>
          <div className="flex justify-between text-xs mt-1 text-muted">
            <span>1 day</span>
            <span>1 year</span>
          </div>
        </div>

        {/* Price trend chart with corrected height */}
        <div className="mb-6 rounded-lg p-4">
          <div className="h-[270px] bg-muted/20 rounded-lg">
            {" "}
            {/* Fixed height */}
            <LineChart
              data={chartData}
              keys={[
                "Your Store",
                "Competitor A",
                "Competitor B",
                "Competitor C",
              ]}
              colors={[
                customColors.yourStore,
                customColors.competitorA,
                customColors.competitorB,
                customColors.competitorC,
              ]}
              showLegend={true}
              interactive={true}
              dotSize={3}
              showTooltip={true}
              xAxisLabel="Days"
              yAxisLabel="Price"
            />
          </div>
        </div>

        {/* Price Alert Demo Button */}
        {onTriggerAlert && (
          <button
            onClick={onTriggerAlert}
            className="flex items-center bg-muted/50 hover:bg-muted/80 rounded-md px-4 py-2 text-sm transition-colors duration-200"
          >
            <Bell className="h-4 w-4 mr-2" />
            Trigger Demo Price Alert
          </button>
        )}
      </div>

      {/* Competitor Price Comparison section - proper spacing */}
      <div className="w-full  rounded-full p-4 mt-6">
        <div className="mb-4 flex justify-center pb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-lg font-medium text-purple-600 bg-slate-100 rounded-2xl border border-purple-300">
            Real-time Price Comparison
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {competitorData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-3 mt-3 rounded-full bg-background/70 border border-border/20 cursor-pointer group transition-all duration-300 hover:bg-black hover:text-white"
            >
              <div className="flex items-center">
                <span
                  className="h-2.5 w-2.5 rounded-full mr-2 transition-all group-hover:drop-shadow-[0_0_6px_rgba(0,255,0,0.7)]"
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
                <span className="text-sm transition-all">{item.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2 text-sm transition-all">
                  {item.price}
                </span>
                <span
                  className={`text-xs transition-all ${
                    item.change.startsWith("+")
                      ? "group-hover:text-green-400 text-green-500"
                      : item.change === "+0%"
                      ? "group-hover:text-gray-300 text-muted-foreground"
                      : "group-hover:text-red-400 text-red-500"
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
