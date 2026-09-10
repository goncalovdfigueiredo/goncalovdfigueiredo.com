"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      // 1. Onde estamos + Qual é o fundo real da página
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // 2. Prevenir divisões por zero e calcular a percentagem (0 a 100)
      if (maxScroll > 0) {
        const percentage = (currentScroll / maxScroll) * 100;
        // Limitamos entre 0 e 100 para evitar que passe dos limites se houver "bounce" no Mac
        setProgress(Math.min(100, Math.max(0, percentage)));
      }
    };

    // Escuta o scroll nativo com 'passive: true' para manter os 60 FPS
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    
    // Disparos de segurança: atualiza a barra assim que o Preloader desaparece!
    updateScroll();
    const t1 = setTimeout(updateScroll, 500);
    const t2 = setTimeout(updateScroll, 2000);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      // Aumentei a espessura para 3px e o z-index para um milhão para passar por cima do GlassHeader
      className="fixed top-0 left-0 h-[3px] bg-emerald-500 z-[999999] pointer-events-none"
      style={{ 
        width: `${progress}%`,
        // Esta transição substitui a "mola" do Framer Motion. É levíssima e fluida!
        transition: "width 0.1s ease-out", 
        boxShadow: "0 0 15px 2px rgba(16,185,129,0.8)"
      }}
    />
  );
}