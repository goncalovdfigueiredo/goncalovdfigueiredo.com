// src/components/TimelineItem.tsx
import React from "react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
  isLast?: boolean;
  index: number;
  period: string;
  isCurrent: boolean;
}

export default function TimelineItem({ 
  title, 
  subtitle, 
  children, 
  isLast, 
  index, 
  period,
  isCurrent 
}: TimelineItemProps) {
  return (
    <motion.div 
      // gap-3 em mobile para aproximar o cartão da linha
      className="relative flex gap-3 sm:gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Coluna Esquerda: Linha + Bola */}
      <div className="flex flex-col items-center shrink-0 pt-1.5">
        <div className={`
          relative z-10 w-3.5 h-3.5 rounded-full border-[3px] transition-all duration-500
          ${isCurrent 
            ? "bg-emerald-500 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" 
            : "bg-zinc-900 border-zinc-700" 
          }
        `}>
          {isCurrent && (
            <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-ping" />
          )}
        </div>

        {!isLast && (
          <div className="w-px h-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent my-1" />
        )}
      </div>

      {/* pb-6 em mobile para os blocos não ficarem distantes */}
      <div className="flex-1 pb-6 md:pb-12">
        
        {/* Data acima do título */}
        <div className={`flex items-center gap-2 mb-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest ${isCurrent ? "text-emerald-500" : "text-zinc-500"}`}>
          <span>{period}</span>
        </div>

        <div className="space-y-1">
          {title}
          {subtitle}
        </div>
        
        {/* O conteúdo do cartão entra aqui */}
        {children}
      </div>
    </motion.div>
  );
}