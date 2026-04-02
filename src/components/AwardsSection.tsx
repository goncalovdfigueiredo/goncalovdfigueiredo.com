// src/components/AwardsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { awards, featuredIn } from "@/lib/data";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  Trophy, Calendar, Building2, Globe, Layers, FileText, Newspaper, Mic, Tv, ArrowUpRight,
  Dumbbell, Activity, Languages, Brain, Flag, Gauge, Timer, Footprints, Zap, Terminal, Car, Clock
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

// =======================
// SUB-COMPONENTE: F1 LIGHTS (ATUALIZADO COM 7 FASES)
// =======================
const F1StartingLights = () => {
  const [lights, setLights] = useState(0);
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    let isMounted = true;
    
    const sequence = async () => {
      while (isMounted) {
        // Fase 1: ilustração do semaforo com as luzes apagadas
        setPhase(1);
        setLights(0);
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) break;

        // Fase 2: ilustração do semaforo com as luzes apagadas com a frase "Formation Lap"
        setPhase(2);
        await new Promise(res => setTimeout(res, 2500));
        if (!isMounted) break;

        // Fase 3: ilustração do semaforo com as luzes apagadas
        setPhase(3);
        await new Promise(res => setTimeout(res, 1000));
        if (!isMounted) break;

        // Fase 4: ilustração do semaforo com as luzes a acenderem sequencialmente
        setPhase(4);
        for (let i = 1; i <= 5; i++) {
          setLights(i);
          await new Promise(res => setTimeout(res, 800));
          if (!isMounted) break;
        }
        if (!isMounted) break;

        // Fase 5: ilustração do semaforo com as luzes todas acesas
        setPhase(5);
        await new Promise(res => setTimeout(res, 800 + Math.random() * 1000));
        if (!isMounted) break;

        // Fase 6: ilustração do semaforo com as luzes todas acesas com a frase "It's Lights Out..."
        setPhase(6);
        await new Promise(res => setTimeout(res, 3000));
        if (!isMounted) break;

        // Fase 7: não ha ilustração com frase nem semaforo
        setPhase(7);
        setLights(0);
        await new Promise(res => setTimeout(res, 2000));
      }
    };
    
    sequence();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 shrink-0 translate-y-1">
      {/* Semáforo (Desaparece apenas na Fase 7) */}
      <div className={`flex gap-1 bg-black/40 p-1.5 rounded border border-white/5 backdrop-blur-sm transition-all duration-500 
        ${phase === 7 ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-800" />
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              lights >= i ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.9)]" : "bg-zinc-800"
            }`} />
          </div>
        ))}
      </div>
      
      {/* Zona das Frases */}
      <div className="h-9 flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {phase === 6 && (
            <motion.div 
              key="go"
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-[8px] font-mono font-black text-zinc-500 uppercase leading-[1.1] text-center tracking-tighter"
            >
              It's Lights Out<br />and<br />Away We Go!
            </motion.div>
          )}
          {phase === 2 && (
            <motion.span 
              key="formation"
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-[7px] font-mono font-bold text-zinc-400 uppercase tracking-widest text-center"
            >
              FORMATION LAP
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// =======================
// HOBBYCARD COM TILT 3D + HAPTIC VISUAL FEEDBACK
// =======================
function HobbyCard({ children, className = "" }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.98 }} // Haptic Feedback Visual ao clicar
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 transition-colors duration-500 cursor-pointer group ${className}`}
    >
      {/* Spotlight Reativo */}
      <motion.div className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotlight }} />
      
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 pointer-events-none" />
        {children}
      </div>
    </motion.div>
  );
}

// =======================
// HELPERS
// =======================
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
      return (
        <strong key={index} className={`font-bold text-zinc-900 dark:text-white ${highlightColor} px-1 rounded mx-0.5`}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export default function AwardsSection() {
  return (
    <section id="awards" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        
        {/* CABEÇALHO COM ETIQUETA DE STATUS */}
        <MotionWrapper>
        <div className="mb-8 md:mb-12 flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                 <Trophy className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Awards & Recognition</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl text-sm md:text-lg leading-relaxed mx-auto md:mx-0 ml-1">
              Recognition of academic achievements, media coverage, and personal pursuits beyond the lab.
            </p>
          </div>
        </MotionWrapper>

        {/* 1. LISTA VERTICAL DE PRÉMIOS - COMPACTA E PREMIUM (CREAM LIGHT MODE) */}
        <div className="flex flex-col gap-4 md:gap-6 mb-16 md:mb-20">
          {awards.map((award: any, index: number) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <div className="group relative flex flex-col md:flex-row gap-3 md:gap-6 items-stretch">
                
                {/* MARCADOR ESQUERDO (Trophy Timeline) - Apenas Desktop */}
                <div className="hidden md:flex flex-col items-center pt-5 z-10 relative">
                  {/* Linha Conectora reduzida */}
                  {index !== awards.length - 1 && (
                    <div className="absolute top-16 bottom-[-24px] w-px bg-amber-200 dark:bg-white/5 group-hover:bg-amber-400 transition-colors duration-500" />
                  )}
                  {/* Ícone com fundo Creme no Light Mode e Preto/Opaco no Dark Mode */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fffae9] dark:bg-black/40 border border-amber-200/60 dark:border-white/10 shadow-sm group-hover:scale-110 group-hover:border-amber-400/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500 z-10 relative">
                    <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-500 relative z-10" />
                  </div>
                </div>

                {/* CARTÃO COM A INFORMAÇÃO (Direita) */}
                <div className="flex-1 relative flex flex-col h-full w-full">
                  
                  {/* Glow Animado ao Fundo */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg pointer-events-none" />

                  {/* Cartão Físico Compacto com Fundo Creme no Light Mode */}
                  <div className="relative flex flex-col w-full p-4 md:p-5 rounded-[1.25rem] bg-[#fffae9] dark:bg-[#1a1916] border border-amber-200/60 dark:border-[#383226] group-hover:border-amber-400/60 dark:group-hover:border-amber-700/50 transition-all duration-300 overflow-hidden z-10 shadow-sm group-hover:shadow-md dark:group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                    
                    {/* Textura de fundo subtil que aparece no hover */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwdjh2LTh6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8cGF0aCBkPSJNMCAwaDhINHYtNHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Cabeçalho: Título e Badge */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3 relative z-10">
                      <div className="flex items-start gap-3">
                        {/* Mobile Trophy */}
                        <div className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fffae9] dark:bg-black/20 border border-amber-200/60 dark:border-white/10 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                        </div>
                        <div className="pt-0.5">
                          <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                            {award.name}
                          </h3>
                          {/* Issuer on Desktop */}
                          <div className="hidden md:flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 mt-1.5">
                            <Building2 className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-500" />
                            <span className="font-medium tracking-wide">{award.issuer}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Badge Destaque ou Referência */}
                      <div className="flex shrink-0">
                        {award.position ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-black/20 border border-amber-200/80 dark:border-white/10 text-[9px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-500 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                            {award.position}
                          </div>
                        ) : award.details ? (
                          <div className="px-3 py-1 rounded-full bg-white/60 dark:bg-white/5 border border-amber-200/60 dark:border-white/10 text-[9px] font-mono text-zinc-500 dark:text-zinc-400 shadow-sm">
                            {award.details}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Mobile Issuer */}
                    <div className="md:hidden flex items-start gap-1.5 text-xs mb-3 relative z-10">
                      <Building2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
                      <span className="font-medium tracking-wide text-zinc-600 dark:text-zinc-400 leading-snug">{award.issuer}</span>
                    </div>

                    {/* Corpo de Conteúdo (Compactado) */}
                    <div className="space-y-3.5 border-t border-amber-200/60 dark:border-white/5 pt-3.5 relative z-10 flex-grow">
                      {award.description && (
                        <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed font-light">
                          {award.description}
                        </p>
                      )}
                      
                      {/* Host Institutions (Compacto) */}
                      {award.hosts && (
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-amber-900/40 dark:text-zinc-500 mb-2 flex items-center gap-1.5">
                            <Layers className="h-3 w-3" /> Host Institutions
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {award.hosts.map((hostItem: any, i: number) => {
                              const isObject = typeof hostItem === 'object' && hostItem !== null;
                              const hostName = isObject ? hostItem.name : hostItem;
                              const hostUrl = isObject ? hostItem.url : null;

                              return hostUrl ? (
                                <a 
                                  key={i} 
                                  href={hostUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-[10px] md:text-xs text-zinc-800 dark:text-zinc-300 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-amber-500/10 px-2 py-1 rounded-md border border-amber-200/50 dark:border-white/5 hover:border-amber-300 dark:hover:border-amber-500/30 transition-all duration-300 group/host shadow-sm"
                                >
                                  <div className="w-1 h-1 rounded-full bg-amber-400 dark:bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)] group-hover/host:animate-pulse" />
                                  <span className="font-medium">{hostName}</span>
                                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/host:opacity-100 transition-opacity -mt-0.5" />
                                </a>
                              ) : (
                                <div 
                                  key={i} 
                                  className="flex items-center gap-1.5 text-[10px] md:text-xs text-zinc-800 dark:text-zinc-300 bg-white/60 dark:bg-white/5 px-2 py-1 rounded-md border border-amber-200/50 dark:border-white/5 shadow-sm"
                                >
                                  <div className="w-1 h-1 rounded-full bg-amber-400 dark:bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                                  <span className="font-medium">{hostName}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Botões de Link Interativos */}
                      {award.links && award.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {award.links.map((link: { label: string; url: string }, i: number) => (
                            <a 
                              key={i} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] md:text-[11px] font-bold text-amber-700 dark:text-amber-500 bg-white dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/20 rounded-full transition-colors duration-200 group/link shadow-sm"
                            >
                              <span className="truncate">{link.label}</span>
                              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Rodapé */}
                    <div className="mt-4 pt-3.5 border-t border-amber-200/60 dark:border-white/10 flex items-center justify-between text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 relative z-10">
                      <div className="flex items-center gap-1.5 bg-white/60 dark:bg-white/5 px-2.5 py-1 rounded-md border border-amber-200/50 dark:border-white/5 font-medium shadow-sm">
                        <Calendar className="h-3.5 w-3.5 opacity-70" />
                        <span>{award.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Globe className="h-3.5 w-3.5 opacity-70" />
                        <span>{award.type === "International" ? "International" : "National"}</span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* 2. FEATURED IN (MEDIA) */}
        <MotionWrapper delay={0.3}>
          <div className="relative mb-16">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <span className="w-6 h-1 bg-zinc-900 dark:bg-white rounded-full"></span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Featured In</h3>
            </div>
            
            <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 -mx-5 px-5 md:grid md:grid-cols-2 xl:grid-cols-4 md:pb-0 md:mx-0 md:px-0 md:overflow-visible">
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

        {/* 3. BEYOND THE LAB COM ETIQUETA DE STATUS */}
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
              
              {/* CARD 1: THE QUANTIFIED SELF */}
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

              {/* CARD 2: PRECISION & STRATEGY */}
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

              {/* CARD 3: EXPANDING HORIZONS */}
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