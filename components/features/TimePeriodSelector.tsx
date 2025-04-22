import { useState } from "react";
import { motion } from "framer-motion";
import { TimeframeType, TimePeriodSelectorProps } from "@/types/features";

export const TimePeriodSelector = ({
  timeframe,
  setTimeframe,
}: TimePeriodSelectorProps) => {
  const timeframes = ["weekly", "monthly", "quarterly"];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="flex bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 p-1"
    >
      {timeframes.map((tf, idx) => {
        const isActive = timeframe === tf;

        return (
          <button
            key={tf}
            onClick={() => setTimeframe(tf as TimeframeType)}
            onMouseEnter={() => setHovered(idx)}
            className="relative flex-1 px-4 py-2 text-sm text-neutral-600 hover:text-black transition-colors rounded-full"
          >
            {hovered === idx && !isActive && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-slate-700"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            {isActive && (
              <motion.div
                layoutId="selected"
                className="absolute inset-0 h-full w-full rounded-full bg-blue-600"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 40,
                }}
              />
            )}

            <span className={`relative z-20 ${isActive ? "text-white" : ""}`}>
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TimePeriodSelector;
