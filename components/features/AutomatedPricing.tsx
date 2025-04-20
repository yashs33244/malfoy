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
    <div className="space-y-24">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Automated Pricing Rules
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Create sophisticated pricing rules that automatically adjust your
              prices based on market conditions, then see their impact on your
              metrics in real-time.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Set up rule-based pricing automation
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Define custom triggers and conditions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Implement guardrails to protect margins
                </span>
              </li>
            </ul>
          </div>

          {/* Add radar chart with dynamic data */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h4 className="text-base font-medium mb-4">
              Market Coverage Analysis
            </h4>
            <div className="h-[240px]">
              <RadarChart
                data={marketCoverageData}
                labels={marketCoverageLabels}
                height={240}
                color="#4F46E5"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              Toggle rules in the Rule Builder to see how they affect your
              market coverage.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <h4 className="text-lg font-semibold mb-4">Rule Builder</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Click on a rule to toggle it on or off and see the impact in
              real-time.
            </p>
            <div className="space-y-6">
              {pricingRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`bg-white dark:bg-slate-900 p-4 rounded-lg border ${
                    rule.active
                      ? "border-blue-400/50 shadow-sm"
                      : "border-slate-200 dark:border-slate-700"
                  } cursor-pointer transition-all hover:shadow-md`}
                  onClick={() => toggleRule(rule.id)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {rule.name}
                    </span>
                    <div className="h-5 w-10 rounded-full relative bg-slate-200 dark:bg-slate-700 flex items-center px-0.5">
                      <div
                        className={`h-4 w-4 rounded-full transition-all ${
                          rule.active
                            ? "bg-blue-500 translate-x-5"
                            : "bg-slate-400 dark:bg-slate-600"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {rule.description}
                  </p>
                  {rule.active && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {Object.entries(rule.impact).map(([key, value]) => (
                        <span
                          key={key}
                          className={`text-xs px-2 py-1 rounded-full ${
                            value > 0
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                              : value < 0
                              ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                              : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
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

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="order-2 md:order-1">
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <h4 className="text-lg font-semibold mb-4">
              Integration Ecosystem
            </h4>
            <div className="mb-8">
              <IntegrationOrbits />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Our platform integrates seamlessly with all major e-commerce
              platforms, ensuring your pricing rules are applied consistently
              across all channels.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Seamless Integrations
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Connect with your existing e-commerce platforms and marketplaces
                for automated price updates and synchronization across your
                entire sales ecosystem.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Direct API integrations with major platforms
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Real-time synchronization of price changes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">✓</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Customize pricing rules per platform
                  </span>
                </li>
              </ul>
            </div>

            {/* Add radar chart with platform data */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="text-base font-medium mb-4">Platform Coverage</h4>
              <div className="h-[240px]">
                <RadarChart
                  data={platformIntegrationData}
                  labels={platformIntegrationLabels}
                  height={240}
                  color="#4F46E5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
