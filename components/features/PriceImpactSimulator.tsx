"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { GradientCard } from "@/components/ui/card";
import SimpleHeading from "./SimpleHeading";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type MetricType = {
  label: string;
  value: number;
  prefix: string;
  color: "positive" | "negative" | "neutral";
};

const Metric = ({ label, value, prefix, color }: MetricType) => {
  const colorClasses = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-500",
  };

  const Icon = value > 0 ? ArrowUp : value < 0 ? ArrowDown : Minus;

  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-1.5">
        <Icon className={cn("h-4 w-4", colorClasses[color])} />
        <p className={cn("text-xl font-bold", colorClasses[color])}>
          {prefix}
          {Math.abs(value).toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default function PriceImpactSimulator() {
  const [priceChange, setPriceChange] = useState(0);
  const [metrics, setMetrics] = useState({
    revenue: 0,
    profit: 0,
    volume: 0,
    marketShare: 0,
  });

  // Simulate the impact of price changes on various metrics
  useEffect(() => {
    // These are simplified models for demonstration
    // In a real application, these would be more complex models
    const revenueImpact = priceChange * 0.8; // Less than proportional impact
    const profitImpact = priceChange * 1.5; // Higher profit margins on higher prices
    const volumeImpact = -priceChange * 1.2; // Inverse relationship with price
    const marketShareImpact = -priceChange * 0.7; // Inverse but less sensitive

    // Simulate delayed update for a smooth animation effect
    const timeout = setTimeout(() => {
      setMetrics({
        revenue: revenueImpact,
        profit: profitImpact,
        volume: volumeImpact,
        marketShare: marketShareImpact,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [priceChange]);

  return (
    <GradientCard
      className="p-6 space-y-6"
      glowColor="rgba(0, 102, 255, 0.15)"
      hoverEffect
    >
      <SimpleHeading as="h3">Dynamic Price Impact Simulator</SimpleHeading>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Price Change</p>
          <p className="font-medium">
            {priceChange > 0 ? "+" : ""}
            {priceChange}%
          </p>
        </div>
        <Slider
          value={[priceChange]}
          min={-20}
          max={20}
          step={1}
          onValueChange={(values) => setPriceChange(values[0])}
          className="my-4"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Metric
          label="Revenue Impact"
          value={metrics.revenue}
          prefix={metrics.revenue >= 0 ? "+" : ""}
          color={
            metrics.revenue > 0
              ? "positive"
              : metrics.revenue < 0
              ? "negative"
              : "neutral"
          }
        />
        <Metric
          label="Profit Margin"
          value={metrics.profit}
          prefix={metrics.profit >= 0 ? "+" : ""}
          color={
            metrics.profit > 0
              ? "positive"
              : metrics.profit < 0
              ? "negative"
              : "neutral"
          }
        />
        <Metric
          label="Sales Volume"
          value={metrics.volume}
          prefix={metrics.volume >= 0 ? "+" : ""}
          color={
            metrics.volume > 0
              ? "positive"
              : metrics.volume < 0
              ? "negative"
              : "neutral"
          }
        />
        <Metric
          label="Market Share"
          value={metrics.marketShare}
          prefix={metrics.marketShare >= 0 ? "+" : ""}
          color={
            metrics.marketShare > 0
              ? "positive"
              : metrics.marketShare < 0
              ? "negative"
              : "neutral"
          }
        />
      </div>
    </GradientCard>
  );
}
