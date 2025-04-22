"use client";

import { useState, useEffect } from "react";
import { RadarChart } from "@/components/ui/charts";
import { IntegrationOrbits } from "./IntegrationOrbits";
import { Clock, DollarSign, Users } from "lucide-react";
import { SmallFeatureItem } from "./smallFeatureItem";
import { PricingRule } from "@/types/features";

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
    <div className="">
      <div className="grid md:grid-cols-2 gap-6">
        {/* First card - Automated Rules */}
        <div className="bg-indigo-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">
            Automated Pricing
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-indigo-700 mb-6">
                Create sophisticated pricing rules that automatically adjust
                your prices based on market conditions, then see their impact on
                your metrics in real-time.
              </p>
              <div className="space-y-3">
                <SmallFeatureItem
                  title="Market Share"
                  subtitle="Increase market share by 15%"
                  description="Automatically adjust prices to gain a larger share of the market"
                  icon={<Users className="h-5 w-5" />}
                />
                <SmallFeatureItem
                  title="Price Competitiveness"
                  subtitle="Increase price competitiveness by 10%"
                  description="Automatically adjust prices to be more competitive"
                  icon={<DollarSign className="h-5 w-5" />}
                />
                <SmallFeatureItem
                  title="Speed"
                  subtitle="Increase speed by 15%"
                  description="Automatically adjust prices to be more competitive"
                  icon={<Clock className="h-5 w-5" />}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h4 className="text-base font-medium text-indigo-800 mb-4">
                Market Coverage Analysis
              </h4>
              <div className="h-56">
                <RadarChart
                  data={marketCoverageData}
                  labels={marketCoverageLabels}
                  height={220}
                  color="#4F46E5"
                />
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Toggle rules in the Rule Builder to see how they affect your
                market coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Second card - Rule Builder */}
        <div className="bg-pink-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-pink-800">
            Rule Builder
          </h2>
          <p className="text-pink-700 mb-6">
            Schedule all your price rules and adjustments now and we'll apply
            them automatically later.
          </p>
          <div className="space-y-4">
            {pricingRules.map((rule) => (
              <div
                key={rule.id}
                className={`bg-white p-4 rounded-xl border-2 ${
                  rule.active
                    ? "border-pink-400 shadow-sm"
                    : "border-transparent"
                } cursor-pointer transition-all hover:shadow-md`}
                onClick={() => toggleRule(rule.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900">
                    {rule.name}
                  </span>
                  <div className="h-6 w-12 rounded-full relative bg-slate-200 flex items-center px-1">
                    <div
                      className={`h-4 w-4 rounded-full transition-all ${
                        rule.active
                          ? "bg-pink-500 translate-x-6"
                          : "bg-slate-400"
                      }`}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  {rule.description}
                </p>
                {rule.active && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {Object.entries(rule.impact).map(([key, value]) => (
                      <span
                        key={key}
                        className={`text-xs px-2 py-1 rounded-full ${
                          value > 0
                            ? "bg-pink-100 text-pink-800"
                            : value < 0
                            ? "bg-slate-100 text-slate-800"
                            : "bg-slate-100 text-slate-800"
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

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Third card - Integration Ecosystem */}
        <div className="bg-green-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Wallet</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h4 className="text-base font-medium text-green-800 mb-4">
              Integration Ecosystem
            </h4>
            <div className="mb-6">
              <IntegrationOrbits />
            </div>
            <p className="text-sm text-slate-600">
              Access all your integrations and save up your Pricing Cash with
              our seamless platform integration ecosystem.
            </p>
          </div>
        </div>

        {/* Fourth card - Platform Coverage */}
        <div className="bg-yellow-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-yellow-800">Inbox</h2>
          <div className="space-y-6">
            <div>
              <p className="text-yellow-700 mb-6">
                Track your pricing changes, group notifications, and sent
                updates across your entire sales ecosystem.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start bg-white p-3 rounded-lg">
                  <span className="mr-2 text-yellow-500 font-bold">✓</span>
                  <span className="text-slate-700">
                    Direct API integrations with major platforms
                  </span>
                </li>
                <li className="flex items-start bg-white p-3 rounded-lg">
                  <span className="mr-2 text-yellow-500 font-bold">✓</span>
                  <span className="text-slate-700">
                    Real-time synchronization of price changes
                  </span>
                </li>
                <li className="flex items-start bg-white p-3 rounded-lg">
                  <span className="mr-2 text-yellow-500 font-bold">✓</span>
                  <span className="text-slate-700">
                    Customize pricing rules per platform
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h4 className="text-base font-medium text-yellow-800 mb-4">
                Platform Coverage
              </h4>
              <div className="h-56">
                <RadarChart
                  data={platformIntegrationData}
                  labels={platformIntegrationLabels}
                  height={220}
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
