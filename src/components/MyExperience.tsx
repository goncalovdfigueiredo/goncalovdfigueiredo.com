"use client";

import React from "react";
import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  BarChart3, 
  FileText, 
  ExternalLink, 
  BookOpen 
} from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import PeerReviewChart from "./PeerReviewChart";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <MotionWrapper>
          {/* Header + Buttons */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-4 backdrop-blur-sm">
                <Briefcase className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Experience
            </h2>

            {/* Button Group */}
            <div className="flex gap-3">
              <a href="#map" className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-900/5 dark:shadow-emerald-900/20">
                <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" /> Global Footprint
              </a>
              <a href="#timeline" className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 text-sm font-medium text-blue-700 dark:text-blue-400 transition-all duration-300 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20">
                <BarChart3 className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" /> Timeline
              </a>
            </div>
          </div>
        </MotionWrapper>

        <div className="space-y-12">
          {workExperience.map((job, index) => (
            <TimelineItem
              key={`${job.position}-${job.company}-${job.period}`}
              title={
                <div className="flex flex-col gap-2">
                  {/* DATA (Destacada e Verde) */}
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      {job.period}
                    </span>
                    {/* Linha decorativa subtil */}
                    <div className="h-px w-8 bg-emerald-500/20" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* LOGOS */}
                    <div className="flex flex-wrap gap-2"> 
                      {Array.isArray(job.logos) ? (
                          job.logos.map((logo, i) => (
                              <div key={i} className="p-2 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 w-fit backdrop-blur-sm">
                                  <img src={logo} alt={job.company} className="w-8 h-8 object-contain" />
                              </div>
                          ))
                      ) : job.logos ? (
                          <div className="p-2 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 w-fit backdrop-blur-sm">
                              <img src={job.logos} alt={job.company} className="w-8 h-8 object-contain" />
                          </div>
                      ) : null}
                    </div>
                    
                    {/* TÍTULO DO CARGO */}
                    <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight self-center sm:self-auto">
                      {job.position}
                    </span>
                  </div>
                </div>
              }
              subtitle={
                <div className="mt-2 pl-1">
                  
                  {/* 1. NOME DA EMPRESA (Lógica de Múltiplos Links ou Único) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                    
                    {/* CASO 1: Vários Links (ex: IT & CICECO) */}
                    {(job as any).companyLinks ? (
                      (job as any).companyLinks.map((link: any, i: number) => (
                        <React.Fragment key={i}>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group/link flex items-center gap-1.5 text-lg text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                          >
                            {link.name}
                            <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover/link:opacity-100 transition-all" />
                          </a>
                          {/* Adiciona o "&" separador se não for o último */}
                          {i < (job as any).companyLinks.length - 1 && (
                            <span className="text-zinc-400 dark:text-zinc-600 font-light text-sm">&</span>
                          )}
                        </React.Fragment>
                      ))
                    ) 
                    
                    /* CASO 2: Um Link Único (ex: Lightenjin / IST) */
                    : (job as any).url ? (
                      <a 
                        href={(job as any).url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 text-lg text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                      >
                        {job.company}
                        <ExternalLink className="h-4 w-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                      </a>
                    ) 
                    
                    /* CASO 3: Sem Link */
                    : (
                      <span className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
                        {job.company}
                      </span>
                    )}
                  </div>
                  
                  {/* 2. LOCALIZAÇÃO */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-white/5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{typeof job.location === 'string' ? job.location : job.location.city}</span>
                    </div>
                  </div>

                  {/* 3. CURSOS LECIONADOS (Badge System) */}
                  {(job as any).courses && (job as any).courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(job as any).courses.map((course: any, idx: number) => (
                        <a 
                          key={idx}
                          href={course.url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="
                            group/course flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wide
                            bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20
                            hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all cursor-pointer shadow-sm
                          "
                        >
                          <BookOpen className="h-3 w-3 opacity-70 group-hover/course:opacity-100" /> 
                          {course.name}
                          <ExternalLink className="h-2.5 w-2.5 opacity-50 group-hover/course:opacity-100 group-hover/course:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  )}

                </div>
              }
              isLast={index === workExperience.length - 1}
              index={index}
            >
              {/* ===== Projects & Grants ===== */}
              {Array.isArray((job as any).projecttitle) && (job as any).projecttitle.length > 0 && (
                <motion.div
                  tabIndex={0}
                  className="group relative mt-6 overflow-hidden rounded-xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-2xl hover:shadow-blue-900/10 focus:outline-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-blue-500/10 bg-blue-500/10">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 tracking-wide uppercase">Project</h4>
                  </div>
                  <div className="p-5">
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[2000px] group-hover:opacity-100 group-focus-within:max-h-[2000px] group-focus-within:opacity-100">
                        <ul className="space-y-3 pt-2">
                        {(job as any).projecttitle.map((p: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                                <span className="block mt-1.5 w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
                                {p}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="absolute bottom-3 right-4 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                        <span className="text-[10px] uppercase tracking-widest font-medium text-blue-600/60 dark:text-blue-400/60">Hover to reveal</span>
                        <div className="w-1 h-1 rounded-full bg-blue-500/40 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===== Key Achievements ===== */}
              {Array.isArray(job.achievements) && job.achievements.length > 0 && (
                <motion.div
                  tabIndex={0}
                  className="group relative mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-900/10 focus:outline-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-white/5">
                    <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 tracking-wide uppercase">Key Achievements</h4>
                  </div>
                  <div className="p-5">
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[3000px] group-hover:opacity-100 group-focus-within:max-h-[3000px] group-focus-within:opacity-100">
                        <ul className="space-y-4 pt-2">
                        {job.achievements.map((ach: string, i: number) => (
                            <motion.li key={i} className="relative overflow-visible" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.08 * i }} viewport={{ once: true }}>
                            {ach === "__chart__" ? (
                                <div className="mt-2 p-4 rounded-lg bg-zinc-100 dark:bg-black/20 border border-zinc-200 dark:border-white/5">
                                    <PeerReviewChart company={job.company} />
                                </div>
                            ) : (
                                <div className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                                    <span className="block mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 shrink-0" />
                                    <p>{ach}</p>
                                </div>
                            )}
                            </motion.li>
                        ))}
                        </ul>
                    </div>
                    <div className="absolute bottom-3 right-4 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                        <span className="text-[10px] uppercase tracking-widest font-medium text-emerald-600/60 dark:text-emerald-500/60">Hover to reveal</span>
                        <div className="w-1 h-1 rounded-full bg-emerald-500/40 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              )}
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}