"use client";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  FileCheck,
  ThumbsUp,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { BarChart, chartColors } from "@/components/ui/shadcn-charts";

import {
  TimeframeType,
  IndustryModifiers,
  Scenarios,
  ChartDataPoint,
  IndustryType,
} from "@/types/features";
import { IndustryCard } from "./IndustryCard";
import { ScenarioSelector } from "./ScenerioSelector";
import { TimePeriodSelector } from "./TimePeriodSelector";
import { ToggleSwitch } from "./ToggleSwitch";
import { PriceSlider } from "./PriceSlider";
import { SimulationImpactCard } from "./SimulationSandbox";
import { RevenueForecastChart } from "./RevenueForcastChart";

export default function PricingSimulations() {
  // Interactive price impact simulator
  const [priceChange, setPriceChange] = useState(5);
  const [revenueImpact, setRevenueImpact] = useState(12.3);
  const [profitImpact, setProfitImpact] = useState(18.7);
  const [salesVolume, setSalesVolume] = useState(-3.2);
  const [marketPosition, setMarketPosition] = useState(2.5);
  const [customerRetention, setCustomerRetention] = useState(1.8);
  const [competitiveIndex, setCompetitiveIndex] = useState(3.1);

  // Time series selection
  const [timeframe, setTimeframe] = useState<TimeframeType>("monthly");

  // Industry selection
  const [industry, setIndustry] = useState<IndustryType>("software");

  // Toggle for advanced view
  const [showAdvancedView, setShowAdvancedView] = useState(false);

  // Toggle for simulation ROI calculator
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Selected scenario
  const [selectedScenario, setSelectedScenario] = useState("moderate");

  // Industry-specific elasticity modifiers
  const industryModifiers: IndustryModifiers = {
    software: { elasticity: 1.2, profitMargin: 1.5, volumeSensitivity: 0.7 },
    retail: { elasticity: 1.8, profitMargin: 0.9, volumeSensitivity: 1.5 },
    manufacturing: {
      elasticity: 0.6,
      profitMargin: 1.2,
      volumeSensitivity: 1.1,
    },
    healthcare: { elasticity: 0.4, profitMargin: 1.7, volumeSensitivity: 0.5 },
    finance: { elasticity: 0.9, profitMargin: 2.1, volumeSensitivity: 0.8 },
  };

  // Scenarios
  const scenarios: Scenarios = {
    conservative: {
      priceChange: 2,
      description: "Minimal price adjustment with stable metrics",
    },
    moderate: {
      priceChange: 5,
      description: "Balanced approach with moderate growth",
    },
    aggressive: {
      priceChange: 12,
      description: "High growth potential with some volume risk",
    },
    ai_optimal: {
      priceChange: 8,
      description: "AI-recommended optimal price point",
    },
  };

  // Generate time series data with seasonality
  const generateTimeSeriesData = (
    priceChange: number,
    timeframe: TimeframeType,
    industry: IndustryType
  ): ChartDataPoint[] => {
    const modifier = industryModifiers[industry];
    const periods =
      timeframe === "monthly" ? 12 : timeframe === "quarterly" ? 4 : 24;
    const periodLabel = (i: number): string => {
      if (timeframe === "monthly") {
        return `Month ${i + 1}`;
      } else if (timeframe === "quarterly") {
        return `Q${i + 1}`;
      } else {
        return `Week ${i + 1}`;
      }
    };

    // Base growth pattern
    const baseGrowth = 1 + priceChange * modifier.elasticity * 0.01;

    // Industry-specific seasonality
    const seasonalityMap = {
      software: 0.05,
      retail: 0.15,
      manufacturing: 0.07,
      healthcare: 0.03,
      finance: 0.08,
    };
    const seasonalityAmplitude = seasonalityMap[industry] || 0.05;

    // Generate data with seasonality
    return Array.from({ length: periods }).map((_, i) => {
      // Base value with growth trend
      const baseValue = 100 + i * 1.2;

      // Add seasonality
      const seasonalFactor =
        Math.sin((i / periods) * Math.PI * 2) * seasonalityAmplitude;

      // Add randomness
      const randomness = Math.random() * 0.04 - 0.02;

      // Calculate values
      const currentValue = baseValue * (1 + seasonalFactor + randomness);
      const optimizedValue =
        currentValue * Math.pow(baseGrowth, i / periods + 0.2);
      const aiOptimizedValue =
        optimizedValue *
        (1 + 0.05 * Math.tanh((i / periods) * 3)) *
        (1 + (i > periods / 3 ? 0.03 : 0));

      return {
        name: periodLabel(i),
        Current: Math.round(currentValue * 10) / 10,
        Optimized: Math.round(optimizedValue * 10) / 10,
        AIOptimized: Math.round(aiOptimizedValue * 10) / 10,
      };
    });
  };

  // Generate competitor data
  const generateCompetitorData = (
    priceChange: number,
    industry: IndustryType
  ): ChartDataPoint[] => {
    const competitorsMap = {
      software: [
        "Industry Leader",
        "Your Company",
        "Competitor A",
        "Competitor B",
        "Competitor C",
      ],
      retail: [
        "Market Leader",
        "Your Company",
        "Main Competitor",
        "Budget Option",
        "Premium Brand",
      ],
      manufacturing: [
        "Industry Giant",
        "Your Company",
        "Regional Player",
        "Specialty Maker",
        "Budget Manufacturer",
      ],
      healthcare: [
        "Market Leader",
        "Your Company",
        "National Provider",
        "Regional Network",
        "Boutique Service",
      ],
      finance: [
        "Major Bank",
        "Your Company",
        "Traditional Provider",
        "Digital Challenger",
        "Niche Service",
      ],
    };

    const competitors = competitorsMap[industry] || [
      "Market Leader",
      "Your Company",
      "Competitor A",
      "Competitor B",
      "Competitor C",
    ];

    // Base market share values
    const baseSharesMap = {
      software: [35, 18, 25, 12, 10],
      retail: [30, 15, 22, 20, 13],
      manufacturing: [40, 20, 15, 15, 10],
      healthcare: [35, 22, 18, 15, 10],
      finance: [42, 16, 20, 12, 10],
    };

    const baseShares = baseSharesMap[industry] || [35, 20, 20, 15, 10];

    // Calculate impact on market share
    const optimizedShares = baseShares.map((share, i) => {
      if (i === 1) {
        // Your company
        return (
          share *
          (1 + (priceChange > 0 ? priceChange * 0.1 : priceChange * 0.15))
        );
      }
      return (
        share *
        (1 - (priceChange > 0 ? priceChange * 0.02 : priceChange * 0.03))
      );
    });

    // Adjust to ensure sum is 100
    const optimizedTotal = optimizedShares.reduce((a, b) => a + b, 0);
    const adjustedShares = optimizedShares.map(
      (share) => (share / optimizedTotal) * 100
    );

    return competitors.map((name, i) => {
      return {
        name,
        "Current Share": Math.round(baseShares[i]),
        "Projected Share": Math.round(adjustedShares[i]),
      };
    });
  };

  // Apply selected scenario
  const applyScenario = (scenario: string) => {
    setSelectedScenario(scenario);
    setPriceChange(scenarios[scenario].priceChange);
  };

  // Update data when inputs change
  useEffect(() => {
    // Get industry-specific modifier
    const modifier = industryModifiers[industry];

    // Calculate impact factors
    const elasticityFactor = 2.1 * modifier.elasticity;
    const profitMarginFactor = 3.2 * modifier.profitMargin;
    const volumeElasticityFactor = -0.9 * modifier.volumeSensitivity;
    const marketPositionFactor = 0.4 * (priceChange > 0 ? 1 : 0.5);
    const retentionFactor = -0.3 * (priceChange > 0 ? 1 : 0.7);
    const competitiveIndexFactor = 0.5 * (priceChange > 0 ? 1.2 : 0.6);

    // Apply calculations
    setRevenueImpact(
      Math.round((priceChange * elasticityFactor + 1.8) * 10) / 10
    );
    setProfitImpact(
      Math.round((priceChange * profitMarginFactor + 2.7) * 10) / 10
    );
    setSalesVolume(
      Math.round((priceChange * volumeElasticityFactor + 1.3) * 10) / 10
    );
    setMarketPosition(
      Math.round((priceChange * marketPositionFactor + 0.5) * 10) / 10
    );
    setCustomerRetention(
      Math.round((priceChange * retentionFactor + 1.5) * 10) / 10
    );
    setCompetitiveIndex(
      Math.round((priceChange * competitiveIndexFactor + 1.0) * 10) / 10
    );
  }, [priceChange, industry]);

  // Generate data for charts based on current settings
  const revenueData = useMemo(
    () => generateTimeSeriesData(priceChange, timeframe, industry),
    [priceChange, timeframe, industry]
  );

  const competitorData = useMemo(
    () => generateCompetitorData(priceChange, industry),
    [priceChange, industry]
  );

  // Function to handle industry selection with proper type conversion
  const handleIndustrySelect = (id: string) => {
    setIndustry(id as IndustryType);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Column - Pricing Simulations Title and Controls */}
      <div className="md:col-span-5 space-y-6">
        {/* Industry Selection */}
        <div className="bg-[#c9f0ff] dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 pb-10">
          <div className="text-5xl text-[#003d5b] font-bold flex items-center mb-10">
            Industry Specific Optimizer
          </div>
          <div className="grid grid-cols-2 gap-4">
            <IndustryCard
              id="software"
              name="Software / SaaS"
              icon={<Zap className="h-5 w-5" />}
              description="B2B & B2C software products"
              active={industry === "software"}
              onClick={handleIndustrySelect}
            />
            <IndustryCard
              id="retail"
              name="Retail"
              icon={<ArrowRight className="h-5 w-5" />}
              description="Consumer goods & e-commerce"
              active={industry === "retail"}
              onClick={handleIndustrySelect}
            />
            <IndustryCard
              id="manufacturing"
              name="Manufacturing"
              icon={<FileCheck className="h-5 w-5" />}
              description="Industrial & consumer products"
              active={industry === "manufacturing"}
              onClick={handleIndustrySelect}
            />
            <IndustryCard
              id="healthcare"
              name="Healthcare"
              icon={<ThumbsUp className="h-5 w-5" />}
              description="Medical & health services"
              active={industry === "healthcare"}
              onClick={handleIndustrySelect}
            />
            <IndustryCard
              id="finance"
              name="Financial"
              icon={<TrendingUp className="h-5 w-5" />}
              description="Banking & financial services"
              active={industry === "finance"}
              onClick={handleIndustrySelect}
            />
          </div>
        </div>

        {/* Revenue Optimizer */}
        <div className="bg-[#ffd2e0] dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 pt-10">
          <div className="text-5xl text-[#800000] font-bold flex items-center mb-10">
            AI-Powered Revenue Optimizer
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Our advanced ML algorithms analyze market data, competitor pricing,
            and customer behavior to simulate different pricing strategies.
          </p>

          {/* Scenario Selection */}
          <div className="mb-8">
            <h4 className="text-base font-medium mb-4">
              Choose Pricing Scenario
            </h4>
            <ScenarioSelector
              scenarios={scenarios}
              selectedScenario={selectedScenario}
              onSelect={applyScenario}
            />
          </div>

          {/* Time Period Selection */}
          <div className="mb-8">
            <h4 className="text-base font-medium mb-4">Select Time Period</h4>
            <TimePeriodSelector
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
          </div>

          {/* Toggle Button for Before/After View */}
          <div>
            <h4 className="text-base font-medium mb-4">Comparison View</h4>
            <ToggleSwitch
              enabled={showBeforeAfter}
              onChange={() => setShowBeforeAfter(!showBeforeAfter)}
              leftLabel="Current View"
              rightLabel="AI Optimized"
            />
          </div>
        </div>
      </div>

      {/* Right Column - Dynamic Simulator and Results */}
      <div className="md:col-span-7 grid grid-cols-1 gap-6 mr-10">
        {/* Price Impact Simulator */}
        <div className="bg-[#daf9d4] dark:bg-slate-800 rounded-xl p-8">
          <div className="text-4xl text-[#005900] font-bold flex items-center mb-6">
            Dynamic Price Impact Simulator
          </div>

          {/* Price Slider */}
          <div className="mb-2">
            <PriceSlider
              value={priceChange}
              onChange={setPriceChange}
              optimalPoint={scenarios.ai_optimal.priceChange}
            />
          </div>

          {/* Impact Metrics */}
          <div>
            <h4 className="text-base mb-4">Impact Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              <SimulationImpactCard
                label="Revenue Impact"
                value={revenueImpact}
                prefix="+"
                isPositive={true}
                description="Projected change in total revenue"
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <SimulationImpactCard
                label="Profit Margin"
                value={profitImpact}
                prefix="+"
                isPositive={true}
                description="Expected change in profit margins"
                icon={<TrendingUp className="h-4 w-4" />}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <SimulationImpactCard
                label="Sales Volume"
                value={salesVolume}
                prefix={salesVolume >= 0 ? "+" : ""}
                isPositive={salesVolume >= 0}
                description="Projected change in unit sales"
                icon={<ChevronDown className="h-4 w-4" />}
              />
              <SimulationImpactCard
                label="Market Position"
                value={marketPosition}
                prefix="+"
                isPositive={true}
                description="Estimated market share position"
                icon={<ChevronUp className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>

        {/* Revenue Forecast Chart */}
        <div className="bg-[#c9f0ff] dark:bg-slate-800 rounded-xl p-6">
          <RevenueForecastChart
            data={revenueData}
            timeframe={timeframe}
            showComparison={showBeforeAfter}
          />
        </div>

        {/* Market Position Analysis */}
        <div className="bg-[#daf9d4] dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 ">
          <h4 className="text-xl font-medium mb-4">Market Position Analysis</h4>
          <div className="bg-white/60 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="h-[220px]">
              <BarChart
                data={competitorData}
                keys={
                  showBeforeAfter
                    ? ["Current Share", "Projected Share"]
                    : ["Current Share"]
                }
                height={220}
                colors={[chartColors.accent3, chartColors.primary]}
                showLegend={true}
                showGrid={false}
              />
            </div>
            {showBeforeAfter && (
              <div className="flex justify-end mt-2">
                <div className="text-xs text-blue-600 font-medium flex items-center">
                  AI Optimized Projection{" "}
                  <span className="ml-1 inline-block h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
