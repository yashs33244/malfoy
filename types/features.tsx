export interface ChartDataPoint {
  name: string;
  [key: string]: number | string;
}

export type RevenueDataPoint = ChartDataPoint;
export type BarDataPoint = ChartDataPoint;

// Define other custom interfaces for the component
export interface SimulationImpactCardProps {
  label: string;
  value: number;
  prefix?: string;
  isPositive?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface IndustryCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  active: boolean;
  onClick: (id: string) => void;
}

export interface IndustryModifier {
  elasticity: number;
  profitMargin: number;
  volumeSensitivity: number;
}

export interface IndustryModifiers {
  software: IndustryModifier;
  retail: IndustryModifier;
  manufacturing: IndustryModifier;
  healthcare: IndustryModifier;
  finance: IndustryModifier;
  [key: string]: IndustryModifier;
}

export interface PieDataPoint {
  name: string;
  value: number;
}

export interface Scenario {
  priceChange: number;
  description: string;
}

export interface Scenarios {
  [key: string]: Scenario;
}

// Define type for timeframe
export type TimeframeType = "monthly" | "quarterly" | "weekly";

export interface TimelinePoint {
  id: number;
  date: string;
  description: string;
  isHighlighted: boolean;
  priceChange?: number;
  marketImpact?: string;
}

export interface CompetitorTimelineProps {
  points: TimelinePoint[];
  startDate: string;
  endDate: string;
  className?: string;
  onPointSelect?: (priceChange: number) => void;
}

export interface ScenarioSelectorProps {
  scenarios: {
    [key: string]: Scenario;
  };
  selectedScenario: string;
  onSelect: (scenario: string) => void;
}

export interface TimePeriodSelectorProps {
  timeframe: TimeframeType;
  setTimeframe: (timeframe: TimeframeType) => void;
}

export interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  leftLabel: string;
  rightLabel: string;
}

export interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
  optimalPoint: number;
}

export interface RevenueForecastChartProps {
  data: ChartDataPoint[];
  timeframe: TimeframeType;
  showComparison: boolean;
}

export interface PricingRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  impact: {
    priceCompetitiveness: number;
    marketShare: number;
    speed: number;
    accuracy: number;
    revenueGrowth: number;
    customerRetention: number;
  };
}

export interface TimelinePoint {
  id: number;
  date: string;
  description: string;
  isHighlighted: boolean;
}

export interface CompetitorTimelineProps {
  points: TimelinePoint[];
  startDate: string;
  endDate: string;
  className?: string;
}

export interface MarketZone {
  id: number;
  name: string;
  price: string;
  competitors: number;
  opportunity: string;
  className: string;
  gridPosition: string;
  textColor: string;
  indicators?: {
    color: string;
    opacity?: number;
  }[];
}

export interface MarketPositioningMapProps {
  marketZones: MarketZone[];
  className?: string;
}

export type IndustryType =
  | "software"
  | "retail"
  | "manufacturing"
  | "healthcare"
  | "finance";

export type CardContainerProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};
