"use client";

import { useState, useEffect } from "react";
import SimpleHeading from "./SimpleHeading";
import { RadarChart, generateMarketData } from "@/components/ui/charts";
import { IntegrationOrbits } from "./IntegrationOrbits";

interface PricingRule {
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

export default function AutomatedPricing() {
  // Define pricing rules with their impact on radar metrics
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    {
      id: "competitor-matching",
      name: "Competitor Matching",
      description:
        "If competitor price drops below your price, match their price minus 2%",
      active: true,
      impact: {
        priceCompetitiveness: 20,
        marketShare: 15,
        speed: 25,
        accuracy: 10,
        revenueGrowth: 5,
        customerRetention: 15,
      },
    },
    {
      id: "margin-protection",
      name: "Margin Protection",
      description:
        "Never price below 15% profit margin regardless of competitor prices",
      active: true,
      impact: {
        priceCompetitiveness: -5,
        marketShare: -10,
        speed: 0,
        accuracy: 25,
        revenueGrowth: 20,
        customerRetention: 5,
      },
    },
    {
      id: "time-based",
      name: "Time-Based Pricing",
      description: "Increase prices by 5% during peak demand hours (6-9 PM)",
      active: false,
      impact: {
        priceCompetitiveness: -5,
        marketShare: -5,
        speed: 15,
        accuracy: 10,
        revenueGrowth: 25,
        customerRetention: -10,
      },
    },
    {
      id: "inventory-based",
      name: "Inventory-Based",
      description:
        "Increase price by 10% when inventory falls below 20% of initial stock",
      active: true,
      impact: {
        priceCompetitiveness: -10,
        marketShare: -5,
        speed: 5,
        accuracy: 20,
        revenueGrowth: 15,
        customerRetention: 0,
      },
    },
  ]);

  // Platform integrations with their impact on radar metrics
  const [platformIntegrations, setPlatformIntegrations] = useState([
    { name: "Shopify", value: 90, enabled: true },
    { name: "Amazon", value: 85, enabled: true },
    { name: "WooCommerce", value: 70, enabled: true },
    { name: "Magento", value: 95, enabled: true },
    { name: "BigCommerce", value: 80, enabled: true },
    { name: "eBay", value: 75, enabled: true },
  ]);

  // Base values for market coverage
  const baseMarketCoverage = {
    priceCompetitiveness: 60,
    marketShare: 50,
    speed: 65,
    accuracy: 55,
    revenueGrowth: 60,
    customerRetention: 45,
  };

  // Calculate market coverage based on active rules
  const [marketCoverageData, setMarketCoverageData] = useState<number[]>([]);
  const marketCoverageLabels = [
    "Price Competitiveness",
    "Market Share",
    "Speed",
    "Accuracy",
    "Revenue Growth",
    "Customer Retention",
  ];

  // Calculate platform integration data
  const [platformIntegrationData, setPlatformIntegrationData] = useState<
    number[]
  >([]);
  const platformIntegrationLabels = platformIntegrations.map((p) => p.name);

  // Toggle rule active state
  const toggleRule = (ruleId: string) => {
    setPricingRules(
      pricingRules.map((rule) =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  // Update market coverage data when rules change
  useEffect(() => {
    // Calculate the impact of active rules on each metric
    const updatedMarketCoverage = { ...baseMarketCoverage };

    pricingRules.forEach((rule) => {
      if (rule.active) {
        updatedMarketCoverage.priceCompetitiveness +=
          rule.impact.priceCompetitiveness;
        updatedMarketCoverage.marketShare += rule.impact.marketShare;
        updatedMarketCoverage.speed += rule.impact.speed;
        updatedMarketCoverage.accuracy += rule.impact.accuracy;
        updatedMarketCoverage.revenueGrowth += rule.impact.revenueGrowth;
        updatedMarketCoverage.customerRetention +=
          rule.impact.customerRetention;
      }
    });

    // Ensure values are within 0-100 range
    type MetricKey = keyof typeof updatedMarketCoverage;

    (Object.keys(updatedMarketCoverage) as MetricKey[]).forEach((key) => {
      updatedMarketCoverage[key] = Math.min(
        100,
        Math.max(0, updatedMarketCoverage[key])
      );
    });

    // Convert to array format for radar chart
    setMarketCoverageData([
      updatedMarketCoverage.priceCompetitiveness,
      updatedMarketCoverage.marketShare,
      updatedMarketCoverage.speed,
      updatedMarketCoverage.accuracy,
      updatedMarketCoverage.revenueGrowth,
      updatedMarketCoverage.customerRetention,
    ]);

    // Update platform data
    setPlatformIntegrationData(
      platformIntegrations.filter((p) => p.enabled).map((p) => p.value)
    );
  }, [pricingRules, platformIntegrations]);

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <SimpleHeading>Automated Pricing Rules</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Create sophisticated pricing rules that automatically adjust your
            prices based on market conditions, then see their impact on your
            metrics in real-time.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-sgbus_green">✓</span>
              Set up rule-based pricing automation
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-sgbus_green">✓</span>
              Define custom triggers and conditions
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-sgbus_green">✓</span>
              Implement guardrails to protect margins
            </li>
          </ul>

          {/* Add radar chart with dynamic data */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">
              Market Coverage Analysis
            </h4>
            <div className="h-[200px]">
              <RadarChart
                data={marketCoverageData}
                labels={marketCoverageLabels}
                height={200}
                color="#1B7D5E"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Toggle rules in the Rule Builder to see how they affect your
              market coverage.
            </p>
          </div>
        </div>
        <div>
          <div className="bg-card border border-border rounded-xl p-6 h-auto overflow-hidden">
            <SimpleHeading as="h4" className="text-lg">
              Rule Builder
            </SimpleHeading>
            <p className="text-sm text-muted-foreground mb-4">
              Click on a rule to toggle it on or off and see the impact in
              real-time.
            </p>
            <div className="space-y-4">
              {pricingRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`bg-muted p-3 rounded-lg border border-border cursor-pointer transition-colors ${
                    rule.active ? "border-viridian/50 shadow-sm" : ""
                  }`}
                  onClick={() => toggleRule(rule.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{rule.name}</span>
                    <div
                      className={`h-4 w-8 rounded-full ${
                        rule.active ? "bg-sgbus_green" : "bg-muted-foreground"
                      }`}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rule.description}
                  </p>
                  {rule.active && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {Object.entries(rule.impact).map(([key, value]) => (
                        <span
                          key={key}
                          className={`text-xs px-1.5 py-0.5 rounded-full ${
                            value > 0
                              ? "bg-sgbus_green/20 text-viridian"
                              : value < 0
                              ? "bg-black/10 text-black-600"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          : {value > 0 ? "+" : ""}
                          {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="order-2 md:order-1">
          <div className="bg-card border border-border rounded-xl p-6 h-auto">
            <SimpleHeading as="h4" className="text-lg mb-4">
              Integration Ecosystem
            </SimpleHeading>
            <IntegrationOrbits />
            <p className="text-xs text-muted-foreground mt-4">
              Our platform integrates seamlessly with all major e-commerce
              platforms, ensuring your pricing rules are applied consistently
              across all channels.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <SimpleHeading>Seamless Integrations</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Connect with your existing e-commerce platforms and marketplaces for
            automated price updates and synchronization across your entire sales
            ecosystem.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-sgbus_green">✓</span>
              Direct API integrations with major platforms
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-sgbus_green">✓</span>
              Real-time synchronization of price changes
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-sgbus_green">✓</span>
              Customize pricing rules per platform
            </li>
          </ul>

          {/* Add radar chart with platform data */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Platform Coverage</h4>
            <div className="h-[200px]">
              <RadarChart
                data={platformIntegrationData}
                labels={platformIntegrationLabels}
                height={200}
                color="#1B7D5E"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
