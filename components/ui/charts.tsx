"use client";

import { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  LineController,
  Chart,
  ChartTypeRegistry,
  AnimationSpec,
  Point,
  BubbleDataPoint,
} from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController
);

// Helper function to generate random market data
export const generateMarketData = (
  dataPoints = 12,
  base = 100,
  volatility = 10
) => {
  const data = [];
  let prev = base;

  for (let i = 0; i < dataPoints; i++) {
    prev += volatility - Math.random() * volatility * 2;
    data.push(Math.max(0, Math.round(prev)));
  }

  return data;
};

// Get chart colors
export const chartColors = {
  primary: "hsl(var(--primary))",
  primaryLight: "hsl(var(--primary) / 0.3)",
  secondary: "hsl(var(--secondary))",
  secondaryLight: "hsl(var(--secondary) / 0.3)",
  accent: "hsl(var(--accent))",
  accentLight: "hsl(var(--accent) / 0.3)",
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  success: "hsl(var(--success))",
  successLight: "hsl(var(--success) / 0.3)",
  warning: "hsl(var(--warning))",
  warningLight: "hsl(var(--warning) / 0.3)",
  destructive: "hsl(var(--destructive))",
  destructiveLight: "hsl(var(--destructive) / 0.3)",
};

// Progressive line animation
const createProgressiveLineAnimation = (totalDuration = 10000) => {
  // Using a type that Chart.js will accept
  const animation: any = {
    x: {
      type: "number",
      easing: "linear",
      duration: (ctx: any) => {
        const data = ctx.chart.data.datasets[0].data;
        const delayBetweenPoints = totalDuration / data.length;
        return delayBetweenPoints;
      },
      from: NaN, // the point is initially skipped
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        const data = ctx.chart.data.datasets[0].data;
        const delayBetweenPoints = totalDuration / data.length;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: (ctx: any) => {
        const data = ctx.chart.data.datasets[0].data;
        const delayBetweenPoints = totalDuration / data.length;
        return delayBetweenPoints;
      },
      from: (ctx: any) => {
        if (ctx.index === 0) {
          return ctx.chart.scales.y.getPixelForValue(100);
        }
        return ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;
      },
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        const data = ctx.chart.data.datasets[0].data;
        const delayBetweenPoints = totalDuration / data.length;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  return animation;
};

interface LineChartProps {
  data: number[];
  labels?: string[];
  compareData?: number[];
  className?: string;
  height?: number;
  tension?: number;
  fillArea?: boolean;
  showLegend?: boolean;
  showAnimation?: boolean;
  duration?: number;
  color?: string;
  compareColor?: string;
  yMin?: number;
  yMax?: number;
}

export function LineChart({
  data,
  labels,
  compareData,
  className,
  height = 250,
  tension = 0.4,
  fillArea = false,
  showLegend = false,
  showAnimation = true,
  duration = 10000,
  color = chartColors.primary,
  compareColor = chartColors.secondary,
  yMin,
  yMax,
}: LineChartProps) {
  // Use the proper generic type for the chart reference
  const chartRef = useRef<ChartJS<"line", number[], string>>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Generate labels if not provided
  const defaultLabels =
    labels || Array.from({ length: data.length }, (_, i) => i.toString());

  const datasets = [
    {
      label: "Your Data",
      data: data,
      borderColor: color,
      backgroundColor: fillArea ? `${color}33` : undefined,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: tension,
      fill: fillArea,
    },
  ];

  if (compareData) {
    datasets.push({
      label: "Compare Data",
      data: compareData,
      borderColor: compareColor,
      backgroundColor: fillArea ? `${compareColor}33` : undefined,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: tension,
      fill: fillArea,
    });
  }

  const chartData = {
    labels: defaultLabels,
    datasets: datasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    // Cast the animation to any to satisfy TypeScript
    animation: (showAnimation && !hasAnimated
      ? createProgressiveLineAnimation(duration)
      : false) as any,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: `${chartColors.muted}33`,
        },
        min: yMin,
        max: yMax,
      },
    },
  };

  useEffect(() => {
    // Mark animation as completed after it runs once
    if (showAnimation && !hasAnimated) {
      const timeout = setTimeout(() => {
        setHasAnimated(true);
      }, duration + 500);

      return () => clearTimeout(timeout);
    }
  }, [showAnimation, hasAnimated, duration]);

  return (
    <div className={className} style={{ height: height }}>
      <ReactChart
        ref={chartRef}
        type="line"
        data={chartData}
        options={options}
      />
    </div>
  );
}

interface RadarChartProps {
  data: number[];
  labels: string[];
  className?: string;
  height?: number;
  showLegend?: boolean;
  color?: string;
  compareData?: number[];
  compareColor?: string;
}

export function RadarChart({
  data,
  labels,
  className,
  height = 250,
  showLegend = false,
  color = chartColors.primary,
  compareData,
  compareColor = chartColors.secondary,
}: RadarChartProps) {
  const datasets = [
    {
      label: "Your Data",
      data: data,
      backgroundColor: `${color}33`,
      borderColor: color,
      borderWidth: 2,
      pointBackgroundColor: color,
      pointRadius: 3,
    },
  ];

  if (compareData) {
    datasets.push({
      label: "Compare Data",
      data: compareData,
      backgroundColor: `${compareColor}33`,
      borderColor: compareColor,
      borderWidth: 2,
      pointBackgroundColor: compareColor,
      pointRadius: 3,
    });
  }

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          color: `${chartColors.muted}33`,
        },
        angleLines: {
          color: `${chartColors.muted}33`,
        },
        pointLabels: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend,
      },
    },
  };

  return (
    <div className={className} style={{ height: height }}>
      <ReactChart type="radar" data={chartData} options={options} />
    </div>
  );
}
