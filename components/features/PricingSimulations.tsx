"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  FileCheck,
  ThumbsUp,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Calendar,
  Info,
} from "lucide-react";
import SimpleHeading from "./SimpleHeading";
import {
  AreaChart,
  BarChart,
  LineChart,
  chartColors,
} from "@/components/ui/shadcn-charts";

import { IndustryCard } from "./IndustryCard";
import { Badge } from "@/components/ui/badge";
import { SimulationImpactCard } from "./SimulationImpactCard";
import { TimePeriodSelector } from "./TimePeriodSelector";
import { ScenarioSelector } from "./ScenarioSelector";
import { ToggleSwitch } from "./ToggleSwitch";
import { RevenueForecastChart } from "./RevenueForecastChart";
import { PriceSlider } from "./PriceSlider";
import {
  TimeframeType,
  IndustryModifiers,
  Scenarios,
  PieDataPoint,
} from "@/types/features";

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
  const [industry, setIndustry] = useState("software");

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

  // Time series data generator with realistic seasonality patterns
  const generateTimeSeriesData = (
    priceChange: number,
    timeframe: TimeframeType,
    industry: string
  ) => {
    const modifier = industryModifiers[industry];
    const periods =
      timeframe === "monthly" ? 12 : timeframe === "quarterly" ? 4 : 24;
    const periodLabel =
      timeframe === "monthly"
        ? (i: number) => `Month ${i + 1}`
        : timeframe === "quarterly"
        ? (i: number) => `Q${i + 1}`
        : (i: number) => `Week ${i + 1}`;

    // Base growth pattern
    const baseGrowth = 1 + priceChange * modifier.elasticity * 0.01;

    // Industry-specific seasonality patterns
    const seasonalityAmplitude =
      {
        software: 0.05,
        retail: 0.15,
        manufacturing: 0.07,
        healthcare: 0.03,
        finance: 0.08,
      }[industry] || 0.05;

    // Generate realistic data with seasonality
    return Array.from({ length: periods }).map((_, i) => {
      // Calculate base value with growth trend
      const baseValue = 100 + i * 1.2;

      // Add industry-specific seasonality
      const seasonalFactor =
        Math.sin((i / periods) * Math.PI * 2) * seasonalityAmplitude;

      // Add some randomness for realism
      const randomness = Math.random() * 0.04 - 0.02;

      // Calculate current value with seasonality and randomness
      const currentValue = baseValue * (1 + seasonalFactor + randomness);

      // Apply price change impact with industry-specific elasticity
      const optimizedValue =
        currentValue * Math.pow(baseGrowth, i / periods + 0.2);

      // Add AI-optimized value with more sophisticated pattern
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

  // Generate customer segment data for pie chart
  const generateSegmentData = (
    priceChange: number,
    industry: string
  ): PieDataPoint[] => {
    const segmentNames = {
      software: ["Enterprise", "SMB", "Startup", "Individual"],
      retail: ["Premium", "Mid-market", "Budget", "Occasional"],
      manufacturing: ["Tier 1", "Tier 2", "Tier 3", "Small batch"],
      healthcare: ["Hospital", "Clinic", "Private", "Government"],
      finance: ["Corporate", "Small Business", "Premium", "Standard"],
    }[industry] || ["Segment 1", "Segment 2", "Segment 3", "Segment 4"];

    // Base values with industry-specific distribution
    const baseValues = {
      software: [45, 30, 15, 10],
      retail: [20, 40, 30, 10],
      manufacturing: [35, 40, 20, 5],
      healthcare: [50, 25, 15, 10],
      finance: [30, 25, 30, 15],
    }[industry] || [25, 25, 25, 25];

    // Impact factors (how each segment responds to price changes)
    const impactFactors = {
      software: [0.2, 0.5, 1.2, 1.5],
      retail: [0.3, 0.6, 1.0, 1.4],
      manufacturing: [0.1, 0.3, 0.8, 1.2],
      healthcare: [0.2, 0.4, 0.6, 1.0],
      finance: [0.3, 0.5, 0.7, 1.1],
    }[industry] || [0.3, 0.6, 0.9, 1.2];

    // Calculate changes based on price impact
    return segmentNames.map((name, i) => {
      const impact =
        priceChange > 0
          ? 1 - priceChange * impactFactors[i] * 0.01
          : 1 + Math.abs(priceChange) * impactFactors[i] * 0.005;

      const newValue = Math.max(1, Math.round(baseValues[i] * impact));

      return {
        name,
        value: newValue,
      };
    });
  };

  // Generate competitive benchmark data
  const generateCompetitorData = (priceChange: number, industry: string) => {
    const competitors = {
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
    }[industry] || [
      "Market Leader",
      "Your Company",
      "Competitor A",
      "Competitor B",
      "Competitor C",
    ];

    // Base market share values
    const baseShares = {
      software: [35, 18, 25, 12, 10],
      retail: [30, 15, 22, 20, 13],
      manufacturing: [40, 20, 15, 15, 10],
      healthcare: [35, 22, 18, 15, 10],
      finance: [42, 16, 20, 12, 10],
    }[industry] || [35, 20, 20, 15, 10];

    // Calculate impact of price change on market share
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

    // Calculate total and adjust to ensure they sum to 100
    const optimizedTotal = optimizedShares.reduce(
      (a: number, b: number) => a + b,
      0
    );
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

  // Generate elasticity curve data
  const generateElasticityCurve = () => {
    // Create data points from -20% to +20% price change
    return Array.from({ length: 41 }).map((_, i) => {
      const priceChange = i - 20;

      // Apply elasticity formula with industry-specific modifier
      const modifier = industryModifiers[industry];
      const elasticityFactor = 2.1 * modifier.elasticity;
      const volumeElasticityFactor = -0.9 * modifier.volumeSensitivity;

      const revenueImpact = priceChange * elasticityFactor + 1.8;
      const volumeImpact = priceChange * volumeElasticityFactor + 1.3;

      return {
        name: `${priceChange}%`,
        "Revenue Impact": Math.round(revenueImpact * 10) / 10,
        "Volume Impact": Math.round(volumeImpact * 10) / 10,
      };
    });
  };

  // Memoize the elasticity curve data to avoid recalculation
  const elasticityCurveData = useMemo(
    () => generateElasticityCurve(),
    [industry]
  );

  // Update data and metrics when inputs change
  useEffect(() => {
    // Get industry-specific modifier
    const modifier = industryModifiers[industry];

    // Realistic calculation logic based on price elasticity models
    const elasticityFactor = 2.1 * modifier.elasticity;
    const profitMarginFactor = 3.2 * modifier.profitMargin;
    const volumeElasticityFactor = -0.9 * modifier.volumeSensitivity;
    const marketPositionFactor = 0.4 * (priceChange > 0 ? 1 : 0.5);
    const retentionFactor = -0.3 * (priceChange > 0 ? 1 : 0.7);
    const competitiveIndexFactor = 0.5 * (priceChange > 0 ? 1.2 : 0.6);

    // Apply calculations with appropriate rounding
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

  // Apply selected scenario
  const applyScenario = (scenario: string) => {
    setSelectedScenario(scenario);
    setPriceChange(scenarios[scenario as keyof typeof scenarios].priceChange);
  };

  // Generate data for charts based on current settings
  const revenueData = useMemo(
    () => generateTimeSeriesData(priceChange, timeframe, industry),
    [priceChange, timeframe, industry]
  );

  const segmentData = useMemo(
    () => generateSegmentData(priceChange, industry),
    [priceChange, industry]
  );

  const competitorData = useMemo(
    () => generateCompetitorData(priceChange, industry),
    [priceChange, industry]
  );

  return (
    <div className="space-y-16">
      {/* Industry Selection */}
      <section className=" rounded-xl p-6 md:p-8 ">
        <h3 className="text-xl font-semibold mb-6">Select Your Industry</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <IndustryCard
            id="software"
            name="Software / SaaS"
            icon={<Zap className="h-5 w-5" />}
            description="B2B & B2C software products"
            active={industry === "software"}
            onClick={setIndustry}
          />
          <IndustryCard
            id="retail"
            name="Retail"
            icon={<ArrowRight className="h-5 w-5" />}
            description="Consumer goods & e-commerce"
            active={industry === "retail"}
            onClick={setIndustry}
          />
          <IndustryCard
            id="manufacturing"
            name="Manufacturing"
            icon={<FileCheck className="h-5 w-5" />}
            description="Industrial & consumer products"
            active={industry === "manufacturing"}
            onClick={setIndustry}
          />
          <IndustryCard
            id="healthcare"
            name="Healthcare"
            icon={<ThumbsUp className="h-5 w-5" />}
            description="Medical & health services"
            active={industry === "healthcare"}
            onClick={setIndustry}
          />
          <IndustryCard
            id="finance"
            name="Financial"
            icon={<TrendingUp className="h-5 w-5" />}
            description="Banking & financial services"
            active={industry === "finance"}
            onClick={setIndustry}
          />
        </div>
      </section>

      {/* Main content */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column: Revenue Optimizer */}
        <section className="space-y-8">
          <div className="ounded-xl p-6 ">
            <h3 className="text-xl font-semibold mb-6">
              AI-Powered Revenue Optimizer
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Our advanced ML algorithms analyze market data, competitor
              pricing, and customer behavior to simulate different pricing
              strategies.
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
            <div className="mb-8">
              <h4 className="text-base font-medium mb-4">Comparison View</h4>
              <ToggleSwitch
                enabled={showBeforeAfter}
                onChange={() => setShowBeforeAfter(!showBeforeAfter)}
                leftLabel="Current View"
                rightLabel="AI Optimized"
              />
            </div>

            {/* AI-Optimized Revenue Forecast Chart */}
            <div className="mb-8">
              <h4 className="text-base font-medium mb-4">Revenue Forecast</h4>
              <RevenueForecastChart
                data={revenueData}
                timeframe={timeframe}
                showComparison={showBeforeAfter}
              />
            </div>
          </div>

          {/* Customer Segments Analysis */}
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
            <h4 className="text-base font-medium mb-6">
              Customer Segment Analysis
            </h4>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h5 className="text-sm font-medium mb-4">Segment Distribution</h5>
              <ul className="space-y-3 text-sm">
                {segmentData.map((segment, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">
                      {segment.name}
                    </span>
                    <div className="flex items-center">
                      <div className="w-36 h-2 bg-slate-100 dark:bg-slate-700 rounded-full mr-3">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${segment.value}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white w-12 text-right">
                        {segment.value}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Right Column: Price Impact Simulator */}
        <section className="space-y-8">
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">
              Dynamic Price Impact Simulator
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Simulate price changes and see the impact on key business metrics
              in real-time. Our AI models calculate elasticity and market
              response with high accuracy.
            </p>

            {/* Price Slider */}
            <div className="mb-8">
              <h4 className="text-base font-medium mb-4">
                Adjust Price Change
              </h4>
              <PriceSlider
                value={priceChange}
                onChange={setPriceChange}
                optimalPoint={scenarios.ai_optimal.priceChange}
              />
            </div>

            {/* Market Position Analysis */}
            <div className="mb-8">
              <h4 className="text-base font-medium mb-4">
                Market Position Analysis
              </h4>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
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
                    <div className="text-xs text-blue-500 font-medium flex items-center">
                      AI Optimized Projection{" "}
                      <span className="ml-1 inline-block h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Impact Metrics */}
            <div>
              <h4 className="text-base font-medium mb-4">Impact Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <SimulationImpactCard
                  label="Revenue Impact"
                  value={revenueImpact}
                  prefix="+"
                  isPositive={true}
                  description="Projected change in total revenue based on price elasticity and volume"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
                <SimulationImpactCard
                  label="Profit Margin"
                  value={profitImpact}
                  prefix="+"
                  isPositive={true}
                  description="Expected change in profit margins across product portfolio"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <SimulationImpactCard
                  label="Sales Volume"
                  value={salesVolume}
                  prefix={salesVolume >= 0 ? "+" : ""}
                  isPositive={salesVolume >= 0}
                  description="Projected change in unit sales based on price elasticity"
                  icon={<ChevronDown className="h-4 w-4" />}
                />
                <SimulationImpactCard
                  label="Market Position"
                  value={marketPosition}
                  prefix="+"
                  isPositive={true}
                  description="Estimated improvement in market share position"
                  icon={<ChevronUp className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
