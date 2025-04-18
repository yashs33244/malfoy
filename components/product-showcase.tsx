"use client"

import { useState } from "react"
import { TiltedScroll } from "@/components/ui/tilted-scroll"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { GradientCard } from "@/components/ui/card"
import { Pointer } from "@/components/ui/pointer"
import { BorderBeam } from "@/components/ui/border-beam"
import { TextAnimate } from "@/components/ui/text-animate"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { ArrowRight, BarChart2, LineChart, PieChart, TrendingUp, Zap } from "lucide-react"

export default function ProductShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const features = ["Competitive Intelligence", "Pricing Simulations", "Automated Dynamic Pricing"]

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextAnimate>Powerful Features</TextAnimate>
          </h2>
          <p className="text-muted-foreground">
            Our platform provides comprehensive tools to help you make data-driven pricing decisions.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-center mb-8">
            {features.map((feature, index) => (
              <button
                key={feature}
                className={`px-6 py-3 rounded-full transition-colors ${
                  activeFeature === index ? "bg-primary text-white" : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <TiltedScroll>
          {activeFeature === 0 && (
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Real-time Market Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor your competitors' pricing strategies in real-time and identify market opportunities before
                    they do.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Track price changes across multiple marketplaces
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Analyze pricing trends and patterns
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Receive alerts for significant market movements
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <GlowingEffect className="h-80 w-full rounded-xl bg-muted p-4">
                    <div className="h-full w-full rounded-lg bg-card p-6">
                      <h4 className="text-lg font-medium mb-4">Competitor Price Comparison</h4>
                      <div className="space-y-4">
                        {[
                          { name: "Your Store", price: "$129.99", change: "+0%" },
                          { name: "Competitor A", price: "$149.99", change: "+15%" },
                          { name: "Competitor B", price: "$119.99", change: "-8%" },
                          { name: "Competitor C", price: "$139.99", change: "+8%" },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-2 rounded bg-background">
                            <span>{item.name}</span>
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{item.price}</span>
                              <span
                                className={`text-xs ${
                                  item.change.startsWith("+")
                                    ? "text-green-500"
                                    : item.change === "+0%"
                                      ? "text-muted-foreground"
                                      : "text-red-500"
                                }`}
                              >
                                {item.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Pointer className="absolute bottom-4 right-4" />
                    </div>
                  </GlowingEffect>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="relative h-80 rounded-xl overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-64 h-64 relative">
                          {/* Simple globe visualization instead of using the Globe component */}
                          <div className="absolute inset-0 rounded-full border-2 border-primary/30"></div>
                          <div
                            className="absolute inset-0 rounded-full border-2 border-primary/20"
                            style={{ transform: "rotate(30deg)" }}
                          ></div>
                          <div
                            className="absolute inset-0 rounded-full border-2 border-primary/10"
                            style={{ transform: "rotate(60deg)" }}
                          ></div>

                          {/* Add some dots to represent markets */}
                          <div
                            className="absolute h-3 w-3 rounded-full bg-primary"
                            style={{ top: "30%", left: "20%" }}
                          ></div>
                          <div
                            className="absolute h-3 w-3 rounded-full bg-primary"
                            style={{ top: "70%", left: "30%" }}
                          ></div>
                          <div
                            className="absolute h-3 w-3 rounded-full bg-primary"
                            style={{ top: "40%", left: "80%" }}
                          ></div>
                          <div
                            className="absolute h-3 w-3 rounded-full bg-primary"
                            style={{ top: "20%", left: "60%" }}
                          ></div>
                          <div
                            className="absolute h-3 w-3 rounded-full bg-secondary"
                            style={{ top: "60%", left: "70%" }}
                          ></div>
                          <div
                            className="absolute h-3 w-3 rounded-full bg-accent"
                            style={{ top: "80%", left: "50%" }}
                          ></div>

                          {/* Pulse effect for one of the dots */}
                          <div
                            className="absolute h-3 w-3 rounded-full bg-transparent"
                            style={{ top: "30%", left: "20%" }}
                          >
                            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm p-4 rounded-lg">
                      <h4 className="text-lg font-medium mb-2">Global Market Position</h4>
                      <p className="text-sm text-muted-foreground">
                        Your products are competitively positioned in 8 out of 10 key markets.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Market Positioning Map</h3>
                  <p className="text-muted-foreground mb-6">
                    Visualize your position in the market relative to competitors across different regions and product
                    categories.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Identify underserved market segments
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Spot pricing opportunities by region
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Track market share changes over time
                    </li>
                  </ul>
                </div>
              </div>

              <BentoGrid className="max-w-4xl mx-auto">
                {[
                  {
                    title: "Price Alerts",
                    description: "Get notified when competitors change their prices beyond your set thresholds.",
                    icon: <Zap className="h-6 w-6 text-primary" />,
                  },
                  {
                    title: "Trend Analysis",
                    description: "Identify pricing patterns and seasonal trends to stay ahead of the market.",
                    icon: <TrendingUp className="h-6 w-6 text-secondary" />,
                  },
                  {
                    title: "Market Share Tracking",
                    description: "Monitor how your pricing strategy affects your market position over time.",
                    icon: <PieChart className="h-6 w-6 text-accent" />,
                  },
                  {
                    title: "Competitor Timeline",
                    description: "View historical pricing data to understand competitor strategies.",
                    icon: <LineChart className="h-6 w-6 text-primary" />,
                  },
                ].map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    className="border border-border"
                  />
                ))}
              </BentoGrid>
            </div>
          )}

          {activeFeature === 1 && (
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Revenue Impact Simulator</h3>
                  <p className="text-muted-foreground mb-6">
                    Test different pricing strategies and see their projected impact on your revenue and profit margins.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Simulate price changes across your product catalog
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Forecast revenue and profit impact
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Compare multiple pricing scenarios side-by-side
                    </li>
                  </ul>
                </div>
                <div>
                  <GradientCard className="h-80 w-full p-6">
                    <h4 className="text-lg font-medium mb-4">Price Impact Calculator</h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm mb-2">Price Change (%)</label>
                        <input type="range" min="-20" max="20" defaultValue="5" className="w-full" />
                        <div className="flex justify-between text-xs mt-1">
                          <span>-20%</span>
                          <span>0%</span>
                          <span>+20%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">Revenue Impact</p>
                          <p className="text-xl font-bold text-green-500">+12.3%</p>
                        </div>
                        <div className="bg-background p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">Profit Impact</p>
                          <p className="text-xl font-bold text-green-500">+18.7%</p>
                        </div>
                        <div className="bg-background p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">Sales Volume</p>
                          <p className="text-xl font-bold text-amber-500">-3.2%</p>
                        </div>
                        <div className="bg-background p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">Market Share</p>
                          <p className="text-xl font-bold text-amber-500">-1.5%</p>
                        </div>
                      </div>

                      <button className="w-full py-2 bg-primary text-white rounded-md flex items-center justify-center">
                        <span>Save Scenario</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </GradientCard>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <BorderBeam className="h-80 w-full rounded-xl bg-card p-6">
                    <h4 className="text-lg font-medium mb-4">Before/After Comparison</h4>
                    <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
                      <div className="bg-muted rounded-lg p-4 flex flex-col">
                        <h5 className="text-sm font-medium mb-2">Before Optimization</h5>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                            <p className="text-2xl font-bold">$125,000</p>
                            <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 flex flex-col">
                        <h5 className="text-sm font-medium mb-2">After Optimization</h5>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <BarChart2 className="h-16 w-16 mx-auto text-primary mb-2" />
                            <p className="text-2xl font-bold">$158,750</p>
                            <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BorderBeam>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Scenario Comparison</h3>
                  <p className="text-muted-foreground mb-6">
                    Compare different pricing strategies side-by-side to identify the optimal approach for your business
                    goals.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Visualize before and after results
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Analyze trade-offs between revenue and market share
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Save and compare multiple scenarios
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeFeature === 2 && (
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Automated Pricing Rules</h3>
                  <p className="text-muted-foreground mb-6">
                    Create sophisticated pricing rules that automatically adjust your prices based on market conditions.
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
                </div>
                <div>
                  <div className="bg-card border border-border rounded-xl p-6 h-80 overflow-hidden">
                    <h4 className="text-lg font-medium mb-4">Rule Builder</h4>
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-lg border border-border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Competitor Matching</span>
                          <div className="h-4 w-8 bg-primary rounded-full"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          If competitor price drops below your price, match their price minus 2%
                        </p>
                      </div>

                      <div className="bg-muted p-3 rounded-lg border border-border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Margin Protection</span>
                          <div className="h-4 w-8 bg-primary rounded-full"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Never price below 15% profit margin regardless of competitor prices
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
                          Increase price by 10% when inventory falls below 20% of initial stock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-card border border-border rounded-xl p-6 h-80">
                    <h4 className="text-lg font-medium mb-4">Integration Ecosystem</h4>
                    <div className="relative h-[calc(100%-2rem)]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">PriceIQ</span>
                        </div>
                      </div>

                      {["Shopify", "Amazon", "WooCommerce", "Magento", "BigCommerce", "eBay"].map((platform, i) => {
                        const angle = i * 60 * (Math.PI / 180)
                        const radius = 120
                        const x = Math.cos(angle) * radius
                        const y = Math.sin(angle) * radius

                        return (
                          <div
                            key={platform}
                            className="absolute w-16 h-16 rounded-full bg-muted flex items-center justify-center"
                            style={{
                              left: `calc(50% + ${x}px - 2rem)`,
                              top: `calc(50% + ${y}px - 2rem)`,
                            }}
                          >
                            <span className="text-xs text-center">{platform}</span>
                          </div>
                        )
                      })}

                      <div className="absolute inset-0 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 300 300">
                          <g transform="translate(150, 150)">
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                              const radian = angle * (Math.PI / 180)
                              const x = Math.cos(radian) * 120
                              const y = Math.sin(radian) * 120

                              return (
                                <line
                                  key={i}
                                  x1="0"
                                  y1="0"
                                  x2={x}
                                  y2={y}
                                  stroke="#1a365d"
                                  strokeWidth="2"
                                  strokeDasharray="4 4"
                                />
                              )
                            })}
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Seamless Integrations</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with your existing e-commerce platforms and marketplaces for automated price updates.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      One-click integration with major platforms
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      Real-time price synchronization
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">✓</span>
                      API access for custom integrations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </TiltedScroll>
      </div>
    </section>
  )
}
