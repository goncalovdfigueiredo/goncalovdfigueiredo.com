import React from "react";

export default function SectionSeparator() {
  return (
    <div className="flex justify-center w-full py-10 md:py-16">
      {/* 
         w-3/4 md:w-1/2: Dá mais largura no telemóvel para se notar melhor e encolhe no desktop
         via-emerald-500/30: Alinhado com a identidade verde esmeralda do portefólio
         from-transparent via-emerald-500/30 to-transparent: Gradiente suave em três tiros
      */}
      <div className="h-px w-3/4 md:w-1/2 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.15)]" />
    </div>
  );
}