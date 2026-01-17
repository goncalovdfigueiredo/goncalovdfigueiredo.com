"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { publications } from "@/lib/data";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Quote,
  Eye,
  Filter,
} from "lucide-react";

/* =========================================================
   🎨 PALETA DE ESTILOS
   ========================================================= */
const pubStyles: Record<string, any> = {
  "book chapter": {
    border: "border-purple-200 hover:border-purple-300 dark:border-purple-500/10 dark:group-hover:border-purple-500/30",
    bg: "bg-purple-50 dark:bg-purple-500/5",
    badgeBg: "bg-white dark:bg-purple-500/10",
    badgeText: "text-purple-700 dark:text-purple-400",
    activeFilter: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30",
  },
  "journal article": {
    border: "border-amber-200 hover:border-amber-300 dark:border-amber-500/10 dark:group-hover:border-amber-500/30",
    bg: "bg-amber-50 dark:bg-amber-500/5",
    badgeBg: "bg-white dark:bg-amber-500/10",
    badgeText: "text-amber-700 dark:text-amber-400",
    activeFilter: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
  },
  "conference paper": {
    border: "border-emerald-200 hover:border-emerald-300 dark:border-emerald-500/10 dark:group-hover:border-emerald-500/30",
    bg: "bg-emerald-50 dark:bg-emerald-500/5",
    badgeBg: "bg-white dark:bg-emerald-500/10",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    activeFilter: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
  },
  monograph: {
    border: "border-sky-200 hover:border-sky-300 dark:border-sky-500/10 dark:group-hover:border-sky-500/30",
    bg: "bg-sky-50 dark:bg-sky-500/5",
    badgeBg: "bg-white dark:bg-sky-500/10",
    badgeText: "text-sky-700 dark:text-sky-400",
    activeFilter: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/30",
  },
  default: {
    border: "border-zinc-200 hover:border-zinc-300 dark:border-zinc-500/10 dark:group-hover:border-zinc-500/30",
    bg: "bg-zinc-50 dark:bg-zinc-500/5",
    badgeBg: "bg-white dark:bg-zinc-500/10",
    badgeText: "text-zinc-700 dark:text-zinc-400",
    activeFilter: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-500/20 dark:text-zinc-300 dark:border-zinc-500/30",
  },
};

export default function PublicationsSection() {
  const [filter, setFilter] = useState("all");
  const [openAbstractIndex, setOpenAbstractIndex] = useState<number | null>(null);

  const toggleAbstract = (index: number) => {
    setOpenAbstractIndex(openAbstractIndex === index ? null : index);
  };

  const categories = ["all", ...Array.from(new Set(publications.map((p) => p.manuscript.toLowerCase())))];

  const filteredPubs = publications.filter((pub) => {
    return filter === "all" || pub.manuscript.toLowerCase() === filter;
  });

  return (
    <section id="publications" className="py-20 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      {/* Container max-w-[1600px] */}
      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* HEADER */}
        <MotionWrapper>
  <div className="mb-8 md:mb-12 flex flex-col gap-4">
    <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
      <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
        <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
      </div>
      Publications
    </h2>
    <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
      Explore my academic journey through {publications.length} research outputs. Use the filters below to navigate by category.
    </p>
  </div>
</MotionWrapper>

        {/* BARRA DE FILTROS */}
        <MotionWrapper>
          <div className="flex flex-wrap gap-3 mb-8 md:mb-12">
            {categories.map((cat) => {
              const isActive = filter === cat;
              const style = pubStyles[cat] || pubStyles["default"];
              const label = cat.charAt(0).toUpperCase() + cat.slice(1);
              
              const count = cat === "all" 
                ? publications.length 
                : publications.filter(p => p.manuscript.toLowerCase() === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border
                    ${isActive 
                      ? `${style.activeFilter} shadow-md scale-105` 
                      : "bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-white/10"
                    }
                  `}
                >
                  {cat === "all" && <Filter className="w-3.5 h-3.5" />}
                  {label}
                  <span className={`ml-1 text-[10px] md:text-xs opacity-60 ${isActive ? "font-bold" : ""}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </MotionWrapper>

        {/* LAYOUT HÍBRIDO */}
        <motion.div 
          layout 
          /* MUDANÇA 1: gap-4 passou a gap-3 para aproximar os cartões no mobile */
          className="
            flex overflow-x-auto gap-3 snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-emerald-500/10
            md:grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredPubs.map((pub) => {
              const uniqueKey = pub.title; 
              const typeKey = pub.manuscript.toLowerCase();
              const style = pubStyles[typeKey] || pubStyles["default"];
              const originalIndex = publications.indexOf(pub);
              const isOpen = openAbstractIndex === originalIndex;

              const isBook = typeKey === "book chapter";
              const objectPosition = isBook ? "object-center" : "object-top";

              return (
                <motion.div
                  layout
                  key={uniqueKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  /* MUDANÇA 2: min-w-[85vw] passou a min-w-[78vw]. 
                     Isto faz com que o cartão ocupe menos espaço, revelando o próximo à direita. 
                  */
                  className="min-w-[78vw] md:min-w-0 snap-center flex" 
                >
                  <GlassCard
                    className={`
                      group relative flex flex-col md:flex-row w-full h-full 
                      rounded-2xl backdrop-blur-md shadow-lg dark:shadow-xl
                      overflow-hidden border ${style.border} ${style.bg}
                      dark:hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]
                    `}
                  >
                    {/* ====== 1. IMAGEM INTERATIVA (Link Wrapper) ====== */}
                    <div className="relative w-full h-40 md:w-[180px] lg:w-[200px] md:h-auto shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-800 shadow-inner group/image">
                      {(pub as any).image ? (
                        pub.github ? (
                          /* Se tiver link, a imagem é um link <a> */
                          <a 
                            href={pub.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full h-full cursor-pointer relative"
                          >
                            <img
                              src={(pub as any).image}
                              alt={pub.title}
                              /* Mantém o desfoque suave em Desktop */
                              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-0 md:blur-[0.8px] ${objectPosition}`}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 md:opacity-30 group-hover:opacity-10 transition-opacity" />
                            {/* Borda Interna */}
                            <div className="absolute inset-0 border-[3px] border-black/5 dark:border-white/5 pointer-events-none z-10" />
                            
                            {/* Eye Icon no Hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px] z-20">
                                <div className="p-2 bg-white/90 rounded-full shadow-lg transform group-hover/image:scale-110 transition-transform">
                                    <Eye className="w-5 h-5 text-zinc-900" />
                                </div>
                            </div>
                          </a>
                        ) : (
                          /* Se não tiver link, é só imagem */
                          <div className="w-full h-full relative">
                            <img
                              src={(pub as any).image}
                              alt={pub.title}
                              className={`w-full h-full object-cover transition-all duration-700 group-hover:blur-0 md:blur-[0.8px] ${objectPosition}`}
                            />
                            <div className="absolute inset-0 border-[3px] border-black/5 dark:border-white/5 pointer-events-none z-10" />
                          </div>
                        )
                      ) : (
                        // Placeholder
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-white/5">
                          <BookOpen className="w-10 h-10 text-zinc-300 dark:text-white/10" />
                        </div>
                      )}
                    </div>

                    {/* ====== 2. CONTEÚDO (DIREITA/BAIXO) ====== */}
                    <div className="flex flex-col flex-grow p-5 md:p-6">
                      
                      {/* Top Row: Badges */}
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/50 dark:border-white/5 ${style.badgeBg} ${style.badgeText}`}>
                          {pub.manuscript}
                        </span>
                        {pub.citations && pub.citations > 0 && (
                          <div title={`${pub.citations} Citations`} className="flex items-center gap-1 text-[10px] text-zinc-500 bg-white/50 dark:bg-white/5 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5">
                            <Quote className="h-2.5 w-2.5" />
                            <span className="font-semibold">{pub.citations}</span>
                          </div>
                        )}
                      </div>

                      {/* TÍTULO */}
                      <h3 className="text-lg font-bold leading-tight mb-2 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {pub.title}
                      </h3>

                      {/* VENUE (Cinzento sóbrio) */}
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-4 font-mono">
                        {pub.venue}, {pub.year}
                      </div>

                      {/* RODAPÉ */}
                      <div className="mt-auto pt-4 border-t border-zinc-200/50 dark:border-white/5">
                        <div className="flex items-center justify-between gap-4">
                            
                            {/* Autores (Fundo) */}
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate pr-2 flex-1" title={pub.authors.join(", ")}>
                                {pub.authors.join(", ")}
                            </div>
                            
                            {/* Ações */}
                            <div className="flex gap-3 shrink-0">
                                {pub.abstract && (
                                    <button onClick={() => toggleAbstract(originalIndex)} className="text-zinc-400 hover:text-emerald-500 transition-colors">
                                        {isOpen ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Abstract Expansível */}
                        <AnimatePresence>
                          {isOpen && pub.abstract && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-black/20 p-3 rounded-lg border border-zinc-200 dark:border-white/5 text-justify">
                                {pub.abstract}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredPubs.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p>No publications found for this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}