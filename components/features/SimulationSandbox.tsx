import { SimulationImpactCardProps } from "@/types/features";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

import { TooltipProvider } from "../ui/tooltip";
import { Info } from "lucide-react";

export const SimulationImpactCard = ({
  label,
  value,
  prefix = "",
  isPositive = true,
  description = "",
  icon = null,
}: SimulationImpactCardProps) => {
  const colorClass = isPositive ? "text-emerald-500" : "text-rose-500";
  const bgColorClass = isPositive ? "bg-emerald-500" : "bg-rose-500";
  const width = Math.min(100, Math.abs(value * 3));

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 ml-1 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <p className={`text-2xl font-bold ${colorClass}`}>
        {prefix}
        {value}%
      </p>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100 dark:bg-slate-700"></div>
      <div
        className={`absolute bottom-0 left-0 h-1 ${bgColorClass}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};
