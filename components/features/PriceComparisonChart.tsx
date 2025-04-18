"use client";

import { useState, useEffect } from "react";
import { LineChart, generateMarketData } from "@/components/ui/charts";
import { Bell } from "lucide-react";

// Define custom colors for each line in graphs
const customColors = {
  yourStore: "#4F46E5", // primary indigo
  competitorA: "#2DD4BF", // teal
  competitorB: "#F97316", // orange
  competitorC: "#EC4899", // pink
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

export default function PriceComparisonChart({
  title = "Real-time Market Analysis",
  onTriggerAlert,
  className = "",
}: PriceComparisonChartProps) {
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
    <div className={`grid md:grid-cols-2 gap-8 items-center ${className}`}>
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">
          Monitor your competitors' pricing strategies in real-time and identify
          market opportunities before they do.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-primary">✓</span>
            Track price changes across multiple marketplaces
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-primary">✓</span>
            Analyze pricing trends and patterns
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-primary">✓</span>
            Receive alerts for significant market movements
          </li>
        </ul>

        {/* Live Comparison Time Slider */}
        <div className="mt-6">
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

        {/* Price trend chart - BIGGER */}
        <div className="mt-6 bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Price Trends</h4>
          <div className="h-[180px]">
            <LineChart
              data={priceTrendData}
              compareData={competitorTrendData}
              height={180}
              color={customColors.yourStore}
              compareColor={customColors.competitorA}
              showLegend={true}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: customColors.yourStore }}
              ></span>
              <span>Your Store</span>
            </div>
            <div className="flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: customColors.competitorA }}
              ></span>
              <span>Competitors Avg.</span>
            </div>
          </div>
        </div>

        {/* Price Alert Demo Button */}
        {onTriggerAlert && (
          <button
            onClick={onTriggerAlert}
            className="mt-4 flex items-center bg-muted hover:bg-muted/80 rounded-md px-4 py-2 text-sm"
          >
            <Bell className="h-4 w-4 mr-2" />
            Trigger Demo Price Alert
          </button>
        )}
      </div>
      <div className="border border-border rounded-xl bg-card p-6">
        <h3 className="text-xl font-bold mb-3">Competitor Price Comparison</h3>
        <div className="space-y-4">
          {competitorData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2 rounded bg-background"
            >
              <span>{item.name}</span>
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
