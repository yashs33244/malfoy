"use client";

import { useState, useEffect } from "react";
import { GradientCard } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import SimpleHeading from "./SimpleHeading";
import { LineChart, generateMarketData } from "@/components/ui/charts";

export default function PricingSimulations() {
  // Interactive price impact simulator
  const [priceChange, setPriceChange] = useState(5);
  const [revenueImpact, setRevenueImpact] = useState(12.3);
  const [profitImpact, setProfitImpact] = useState(18.7);
  const [salesVolume, setSalesVolume] = useState(-3.2);
  const [marketPosition, setMarketPosition] = useState(2.5);

  // Chart data
  const [revenueChartData, setRevenueChartData] = useState(
    generateMarketData(24, 100, 5)
  );
  const [optimizedChartData, setOptimizedChartData] = useState(
    generateMarketData(24, 105, 5)
  );

  // Toggle for simulation ROI calculator
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Update metrics when price change slider moves
  useEffect(() => {
    // Simplified calculation logic - in real app would be more complex
    setRevenueImpact(Math.round((priceChange * 2.1 + 1.8) * 10) / 10);
    setProfitImpact(Math.round((priceChange * 3.2 + 2.7) * 10) / 10);
    setSalesVolume(Math.round((priceChange * -0.9 + 1.3) * 10) / 10);
    setMarketPosition(Math.round((priceChange * 0.4 + 0.5) * 10) / 10);

    // Update chart data based on price change
    const baseIncrease = priceChange > 0 ? priceChange * 2 : 0;
    const volatilityIncrease = priceChange > 0 ? priceChange / 2 : 0;
    setOptimizedChartData(
      generateMarketData(24, 100 + baseIncrease, 5 + volatilityIncrease)
    );
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

          {/* Revenue Forecast Chart */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Revenue Forecast</h4>
            <div className="h-[120px]">
              <LineChart
                data={revenueChartData}
                compareData={showBeforeAfter ? optimizedChartData : undefined}
                height={120}
                showLegend={false}
                fillArea={false}
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

              {/* Interactive Graph */}
              <div className="bg-background rounded-lg p-3 h-36">
                <div className="h-full w-full relative flex items-end justify-between space-x-1">
                  {/* Graph bars - dynamically adjusted based on price change */}
                  {Array.from({ length: 10 }).map((_, i) => {
                    // Dynamic bar heights based on position and price change
                    let height;
                    if (i < 7) {
                      height = 40 + i * 3 + (priceChange > 0 ? priceChange : 0);
                    } else {
                      height = 65 + (i - 6) * 10 + priceChange * 1.5;
                    }

                    // Ensure height is between 20% and 95%
                    height = Math.max(20, Math.min(95, height));

                    return (
                      <div
                        key={i}
                        className={`flex-1 ${
                          i >= 7
                            ? priceChange >= 5
                              ? "bg-primary"
                              : "bg-primary/50"
                            : "bg-blue-500/20"
                        } rounded-t-sm relative group transition-all duration-200`}
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {i >= 7 ? "AI Optimized" : "Current"}: $
                          {(
                            100 +
                            i * 5 +
                            (i >= 7 ? priceChange * 2 : 0)
                          ).toLocaleString()}
                          k
                        </div>
                      </div>
                    );
                  })}

                  {/* AI recommendation highlight */}
                  <div className="absolute -bottom-6 right-0 text-xs text-primary font-medium w-3/10 text-right">
                    AI Recommended <span className="animate-pulse">•</span>
                  </div>

                  {/* Trend line */}
                  <div className="absolute inset-0 pointer-events-none flex items-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-blue-300/20 via-blue-400/50 to-primary"></div>
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
                    +{marketPosition}%
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-green-500/20"></div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-green-500"
                    style={{ width: `${Math.min(100, marketPosition * 15)}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full py-2 bg-primary text-white rounded-md flex items-center justify-center group hover:bg-primary/90 transition-colors">
                <span>Apply AI Recommendation</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
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
