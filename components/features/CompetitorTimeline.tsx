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
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <h3 className="text-2xl font-bold mb-4">Competitor Timeline</h3>

      <div className="relative h-24">
        <div className="absolute inset-0 flex items-center">
          <div className="h-0.5 w-full bg-muted"></div>
        </div>

        {/* Timeline points */}
        {points.map((point, index) => {
          const isActive =
            activeTimelinePoint === point.id || point.isHighlighted;
          const position = (index / (points.length - 1)) * 100;

          return (
            <div
              key={point.id}
              className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full cursor-pointer transition-all
                ${
                  isActive
                    ? "bg-primary shadow-lg shadow-primary/30 scale-110"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              style={{ left: `${position}%` }}
              onMouseEnter={() => setActiveTimelinePoint(point.id)}
              onMouseLeave={() => setActiveTimelinePoint(null)}
            >
              <div
                className={`absolute -top-14 -left-16 w-32 bg-card border border-border p-2 rounded text-xs
                transition-opacity duration-150 z-10
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div className="font-medium">{point.date}</div>
                <div className="text-muted-foreground">{point.description}</div>
              </div>
            </div>
          );
        })}

        {/* Date labels */}
        <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
          {startDate}
        </div>
        <div className="absolute -bottom-6 right-0 text-xs text-muted-foreground">
          {endDate}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <p className="text-sm bg-muted/50 p-3 rounded-lg inline-block flex items-center">
          <Info className="h-4 w-4 mr-2 text-primary" />
          Hover over timeline points to see competitor price changes and
          important market events
        </p>
      </div>
    </div>
  );
}
