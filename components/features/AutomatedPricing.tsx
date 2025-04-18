"use client";

import SimpleHeading from "./SimpleHeading";
import { RadarChart, generateMarketData } from "@/components/ui/charts";
import { IntegrationOrbits } from "./IntegrationOrbits";

export default function AutomatedPricing() {
  // Data for radar charts
  const marketCoverageData = [80, 65, 90, 75, 85, 60];
  const marketCoverageLabels = [
    "Price Competitiveness",
    "Market Share",
    "Speed",
    "Accuracy",
    "Revenue Growth",
    "Customer Retention",
  ];

  const platformIntegrationData = [90, 85, 70, 95, 80, 75];
  const platformIntegrationLabels = [
    "Shopify",
    "Amazon",
    "WooCommerce",
    "Magento",
    "BigCommerce",
    "eBay",
  ];

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <SimpleHeading>Automated Pricing Rules</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Create sophisticated pricing rules that automatically adjust your
            prices based on market conditions.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Set up rule-based pricing automation
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Define custom triggers and conditions
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Implement guardrails to protect margins
            </li>
          </ul>

          {/* Add radar chart */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">
              Market Coverage Analysis
            </h4>
            <div className="h-[200px]">
              <RadarChart
                data={marketCoverageData}
                labels={marketCoverageLabels}
                height={200}
                color="#4F46E5"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-card border border-border rounded-xl p-6 h-auto overflow-hidden">
            <SimpleHeading as="h4" className="text-lg">
              Rule Builder
            </SimpleHeading>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Competitor Matching</span>
                  <div className="h-4 w-8 bg-primary rounded-full"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  If competitor price drops below your price, match their price
                  minus 2%
                </p>
              </div>

              <div className="bg-muted p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Margin Protection</span>
                  <div className="h-4 w-8 bg-primary rounded-full"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Never price below 15% profit margin regardless of competitor
                  prices
                </p>
              </div>

              <div className="bg-muted p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Time-Based Pricing</span>
                  <div className="h-4 w-8 bg-muted-foreground rounded-full"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Increase prices by 5% during peak demand hours (6-9 PM)
                </p>
              </div>

              <div className="bg-muted p-3 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Inventory-Based</span>
                  <div className="h-4 w-8 bg-primary rounded-full"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Increase price by 10% when inventory falls below 20% of
                  initial stock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <div className="bg-card border border-border rounded-xl p-6 h-auto">
            <SimpleHeading as="h4" className="text-lg mb-4">
              Integration Ecosystem
            </SimpleHeading>
            <IntegrationOrbits />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <SimpleHeading>Seamless Integrations</SimpleHeading>
          <p className="text-muted-foreground mb-6">
            Connect with your existing e-commerce platforms and marketplaces for
            automated price updates.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Direct API integrations with major platforms
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Real-time synchronization of price changes
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              Customize pricing rules per platform
            </li>
          </ul>

          {/* Add radar chart */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">Platform Coverage</h4>
            <div className="h-[200px]">
              <RadarChart
                data={platformIntegrationData}
                labels={platformIntegrationLabels}
                height={200}
                color="#4F46E5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
