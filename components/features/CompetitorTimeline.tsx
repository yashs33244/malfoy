"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface TimelinePoint {
  id: number;
  date: string;
  description: string;
  isHighlighted: boolean;
}

interface CompetitorTimelineProps {
  points: TimelinePoint[];
  startDate: string;
  endDate: string;
  className?: string;
}

export default function CompetitorTimeline({
  points = [],
  startDate = "Jan 12",
  endDate = "Apr 18",
  className = "",
}: CompetitorTimelineProps) {
  const [activeTimelinePoint, setActiveTimelinePoint] = useState<number | null>(
    null
  );

  return (
    <div
      className={`bg-gray-100 border border-gray-200 rounded-xl p-6 ${className}`}
    >
      <div className="relative h-48">
        <div className="absolute inset-0 flex items-center">
          <div className="h-0.5 w-full bg-gray-300 mt-16"></div>
        </div>

        {/* Timeline points */}
        {points.map((point, index) => {
          const isActive =
            activeTimelinePoint === point.id || point.isHighlighted;
          const position = (index / (points.length - 1)) * 100;

          return (
            <div
              key={point.id}
              className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full cursor-pointer transition-all mt-8
                ${
                  isActive
                    ? "bg-green-500 shadow-lg shadow-green-500/30 scale-110"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              style={{ left: `${position}%` }}
              onMouseEnter={() => setActiveTimelinePoint(point.id)}
              onMouseLeave={() => setActiveTimelinePoint(null)}
            >
              <div
                className={`absolute -top-14 -left-16 w-32 bg-white border border-gray-200 p-2 rounded-lg text-xs
                transition-opacity duration-150 z-10 shadow-md
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div className="font-medium text-black">{point.date}</div>
                <div className="text-gray-600">{point.description}</div>
              </div>
            </div>
          );
        })}

        {/* Date labels */}
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
          {startDate}
        </div>
        <div className="absolute -bottom-6 right-0 text-xs text-gray-500">
          {endDate}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <p className="text-sm bg-gray-100 p-3 rounded-lg inline-block flex items-center border border-gray-200">
          <Info className="h-4 w-4 mr-2 text-green-500" />
          Hover over timeline points to see competitor price changes and
          important market events
        </p>
      </div>
    </div>
  );
}
