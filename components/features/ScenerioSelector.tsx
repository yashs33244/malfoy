import { Zap } from "lucide-react";
import { CardContainer } from "./CardContainer";
import { ScenarioSelectorProps } from "@/types/features";

export const ScenarioSelector = ({
  scenarios,
  selectedScenario,
  onSelect,
}: ScenarioSelectorProps) => (
  <div className="grid grid-cols-2 gap-3">
    {Object.entries(scenarios).map(([key, scenario]) => {
      const isActive = selectedScenario === key;

      return (
        <CardContainer
          key={key}
          active={isActive}
          onClick={() => onSelect(key)}
        >
          <div>
            <div className="font-medium capitalize mb-1 flex items-center">
              {key === "ai_optimal" ? "AI Optimal" : key.replace("_", " ")}
              {key === "ai_optimal" && (
                <Zap className="h-3 w-3 inline-block ml-1" />
              )}
            </div>
            <div
              className={`text-xs ${
                isActive
                  ? "text-white/80"
                  : "text-slate-500 dark:text-slate-400 group-hover:text-white/80"
              }`}
            >
              {scenario.description}
            </div>
          </div>
        </CardContainer>
      );
    })}
  </div>
);
