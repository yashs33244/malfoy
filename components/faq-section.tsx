"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";

type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqItems: FaqItem[] = [
    {
      question: "How does Malfoy collect competitor pricing data?",
      answer:
        "Malfoy uses advanced web scraping technology and API integrations to collect real-time pricing data from competitor websites and marketplaces. Our system is designed to respect robots.txt files and adhere to all legal requirements for data collection.",
      category: "general",
    },
    {
      question: "How often is pricing data updated?",
      answer:
        "Data update frequency depends on your plan. The Starter plan includes daily updates, Professional offers hourly updates, and Enterprise provides real-time updates. You can also manually trigger updates whenever needed.",
      category: "general",
    },
    {
      question: "Can I integrate Malfoy with my e-commerce platform?",
      answer:
        "Yes, Malfoy integrates seamlessly with all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, Amazon, eBay, and more. We also offer API access for custom integrations on our Enterprise plan.",
      category: "integration",
    },
    {
      question: "How accurate are the pricing simulations?",
      answer:
        "Our pricing simulations are based on historical data, market trends, and advanced machine learning algorithms. While no prediction can be 100% accurate, our customers typically see 85-95% accuracy in revenue and profit impact projections.",
      category: "features",
    },
    {
      question: "Is there a limit to how many products I can track?",
      answer:
        "Yes, the number of SKUs you can track depends on your plan. Starter allows up to 100 SKUs, Professional up to 1,000 SKUs, and Enterprise offers unlimited SKUs. If you need a custom solution, please contact our sales team.",
      category: "pricing",
    },
    {
      question: "How secure is my data on Malfoy?",
      answer:
        "We take data security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices, regular security audits, and comply with GDPR, CCPA, and other relevant data protection regulations.",
      category: "security",
    },
    {
      question: "Can I export data from Malfoy?",
      answer:
        "Yes, all plans include the ability to export data in various formats including CSV, Excel, and PDF. You can export pricing data, competitor analysis, simulation results, and custom reports.",
      category: "features",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial on all our plans. No credit card is required to start your trial. You'll have full access to all features included in your selected plan during the trial period.",
      category: "pricing",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "features", name: "Features" },
    { id: "integration", name: "Integration" },
    { id: "pricing", name: "Pricing" },
    { id: "security", name: "Security" },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextShimmer>Frequently Asked Questions</TextShimmer>
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about Malfoy and our pricing
            intelligence platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left bg-card hover:bg-muted/50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-muted/30 border-t border-border">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
