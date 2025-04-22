/**
 * Industry types supported by the pricing simulation
 */
export type IndustryType =
  | "software"
  | "retail"
  | "manufacturing"
  | "healthcare"
  | "finance";

/**
 * Industry-specific modifier for pricing algorithms
 */
export interface IndustryModifier {
  elasticity: number;
  profitMargin: number;
  volumeSensitivity: number;
}

/**
 * Map of industry types to their modifiers
 */
export interface IndustryModifiers {
  software: IndustryModifier;
  retail: IndustryModifier;
  manufacturing: IndustryModifier;
  healthcare: IndustryModifier;
  finance: IndustryModifier;
  [key: string]: IndustryModifier;
}

/**
 * A single pricing scenario configuration
 */
export interface Scenario {
  priceChange: number;
  description: string;
}

/**
 * Map of scenario names to their configurations
 */
export interface Scenarios {
  [key: string]: Scenario;
}

/**
 * Supported timeframe types for data visualization
 */
export type TimeframeType = "monthly" | "quarterly" | "weekly"; 