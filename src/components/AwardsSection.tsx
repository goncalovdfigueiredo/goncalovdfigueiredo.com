// src/components/AwardsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { awards, featuredIn } from "@/lib/data";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  Trophy, Calendar, Building2, Globe, Layers, FileText, Newspaper, Mic, Tv, ArrowUpRight,
  Dumbbell, Activity, Languages, Brain, Flag, Gauge, Timer, Footprints, Zap, Terminal, Car, Clock,
  ChevronDown
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

// ... (Sub-componentes F1StartingLights e HobbyCard inalterados)
const F1StartingLights = () => {
  const [lights, setLights] = useState(0);
  const [phase, setPhase] = useState(1);
  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        setPhase(1); setLights(0); await new Promise(res => setTimeout(res, 1500)); if (!isMounted) break;
        setPhase(2); await new Promise(res => setTimeout(res, 2500)); if (!isMounted) break;
        setPhase(3); await new Promise(res => setTimeout(res, 1000)); if (!isMounted) break;
        setPhase(4); for (let i = 1; i <= 5; i++) { setLights(i); await new Promise(res => setTimeout(res, 800)); if (!isMounted) break; }
        if (!isMounted) break;
        setPhase(5); await new Promise(res => setTimeout(res, 800 + Math.random() * 1000)); if (!isMounted) break;
        setPhase(6); await new Promise(res => setTimeout(res, 3000)); if (!isMounted) break;
        setPhase(7); setLights(0); await new Promise(res => setTimeout(res, 2000));
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, []);
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 translate-y-1">
      <div className={`flex gap-1 bg-black/40 p-1.5 rounded border border-white/5 backdrop-blur-sm transition-all duration-500 ${phase === 7 ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-800" />
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${lights >= i ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.9)]" : "bg-zinc-800"}`} />
          </div>
        ))}
      </div>
      <div className="h-9 flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {phase === 6 && ( <motion.div key="go" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[8px] font-mono font-black text-zinc-500 uppercase leading-[1.1] text-center tracking-tighter">It's Lights Out<br />and<br />Away We Go!</motion.div> )}
          {phase === 2 && ( <motion.span key="formation" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[7px] font-mono font-bold text-zinc-400 uppercase tracking-widest text-center">FORMATION LAP</motion.span> )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function HobbyCard({ children, className = "" }: any) {
  const x = useMotionValue(0); const y = useMotionValue(0); const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(x); const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5); y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left); mouseY.set(e.clientY - rect.top);
  };
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;
  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={{ scale: 0.98 }} style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className={`relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 transition-colors duration-500 cursor-pointer group ${className}`}>
      <motion.div className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotlight }} />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 pointer-events-none" />
        {children}
      </div>
    </motion.div>
  );
}

// --- HELPERS ---
const MediaIcon = ({ type }: { type: string }) => {
  const c = "h-6 w-6";
  if (type === "Podcast") return <Mic className={c} />;
  if (type === "TV News") return <Tv className={c} />;
  if (type === "Institutional") return <Building2 className={c} />;
  if (type === "Print Newspaper") return <Newspaper className={c} />;
  if (type === "Online News") return <Globe className={c} />;
  return <Newspaper className={c} />;
};

const getMediaColor = (type: string) => {
  if (type === "Podcast") return { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]", iconColor: "text-emerald-500" };
  if (type === "TV News") return { bg: "bg-rose-500/10 dark:bg-rose-500/20", text: "text-rose-600 dark:text-rose-400", glow: "group-hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]", iconColor: "text-rose-500" };
  if (type === "Institutional") return { bg: "bg-indigo-500/10 dark:bg-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400", glow: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]", iconColor: "text-indigo-500" };
  if (type === "Print Newspaper") return { bg: "bg-amber-500/10 dark:bg-amber-500/20", text: "text-amber-700 dark:text-amber-400", glow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]", iconColor: "text-amber-600" };
  if (type === "Online News") return { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]", iconColor: "text-blue-500" };
  return { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]", iconColor: "text-blue-500" };
};

const parseBoldText = (text: string, highlightColor = "bg-emerald-500/10") => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return ( <strong key={index} className={`font-bold text-zinc-900 dark:text-white ${highlightColor} px-1 rounded mx-0.5`}>{part.slice(2, -2)}</strong> );
    }
    return part;
  });
};

export default function AwardsSection() {
  return (
    <section id="awards" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-8xl mx-auto px-5 md:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <MotionWrapper>
        <div className="mb-8 md:mb-12 flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                 <Trophy className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Awards & Recognition</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
              Recognition of academic achievements, media coverage, and personal pursuits beyond the lab.
            </p>
          </div>
        </MotionWrapper>


{/* 1. ACHIEVEMENT GALLERY - BENTO GRID AJUSTADO */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
  {awards.map((award: any, index: number) => {
    const isFeatured = index === 0;
    // Estado para controlar a expansão no mobile
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <MotionWrapper 
        key={index} 
        delay={index * 0.1} 
        className={isFeatured ? "md:col-span-4" : "md:col-span-4"}
      >
        <div className="group relative h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
          
          <motion.div 
            layout // Anima automaticamente a mudança de altura do card
            className="relative h-full flex flex-col overflow-hidden rounded-3xl bg-zinc-50 dark:bg-[#0c0c0e] border border-amber-200/50 dark:border-white/5 p-6 md:p-8 transition-all duration-500 group-hover:-translate-y-1"
          >
            
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
              <Trophy className="w-32 h-32 rotate-12 text-amber-600" />
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>
                {award.position && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-amber-500/40">
                    {award.position}
                  </span>
                )}
              </div>

              <div>
                {/* Títulos agora com tamanho IGUAL para todos (xl) */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-2">
                  {award.name}
                </h3>
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium text-xs md:text-sm">
                   <Building2 className="w-4 h-4 shrink-0" />
                   <span>{award.issuer}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6 flex-grow relative z-10 text-justify">
              {award.description && (
                <div className="relative">
                  <motion.p 
                    layout
                    className={`text-xs md:text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed italic ${!isExpanded ? 'line-clamp-1 md:line-clamp-none' : ''}`}
                  >
                    {award.description}
                  </motion.p>
                  
                  {/* Botão para encurtar/expandir apenas no mobile */}
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="md:hidden mt-2 text-amber-600 dark:text-amber-500 text-[10px] font-bold uppercase flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronDown className="w-3 h-3 rotate-180 transition-transform" /></>
                    ) : (
                      <>Read More <ChevronDown className="w-3 h-3 transition-transform" /></>
                    )}
                  </button>
                </div>
              )}

              {/* Host Institutions e Links só aparecem no mobile se expandido, ou sempre em desktop */}
              <AnimatePresence>
                {(isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 overflow-hidden md:block"
                  >
                    {award.hosts && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40 dark:text-zinc-500">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Host Institutions</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {award.hosts.map((host: any, i: number) => {
                            const isObj = typeof host === 'object' && host !== null;
                            const name = isObj ? host.name : host;
                            const url = isObj ? host.url : null;
                            return url ? (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/5 border border-amber-200/50 dark:border-white/5 text-[10px] md:text-[11px] text-zinc-700 dark:text-zinc-300 hover:border-amber-500/40 hover:bg-white dark:hover:bg-amber-500/10 transition-all group/host shadow-sm">
                                <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                                <span className="font-medium">{name}</span>
                                <ArrowUpRight className="w-3 h-3 opacity-40 group-hover/host:opacity-100" />
                              </a>
                            ) : (
                              <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/5 border border-amber-200/50 dark:border-white/5 text-[10px] md:text-[11px] text-zinc-500 shadow-sm">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                                <span className="font-medium">{name}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {award.links && award.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {award.links.map((link: any, i: number) => (
                          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold uppercase tracking-tighter hover:scale-105 transition-transform shadow-md">
                            <span className="truncate">{link.label}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RODAPÉ: Data e Tipo na mesma linha com mais espaço (abaixo da borda) */}
            <div className="mt-8 pt-6 border-t border-amber-200/60 dark:border-white/5 flex items-center justify-start relative z-10">
              <div className="flex items-center gap-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 opacity-70 text-amber-600" />
                  <span className="whitespace-nowrap leading-none pt-0.5">{award.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 opacity-70 text-amber-600" />
                  <span className="whitespace-nowrap leading-none pt-0.5">{award.type}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </MotionWrapper>
    );
  })}
</div>
        {/* 2. FEATURED IN (Mantido inalterado conforme pedido) */}
        <MotionWrapper delay={0.3}>
          <div className="relative mb-16">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <span className="w-6 h-1 bg-zinc-900 dark:bg-white rounded-full"></span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Featured In</h3>
            </div>
            
            <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 -mx-5 px-5 md:grid md:grid-cols-2 xl:grid-cols-5 md:pb-0 md:mx-0 md:px-0 md:overflow-visible">
              {featuredIn.map((item: any, idx: number) => {
                const colors = getMediaColor(item.type);
                const hasLink = item.link && item.link.trim() !== "" && item.link !== "#";
                const Wrapper = hasLink ? 'a' : 'div';
                return (
                  <Wrapper key={idx} href={hasLink ? item.link : undefined} target={hasLink ? "_blank" : undefined} rel={hasLink ? "noopener noreferrer" : undefined} className={`block h-full min-w-[260px] md:min-w-0 snap-center ${hasLink ? 'group cursor-pointer' : 'cursor-default'}`}>
                    <GlassCard className={`h-full p-6 flex flex-col items-center text-center rounded-xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 ${hasLink ? 'hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-lg hover:-translate-y-1' : ''}`}>
                      <div className={`mb-4 p-3 rounded-full ${colors.bg} ${colors.iconColor} ${hasLink ? 'group-hover:scale-110' : ''} ${hasLink ? colors.glow : ''} transition-all duration-300`}>
                        <MediaIcon type={item.type} />
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1 leading-tight">{item.source}</h4>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${colors.text}`}>{item.type}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                      <div className={`mt-auto text-[10px] font-medium flex items-center gap-1 ${colors.text} ${hasLink ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'} transition-opacity`}>
                        {item.date} {hasLink && <ArrowUpRight className="h-3 w-3" />}
                      </div>
                    </GlassCard>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </MotionWrapper>

        {/* 3. BEYOND THE LAB (Mantido inalterado conforme pedido) */}
        <MotionWrapper delay={0.5}>
          <div className="relative">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <span className="w-6 h-1 bg-zinc-900 dark:bg-white rounded-full"></span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                  Beyond the Lab
                  <span className="text-[9px] font-mono font-medium text-zinc-400 border border-zinc-200 dark:border-white/10 px-1.5 py-0.5 rounded uppercase bg-zinc-100 dark:bg-white/5">Status: Operational</span>
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-96" style={{ perspective: "1000px" }}>
              <div className="md:col-span-2 row-span-1 md:row-span-2 group h-full">
                <HobbyCard className="h-full flex flex-col justify-between hover:border-emerald-500/30 transition-colors duration-500 relative">
                  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                     <div className="absolute -right-4 top-10 transform -rotate-12 opacity-10 text-emerald-500"><Footprints className="w-48 h-48" /></div>
                     <div className="absolute right-20 -bottom-8 transform rotate-12 opacity-10 text-emerald-500"><Dumbbell className="w-40 h-40" /></div>
                  </div>
                  <div className="relative z-20 flex flex-col h-full p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                            <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                            The Quantified Self
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed text-justify">{parseBoldText("Balancing mental rigor with physical conditioning.", "bg-emerald-500/10")}</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0 max-w-xs leading-relaxed text-justify">{parseBoldText("I approach fitness (**running & gym**) with the same discipline as engineering: consistency, metrics, and progressive overload.", "bg-emerald-500/10")}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-sm z-30">
                          <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                          <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">ACTIVE</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-3"><Timer className="w-3.5 h-3.5 text-zinc-400" /><span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Personal Bests</span></div>
                        <div className="grid grid-cols-3 gap-4 border-t border-zinc-200 dark:border-white/5 pt-4">
                            {[{ dist: "3KM", time: "00:00", width: "15%" }, { dist: "5KM", time: "00:00", width: "25%" }, { dist: "10KM", time: "00:00", width: "70%" }].map((stat, i) => (
                              <div key={i} className="flex flex-col relative group/stat">
                                <span className="text-[10px] font-bold text-zinc-500 mb-0.5">{stat.dist}</span>
                                <span className="text-xl md:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{stat.time}</span>
                                <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden mt-1"><div className="h-full bg-emerald-500/80 rounded-full" style={{ width: stat.width }}></div></div>
                              </div>
                            ))}
                        </div>
                      </div>
                  </div>
                </HobbyCard>
              </div>
              <div className="md:col-span-1 h-48 md:h-auto group">
                <HobbyCard className="h-full hover:border-blue-500/30 transition-colors duration-500 relative">
                  <div className="absolute inset-0 pointer-events-none select-none z-0"><div className="absolute -right-0 -bottom-0 transform -rotate-12 opacity-[0.08] text-blue-500"><Gauge className="w-16 h-16" /></div></div>
                  <div className="relative z-10 flex flex-col h-full p-6">
                    <div className="flex justify-between items-center gap-3 mb-2">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                        <Flag className="w-4 h-4 text-blue-500" />
                        Precision & Strategy
                        </h3>
                        <F1StartingLights />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0 leading-relaxed text-justify">
                      {parseBoldText("Passionate about **automotive engineering** and **Formula 1**. Fascinated by the intersection of aerodynamics, real-time telemetry, and high-stakes strategy.", "bg-blue-500/10")}
                    </p>
                  </div>
                </HobbyCard>
              </div>
              <div className="md:col-span-1 h-48 md:h-auto group">
                <HobbyCard className="h-full hover:border-purple-500/30 transition-colors duration-500 relative p-6">
                  <div className="absolute inset-0 pointer-events-none select-none z-0"><div className="absolute -right-0 -top-0 transform rotate-12 opacity-[0.08] text-purple-500"><Languages className="w-16 h-16" /></div><div className="absolute -left-0 -bottom-0 transform -rotate-12 opacity-[0.08] text-purple-500"><Terminal className="w-16 h-16" /></div></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-purple-500 transition-colors">
                      <Brain className="w-4 h-4 text-purple-500" />
                      Expanding Horizons
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed text-justify">{parseBoldText("Exploring the logic of languages. Currently studying **German** for the challenge, while diving deep into **AI & Programming** to push my technical boundaries.", "bg-purple-500/10")}</p>
                  </div>
                </HobbyCard>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}