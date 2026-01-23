// src/components/AwardsSection.tsx
"use client";

import React from "react";
import { awards, featuredIn } from "@/lib/data";
import { Trophy, Calendar, Building2, Globe, Layers, FileText, Newspaper, Mic, Tv, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

// ... (Helpers de MediaIcon e getMediaColor mantêm-se iguais) ...
const MediaIcon = ({ type }: { type: string }) => {
  const c = "h-6 w-6";
  if (type === "Podcast") return <Mic className={`${c} text-emerald-500`} />;
  if (type === "TV News") return <Tv className={`${c} text-rose-500`} />;
  if (type === "Institutional") return <Building2 className={`${c} text-indigo-500`} />;
  if (type === "Print Newspaper") return <Newspaper className={`${c} text-amber-600`} />;
  if (type === "Online News") return <Globe className={`${c} text-blue-500`} />;
  return <Newspaper className={`${c} text-blue-500`} />;
};

const getMediaColor = (type: string) => {
  if (type === "Podcast") return { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" };
  if (type === "TV News") return { bg: "bg-rose-500/10 dark:bg-rose-500/20", text: "text-rose-600 dark:text-rose-400" };
  if (type === "Institutional") return { bg: "bg-indigo-500/10 dark:bg-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400" };
  if (type === "Print Newspaper") return { bg: "bg-amber-500/10 dark:bg-amber-500/20", text: "text-amber-700 dark:text-amber-400" };
  if (type === "Online News") return { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400" };
  return { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400" };
};

export default function AwardsSection() {
  return (
    <section id="awards" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        
        {/* CABEÇALHO (Igual) */}
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm shrink-0">
                <Trophy className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Awards & Recognition</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl text-sm md:text-lg leading-relaxed mx-auto md:mx-0 ml-1">
              Recognition of academic achievements and media coverage of innovative research contributions.
            </p>
          </div>
        </MotionWrapper>

        {/* 1. GRELHA DE PRÉMIOS (Mantida) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch mb-12 md:mb-16">
          {awards.map((award: any, index: number) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <GlassCard className="group relative flex flex-col p-5 md:p-6 rounded-xl md:rounded-2xl transition-all duration-500 h-full bg-amber-50 border-amber-200 hover:border-amber-300 hover:shadow-lg dark:bg-amber-500/5 dark:backdrop-blur-md dark:border-amber-500/10 dark:hover:border-amber-500/30 dark:hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)] hover:-translate-y-1 overflow-hidden">
                 {/* ... (Conteúdo do cartão de Awards igual ao anterior) ... */}
                 {/* Vou omitir o interior deste cartão para poupar espaço, pois não mudou */}
                 <div className="flex justify-between items-start mb-3 md:mb-4 gap-3">
                    <div className="p-2 bg-white dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/20 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors shrink-0">
                        <Trophy className="h-4 w-4 md:h-5 md:w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    {/* ... Resto do cartão de Award ... */}
                     <div className="flex flex-col items-end gap-1">
                        {award.position && <span className="px-2 py-0.5 md:py-1 rounded-md bg-white dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 shadow-sm text-right">{award.position}</span>}
                        {award.details && <span className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[8px] md:text-[9px] font-mono text-zinc-500 dark:text-zinc-400">{award.details}</span>}
                    </div>
                </div>
                <div className="mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-snug mb-1.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{award.name}</h3>
                    <div className="flex items-start gap-1.5 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 mb-3 md:mb-4">
                        <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4 mt-0.5 text-zinc-500 dark:text-zinc-500 flex-shrink-0" />
                        <span className="font-medium leading-tight">{award.issuer}</span>
                    </div>
                    {(award.description || award.hosts) && (
                        <div className="pt-3 md:pt-4 border-t border-amber-200/50 dark:border-white/5 space-y-3">
                            {award.description && <div className="flex gap-2"><FileText className="h-3 w-3 md:h-3.5 md:w-3.5 mt-0.5 text-zinc-400 flex-shrink-0" /><p className="text-[10px] md:text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{award.description}</p></div>}
                            {award.hosts && <div><p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5"><Layers className="h-3 w-3" /> Host Institutions</p><ul className="space-y-1.5">{award.hosts.map((host: string, i: number) => (<li key={i} className="flex items-center gap-2 text-[10px] md:text-xs text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-white/5 px-2 py-1 md:py-1.5 rounded border border-amber-100 dark:border-white/5"><span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" /><span className="truncate">{host}</span></li>))}</ul></div>}
                        </div>
                    )}
                </div>
                <div className="mt-auto pt-3 md:pt-4 border-t border-amber-200 dark:border-white/5 flex items-center justify-between text-[10px] md:text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 px-2 py-1 rounded border border-amber-200 dark:border-white/5 font-medium"><Calendar className="h-3 w-3" /><span>{award.date}</span></div>
                    <div className="flex items-center gap-1.5 opacity-80"><Globe className="h-3 w-3 text-zinc-500 dark:text-zinc-500" /><span>{award.type === "International" ? "International" : "National"}</span></div>
                </div>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>

        {/* 2. NOVA SECÇÃO: FEATURED IN (MEDIA) */}
        <MotionWrapper delay={0.3}>
          <div className="relative">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <span className="w-6 h-1 bg-zinc-900 dark:bg-white rounded-full"></span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Featured In
                </h3>
            </div>
            
            <div className="
                flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 -mx-5 px-5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700
                md:grid md:grid-cols-2 xl:grid-cols-4 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
            ">
              {featuredIn.map((item: any, idx: number) => {
                const colors = getMediaColor(item.type);
                
                // 👇 LÓGICA DE VERIFICAÇÃO DO LINK
                // Se existir link E não for "#", é clicável.
                const hasLink = item.link && item.link.trim() !== "" && item.link !== "#";

                // Definimos o componente Wrapper: 'a' se tiver link, 'div' se não tiver.
                const Wrapper = hasLink ? 'a' : 'div';
                
                return (
                  <Wrapper
                    key={idx} 
                    href={hasLink ? item.link : undefined}
                    target={hasLink ? "_blank" : undefined}
                    rel={hasLink ? "noopener noreferrer" : undefined}
                    className={`
                      block h-full min-w-[260px] md:min-w-0 snap-center
                      ${hasLink ? 'group cursor-pointer' : 'cursor-default'} 
                    `}
                  >
                    <GlassCard className={`
                      h-full p-6 flex flex-col items-center text-center
                      rounded-xl border border-zinc-200 dark:border-white/5
                      bg-white/50 dark:bg-white/5 backdrop-blur-sm
                      transition-all duration-300
                      ${hasLink 
                        ? 'hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-lg hover:-translate-y-1' 
                        : '' // Sem efeitos de hover se não for link
                      }
                    `}>
                      <div className={`mb-4 p-3 rounded-full ${colors.bg} ${hasLink ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                        <MediaIcon type={item.type} />
                      </div>
                      
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1 leading-tight">
                        {item.source}
                      </h4>
                      
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${colors.text}`}>
                        {item.type}
                      </p>
                      
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className={`
                        mt-auto text-[10px] font-medium flex items-center gap-1 ${colors.text}
                        ${hasLink ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'} 
                        transition-opacity
                      `}>
                        {item.date} 
                        {/* 👇 Seta só aparece se houver link */}
                        {hasLink && <ArrowUpRight className="h-3 w-3" />}
                      </div>
                    </GlassCard>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}