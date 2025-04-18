"use client";

import React, { useState } from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

// Color palette for charts
export const chartColors = {
  primary: "#4F46E5",
  secondary: "#EC4899",
  tertiary: "#10B981",
  quaternary: "#F59E0B",
  accent1: "#6366F1",
  accent2: "#8B5CF6",
  accent3: "#3B82F6",
  accent4: "#22D3EE",
  accent5: "#F43F5E",
  accent6: "#84CC16",
};

type DataPoint = {
  name: string;
  [key: string]: number | string;
};

// Helper function to generate random data
export const generateChartData = (
  points: number,
  keys: string[],
  max: number = 100,
  min: number = 0
): DataPoint[] => {
  return Array.from({ length: points }).map((_, i) => {
    const dataPoint: DataPoint = { name: `Day ${i + 1}` };

    keys.forEach((key) => {
      dataPoint[key] = Math.floor(Math.random() * (max - min + 1)) + min;
    });

    return dataPoint;
  });
};

// Interactive Area Chart
interface AreaChartProps {
  data: DataPoint[];
  keys: string[];
  height?: number;
  className?: string;
  colors?: string[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const AreaChart = ({
  data,
  keys,
  height = 300,
  className,
  colors = Object.values(chartColors).slice(0, 6),
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  xAxisLabel,
  yAxisLabel,
}: AreaChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          onMouseMove={(e) => {
            if (e.activeTooltipIndex !== undefined) {
              setHoveredIndex(e.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.2} />}
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            label={
              xAxisLabel
                ? { value: xAxisLabel, position: "bottom", offset: 5 }
                : undefined
            }
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            label={
              yAxisLabel
                ? { value: yAxisLabel, angle: -90, position: "left", offset: 5 }
                : undefined
            }
          />
          {showTooltip && (
            <Tooltip
              cursor={{ stroke: "#d4d4d8", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
          )}
          {keys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.2}
              activeDot={{
                r: 6,
                fill: colors[index % colors.length],
                stroke: "white",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={1000}
              strokeWidth={
                hoveredIndex !== null
                  ? data[hoveredIndex] && data[hoveredIndex][key]
                    ? 3
                    : 1
                  : 2
              }
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Multiple Bar Chart
interface BarChartProps {
  data: DataPoint[];
  keys: string[];
  height?: number;
  className?: string;
  colors?: string[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  stacked?: boolean;
  negative?: boolean;
}

export const BarChart = ({
  data,
  keys,
  height = 300,
  className,
  colors = Object.values(chartColors).slice(0, 6),
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  xAxisLabel,
  yAxisLabel,
  stacked = false,
  negative = false,
}: BarChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.2} />}
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            label={
              xAxisLabel
                ? { value: xAxisLabel, position: "bottom", offset: 5 }
                : undefined
            }
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            label={
              yAxisLabel
                ? { value: yAxisLabel, angle: -90, position: "left", offset: 5 }
                : undefined
            }
            domain={negative ? ["auto", "auto"] : [0, "auto"]}
          />
          {showTooltip && (
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
          )}
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              stackId={stacked ? "stack" : undefined}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Line Chart with Dots and Colors
interface LineChartProps {
  data: DataPoint[];
  keys: string[];
  height?: number;
  className?: string;
  colors?: string[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  interactive?: boolean;
  dotSize?: number;
}

export const LineChart = ({
  data,
  keys,
  height = 300,
  className,
  colors = Object.values(chartColors).slice(0, 6),
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  xAxisLabel,
  yAxisLabel,
  interactive = false,
  dotSize = 4,
}: LineChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          onMouseMove={(e) => {
            if (interactive && e.activeTooltipIndex !== undefined) {
              setHoveredIndex(e.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => interactive && setHoveredIndex(null)}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.2} />}
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            label={
              xAxisLabel
                ? { value: xAxisLabel, position: "bottom", offset: 5 }
                : undefined
            }
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            label={
              yAxisLabel
                ? { value: yAxisLabel, angle: -90, position: "left", offset: 5 }
                : undefined
            }
          />
          {showTooltip && (
            <Tooltip
              cursor={{
                stroke: "#d4d4d8",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
          )}
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={
                hoveredIndex !== null
                  ? data[hoveredIndex] && data[hoveredIndex][key]
                    ? 3
                    : 1
                  : 2
              }
              dot={{
                r: dotSize,
                fill: colors[index % colors.length],
                stroke: "white",
                strokeWidth: 1,
              }}
              activeDot={{
                r: dotSize + 2,
                fill: colors[index % colors.length],
                stroke: "white",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Radar Chart with Dots
interface RadarChartProps {
  data: DataPoint[];
  keys: string[];
  height?: number;
  className?: string;
  colors?: string[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

export const RadarChart = ({
  data,
  keys,
  height = 300,
  className,
  colors = Object.values(chartColors).slice(0, 6),
  showGrid = true,
  showTooltip = true,
  showLegend = true,
}: RadarChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          {showGrid && <PolarGrid stroke="#d4d4d8" strokeDasharray="3 3" />}
          <PolarAngleAxis dataKey="name" fontSize={12} />
          <PolarRadiusAxis axisLine={false} tickLine={false} />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "10px" }}
            />
          )}
          {keys.map((key, index) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.2}
              dot={{
                r: 4,
                fill: colors[index % colors.length],
                stroke: "white",
                strokeWidth: 1,
              }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Radial Chart with Grid
interface RadialChartProps {
  data: DataPoint[];
  dataKey: string;
  angleKey?: string;
  height?: number;
  className?: string;
  colors?: string[];
  showTooltip?: boolean;
  showLegend?: boolean;
  startAngle?: number;
  endAngle?: number;
  innerRadius?: string | number;
  outerRadius?: string | number;
}

export const RadialChart = ({
  data,
  dataKey,
  angleKey = "name",
  height = 300,
  className,
  colors = Object.values(chartColors).slice(0, 6),
  showTooltip = true,
  showLegend = true,
  startAngle = 0,
  endAngle = 360,
  innerRadius = "30%",
  outerRadius = "80%",
}: RadialChartProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadialBarChart
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <PolarAngleAxis
            type="number"
            dataKey={angleKey}
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "10px" }}
            />
          )}
          <RadialBar
            dataKey={dataKey}
            isAnimationActive={true}
            animationDuration={1000}
            cornerRadius={5}
            background={{ fill: "#f5f5f5", radius: 10 }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </RadialBar>
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
