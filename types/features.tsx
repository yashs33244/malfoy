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
