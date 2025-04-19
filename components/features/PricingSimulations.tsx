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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";

// Define interfaces for chart data types
interface ChartDataPoint {
  name: string;
  [key: string]: number | string;
}

type RevenueDataPoint = ChartDataPoint;
type BarDataPoint = ChartDataPoint;

// Define other custom interfaces for the component
interface SimulationImpactCardProps {
  label: string;
  value: number;
  prefix?: string;
  isPositive?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

interface IndustryCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  active: boolean;
  onClick: (id: string) => void;
}

interface IndustryModifier {
  elasticity: number;
  profitMargin: number;
  volumeSensitivity: number;
}

interface IndustryModifiers {
  software: IndustryModifier;
  retail: IndustryModifier;
  manufacturing: IndustryModifier;
  healthcare: IndustryModifier;
  finance: IndustryModifier;
  [key: string]: IndustryModifier;
}

interface PieDataPoint {
  name: string;
  value: number;
}

// Define type for timeframe
type TimeframeType = "monthly" | "quarterly" | "weekly";

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

  // Toggle for scenario comparison
  const [showScenarioComparison, setShowScenarioComparison] = useState(false);

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
  const scenarios = {
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
    const seasonalityAmplitude = {
      software: 0.05,
      retail: 0.15,
      manufacturing: 0.07,
      healthcare: 0.03,
      finance: 0.08,
    }[industry];

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
    }[industry];

    // Base values with industry-specific distribution
    const baseValues = {
      software: [45, 30, 15, 10],
      retail: [20, 40, 30, 10],
      manufacturing: [35, 40, 20, 5],
      healthcare: [50, 25, 15, 10],
      finance: [30, 25, 30, 15],
    }[industry];

    // Impact factors (how each segment responds to price changes)
    const impactFactors = {
      software: [0.2, 0.5, 1.2, 1.5],
      retail: [0.3, 0.6, 1.0, 1.4],
      manufacturing: [0.1, 0.3, 0.8, 1.2],
      healthcare: [0.2, 0.4, 0.6, 1.0],
      finance: [0.3, 0.5, 0.7, 1.1],
    }[industry];

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
    }[industry];

    // Base market share values
    const baseShares = {
      software: [35, 18, 25, 12, 10],
      retail: [30, 15, 22, 20, 13],
      manufacturing: [40, 20, 15, 15, 10],
      healthcare: [35, 22, 18, 15, 10],
      finance: [42, 16, 20, 12, 10],
    }[industry];

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

  // Simulation Impact Calculator component
  const SimulationImpactCard = ({
    label,
    value,
    prefix = "",
    isPositive = true,
    description = "",
    icon = null,
  }: SimulationImpactCardProps) => {
    const colorClass = isPositive ? "text-green-500" : "text-red-500";
    const bgColorClass = isPositive ? "bg-green-500" : "bg-red-500";
    const bgColorClassFaded = isPositive ? "bg-green-500/20" : "bg-red-500/20";
    const width = Math.min(100, Math.abs(value * 3));

    return (
      <div className="bg-background p-3 rounded-lg relative overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground">{label}</p>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <p className={`text-xl font-bold ${colorClass}`}>
          {prefix}
          {value}%
        </p>
        <div
          className={`absolute bottom-0 left-0 h-1 w-full ${bgColorClassFaded}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 h-1 ${bgColorClass}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    );
  };

  // Industry Selection Card
  const IndustryCard = ({
    id,
    name,
    icon,
    description,
    active,
    onClick,
  }: IndustryCardProps) => (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all border ${
        active
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
      onClick={() => onClick(id)}
    >
      <div className="flex items-center">
        <div
          className={`mr-3 ${
            active ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {icon}
        </div>
        <div>
          <h4 className={`font-medium ${active ? "text-primary" : ""}`}>
            {name}
          </h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
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
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Select Your Industry</h3>
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
      </div>

      {/* AI-Powered Revenue Optimizer and Dynamic Price Impact Simulator */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <SimpleHeading>AI-Powered Revenue Optimizer</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Our advanced ML algorithms analyze market data, competitor pricing,
            and customer behavior to simulate different pricing strategies and
            their impact on your business metrics.
          </p>

          {/* Scenario Selection */}
          <div className="mb-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-3">Pricing Scenarios</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                    selectedScenario === key
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                  onClick={() => applyScenario(key)}
                >
                  <div className="font-medium capitalize mb-1">
                    {key.replace("_", " ")}
                    {key === "ai_optimal" && (
                      <Zap className="h-3 w-3 inline-block ml-1" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {scenario.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Period Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Time Period</h4>
            <div className="flex bg-muted/30 rounded-lg p-1">
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm ${
                  timeframe === "weekly"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setTimeframe("weekly")}
              >
                Weekly
              </button>
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm ${
                  timeframe === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setTimeframe("monthly")}
              >
                Monthly
              </button>
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm ${
                  timeframe === "quarterly"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setTimeframe("quarterly")}
              >
                Quarterly
              </button>
            </div>
          </div>

          {/* Toggle Button for Before/After View */}
          <div className="mb-6 flex items-center space-x-3">
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

          {/* AI-Optimized Revenue Forecast Chart */}
          <div className="mb-6 bg-muted/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">
                AI-Optimized Revenue Forecast
              </h4>
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {timeframe}
              </Badge>
            </div>
            <div className="h-[200px]">
              <AreaChart
                data={revenueData}
                keys={
                  showBeforeAfter ? ["Current", "AIOptimized"] : ["Current"]
                }
                height={200}
                colors={[chartColors.accent3, chartColors.primary]}
                showLegend={true}
                showGrid={true}
              />
            </div>
          </div>

          {/* Customer Segment Distribution */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">
              Customer Segment Distribution
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[180px]">
                {/* We'll use a div here instead of PieChart since it's not available */}
                <div className="bg-muted/50 rounded-lg h-full flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">
                    Segment visualization
                  </p>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <h5 className="text-xs font-medium mb-2">Segment Analysis</h5>
                <ul className="space-y-2 text-xs">
                  {segmentData.map((segment, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{segment.name}</span>
                      <span className="font-medium">{segment.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {showAdvancedView && (
            <div className="mt-6 bg-muted/30 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">
                Price Elasticity Curve
              </h4>
              <div className="h-[200px]">
                <LineChart
                  data={elasticityCurveData.filter((_, i) => i % 2 === 0)} // Use every other point for clarity
                  keys={["Revenue Impact", "Volume Impact"]}
                  height={200}
                  colors={[chartColors.primary, chartColors.accent3]}
                  showLegend={true}
                  showGrid={true}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Optimal price point highlighted at {priceChange}% change</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            Dynamic Price Impact Simulator
          </h1>
          <p className="text-muted-foreground mb-6">
            Simulate price changes and see the impact on key business metrics in
            real-time. Our AI models calculate elasticity and market response
            with high accuracy based on your industry-specific data patterns.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium">
                  Price Change (%)
                </label>
                <span className="text-primary font-bold text-lg">
                  {priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`}
                </span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={priceChange}
                  onChange={(e) => setPriceChange(parseInt(e.target.value))}
                  className="w-full accent-primary"
                  style={{
                    height: "8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                />

                {/* Optimal point indicator */}
                <div
                  className="absolute top-0 h-5 w-2 bg-primary/70 rounded-full"
                  style={{
                    left: `${
                      ((scenarios.ai_optimal.priceChange + 20) / 40) * 100
                    }%`,
                    transform: "translateX(-50%) translateY(-50%)",
                  }}
                  title="AI recommended optimal point"
                >
                  <div className="h-2 w-2 bg-primary rounded-full absolute -top-1 left-0 animate-ping"></div>
                </div>
              </div>

              <div className="flex justify-between text-xs mt-1">
                <span>-20%</span>
                <span>0%</span>
                <span>+20%</span>
              </div>
            </div>

            {/* Competitor Benchmark Chart */}
            <div className="bg-background rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">
                Market Position Analysis
              </h4>
              <div className="h-[180px]">
                <BarChart
                  data={competitorData}
                  keys={
                    showBeforeAfter
                      ? ["Current Share", "Projected Share"]
                      : ["Current Share"]
                  }
                  height={180}
                  colors={[chartColors.accent3, chartColors.primary]}
                  showLegend={true}
                  showGrid={false}
                />
              </div>

              {/* AI recommendation indicator */}
              <div className="flex justify-end mt-1">
                <div className="text-xs text-primary font-medium flex items-center">
                  AI Optimized Projection{" "}
                  <span className="ml-1 inline-block h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>

            {/* Metrics Cards Grid */}
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

            <div className="grid grid-cols-2 gap-4">
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

            {showAdvancedView && (
              <div className="grid grid-cols-2 gap-4">
                <SimulationImpactCard
                  label="Customer Retention"
                  value={customerRetention}
                  prefix={customerRetention >= 0 ? "+" : ""}
                  isPositive={customerRetention >= 0}
                  description="Projected impact on customer retention rates"
                  icon={
                    customerRetention >= 0 ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  }
                />
                <SimulationImpactCard
                  label="Competitive Index"
                  value={competitiveIndex}
                  prefix="+"
                  isPositive={true}
                  description="Relative position against key competitors"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
