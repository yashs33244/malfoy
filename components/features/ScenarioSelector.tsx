import { Zap } from "lucide-react";
import { Scenarios } from "@/types/features";

export const ScenarioSelector = ({
  scenarios,
  selectedScenario,
  onSelect,
}: {
  scenarios: Scenarios;
  selectedScenario: string;
  onSelect: (scenario: string) => void;
}) => (
  <div className="mb-6 bg-background/20 backdrop-blur-sm rounded-lg p-4 border border-border/40">
    <h4 className="text-sm font-medium mb-3">Pricing Scenarios</h4>
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(scenarios).map(([key, scenario]) => (
        <button
          key={key}
          className={`px-3 py-2 rounded-lg text-sm border transition-all ${
            selectedScenario === key
              ? "border-primary/70 bg-primary/10 text-primary"
              : "border-border/40 hover:border-primary/30 bg-background/10"
          }`}
          onClick={() => onSelect(key)}
        >
          <div className="font-medium capitalize mb-1">
            {key.replace("_", " ")}
            {key === "ai_optimal" && (
              <Zap className="h-3 w-3 inline-block ml-1" />
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {scenario.description}
          </div>
        </button>
      ))}
    </div>
  </div>
);
