import { useState } from "react";
import { Check } from "lucide-react";
import { RadarChart, chartColors } from "@/components/ui/shadcn-charts";

// Define interfaces
interface MarketZone {
  id: number;
  name: string;
  price: string;
  competitors: number;
  opportunity: string;
  className: string;
  gridPosition: string;
  textColor: string;
}

interface MarketPositioningMapProps {
  marketZones: MarketZone[];
  className?: string;
}

export default function MarketPositioningMap() {
  // Sample data for market zones
  const marketZones = [
    {
      id: 1,
      name: "Premium Market",
      price: "$80-120",
      competitors: 3,
      opportunity: "High",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      gridPosition: "col-span-2",
      textColor: "text-blue-700",
    },
    {
      id: 2,
      name: "Value Market",
      price: "$40-80",
      competitors: 8,
      opportunity: "Medium",
      className: "bg-green-100 text-green-800 hover:bg-green-200",
      gridPosition: "col-span-1",
      textColor: "text-green-700",
    },
    {
      id: 3,
      name: "Budget Market",
      price: "$20-40",
      competitors: 5,
      opportunity: "Low",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      gridPosition: "col-span-1",
      textColor: "text-yellow-700",
    },
    {
      id: 4,
      name: "Luxury Market",
      price: "$120-500",
      competitors: 2,
      opportunity: "High",
      className: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      gridPosition: "col-span-1",
      textColor: "text-purple-700",
    },
    {
      id: 5,
      name: "Mass Market",
      price: "$30-60",
      competitors: 12,
      opportunity: "Medium",
      className: "bg-pink-100 text-pink-800 hover:bg-pink-200",
      gridPosition: "col-span-1",
      textColor: "text-pink-700",
    },
    {
      id: 6,
      name: "Your Product",
      price: "$75-95",
      competitors: 4,
      opportunity: "High",
      className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      gridPosition: "col-span-1",
      textColor: "text-indigo-700",
    },
  ];

  const [selectedMarketZone, setSelectedMarketZone] = useState<MarketZone>(
    marketZones[0]
  );

  // Create radar chart data from market zones
  const radarData = [
    {
      name: "Quality",
      Your_Product: 80,
      Premium_Market: 90,
      Value_Market: 60,
      Budget_Market: 40,
      Luxury_Market: 95,
    },
    {
      name: "Price",
      Your_Product: 65,
      Premium_Market: 75,
      Value_Market: 55,
      Budget_Market: 30,
      Luxury_Market: 90,
    },
    {
      name: "Features",
      Your_Product: 75,
      Premium_Market: 85,
      Value_Market: 60,
      Budget_Market: 35,
      Luxury_Market: 95,
    },
    {
      name: "Support",
      Your_Product: 85,
      Premium_Market: 80,
      Value_Market: 60,
      Budget_Market: 40,
      Luxury_Market: 90,
    },
    {
      name: "Brand",
      Your_Product: 70,
      Premium_Market: 85,
      Value_Market: 65,
      Budget_Market: 40,
      Luxury_Market: 95,
    },
    {
      name: "Market Share",
      Your_Product: 60,
      Premium_Market: 70,
      Value_Market: 75,
      Budget_Market: 60,
      Luxury_Market: 45,
    },
  ];

  const handleZoneClick = (zone: MarketZone) => {
    setSelectedMarketZone(zone);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Main heading section with blue background similar to the image */}
      <div className="bg-blue-50 rounded-3xl p-8 mb-10 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              We automatically generate reports for each of your customers
            </h2>
            <p className="text-slate-600 text-lg">
              Gain valuable insights into market positioning and competitive
              landscape
            </p>
          </div>

          {/* Card with company information - matches the style in the image */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mr-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7 7v10M12 7v10M17 7v10" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Intercom</h3>
                <p className="text-gray-500 text-sm">Joined 9 Feb 2023</p>
              </div>
              <div className="ml-auto w-3 h-3 bg-green-400 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-3 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Total seats</span>
                </div>
                <span className="font-medium">50</span>
              </div>

              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-3 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Active seats</span>
                </div>
                <span className="font-medium">22</span>
              </div>

              <div className="flex items-center justify-between transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-3 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600">Active last 7 days</span>
                </div>
                <span className="font-medium">True</span>
              </div>
            </div>
          </div>

          {/* Add the activation metrics card */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg text-gray-700 mb-4">Company activation</h3>
            <div className="text-5xl font-bold mb-6">40%</div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Signed up</span>
                </div>
                <div className="w-32">
                  <div className="h-2 bg-indigo-100 rounded-full">
                    <div className="h-2 bg-indigo-500 rounded-full w-full"></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500">100%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Setup</span>
                </div>
                <div className="w-32">
                  <div className="h-2 bg-indigo-100 rounded-full">
                    <div className="h-2 bg-indigo-500 rounded-full w-4/5"></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500">80%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">Activated</span>
                </div>
                <div className="w-32">
                  <div className="h-2 bg-indigo-100 rounded-full">
                    <div className="h-2 bg-indigo-500 rounded-full w-2/5"></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market positioning section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <div className="bg-slate-900 rounded-xl p-6 h-96 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <RadarChart
              data={radarData}
              keys={[
                "Your_Product",
                "Premium_Market",
                "Value_Market",
                "Budget_Market",
                "Luxury_Market",
              ]}
              height={350}
              colors={[
                chartColors.primary,
                chartColors.secondary,
                chartColors.tertiary,
                chartColors.quaternary,
                chartColors.accent1,
              ]}
              showGrid={true}
              showTooltip={true}
              showLegend={true}
            />
          </div>

          {/* Grid of market zones */}
          <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
            {marketZones.map((zone) => (
              <div
                key={zone.id}
                className={`
                  transition-all duration-200 ease-in-out transform cursor-pointer 
                  hover:scale-105 p-2 text-center text-sm rounded-full
                  ${zone.className}
                  ${
                    selectedMarketZone.id === zone.id
                      ? "shadow-md ring-2 ring-opacity-50 ring-current"
                      : ""
                  }
                `}
                onClick={() => handleZoneClick(zone)}
              >
                <span
                  className={`transition-colors duration-200 ${zone.textColor}`}
                >
                  {zone.name}
                </span>
              </div>
            ))}
          </div>

          {/* Selected market zone info */}
          <div className="w-full mt-4">
            <div
              className={`
                shadow border border-gray-200 p-4 rounded-xl w-full transition-all duration-300
                hover:shadow-md ${selectedMarketZone.className.replace(
                  "hover:bg-blue-200",
                  ""
                )} bg-opacity-20
              `}
            >
              <div className="flex justify-between mb-2">
                <h4 className="text-lg font-medium flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${selectedMarketZone.className} opacity-80`}
                  ></span>
                  {selectedMarketZone.name}
                </h4>
              </div>

              {/* Main content grid with 3 columns */}
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
                  <p className="text-gray-500 dark:text-gray-300">
                    Price Point
                  </p>
                  <p className="font-medium flex items-center">
                    {selectedMarketZone.price}
                    <span className="ml-1 text-xs text-gray-400">USD</span>
                  </p>
                </div>
                <div className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
                  <p className="text-gray-500 dark:text-gray-300">
                    Competitors
                  </p>
                  <p className="font-medium flex items-center">
                    {selectedMarketZone.competitors}
                    <span
                      className={`ml-2 text-xs ${
                        selectedMarketZone.competitors > 5
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {selectedMarketZone.competitors > 5 ? "High" : "Low"}
                    </span>
                  </p>
                </div>
                <div className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all">
                  <p className="text-gray-500 dark:text-gray-300">
                    Opportunity
                  </p>
                  <p className="font-medium">
                    {selectedMarketZone.opportunity}
                  </p>
                </div>
              </div>

              {/* Additional content section */}
              <div className="mt-2 border-t border-gray-200 border-opacity-20 pt-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mr-1"></span>
                      Market Share: {selectedMarketZone.id * 5 + 10}%
                    </span>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all cursor-pointer">
                      <span className="w-1 h-1 rounded-full bg-green-400 mr-1"></span>
                      Growth: {selectedMarketZone.id * 2 + 5}%
                    </span>
                  </div>
                  <button
                    className={`text-xs px-4 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${selectedMarketZone.className} text-black shadow-sm hover:shadow-md`}
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features list */}
        <div>
          {/* Purple card similar to the image */}
          <div className="bg-purple-50 rounded-3xl p-8 mb-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Celebrate milestones
            </h2>
            <p className="text-purple-800">
              Instant alerts and weekly digests to keep your team aligned and
              celebrate wins
            </p>
          </div>

          {/* Yellow/cream card similar to the image */}
          <div className="bg-amber-50 rounded-3xl p-8 mb-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              Automatic enrichment
            </h2>
            <p className="text-amber-800">
              Automatically enrich your customers profiles and their users
              powered by GPT
            </p>
          </div>

          {/* Feature list from the original code */}
          <div className="p-6 rounded-xl bg-white ">
            <h3 className="text-xl font-semibold mb-6">Key Features</h3>
            <ul className="space-y-6">
              <li className="flex items-start transition-all duration-200 hover:bg-gray-50 p-3 rounded-full">
                <div className="mt-2 ml-2 flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Check className="w-4 h-4 text-blue-500 font-bold" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">
                    Track price changes
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Monitor competitors in real-time across multiple
                    marketplaces
                  </p>
                </div>
              </li>

              <li className="flex items-start transition-all duration-200 hover:bg-gray-50 p-3 rounded-full">
                <div className="mt-2 ml-2 flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Check className="w-4 h-4 text-blue-500 font-bold" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">
                    Analyze pricing trends and patterns
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Identify market opportunities and optimize your pricing
                    strategy
                  </p>
                </div>
              </li>

              <li className="flex items-start transition-all duration-200 hover:bg-gray-50 p-3 rounded-full">
                <div className="mt-2 ml-2 flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Check className="w-4 h-4 text-blue-500 font-bold" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Receive alerts</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Stay ahead of market changes with timely notifications
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
