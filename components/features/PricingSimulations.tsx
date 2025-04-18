"use client";

import { useState, useEffect } from "react";
import { GradientCard } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import SimpleHeading from "./SimpleHeading";
import {
  AreaChart,
  BarChart,
  LineChart,
  chartColors,
} from "@/components/ui/shadcn-charts";

export default function PricingSimulations() {
  // Interactive price impact simulator
  const [priceChange, setPriceChange] = useState(5);
  const [revenueImpact, setRevenueImpact] = useState(12.3);
  const [profitImpact, setProfitImpact] = useState(18.7);
  const [salesVolume, setSalesVolume] = useState(-3.2);
  const [marketPosition, setMarketPosition] = useState(2.5);

  // Toggle for simulation ROI calculator
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Generate chart data
  const generateRevenueData = (priceChange: number) => {
    const baseIncrease = priceChange > 0 ? priceChange * 2 : 0;
    const volatilityIncrease = priceChange > 0 ? priceChange / 2 : 0;

    return Array.from({ length: 24 }).map((_, i) => {
      const day = `Day ${i + 1}`;
      const volatility = 5 + volatilityIncrease;
      const currentMultiplier =
        Math.sin(i / 3) * volatility + 100 + baseIncrease;
      const optimizedMultiplier =
        currentMultiplier * (1 + (priceChange > 0 ? priceChange / 100 : 0));

      return {
        name: day,
        Current: Math.round(currentMultiplier),
        Optimized: Math.round(optimizedMultiplier),
      };
    });
  };

  // Generate bar chart data for revenue forecast
  const generateBarData = (priceChange: number) => {
    const baseValue = 100;
    const quarters = ["Q1", "Q2", "Q3", "Q4"];

    return quarters.map((quarter, i) => {
      const currentValue = baseValue + i * 5;
      const optimizedValue = currentValue * (1 + priceChange / 100);

      return {
        name: quarter,
        Current: currentValue,
        Optimized: Math.round(optimizedValue),
      };
    });
  };

  // Chart data
  const [revenueChartData, setRevenueChartData] = useState(
    generateRevenueData(5)
  );
  const [revenueBarData, setRevenueBarData] = useState(generateBarData(5));

  // Update metrics when price change slider moves
  useEffect(() => {
    // Simplified calculation logic - in real app would be more complex
    setRevenueImpact(Math.round((priceChange * 2.1 + 1.8) * 10) / 10);
    setProfitImpact(Math.round((priceChange * 3.2 + 2.7) * 10) / 10);
    setSalesVolume(Math.round((priceChange * -0.9 + 1.3) * 10) / 10);
    setMarketPosition(Math.round((priceChange * 0.4 + 0.5) * 10) / 10);

    // Update chart data based on price change
    setRevenueChartData(generateRevenueData(priceChange));
    setRevenueBarData(generateBarData(priceChange));
  }, [priceChange]);

  return (
    <div className="space-y-16">
      {/* AI-Powered Revenue Optimizer */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <SimpleHeading>AI-Powered Revenue Optimizer</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Our advanced ML algorithms analyze market data, competitor pricing,
            and customer behavior to simulate different pricing strategies and
            their impact on your business metrics.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Real-time AI simulations with 94% accuracy
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Forecast revenue, profit, and market share
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Compare multiple AI-generated optimal strategies
            </li>
          </ul>

          {/* Toggle Button for Before/After View */}
          <div className="mt-6 flex items-center space-x-3">
            <span
              className={`text-sm ${
                !showBeforeAfter ? "font-bold" : "text-muted-foreground"
              }`}
            >
              Current View
            </span>
            <button
              className="relative h-6 w-12 rounded-full bg-muted flex items-center transition-colors"
              onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            >
              <div
                className={`h-5 w-5 rounded-full bg-primary transition-transform ${
                  showBeforeAfter ? "translate-x-6" : "translate-x-1"
                }`}
              ></div>
            </button>
            <span
              className={`text-sm ${
                showBeforeAfter ? "font-bold" : "text-muted-foreground"
              }`}
            >
              AI Optimized
            </span>
          </div>

          {/* Revenue Forecast Chart - Using Area Chart */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Revenue Forecast</h4>
            <div className="h-[160px]">
              <AreaChart
                data={revenueChartData}
                keys={showBeforeAfter ? ["Current", "Optimized"] : ["Current"]}
                height={160}
                colors={[chartColors.accent3, chartColors.primary]}
                showLegend={true}
                showGrid={true}
              />
            </div>
          </div>

          {/* Revenue by Quarter - Bar Chart */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">
              Quarterly Revenue Projection
            </h4>
            <div className="h-[160px]">
              <BarChart
                data={revenueBarData}
                keys={showBeforeAfter ? ["Current", "Optimized"] : ["Current"]}
                height={160}
                colors={[chartColors.accent3, chartColors.primary]}
                showLegend={true}
                showGrid={false}
              />
            </div>
          </div>
        </div>
        <div>
          <GradientCard className="h-auto w-full p-6 overflow-visible">
            <SimpleHeading>Dynamic Price Impact Simulator</SimpleHeading>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm">Price Change (%)</label>
                  <span className="text-primary font-bold">
                    {priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`}
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

              {/* Interactive Graph - Line Chart */}
              <div className="bg-background rounded-lg p-3 h-40">
                <LineChart
                  data={generateRevenueData(priceChange).slice(-10)}
                  keys={["Current", "Optimized"]}
                  height={140}
                  colors={[chartColors.accent3, chartColors.primary]}
                  showLegend={false}
                  showGrid={false}
                  interactive={true}
                  dotSize={3}
                />

                {/* AI recommendation indicator */}
                <div className="flex justify-end mt-1">
                  <div className="text-xs text-primary font-medium flex items-center">
                    AI Recommended{" "}
                    <span className="ml-1 inline-block h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded-lg relative overflow-hidden">
                  <p className="text-xs text-muted-foreground">
                    Projected Revenue Impact
                  </p>
                  <p className="text-xl font-bold text-green-500">
                    +{revenueImpact}%
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500/20"></div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-green-500"
                    style={{ width: `${Math.min(100, revenueImpact * 3)}%` }}
                  ></div>
                </div>

                <div className="bg-background p-3 rounded-lg relative overflow-hidden">
                  <p className="text-xs text-muted-foreground">
                    Profit Margin Impact
                  </p>
                  <p className="text-xl font-bold text-green-500">
                    +{profitImpact}%
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500/20"></div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-green-500"
                    style={{ width: `${Math.min(100, profitImpact * 3)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded-lg relative overflow-hidden">
                  <p className="text-xs text-muted-foreground">Sales Volume</p>
                  <p
                    className={`text-xl font-bold ${
                      salesVolume >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {salesVolume >= 0 ? "+" : ""}
                    {salesVolume}%
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-muted-foreground/20"></div>
                  <div
                    className={`absolute bottom-0 left-0 h-1 ${
                      salesVolume >= 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(100, Math.abs(salesVolume * 3))}%`,
                    }}
                  ></div>
                </div>

                <div className="bg-background p-3 rounded-lg relative overflow-hidden">
                  <p className="text-xs text-muted-foreground">
                    Market Position
                  </p>
                  <p className="text-xl font-bold text-green-500">
                    +{marketPosition}
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500/20"></div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-green-500"
                    style={{ width: `${Math.min(100, marketPosition * 15)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </GradientCard>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <BorderBeam
            className="h-auto rounded-xl bg-card p-6"
            beamDuration={8000}
            beamSize={100}
          >
            <SimpleHeading>AI Performance Analysis</SimpleHeading>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-4 flex flex-col">
                <h5 className="text-sm font-medium mb-3">
                  Before AI Optimization
                </h5>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative h-32 w-32 mx-auto mb-3">
                      {/* Circular progress indicator */}
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset="113"
                          className="text-muted-foreground"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">60%</span>
                        <span className="text-xs text-muted-foreground">
                          Efficiency
                        </span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold">$125,000</p>
                    <p className="text-xs text-muted-foreground">
                      Monthly Revenue
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 flex flex-col relative overflow-hidden">
                <h5 className="text-sm font-medium mb-3">
                  After AI Optimization
                </h5>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative h-32 w-32 mx-auto mb-3">
                      {/* Circular progress indicator */}
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset="28"
                          className="text-primary"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">90%</span>
                        <span className="text-xs text-primary/70">
                          Efficiency
                        </span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold">$187,500</p>
                    <p className="text-xs text-muted-foreground">
                      Monthly Revenue
                    </p>
                  </div>
                </div>

                {/* AI Badge */}
                <div className="absolute top-3 right-3 bg-primary/20 text-primary text-xs py-1 px-2 rounded-full flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  AI Optimized
                </div>
              </div>

              {/* Growth indicators */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-card px-3 py-2 rounded-full shadow-lg">
                <div className="flex items-center text-green-500 font-bold">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+50%</span>
                </div>
              </div>
            </div>
          </BorderBeam>
        </div>
        <div className="order-1 md:order-2">
          <SimpleHeading>ML-Driven Pricing Strategy</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Our ML models analyze thousands of market factors in real-time to
            continuously optimize your pricing strategy for maximum revenue and
            profit growth.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Dynamic price elasticity modeling
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Predictive analytics for market trends
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Continuous learning from sales performance
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Automatic pricing optimization
            </li>
          </ul>

          <div className="mt-6 bg-muted/50 rounded-lg p-4">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-primary mr-3 mt-1" />
              <div>
                <h4 className="font-medium mb-1">AI Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI suggests a {priceChange > 0 ? priceChange : 5}% price
                  increase for your premium product line would result in a{" "}
                  {revenueImpact}% revenue growth with minimal impact on sales
                  volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
