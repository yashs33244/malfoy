import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { SimulationImpactCardProps } from "@/types/features";

export const SimulationImpactCard = ({
  label,
  value,
  prefix = "",
  isPositive = true,
  description = "",
  icon = null,
}: SimulationImpactCardProps) => {
  const colorClass = isPositive ? "text-emerald-400" : "text-rose-400";
  const bgColorClass = isPositive ? "bg-emerald-400" : "bg-rose-400";
  const bgColorClassFaded = isPositive ? "bg-emerald-400/20" : "bg-rose-400/20";
  const width = Math.min(100, Math.abs(value * 3));

  return (
    <div className="bg-background/20 p-4 rounded-lg backdrop-blur-sm border border-border/30 relative overflow-hidden transition-all hover:border-border/60">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <p className={`text-xl font-bold ${colorClass}`}>
        {prefix}
        {value}%
      </p>
      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${bgColorClassFaded}`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 h-1 ${bgColorClass}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};
