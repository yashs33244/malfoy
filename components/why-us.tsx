"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Clock,
  BarChart,
  PieChart,
  Bell,
  Shield,
  Zap,
  Search,
  TrendingUp,
} from "lucide-react";

export default function WhyUs() {
  return (
    <div className="flex-1 flex flex-col md:flex-row items-center py-8 md:py-12 gap-8 md:gap-12 dark:bg-slate-900 rounded-xl m-5  bg-[#daf9d4ff]">
      <div className="container mx-auto px-4">
        <div className="space-y-16 md:space-y-20">
          {/* REAL-TIME PRICING */}
          <div>
            <div className="text-center pt-6 mb-10">
              <h1 className="text-4xl md:text-3xl font-medium mb-4">
                <span className="font-bold text-black dark:text-white text-6xl">
                  How it works
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                Our platform combines real-time data, advanced simulations, and
                automated pricing to give you a competitive edge.
              </p>
            </div>
            <BentoGrid className="max-w-7xl mx-auto gap-3 md:gap-4">
              <BentoGridItem
                title="Live Price Comparison"
                description="Track competitor prices across multiple marketplaces in real-time with automated alerts."
                icon={<Clock className="h-5 w-5 text-blue-500" />}
                className="md:col-span-2 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Live Price Ticker</h4>
                    <span className="text-xs text-slate-500">
                      Updated 2 min ago
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      {
                        product: "Premium Headphones",
                        yours: "$129.99",
                        competitor: "$139.99",
                        diff: "-7.1%",
                      },
                      {
                        product: "Wireless Speaker",
                        yours: "$89.99",
                        competitor: "$79.99",
                        diff: "+12.5%",
                      },
                      {
                        product: "Smart Watch",
                        yours: "$199.99",
                        competitor: "$219.99",
                        diff: "-9.1%",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-xs p-1 rounded"
                      >
                        <span>{item.product}</span>
                        <div className="flex items-center gap-4">
                          <span>You: {item.yours}</span>
                          <span>Comp: {item.competitor}</span>
                          <span
                            className={`${
                              item.diff.startsWith("+")
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {item.diff}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="24/7 Monitoring"
                description="Never miss a price change with continuous monitoring across all your product categories."
                icon={<Search className="h-5 w-5 text-indigo-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center shadow-sm">
                  <div className="relative w-24 h-24">
                    <div
                      className="absolute inset-0 border-4 border-indigo-400 rounded-full border-dashed animate-spin"
                      style={{ animationDuration: "10s" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">24/7</span>
                    </div>
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Marketplace Integration"
                description="Connect with all major e-commerce platforms for seamless price synchronization."
                icon={<Zap className="h-5 w-5 text-blue-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-4 flex flex-wrap items-center justify-center gap-2 shadow-sm">
                  {[
                    "Amazon",
                    "Shopify",
                    "eBay",
                    "Walmart",
                    "Etsy",
                    "WooCommerce",
                  ].map((platform) => (
                    <div
                      key={platform}
                      className="px-3 py-1 bg-slate-50 dark:bg-slate-700 rounded-full text-xs"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Smart Analytics"
                description="Get insights into pricing trends and market movements to make data-driven decisions."
                icon={<BarChart className="h-5 w-5 text-green-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center shadow-sm">
                  <div className="w-full space-y-3">
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div className="h-full w-3/4 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div className="h-full w-1/2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div className="h-full w-5/6 bg-indigo-400 rounded-full"></div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <div className="h-full w-2/3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Automated Repricing"
                description="Set dynamic pricing rules that automatically adjust to market conditions and competitor changes."
                icon={<TrendingUp className="h-5 w-5 text-teal-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-teal-200 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                        </div>
                      </div>
                      <div className="h-px w-8 bg-teal-200"></div>
                      <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-teal-200 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                        </div>
                      </div>
                      <div className="h-px w-8 bg-teal-200"></div>
                      <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-teal-200 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
                      Automatic Price Adjustment
                    </p>
                  </div>
                </div>
              </BentoGridItem>
            </BentoGrid>
          </div>

          {/* CUSTOM DASHBOARDS */}
          <div>
            <div className="text-center pt-6 mb-10">
              <h1 className="text-2xl md:text-3xl font-medium mb-4">
                <span className="font-bold text-black dark:text-white text-6xl">
                  Custom Dashboards
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                Visualize your pricing strategy with powerful, customizable
                dashboards.
              </p>
            </div>
            <BentoGrid className="max-w-7xl mx-auto gap-3 md:gap-4">
              <BentoGridItem
                title="Personalized Analytics"
                description="Create custom dashboards tailored to your specific business needs and KPIs."
                icon={<PieChart className="h-5 w-5 text-blue-500" />}
                className="md:col-span-2 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 grid grid-cols-2 gap-2 h-40">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                    <h4 className="text-xs font-medium mb-2">
                      Revenue Breakdown
                    </h4>
                    <div className="h-24 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-8 border-blue-200 relative">
                        <div
                          className="absolute inset-0 border-8 border-blue-400 rounded-full"
                          style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 border-8 border-blue-600 rounded-full"
                          style={{
                            clipPath: "polygon(0 0, 30% 0, 30% 100%, 0 100%)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                    <h4 className="text-xs font-medium mb-2">
                      Price Competitiveness
                    </h4>
                    <div className="h-24 flex items-center justify-center">
                      <div className="w-full h-16">
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full mb-2">
                          <div className="h-full w-3/4 bg-blue-400 rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full mb-2">
                          <div className="h-full w-1/2 bg-blue-400 rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full">
                          <div className="h-full w-5/6 bg-blue-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Alert Timeline"
                description="Stay informed with a chronological view of pricing alerts and market changes."
                icon={<Bell className="h-5 w-5 text-indigo-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-3 overflow-y-auto shadow-sm">
                  <div className="space-y-2">
                    {[
                      {
                        time: "10:23 AM",
                        message:
                          "Competitor A dropped prices by 5% on electronics",
                      },
                      {
                        time: "09:15 AM",
                        message:
                          "Your product 'Premium Headphones' is now priced 10% higher than market average",
                      },
                      {
                        time: "Yesterday",
                        message:
                          "Seasonal pricing rule activated for summer collection",
                      },
                      {
                        time: "Yesterday",
                        message:
                          "Competitor B increased prices across all categories",
                      },
                    ].map((alert, i) => (
                      <div
                        key={i}
                        className="text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <p className="font-medium">{alert.time}</p>
                        <p className="text-slate-600 dark:text-slate-400">
                          {alert.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Revenue Protection"
                description="Identify and prevent revenue leakage with proactive pricing alerts and recommendations."
                icon={<Shield className="h-5 w-5 text-green-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-3 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <Shield className="h-10 w-10 mx-auto text-green-400 mb-2" />
                    <p className="text-sm font-medium">Revenue Protected</p>
                    <p className="text-xl font-bold">$127,890</p>
                    <p className="text-xs text-slate-500">Last 30 days</p>
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Competitor Analysis"
                description="Compare your pricing strategy against competitors across multiple dimensions."
                icon={<BarChart className="h-5 w-5 text-blue-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-3 flex items-center justify-center shadow-sm">
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Your Store</span>
                      <span>Competitors</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full relative">
                      <div className="absolute h-4 w-4 top-1/2 left-2/3 transform -translate-y-1/2 bg-blue-400 rounded-full"></div>
                      <div className="h-full w-2/3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full relative">
                      <div className="absolute h-4 w-4 top-1/2 left-1/2 transform -translate-y-1/2 bg-blue-400 rounded-full"></div>
                      <div className="h-full w-1/2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full relative">
                      <div className="absolute h-4 w-4 top-1/2 left-3/4 transform -translate-y-1/2 bg-blue-400 rounded-full"></div>
                      <div className="h-full w-3/4 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </BentoGridItem>
              <BentoGridItem
                title="Market Trend Insights"
                description="Get predictive analytics on pricing trends to stay ahead of market shifts."
                icon={<TrendingUp className="h-5 w-5 text-teal-400" />}
                className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="mt-4 h-40 bg-white dark:bg-slate-800 rounded-lg p-3 flex items-center justify-center shadow-sm">
                  <div className="w-full h-24 relative">
                    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end">
                      <div className="w-1/6 h-4 bg-teal-200 rounded-sm mx-px"></div>
                      <div className="w-1/6 h-8 bg-teal-300 rounded-sm mx-px"></div>
                      <div className="w-1/6 h-12 bg-teal-400 rounded-sm mx-px"></div>
                      <div className="w-1/6 h-16 bg-teal-500 rounded-sm mx-px"></div>
                      <div className="w-1/6 h-10 bg-teal-400 rounded-sm mx-px"></div>
                      <div className="w-1/6 h-6 bg-teal-300 rounded-sm mx-px"></div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-teal-200"></div>
                    <div className="absolute top-8 left-0 right-0 border-b border-dashed border-teal-200"></div>
                    <div className="absolute top-16 left-0 right-0 border-b border-dashed border-teal-200"></div>
                  </div>
                </div>
              </BentoGridItem>
            </BentoGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
