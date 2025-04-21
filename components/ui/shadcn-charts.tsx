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
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

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
    const dataPoint: DataPoint = { name: `${i + 1}` };

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
// Custom tooltip component with glassmorphism effect
const GlassmorphismTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg backdrop-blur-md bg-white/70 border border-white/20 shadow-lg p-3">
        <p className="text-xs font-medium text-gray-700 mb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`tooltip-item-${index}`} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: entry.color }}
              >
                {entry.name}:
              </span>
              <span className="text-xs ml-1 font-semibold text-gray-800">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
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
  colors = [], // Default value will be handled in component
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  xAxisLabel,
  yAxisLabel,
  interactive = false,
  dotSize = 4,
}: LineChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartColors = colors.length
    ? colors
    : ["#60a5fa", "#f87171", "#6ee7b7", "#fcd34d", "#c4b5fd", "#f9a8d4"]; // softer tones

  return (
    <div
      className={cn(
        "w-full h-full bg-[#f3f3f3] rounded-lg shadow-lg",
        className
      )}
    >
      <ResponsiveContainer width="100%" height="100%" className="pb-6 pr-4">
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
          {showGrid && (
            <CartesianGrid stroke="#00000030" strokeDasharray="3 3" />
          )}
          <XAxis
            dataKey="name"
            tickLine={true}
            axisLine={{ stroke: "#00000020" }}
            fontSize={10}
            tickMargin={10}
            stroke="#000000"
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: "bottom",
                    offset: 10,
                    fontSize: 12,
                    padding: 10,
                    margin: 10,
                  }
                : undefined
            }
          />
          <YAxis
            tickLine={true}
            axisLine={{ stroke: "#00000030" }}
            fontSize={10}
            tickMargin={10}
            stroke="#000000"
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: "left",
                    offset: 1,
                    fontSize: 12,
                    fontWeight: "bold",
                    margin: 10,
                    padding: 10,
                  }
                : undefined
            }
          />
          {showTooltip && (
            <Tooltip
              cursor={{
                stroke: "#000000",
                strokeWidth: 1,
                strokeDasharray: "2 2",
              }}
              content={<GlassmorphismTooltip />}
              wrapperStyle={{ outline: "none" }}
            />
          )}
          {showLegend && (
            <Legend
              verticalAlign="top"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: "10px" }}
              formatter={(value) => (
                <span
                  className="text-xs font-medium"
                  style={{ color: "#000000" }}
                >
                  {value}
                </span>
              )}
            />
          )}
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={chartColors[index % chartColors.length]}
              strokeWidth={
                hoveredIndex !== null
                  ? data[hoveredIndex] && data[hoveredIndex][key] !== undefined
                    ? 2.5
                    : 1.5
                  : 2
              }
              dot={{
                r: dotSize,
                fill: chartColors[index % chartColors.length],
                stroke: "black",
                strokeWidth: 0.5,
                opacity: 0.9,
              }}
              activeDot={{
                r: dotSize + 1.5,
                fill: chartColors[index % chartColors.length],
                stroke: "green",
                strokeWidth: 1,
                opacity: 1,
              }}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-in-out"
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
              layout="vertical"
              align="left"
              iconSize={10} // smaller icon
              wrapperStyle={{
                paddingBottom: "5px",
                fontSize: "10px", // smaller text
                lineHeight: "1.5", // reduce vertical spacing
              }}
              margin={{ top: 10 }}
              height={10}
              chartHeight={10}
              chartWidth={10}
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
                stroke: "green",
                strokeWidth: 1,
              }}
              isAnimationActive={true}
              animationDuration={1000}
              scale="linear"
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
