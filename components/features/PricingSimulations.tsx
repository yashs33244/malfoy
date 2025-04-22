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
  ArrowDown,
} from "lucide-react";
import {
  AreaChart,
  BarChart,
  chartColors,
} from "@/components/ui/shadcn-charts";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IndustryCardProps,
  ScenarioSelectorProps,
  TimePeriodSelectorProps,
  ToggleSwitchProps,
  PriceSliderProps,
  SimulationImpactCardProps,
  TimeframeType,
  IndustryModifiers,
  Scenarios,
  ChartDataPoint,
  RevenueForecastChartProps,
} from "@/types/features";
import { motion } from "framer-motion";
// Types (simplified for the artifact)
type IndustryType =
  | "software"
  | "retail"
  | "manufacturing"
  | "healthcare"
  | "finance";

type CardContainerProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const CardContainer = ({ active, onClick, children }: CardContainerProps) => {
  const baseStyle =
    "p-4 rounded-2xl cursor-pointer transition-all border group";
  const activeStyle = "bg-black text-white border-black";
  const inactiveStyle =
    "border-slate-200 dark:border-slate-700 bg-background/20 backdrop-blur-sm hover:bg-black hover:text-white hover:border-black";

  return (
    <div
      className={`${baseStyle} ${active ? activeStyle : inactiveStyle}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const IndustryCard = ({
  id,
  name,
  icon,
  description,
  active,
  onClick,
}: IndustryCardProps) => {
  return (
    <CardContainer active={active} onClick={() => onClick(id)}>
      <div className="flex items-center">
        <div
          className={`mr-3 ${
            active
              ? "text-white"
              : "text-slate-500 dark:text-slate-400 group-hover:text-white"
          }`}
        >
          {icon}
        </div>
        <div>
          <h4
            className={`font-medium ${
              active ? "text-white" : "group-hover:text-white"
            }`}
          >
            {name}
          </h4>
          <p
            className={`text-xs ${
              active
                ? "text-white/80"
                : "text-slate-500 dark:text-slate-400 group-hover:text-white/80"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </CardContainer>
  );
};

const ScenarioSelector = ({
  scenarios,
  selectedScenario,
  onSelect,
}: ScenarioSelectorProps) => (
  <div className="grid grid-cols-2 gap-3">
    {Object.entries(scenarios).map(([key, scenario]) => {
      const isActive = selectedScenario === key;

      return (
        <CardContainer
          key={key}
          active={isActive}
          onClick={() => onSelect(key)}
        >
          <div>
            <div className="font-medium capitalize mb-1 flex items-center">
              {key === "ai_optimal" ? "AI Optimal" : key.replace("_", " ")}
              {key === "ai_optimal" && (
                <Zap className="h-3 w-3 inline-block ml-1" />
              )}
            </div>
            <div
              className={`text-xs ${
                isActive
                  ? "text-white/80"
                  : "text-slate-500 dark:text-slate-400 group-hover:text-white/80"
              }`}
            >
              {scenario.description}
            </div>
          </div>
        </CardContainer>
      );
    })}
  </div>
);

const TimePeriodSelector = ({
  timeframe,
  setTimeframe,
}: TimePeriodSelectorProps) => {
  const timeframes = ["weekly", "monthly", "quarterly"];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="flex bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 p-1"
    >
      {timeframes.map((tf, idx) => {
        const isActive = timeframe === tf;

        return (
          <button
            key={tf}
            onClick={() => setTimeframe(tf as TimeframeType)}
            onMouseEnter={() => setHovered(idx)}
            className="relative flex-1 px-4 py-2 text-sm text-neutral-600 hover:text-black transition-colors rounded-full"
          >
            {hovered === idx && !isActive && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-slate-700"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            {isActive && (
              <motion.div
                layoutId="selected"
                className="absolute inset-0 h-full w-full rounded-full bg-blue-600"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 40,
                }}
              />
            )}

            <span className={`relative z-20 ${isActive ? "text-white" : ""}`}>
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
const ToggleSwitch = ({
  enabled,
  onChange,
  leftLabel,
  rightLabel,
}: ToggleSwitchProps) => (
  <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-full p-3 border border-slate-200 dark:border-slate-700">
    <span
      className={`text-sm ${
        !enabled ? "font-medium" : "text-slate-500 dark:text-slate-400"
      }`}
    >
      {leftLabel}
    </span>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
    <span
      className={`text-sm ${
        enabled ? "font-medium" : "text-slate-500 dark:text-slate-400"
      }`}
    >
      {rightLabel}
    </span>
  </div>
);

const PriceSlider = ({ value, onChange, optimalPoint }: PriceSliderProps) => (
  <div className="space-y-2 px-4 py-3">
    <div className="flex justify-between mb-2 text-sm font-medium">
      <span className="text-rose-500">-20%</span>
      <span className="text-blue-600">Current Price</span>
      <span className="text-emerald-500">+20%</span>
    </div>

    <div className="relative">
      {/* Marker dots */}
      <div className="absolute w-full flex justify-between px-[2px] -mt-1">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="w-1 h-1 bg-gray-400 rounded-full z-10" />
        ))}
      </div>

      {/* Range Slider */}
      <input
        type="range"
        min="-20"
        max="20"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full appearance-none bg-gray-200 rounded-full h-2 cursor-pointer transition-all duration-200 mt-2"
        style={{
          background: `linear-gradient(to right,rgba(0, 0, 0, 0.29) 0%,#005900 ${
            ((value + 20) / 40) * 100
          }%, #e5e7eb ${((value + 20) / 40) * 100}%, #e5e7eb 100%)`,
        }}
      />

      {/* Optimal Marker */}
      {optimalPoint !== value && (
        <div
          className="absolute pointer-events-none w-1 h-4 bg-emerald-500 rounded-full"
          style={{
            left: `calc(${((optimalPoint + 20) / 40) * 100}% - 2px)`,
            top: "8px",
          }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-1 rounded">
            Optimal
          </div>
        </div>
      )}

      {/* Slider Styling */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        input[type="range"]:hover::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px #005900;
          transform: scale(1.1);
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        input[type="range"]:hover::-moz-range-thumb {
          box-shadow: 0 0 0 3px #005900;
          transform: scale(1.1);
        }

        input[type="range"] {
          border-radius: 8px;
          height: 8px;
        }
      `}</style>
    </div>

    <div className="text-center font-semibold text-base">
      {value > 0 ? `+${value}%` : `${value}%`}
    </div>
  </div>
);

const RevenueForecastChart = ({
  data,
  timeframe,
  showComparison,
}: RevenueForecastChartProps) => (
  <div className="bg-[#ffd2e0 dark:bg-slate-800 rounded-lg p-4 ">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <h4 className="text-md font-medium">Revenue Forecast</h4>
        <Badge
          variant="outline"
          className="ml-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        >
          <Calendar className="h-3 w-3 mr-1" />
          {timeframe === "monthly"
            ? "Monthly"
            : timeframe === "quarterly"
            ? "Quarterly"
            : "Weekly"}
        </Badge>
      </div>
    </div>
    <div className="h-[220px]">
      <AreaChart
        data={data}
        keys={showComparison ? ["Current", "AIOptimized"] : ["Current"]}
        height={220}
        colors={[chartColors.accent3, chartColors.primary]}
        showLegend={true}
        showGrid={true}
      />
    </div>
    {showComparison && (
      <div className="flex justify-end mt-2">
        <div className="text-xs text-blue-600 font-medium flex items-center">
          AI Optimized Projection{" "}
          <span className="ml-1 inline-block h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
        </div>
      </div>
    )}
  </div>
);

const SimulationImpactCard = ({
  label,
  value,
  prefix = "",
  isPositive = true,
  description = "",
  icon = null,
}: SimulationImpactCardProps) => {
  const colorClass = isPositive ? "text-emerald-500" : "text-rose-500";
  const bgColorClass = isPositive ? "bg-emerald-500" : "bg-rose-500";
  const width = Math.min(100, Math.abs(value * 3));

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 ml-1 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <p className={`text-2xl font-bold ${colorClass}`}>
        {prefix}
        {value}%
      </p>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100 dark:bg-slate-700"></div>
      <div
        className={`absolute bottom-0 left-0 h-1 ${bgColorClass}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

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
