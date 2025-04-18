"use client";

import { useState, useEffect } from "react";
import { BarChart } from "lucide-react";
import { LineChart, generateMarketData } from "@/components/ui/charts";
import SimpleHeading from "./SimpleHeading";

interface MetricProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  valueColor: string;
}

function Metric({
  label,
  value,
  prefix = "",
  suffix = "%",
  valueColor,
}: MetricProps) {
  return (
    <div className="bg-muted p-3 rounded-lg">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-xl font-bold ${valueColor}`}>
        {value > 0 ? "+" : ""}
        {prefix}
        {value.toFixed(1)}
        {suffix}
      </p>
    </div>
  );
}

export default function SimulationSandbox() {
  const [priceChange, setPriceChange] = useState(5);
  const [metrics, setMetrics] = useState({
    revenue: 12.3,
    profit: 18.7,
    volume: -3.2,
    marketShare: -1.5,
  });

  // Chart data
  const [chartData, setChartData] = useState(generateMarketData(24, 100, 5));
  const [adjustedChartData, setAdjustedChartData] = useState(
    generateMarketData(24, 105, 5)
  );

  // Smoothly animate metrics and chart when price changes
  useEffect(() => {
    // Calculate new metrics based on price change
    const newRevenue = priceChange * 2.1 + 1.8;
    const newProfit = priceChange * 3.2 + 2.7;
    const newVolume = priceChange * -0.9 + 1.3;
    const newMarketShare = priceChange * -0.5 + 1;

    // Generate new chart data based on price change
    const baseIncrement = priceChange > 0 ? priceChange * 2 : priceChange;
    setAdjustedChartData(
      generateMarketData(24, 100 + baseIncrement, 5 + Math.abs(priceChange / 4))
    );

    // Animate metrics with smooth transition
    const startTime = Date.now();
    const duration = 500; // ms

    const startValues = { ...metrics };
    const targetValues = {
      revenue: newRevenue,
      profit: newProfit,
      volume: newVolume,
      marketShare: newMarketShare,
    };

    const animateValues = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      if (progress < 1) {
        setMetrics({
          revenue:
            startValues.revenue +
            (targetValues.revenue - startValues.revenue) * easeProgress,
          profit:
            startValues.profit +
            (targetValues.profit - startValues.profit) * easeProgress,
          volume:
            startValues.volume +
            (targetValues.volume - startValues.volume) * easeProgress,
          marketShare:
            startValues.marketShare +
            (targetValues.marketShare - startValues.marketShare) * easeProgress,
        });

        requestAnimationFrame(animateValues);
      } else {
        setMetrics(targetValues);
      }
    };

    requestAnimationFrame(animateValues);
  }, [priceChange]);

  return (
    <div className="bg-card p-6 rounded-lg h-full">
      <SimpleHeading as="h3" className="flex items-center">
        <BarChart className="mr-2 h-5 w-5 text-primary" />
        Interactive Pricing Tool
      </SimpleHeading>
      <p className="text-muted-foreground mb-6">
        Adjust prices and instantly see the projected impact on revenue, profit,
        and market share.
      </p>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-sm">Price Adjustment</label>
            <span className="text-primary font-bold">
              {priceChange > 0 ? "+" : ""}
              {priceChange}%
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            value={priceChange}
            onChange={(e) => setPriceChange(parseInt(e.target.value))}
            className="w-full accent-primary"
            style={{
              height: "8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>-20%</span>
            <span>0%</span>
            <span>+20%</span>
          </div>
        </div>

        {/* Price impact chart */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Projected Impact</h4>
          <div className="h-[120px]">
            <LineChart
              data={chartData}
              compareData={adjustedChartData}
              height={120}
              showLegend={false}
              fillArea={false}
              showAnimation={true}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-primary rounded-full mr-1"></span>
              <span>Current</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-secondary rounded-full mr-1"></span>
              <span>After Price Change</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Metric
            label="Revenue Impact"
            value={metrics.revenue}
            valueColor={
              metrics.revenue >= 0 ? "text-green-500" : "text-red-500"
            }
          />
          <Metric
            label="Profit Impact"
            value={metrics.profit}
            valueColor={metrics.profit >= 0 ? "text-green-500" : "text-red-500"}
          />
          <Metric
            label="Sales Volume"
            value={metrics.volume}
            valueColor={
              metrics.volume >= 0 ? "text-green-500" : "text-amber-500"
            }
          />
          <Metric
            label="Market Share"
            value={metrics.marketShare}
            valueColor={
              metrics.marketShare >= 0 ? "text-green-500" : "text-amber-500"
            }
          />
        </div>
      </div>
    </div>
  );
}
