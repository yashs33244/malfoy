import { Minus, Plus } from "lucide-react";
import { PriceControlProps } from "@/types/ui-components";

export default function PriceControl({
  priceChange,
  onDecrease,
  onIncrease,
}: PriceControlProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="text-lg font-medium mb-2">Price Change</div>
      <div className="text-3xl font-bold text-blue-600 mb-4">
        {priceChange > 0 ? "+" : ""}
        {priceChange}%
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onDecrease}
          disabled={priceChange <= -15}
          className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Decrease price"
        >
          <Minus className="h-5 w-5" />
        </button>
        <button
          onClick={onIncrease}
          disabled={priceChange >= 15}
          className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Increase price"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
