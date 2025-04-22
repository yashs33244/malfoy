import { ReactNode } from "react";
import { ChartDataPoint, Scenario, TimeframeType } from "./features";

/**
 * Props for the IndustryCard component
 */
export interface IndustryCardProps {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  active: boolean;
  onClick: (id: string) => void;
}

/**
 * Props for the SimulationImpactCard component
 */
export interface SimulationImpactCardProps {
  label: string;
  value: number;
  prefix?: string;
  isPositive?: boolean;
  description?: string;
  icon?: ReactNode;
}

/**
 * Props for the ScenarioSelector component
 */
export interface ScenarioSelectorProps {
  scenarios: {
    [key: string]: Scenario;
  };
  selectedScenario: string;
  onSelect: (scenario: string) => void;
}

/**
 * Props for the TimePeriodSelector component
 */
export interface TimePeriodSelectorProps {
  timeframe: TimeframeType;
  setTimeframe: (timeframe: TimeframeType) => void;
}

/**
 * Props for the ToggleSwitch component
 */
export interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  leftLabel: string;
  rightLabel: string;
}

/**
 * Props for the PriceSlider component
 */
export interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
  optimalPoint: number;
}

/**
 * Props for the RevenueForecastChart component
 */
export interface RevenueForecastChartProps {
  data: ChartDataPoint[];
  timeframe: TimeframeType;
  showComparison: boolean;
}

export interface PriceControlProps {
  priceChange: number;
  onDecrease: () => void;
  onIncrease: () => void;
} 