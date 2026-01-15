// src/components/EducationSection.tsx
"use client";

import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import {
  MapPin,
  GraduationCap,
  BarChart3,
  FileText,
  ListChecks,
  ExternalLink,
  BookOpen,
  Calendar // 👈 Importante
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <MotionWrapper>
          {/* Header + Buttons */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-4 backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Education
            </h2>

            {/* Button Group */}
            <div className="flex gap-3">
              <a
                href="#map"
                className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-900/5 dark:shadow-emerald-900/20"
              >
                <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Global Footprint
              </a>

              <a
                href="#timeline"
                className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 text-sm font-medium text-blue-700 dark:text-blue-400 transition-all duration-300 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20"
              >
                <BarChart3 className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Timeline
              </a>
            </div>
          </div>
        </MotionWrapper>

        <div className="space-y-12">
          {education.map((edu, index) => {
            const isCurrent = edu.period.toLowerCase().includes('present') || edu.period.toLowerCase().includes('atual');

            const thesisText =
              edu.achievements?.find(
                (a: string) => a && !a.trim().startsWith("-")
              ) || "";

            const curriculumItems = (edu.achievements || [])
              .filter((a: string) => a && a.trim().startsWith("-"))
              .map((a: string) =>
                a.replace(/^-+\s*/, "").replace(/[;,.]\s*$/, "")
              );

            const STRIP_TRAILERS: RegExp[] = [
              /[:.\s]*relevant curricular units include[:.\s]*$/i,
              /[:.\s]*with the following curriculum plan[:.\s]*$/i,
            ];
            let thesisClean = thesisText.trim();
            STRIP_TRAILERS.forEach((re) => {
              thesisClean = thesisClean.replace(re, "");
            });

            return (
              <TimelineItem
                key={edu.institution + edu.period}
                index={index}
                isLast={index === education.length - 1}
                // Nota: Removi a prop 'period' daqui porque o teu TimelineItem não a usa.
                
                // TITLE: Construímos a Data + Logo + Grau aqui manualmente
                title={
                  <div className="flex flex-col gap-3">
                    
                    {/* 👇 DATA (VOLTOU!) 👇 */}
                    <div className="flex items-center">
                      <div className={`
                        flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors duration-300
                        ${isCurrent 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10' 
                          : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}
                      `}>
                        <Calendar className={`h-3.5 w-3.5 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
                        <span>{edu.period}</span>
                        
                        {isCurrent && (
                          <span className="relative flex h-2 w-2 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Logo e Título */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="p-2 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 w-fit backdrop-blur-sm">
                          <img
                          src={edu.logo}
                          alt={edu.institution}
                          className="w-8 h-8 object-contain"
                          />
                      </div>
                      <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {edu.degree}
                      </span>
                    </div>
                  </div>
                }

                // SUBTITLE: Instituição, Link e Local
                subtitle={
                  <div className="mt-2 pl-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full gap-4 mb-2">
                        
                        {/* Instituição */}
                        <div className="flex items-center">
                            {(edu as any).url ? (
                            <a 
                                href={(edu as any).url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group/link flex items-center gap-2 text-lg text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                            >
                                {edu.institution}
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                            </a>
                            ) : (
                            <span className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
                                {edu.institution}
                            </span>
                            )}
                        </div>

                        {/* Local */}
                        <div className="shrink-0">
                            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                                <span>{typeof edu.location === 'string' ? edu.location : edu.location.city}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                }
              >
                
                {/* === BLOCO ACADEMIC DETAILS (PREMIUM GLASS) === */}
                {(thesisClean || curriculumItems.length > 0) && (
                  <motion.div
                    className="group relative mt-4 overflow-hidden rounded-lg border border-blue-500/10 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    {/* Cabeçalho Compacto (Sem fundo sólido) */}
                    <div className="flex items-center justify-between px-4 py-3 cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <FileText className="h-3.5 w-3.5" />
                            </div>
                            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-100 tracking-wider uppercase">
                                Academic Details
                            </h4>
                        </div>
                        {/* Indicador Reveal */}
                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                            <span className="text-[9px] uppercase tracking-widest text-blue-600/70 dark:text-blue-300/70 hidden sm:block">Hover to Reveal</span>
                            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                    </div>

                    {/* Conteúdo Expansível */}
                    <div className="max-h-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[1000px]">
                        <div className="px-4 pb-4 pt-0">
                            {/* Linha Divisória Subtil */}
                            <div className="h-px w-full bg-blue-500/10 mb-4" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                
                                {/* Coluna 1: Tese / Foco */}
                                {thesisClean && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-1 opacity-80">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            <h5 className="text-[10px] font-bold uppercase tracking-wider">Thesis / Description</h5>
                                        </div>
                                        {/* Texto limpo sem caixa cinzenta */}
                                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light pl-3 border-l-2 border-blue-500/20">
                                            {thesisClean}
                                        </p>
                                    </div>
                                )}

                                {/* Coluna 2: Currículo */}
                                {curriculumItems.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-1 opacity-80">
                                            <ListChecks className="h-3.5 w-3.5" />
                                            <h5 className="text-[10px] font-bold uppercase tracking-wider">Relevant Curricular Units:</h5>
                                        </div>
                                        <ul className="space-y-2">
                                            {curriculumItems.map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300 font-light">
                                                    <span className="block mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0 opacity-70" />
                                                    <span className="leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                  </motion.div>
                )}
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}