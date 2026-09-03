// src/components/ElectricBorder.tsx
import { useMemo, type CSSProperties, type ReactNode } from "react";
import "./ElectricBorder.css";

type Props = {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
};

const ElectricBorder = ({
  children,
  color = "#3FB5FF",
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  className = "",
  style,
}: Props) => {
  const filterId = useMemo(() => `eb-filter-${Math.floor(Math.random() * 1e9)}`, []);

  const vars = {
    "--electric-border-color": color,
    "--electric-border-speed": `${(2 / Math.max(0.01, speed)).toFixed(2)}s`,
    "--electric-border-thickness": `${thickness}px`,
  } as CSSProperties;

  const baseFreq = Math.max(0.005, Math.min(0.05, chaos * 0.4)).toFixed(3);

  return (
    <div className={`electric-border ${className}`} style={{ ...vars, ...style }}>
      <svg aria-hidden="true" className="eb-filter-svg">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFreq}
              numOctaves="3"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="seed"
                from="0"
                to="100"
                dur={`${(6 / Math.max(0.01, speed)).toFixed(1)}s`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={8 * chaos * 10} />
          </filter>
        </defs>
      </svg>

      <div className="eb-layers" style={{ filter: `url(#${filterId})` }}>
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;