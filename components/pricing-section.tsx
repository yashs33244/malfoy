"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  const pricingPlans = [
    {
      name: "Starter",
      description:
        "Perfect for small businesses just getting started with pricing intelligence.",
      price: billingCycle === "monthly" ? 99 : 79,
      features: [
        "Real-time competitor price tracking",
        "Basic pricing simulations",
        "Up to 100 SKUs",
        "Daily price updates",
        "Email alerts",
        "Single marketplace integration",
        "30-day historical data",
      ],
      limitations: [
        "No automated pricing rules",
        "Limited reporting",
        "Basic support only",
      ],
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    },
    {
      name: "Professional",
      description:
        "Ideal for growing businesses looking to optimize their pricing strategy.",
      price: billingCycle === "monthly" ? 249 : 199,
      features: [
        "Everything in Starter, plus:",
        "Advanced pricing simulations",
        "Up to 1,000 SKUs",
        "Hourly price updates",
        "SMS & email alerts",
        "3 marketplace integrations",
        "90-day historical data",
        "Basic automated pricing rules",
        "Custom dashboards",
        "Priority support",
      ],
      limitations: [],
      highlighted: true,
      bgColor: "bg-viridian-50 dark:bg-viridian-950/20",
    },
    {
      name: "Enterprise",
      description:
        "For large businesses with complex pricing needs across multiple channels.",
      price: billingCycle === "monthly" ? 499 : 399,
      features: [
        "Everything in Professional, plus:",
        "Unlimited SKUs",
        "Real-time price updates",
        "Advanced automated pricing rules",
        "Unlimited marketplace integrations",
        "1-year historical data",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 premium support",
      ],
      limitations: [],
      bgColor: "bg-sgbus_green-50 dark:bg-sgbus_green-950/20",
    },
  ];

  return (
    <section>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <TextShimmer>Transparent Pricing</TextShimmer>
        </h2>
        <p className="text-muted-foreground mb-8">
          Choose the plan that fits your business needs. All plans include a
          14-day free trial.
        </p>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-muted rounded-full p-1">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                billingCycle === "annually"
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("annually")}
            >
              Annually <span className="text-xs">(-20%)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="relative">
            {plan.highlighted && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              </div>
            )}

            <div
              className={`h-full rounded-xl ${plan.bgColor} p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">
                    /{billingCycle === "monthly" ? "mo" : "mo annually"}
                  </span>
                </div>
                <button
                  className={`w-full py-2 rounded-md ${
                    plan.highlighted
                      ? "bg-primary text-white"
                      : "bg-white/70 dark:bg-slate-800/60 text-foreground"
                  }`}
                >
                  Start Free Trial
                </button>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Features included:</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <p className="text-sm font-medium mb-2">Limitations:</p>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li
                          key={limitation}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <span className="mr-2">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <p className="text-muted-foreground mb-4">
          Need a custom solution? Contact our sales team for a tailored plan.
        </p>
        <button className="inline-flex items-center px-6 py-3 bg-white/60 dark:bg-slate-800/60 shadow-md rounded-md hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
          Contact Sales
        </button>
      </div>
    </section>
  );
}
