"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { publications } from "@/lib/data";
import {
  BookOpen,
  Link as LinkIcon,
  FileText,
  ChevronDown,
  ChevronUp,
  Quote,
} from "lucide-react";

/* =========================================================
   🎨 PALETA DE ESTILOS (ADAPTADA PARA LIGHT/DARK)
   ========================================================= */
const pubStyles: Record<
  string,
  {
    border: string;
    bg: string;
    highlight: string;
    badgeBg: string;
    badgeText: string;
    legendColor: string;
  }
> = {
  "book chapter": {
    border: "border-purple-200 hover:border-purple-300 dark:border-purple-500/10 dark:group-hover:border-purple-500/30",
    bg: "bg-purple-50 dark:bg-purple-500/5",
    highlight: "before:via-purple-400/30",
    badgeBg: "bg-white dark:bg-purple-500/10",
    badgeText: "text-purple-700 dark:text-purple-400",
    legendColor: "bg-purple-500",
  },
  "journal article": {
    border: "border-amber-200 hover:border-amber-300 dark:border-amber-500/10 dark:group-hover:border-amber-500/30",
    bg: "bg-amber-50 dark:bg-amber-500/5",
    highlight: "before:via-amber-400/30",
    badgeBg: "bg-white dark:bg-amber-500/10",
    badgeText: "text-amber-700 dark:text-amber-400",
    legendColor: "bg-amber-500",
    
  },
  "conference paper": {
    border: "border-emerald-200 hover:border-emerald-300 dark:border-emerald-500/10 dark:group-hover:border-emerald-500/30",
    bg: "bg-emerald-50 dark:bg-emerald-500/5",
    highlight: "before:via-emerald-400/30",
    badgeBg: "bg-white dark:bg-emerald-500/10",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    legendColor: "bg-emerald-500", 
  },
  monograph: {
    border: "border-sky-200 hover:border-sky-300 dark:border-sky-500/10 dark:group-hover:border-sky-500/30",
    bg: "bg-sky-50 dark:bg-sky-500/5",
    highlight: "before:via-sky-400/30",
    badgeBg: "bg-white dark:bg-sky-500/10",
    badgeText: "text-sky-700 dark:text-sky-400",
    legendColor: "bg-sky-500",
  },
  default: {
    border: "border-zinc-200 hover:border-zinc-300 dark:border-zinc-500/10 dark:group-hover:border-zinc-500/30",
    bg: "bg-zinc-50 dark:bg-zinc-500/5",
    highlight: "before:via-zinc-400/30",
    badgeBg: "bg-white dark:bg-zinc-500/10",
    badgeText: "text-zinc-700 dark:text-zinc-400",
    legendColor: "bg-zinc-500",
  },
};

export default function PublicationsSection() {
  const [openAbstractIndex, setOpenAbstractIndex] = useState<number | null>(null);

  const toggleAbstract = (index: number) => {
    setOpenAbstractIndex(openAbstractIndex === index ? null : index);
  };

  const counts = publications.reduce((acc, pub) => {
    const type = pub.manuscript.toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section
      id="publications"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* HEADER ADAPTATIVO */}
        <MotionWrapper>
          <div className="mb-12">
            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-4 backdrop-blur-sm">
                <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Publications 
              <span className="text-zinc-500 dark:text-zinc-500 text-2xl font-medium ml-3">
                [{publications.length}]
              </span>
            </h2>
            
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-6xl text-lg leading-relaxed ml-1">
              {`A selection of my recent academic publications and research contributions, including ${counts["book chapter"] || 0} book chapter, ${counts["journal article"] || 0} journal articles, ${counts["conference paper"] || 0} conference papers, and ${counts["monograph"] || 0} monographs.`}
            </p>
          </div>
        </MotionWrapper>

        {/* SCROLL HORIZONTAL */}
        <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-500/10 hover:scrollbar-thumb-emerald-500/20 -mx-4 px-4">
          {publications.map((pub, index) => {
            const typeKey = pub.manuscript.toLowerCase();
            const style = pubStyles[typeKey] || pubStyles["default"];
            const isOpen = openAbstractIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="h-full min-w-[85vw] md:min-w-[480px] snap-center"
              >
                {/* CARTÃO ADAPTATIVO */}
                <GlassCard
                  className={`
                    group flex flex-col justify-between h-full p-6 
                    rounded-2xl backdrop-blur-md shadow-lg dark:shadow-xl
                    transition-all duration-500
                    
                    /* Classes dinâmicas do objeto pubStyles (bg e border) */
                    border ${style.border} ${style.bg}
                    
                    /* Efeitos Dark Mode extra */
                    dark:hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1
                    
                    relative overflow-hidden
                    before:absolute before:inset-x-0 before:top-0 before:h-px 
                    before:bg-gradient-to-r before:from-transparent before:to-transparent
                    ${style.highlight}
                  `}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_60%)]" />

                  {/* CONTEÚDO PRINCIPAL */}
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-4">
                      {/* Badge de Tipo */}
                      <span
                        className={`
                          px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/50 dark:border-white/5 shadow-sm
                          ${style.badgeBg} ${style.badgeText}
                        `}
                      >
                        {pub.manuscript}
                      </span>
                      
                      {/* 👇 Badge de Citações ATUALIZADO */}
                      {pub.citations && pub.citations > 0 && (
                        <div 
                          title={`${pub.citations} Citations (Google Scholar)`} 
                          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-white/5 px-2 py-1 rounded-md border border-zinc-200 dark:border-white/5 cursor-help hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
                        >
                          <Quote className="h-3 w-3 text-zinc-500 fill-zinc-500/20" />
                          <span className="font-semibold">{pub.citations}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold leading-snug mb-3 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {pub.title}
                    </h3>

                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2 font-medium">
                      {pub.authors.join(", ")}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-6 border-l-2 border-emerald-200 dark:border-white/10 pl-3">
                      {pub.venue}, {pub.year}
                    </p>
                  </div>

                  {/* AÇÕES E ABSTRACT */}
                  <div className="mt-auto pt-5 border-t border-zinc-200 dark:border-white/5">
                    
                    {pub.abstract && (
                      <button
                        onClick={() => toggleAbstract(index)}
                        className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-4 focus:outline-none group/btn"
                      >
                        <span>Abstract</span>
                        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3 group-hover/btn:translate-y-0.5 transition-transform" />}
                      </button>
                    )}

                    <AnimatePresence>
                      {isOpen && pub.abstract && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-5 bg-white dark:bg-black/20 p-4 rounded-lg border border-zinc-200 dark:border-white/5 font-light">
                            {pub.abstract}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4 text-sm font-medium">
                      {pub.github && (
                        <a
                          href={pub.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                        >
                          Read on <LinkIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      
                      <button className="flex items-center gap-2 text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors">
                        BibTeX <FileText className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* LEGENDA NO RODAPÉ */}
        <MotionWrapper>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-zinc-600 dark:text-zinc-500 border-t border-zinc-200 dark:border-white/5 pt-8">
            {Object.keys(pubStyles)
              .filter((key) => key !== "default")
              .map((key) => {
                const count = counts[key] || 0;
                if (count === 0) return null;

                const label = key.charAt(0).toUpperCase() + key.slice(1);
                
                return (
                  <div key={key} className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${pubStyles[key].legendColor}`} />
                    <span>
                      {label} <span className="text-zinc-500 dark:text-zinc-600 ml-1">({count})</span>
                    </span>
                  </div>
                );
              })}
          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}