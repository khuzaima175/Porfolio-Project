import React from "react";

interface FrameTicksProps {
  className?: string;
}

export const FrameTicks: React.FC<FrameTicksProps> = ({ className = "" }) => {
  return (
    <>
      <span className={`tick-mark tick-tl ${className}`} aria-hidden="true" />
      <span className={`tick-mark tick-tr ${className}`} aria-hidden="true" />
      <span className={`tick-mark tick-bl ${className}`} aria-hidden="true" />
      <span className={`tick-mark tick-br ${className}`} aria-hidden="true" />
    </>
  );
};

export default FrameTicks;
