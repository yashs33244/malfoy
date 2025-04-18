"use client"

import { TextReveal } from "@/components/ui/text-reveal"
import { ShineBorder } from "@/components/ui/shine-border"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Clock, BarChart, PieChart, Bell, Shield, Zap, Search, TrendingUp } from "lucide-react"

export default function WhyUs() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Our platform combines real-time data, advanced simulations, and automated pricing to give you a competitive
            edge.
          </p>
        </div>

        <div className="space-y-24">
          {/* REAL-TIME PRICING */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <TextReveal text="Real-Time Pricing Intelligence" className="text-2xl md:text-3xl font-bold mb-4" />
              <p className="text-muted-foreground">
                Monitor your competitors' pricing strategies in real-time and identify market opportunities.
              </p>
            </div>

            <BentoGrid className="max-w-5xl mx-auto">
              <BentoGridItem
                title="Live Price Comparison"
                description="Track competitor prices across multiple marketplaces in real-time with automated alerts."
                icon={<Clock className="h-6 w-6 text-primary" />}
                className="md:col-span-2"
              >
                <div className="mt-4 h-40 bg-muted rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Live Price Ticker</h4>
                    <span className="text-xs text-muted-foreground">Updated 2 min ago</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { product: "Premium Headphones", yours: "$129.99", competitor: "$139.99", diff: "-7.1%" },
                      { product: "Wireless Speaker", yours: "$89.99", competitor: "$79.99", diff: "+12.5%" },
                      { product: "Smart Watch", yours: "$199.99", competitor: "$219.99", diff: "-9.1%" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-1 rounded bg-background">
                        <span>{item.product}</span>
                        <div className="flex items-center gap-4">
                          <span>You: {item.yours}</span>
                          <span>Comp: {item.competitor}</span>
                          <span className={`${item.diff.startsWith("+") ? "text-red-500" : "text-green-500"}`}>
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
                icon={<Search className="h-6 w-6 text-secondary" />}
              >
                <div className="mt-4 h-40 bg-muted rounded-lg p-4 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div
                      className="absolute inset-0 border-4 border-secondary rounded-full border-dashed animate-spin"
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
                icon={<Zap className="h-6 w-6 text-accent" />}
              >
                <div className="mt-4 h-40 bg-muted rounded-lg p-4 flex flex-wrap items-center justify-center gap-2">
                  {["Amazon", "Shopify", "eBay", "Walmart", "Etsy", "WooCommerce"].map((platform) => (
                    <div key={platform} className="px-3 py-1 bg-background rounded-full text-xs">
                      {platform}
                    </div>
                  ))}
                </div>
              </BentoGridItem>
            </BentoGrid>
          </div>

          {/* SIMULATION SANDBOX */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <TextReveal text="Simulation Sandbox" className="text-2xl md:text-3xl font-bold mb-4" />
              <p className="text-muted-foreground">
                Test different pricing strategies and see their projected impact before implementing them.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ShineBorder>
                <div className="bg-card p-6 rounded-lg h-full">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-primary" />
                    Interactive Pricing Tool
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Adjust prices and instantly see the projected impact on revenue, profit, and market share.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm mb-2">Price Adjustment</label>
                      <input type="range" min="-20" max="20" defaultValue="5" className="w-full" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>-20%</span>
                        <span>0%</span>
                        <span>+20%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Revenue Impact</p>
                        <p className="text-xl font-bold text-green-500">+12.3%</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Profit Impact</p>
                        <p className="text-xl font-bold text-green-500">+18.7%</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Sales Volume</p>
                        <p className="text-xl font-bold text-amber-500">-3.2%</p>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Market Share</p>
                        <p className="text-xl font-bold text-amber-500">-1.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ShineBorder>

              <GlowingEffect className="bg-card p-6 rounded-lg h-full">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-secondary" />
                  Time-Saving Calculator
                </h3>
                <p className="text-muted-foreground mb-6">
                  Quantify the time and resources saved by automating your pricing strategy.
                </p>
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Manual vs. Automated Pricing</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Manual Process</p>
                        <ul className="text-xs space-y-1">
                          <li>• 40+ hours/month</li>
                          <li>• Delayed responses</li>
                          <li>• Human error risk</li>
                          <li>• Limited data analysis</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">With PriceIQ</p>
                        <ul className="text-xs space-y-1">
                          <li className="text-green-500">• 2 hours/month</li>
                          <li className="text-green-500">• Real-time updates</li>
                          <li className="text-green-500">• Consistent accuracy</li>
                          <li className="text-green-500">• Data-driven decisions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Annual Savings</h4>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">456</p>
                        <p className="text-xs text-muted-foreground">Hours Saved Per Year</p>
                      </div>
                      <div className="mx-6 text-muted-foreground">+</div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-secondary">$27,360</p>
                        <p className="text-xs text-muted-foreground">Cost Savings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowingEffect>
            </div>
          </div>

          {/* CUSTOM DASHBOARDS */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <TextReveal text="Custom Dashboards" className="text-2xl md:text-3xl font-bold mb-4" />
              <p className="text-muted-foreground">
                Visualize your pricing data and market position with customizable dashboards.
              </p>
            </div>

            <BentoGrid className="max-w-5xl mx-auto">
              <BentoGridItem
                title="Personalized Analytics"
                description="Create custom dashboards tailored to your specific business needs and KPIs."
                icon={<PieChart className="h-6 w-6 text-primary" />}
                className="md:col-span-2"
              >
                <div className="mt-4 grid grid-cols-2 gap-2 h-40">
                  <div className="bg-muted rounded-lg p-3">
                    <h4 className="text-xs font-medium mb-2">Revenue Breakdown</h4>
                    <div className="h-[calc(100%-1.5rem)] flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-8 border-primary relative">
                        <div
                          className="absolute inset-0 border-8 border-secondary rounded-full"
                          style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                        ></div>
                        <div
                          className="absolute inset-0 border-8 border-accent rounded-full"
                          style={{ clipPath: "polygon(0 0, 30% 0, 30% 100%, 0 100%)" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <h4 className="text-xs font-medium mb-2">Price Competitiveness</h4>
                    <div className="h-[calc(100%-1.5rem)] flex items-center justify-center">
                      <div className="w-full h-16">
                        <div className="h-2 w-full bg-muted-foreground/20 rounded-full mb-2">
                          <div className="h-full w-3/4 bg-primary rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-muted-foreground/20 rounded-full mb-2">
                          <div className="h-full w-1/2 bg-secondary rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-muted-foreground/20 rounded-full">
                          <div className="h-full w-5/6 bg-accent rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BentoGridItem>

              <BentoGridItem
                title="Alert Timeline"
                description="Stay informed with a chronological view of pricing alerts and market changes."
                icon={<Bell className="h-6 w-6 text-secondary" />}
              >
                <div className="mt-4 h-40 bg-muted rounded-lg p-3 overflow-y-auto">
                  <div className="space-y-2">
                    {[
                      { time: "10:23 AM", message: "Competitor A dropped prices by 5% on electronics" },
                      {
                        time: "09:15 AM",
                        message: "Your product 'Premium Headphones' is now priced 10% higher than market average",
                      },
                      { time: "Yesterday", message: "Seasonal pricing rule activated for summer collection" },
                      { time: "Yesterday", message: "Competitor B increased prices across all categories" },
                    ].map((alert, i) => (
                      <div key={i} className="text-xs p-2 bg-background rounded-lg">
                        <p className="font-medium">{alert.time}</p>
                        <p className="text-muted-foreground">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoGridItem>

              <BentoGridItem
                title="Revenue Protection"
                description="Identify and prevent revenue leakage with proactive pricing alerts and recommendations."
                icon={<Shield className="h-6 w-6 text-accent" />}
              >
                <div className="mt-4 h-40 bg-muted rounded-lg p-3 flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="h-12 w-12 mx-auto text-accent mb-2" />
                    <p className="text-sm font-medium">Revenue Protected</p>
                    <p className="text-xl font-bold">$127,890</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
              </BentoGridItem>
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  )
}
