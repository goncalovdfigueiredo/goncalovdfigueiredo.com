"use client";

import React from "react";

export default function SectionSeparator() {
  return (
    <div className="w-full py-10 md:py-16 overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[70px] overflow-visible"
      >
        <defs>
          {/* 1. FILTRO DE BRILHO (NEON GLOW) */}
          <filter id="electron-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 2. MÁSCARA ANIMADA */}
          <linearGradient id="mask-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" />     
            <stop offset="80%" stopColor="#333333" />    
            <stop offset="98%" stopColor="#ffffff" />    
            <stop offset="100%" stopColor="#000000" />   
          </linearGradient>

          <mask id="electron-mask">
            <rect x="-30%" y="-50%" width="30%" height="200%" fill="url(#mask-gradient)">
              <animate
                attributeName="x"
                from="-30%"
                to="100%"
                dur="3.5s" 
                repeatCount="indefinite"
              />
            </rect>
          </mask>

          {/* 3. NOVO GRADIENTE MULTICOLOR (Baseado na tua imagem) */}
          <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />   {/* Rosa */}
            <stop offset="30%" stopColor="#3b82f6" />  {/* Azul */}
            <stop offset="50%" stopColor="#06b6d4" />  {/* Ciano (Centro) */}
            <stop offset="75%" stopColor="#8b5cf6" />  {/* Roxo */}
            <stop offset="100%" stopColor="#ec4899" /> {/* Rosa */}
          </linearGradient>
        </defs>

        {/* ================= DESENHO ================= */}

        {/* 1. Linha do eixo horizontal (muito ténue) */}
        <line
          x1="0"
          y1="50"
          x2="1000"
          y2="50"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />

        {/* 2. O Trilho da Onda (AGORA COM GRADIENTE E OPACIDADE A 25%) */}
        <path
          d="M 0 50 Q 125 76.7, 250 50 T 500 50 T 750 50 T 1000 50"
          fill="none"
          stroke="url(#cyber-gradient)"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />

        {/* 3. O Eletrão e o seu Rasto (Mesmo gradiente, mas a 100% e com brilho) */}
        <path
          d="M 0 50 Q 125 76.7, 250 50 T 500 50 T 750 50 T 1000 50"
          fill="none"
          stroke="url(#cyber-gradient)"
          strokeWidth="3"
          mask="url(#electron-mask)"
          filter="url(#electron-glow)"
        />
      </svg>
    </div>
  );
}