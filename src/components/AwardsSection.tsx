"use client";

import React from "react";
import { awards } from "@/lib/data";
import { Trophy, Calendar, Building2, Globe, Layers, FileText } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

export default function AwardsSection() {
  return (
    <section id="awards" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      {/* 👇 ALTERAÇÃO AQUI: Mudei de max-w-5xl para max-w-7xl */}
      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <MotionWrapper>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                <Trophy className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              Honors & Awards
            </h2>
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-3xl text-lg leading-relaxed ml-1">
              Recognition of my academic achievements, research contributions, and innovative projects.
            </p>
          </div>
        </MotionWrapper>

        {/* 👇 DICA: Se ainda achares apertado com 3 colunas, muda 'lg:grid-cols-3' para 'lg:grid-cols-2'.
           Com max-w-7xl e grid-cols-3 já deves ter espaço suficiente.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {awards.map((award: any, index: number) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <GlassCard
                className="
                  group relative flex flex-col p-6
                  rounded-2xl transition-all duration-500
                  h-full
                  
                  bg-amber-50 border-amber-200 
                  hover:border-amber-300 hover:shadow-lg

                  dark:bg-amber-500/5 dark:backdrop-blur-md dark:border-amber-500/10
                  dark:hover:border-amber-500/30 dark:hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)]
                  
                  hover:-translate-y-1
                  overflow-hidden
                  
                  before:absolute before:inset-x-0 before:top-0 before:h-px 
                  before:bg-gradient-to-r before:from-transparent before:via-amber-400/30 before:to-transparent
                "
              >
                {/* Glow de fundo */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 dark:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_60%)]" />

                {/* Header do Cartão */}
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div className="p-2 bg-white dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/20 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors">
                    <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    {award.position && (
                      <span className="px-2.5 py-1 rounded-md bg-white dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 shadow-sm">
                        {award.position}
                      </span>
                    )}
                    {/* Badge para o código da bolsa */}
                    {award.details && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                        {award.details}
                      </span>
                    )}
                  </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {award.name}
                  </h3>
                  
                  <div className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                    <Building2 className="h-4 w-4 mt-0.5 text-zinc-500 dark:text-zinc-500 flex-shrink-0" />
                    <span className="font-medium leading-tight">{award.issuer}</span>
                  </div>

                  {/* SECÇÃO: DESCRIÇÃO E HOSTS */}
                  {award.description && (
                    <div className="pt-4 border-t border-amber-200/50 dark:border-white/5 space-y-4">
                      
                      <div className="flex gap-2">
                        <FileText className="h-3.5 w-3.5 mt-0.5 text-zinc-400 flex-shrink-0" />
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {award.description}
                        </p>
                      </div>

                      {award.hosts && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                            <Layers className="h-3 w-3" /> Host Institutions
                          </p>
                          <ul className="space-y-1.5">
                            {award.hosts.map((host: string, i: number) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-white/5 px-2 py-1.5 rounded border border-amber-100 dark:border-white/5">
                                <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                                <span className="truncate">{host}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Rodapé do Cartão */}
                <div className="mt-auto pt-4 border-t border-amber-200 dark:border-white/5 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 px-2 py-1 rounded border border-amber-200 dark:border-white/5">
                    <Calendar className="h-3 w-3" />
                    <span>{award.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-zinc-500 dark:text-zinc-500" />
                    <span>
                        {award.type === "International" ? "International" : "National"}
                    </span>
                  </div>
                </div>

              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}