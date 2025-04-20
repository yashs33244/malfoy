import { TimeframeType } from "@/types/features";

export const TimePeriodSelector = ({
  timeframe,
  setTimeframe,
}: {
  timeframe: TimeframeType;
  setTimeframe: (value: TimeframeType) => void;
}) => (
  <div className="mb-6">
    <h4 className="text-sm font-medium mb-2">Time Period</h4>
    <div className="flex bg-background/20 backdrop-blur-sm rounded-lg p-1 border border-border/40">
      <button
        className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
          timeframe === "weekly"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-background/30"
        }`}
        onClick={() => setTimeframe("weekly")}
      >
        Weekly
      </button>
      <button
        className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
          timeframe === "monthly"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-background/30"
        }`}
        onClick={() => setTimeframe("monthly")}
      >
        Monthly
      </button>
      <button
        className={`flex-1 py-2 px-3 rounded-md text-sm transition-all ${
          timeframe === "quarterly"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-background/30"
        }`}
        onClick={() => setTimeframe("quarterly")}
      >
        Quarterly
      </button>
    </div>
  </div>
);
