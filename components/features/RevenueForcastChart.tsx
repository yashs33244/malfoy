import { RevenueForecastChartProps } from "@/types/features";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";
import { AreaChart, chartColors } from "../ui/shadcn-charts";

export const RevenueForecastChart = ({
  data,
  timeframe,
  showComparison,
}: RevenueForecastChartProps) => (
  <div className="bg-[#ffd2e0 dark:bg-slate-800 rounded-lg p-4 ">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <h4 className="text-md font-medium">Revenue Forecast</h4>
        <Badge
          variant="outline"
          className="ml-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        >
          <Calendar className="h-3 w-3 mr-1" />
          {timeframe === "monthly"
            ? "Monthly"
            : timeframe === "quarterly"
            ? "Quarterly"
            : "Weekly"}
        </Badge>
      </div>
    </div>
    <div className="h-[220px]">
      <AreaChart
        data={data}
        keys={showComparison ? ["Current", "AIOptimized"] : ["Current"]}
        height={220}
        colors={[chartColors.accent3, chartColors.primary]}
        showLegend={true}
        showGrid={true}
      />
    </div>
    {showComparison && (
      <div className="flex justify-end mt-2">
        <div className="text-xs text-blue-600 font-medium flex items-center">
          AI Optimized Projection{" "}
          <span className="ml-1 inline-block h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
        </div>
      </div>
    )}
  </div>
);
