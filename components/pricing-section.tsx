import { useState } from "react";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingPlans = [
    {
      name: "Basic",
      description:
        "Perfect for small businesses getting started with inventory optimization.",
      price: billingCycle === "monthly" ? 99 : 79,
      features: [
        "Real-time inventory tracking",
        "Basic procurement simulations",
        "Up to 100 SKUs",
        "Daily inventory updates",
        "Email alerts",
        "Single marketplace integration",
        "30-day historical data",
      ],
      limitations: [
        "No automated procurement rules",
        "Limited reporting",
        "Basic support only",
      ],
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
    },
    {
      name: "Professional",
      description:
        "Ideal for growing businesses looking to optimize procurement strategy.",
      price: billingCycle === "monthly" ? 249 : 199,
      features: [
        "Everything in Basic, plus:",
        "Advanced procurement simulations",
        "Up to 1,000 SKUs",
        "Hourly inventory updates",
        "SMS & email alerts",
        "3 marketplace integrations",
        "90-day historical data",
        "Basic automated procurement rules",
        "Custom dashboards",
        "Priority support",
      ],
      limitations: [],
      highlighted: true,
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
    },
    {
      name: "Enterprise",
      description:
        "For large businesses with complex procurement needs across multiple channels.",
      price: billingCycle === "monthly" ? 499 : 399,
      features: [
        "Everything in Professional, plus:",
        "Unlimited SKUs",
        "Real-time inventory updates",
        "Advanced automated procurement rules",
        "Unlimited marketplace integrations",
        "1-year historical data",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 premium support",
      ],
      limitations: [],
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
          Transparent Pricing
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Choose the plan that fits your business needs. All plans include a
          14-day free trial.
        </p>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <button
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                billingCycle === "annually"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setBillingCycle("annually")}
            >
              Annually <span className="text-xs">(-20%)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="relative">
            {plan.highlighted && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                <span
                  className="bg-gray-900 text-white dark:bg-white dark:text-black text-xs font-medium px-3 py-1 rounded-full shadow-md animate-pulse"
                  style={{
                    boxShadow:
                      "0 0 10px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.2)",
                  }}
                >
                  Most Popular
                </span>
              </div>
            )}

            <div
              className={`h-full rounded-xl ${plan.bgColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{billingCycle === "monthly" ? "mo" : "mo annually"}
                  </span>
                </div>
                <button
                  className={`w-full py-2 rounded-full transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black"
                  }`}
                  style={plan.highlighted ? { backgroundColor: "#03c76e" } : {}}
                >
                  Start Free Trial
                </button>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Features included:</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <Check
                        className="h-4 w-4 text-green-500 mr-2 mt-0.5"
                        style={{ color: "#03c76e" }}
                      />
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
                          className="flex items-start text-sm text-gray-600 dark:text-gray-400"
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
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Need a custom solution? Contact our sales team for a tailored plan.
        </p>
        <button className="inline-flex items-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black shadow-md rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          Contact Sales
        </button>
      </div>
    </section>
  );
}
