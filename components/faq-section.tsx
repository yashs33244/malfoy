import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CalendlyBadgeWidget } from "./calendly-badge-widget";
import { CalendlyScheduleModal } from "./calendly-schedule-modal";
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
      question: "How does our platform collect inventory data?",
      answer:
        "Our platform uses advanced API integrations and secure connections to collect real-time inventory data from your warehouses and marketplaces. The system is designed to provide accurate information while maintaining data privacy and security.",
      category: "general",
    },
    {
      question: "How often is inventory data updated?",
      answer:
        "Data update frequency depends on your plan. The Basic plan includes daily updates, Professional offers hourly updates, and Enterprise provides real-time updates. You can also manually trigger updates whenever needed.",
      category: "general",
    },
    {
      question: "Can I integrate with my existing procurement system?",
      answer:
        "Yes, our platform integrates seamlessly with all major procurement and inventory management systems including SAP, Oracle, Microsoft Dynamics, and more. We also offer API access for custom integrations on our Enterprise plan.",
      category: "integration",
    },
    {
      question: "How accurate are the procurement simulations?",
      answer:
        "Our procurement simulations are based on historical data, market trends, and advanced machine learning algorithms. While no prediction can be 100% accurate, our customers typically see 85-95% accuracy in cost saving and efficiency impact projections.",
      category: "features",
    },
    {
      question: "Is there a limit to how many products I can track?",
      answer:
        "Yes, the number of SKUs you can track depends on your plan. Basic allows up to 100 SKUs, Professional up to 1,000 SKUs, and Enterprise offers unlimited SKUs. If you need a custom solution, please contact our sales team.",
      category: "pricing",
    },
    {
      question: "How secure is my data on your platform?",
      answer:
        "We take data security very seriously. All data is encrypted both in transit and at rest using blockchain technology. We use industry-standard security practices, regular security audits, and comply with GDPR, CCPA, and other relevant data protection regulations.",
      category: "security",
    },
    {
      question: "Can I export data from your platform?",
      answer:
        "Yes, all plans include the ability to export data in various formats including CSV, Excel, and PDF. You can export inventory data, procurement analysis, simulation results, and custom reports.",
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
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find answers to common questions about our AI-powered procurement
            platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CalendlyScheduleModal
                url="https://calendly.com/yashs3324/interview"
                buttonVariant="default"
                buttonClassName="px-6 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                buttonText="Contact Support"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
