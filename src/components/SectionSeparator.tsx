import React from "react";

export default function SectionSeparator() {
  return (
    <div className="flex justify-center w-full py-8 md:py-12">
      {/* h-px: 1 pixel de altura
         w-1/2: ocupa 50% da largura do ecrã (podes mudar para w-2/3 ou w-1/3)
         bg-gradient-to-r: gradiente da esquerda para a direita
         from-transparent: começa invisível
         via-emerald-500/20: no meio é verde subtil (20% opacidade)
         to-transparent: acaba invisível
      */}
      <div className="h-px w-1/2 md:w-1/3 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </div>
  );
}