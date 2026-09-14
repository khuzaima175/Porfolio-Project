import React from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  showEndpoint?: boolean;
  className?: string;
  minVal?: number;
  maxVal?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 160,
  height = 40,
  color = "var(--signal)",
  strokeWidth = 1.2,
  showEndpoint = true,
  className = "",
  minVal,
  maxVal,
}) => {
  if (!data || data.length < 2) return null;

  const min = minVal !== undefined ? minVal : Math.min(...data);
  const max = maxVal !== undefined ? maxVal : Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const padding = 3;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const lastPoint = points[points.length - 1].split(",");
  const lastX = parseFloat(lastPoint[0]);
  const lastY = parseFloat(lastPoint[1]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {showEndpoint && (
        <circle
          cx={lastX}
          cy={lastY}
          r={2}
          fill={color}
        />
      )}
    </svg>
  );
};

export default Sparkline;
