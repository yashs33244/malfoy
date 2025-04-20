import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { AreaChart, chartColors } from "../ui/shadcn-charts";
import { TimeframeType } from "@/types/features";

import { ChartDataPoint } from "@/types/features";

export const RevenueForecastChart = ({
  data,
  timeframe,
  showComparison,
}: {
  data: ChartDataPoint[];
  timeframe: TimeframeType;
  showComparison: boolean;
}) => (
  <div className="mb-6 bg-background/20 backdrop-blur-sm rounded-lg p-4 border border-border/40">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-sm font-medium">AI-Optimized Revenue Forecast</h4>
      <Badge variant="outline" className="text-xs">
        <Calendar className="h-3 w-3 mr-1" />
        {timeframe}
      </Badge>
    </div>
    <div className="h-[200px]">
      <AreaChart
        data={data}
        keys={showComparison ? ["Current", "AIOptimized"] : ["Current"]}
        height={200}
        colors={[chartColors.accent3, chartColors.primary]}
        showLegend={true}
        showGrid={true}
      />
    </div>
  </div>
);
