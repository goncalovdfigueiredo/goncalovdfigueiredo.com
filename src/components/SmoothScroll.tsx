"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        duration: 1.4,           // Um pouco mais lento para ser cinematográfico
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavidade matemática
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.1,    // Resposta mais rápida ao toque inicial
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}