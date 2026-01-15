// src/components/ExperienceSection.tsx
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
          {workExperience.map((job, index) => {
            // Lógica para detetar se é o cargo atual
            const isCurrent = job.period.includes('Present');

            return (
              <TimelineItem
                key={`${job.position}-${job.company}-${job.period}`}
                title={
                  <div className="flex flex-col gap-3">
                    
                    {/* --- NOVA SECÇÃO DE DATA (PREMIUM PILL) --- */}
                    <div className="flex items-center">
                      <div className={`
                        flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors duration-300
                        ${isCurrent 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10' 
                          : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}
                      `}>
                        <Calendar className={`h-3.5 w-3.5 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
                        <span>{job.period}</span>
                        
                        {/* Ponto a piscar se for Current */}
                        {isCurrent && (
                          <span className="relative flex h-2 w-2 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                      </div>
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
                      <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {job.position}
                      </span>
                    </div>
                  </div>
                }
                subtitle={
                  <div className="mt-2 pl-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full gap-4 mb-2">
                      
                      {/* NOME DA EMPRESA E LINKS */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
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
                              {i < (job as any).companyLinks.length - 1 && (
                                <span className="text-zinc-400 dark:text-zinc-600 font-light text-sm">&</span>
                              )}
                            </React.Fragment>
                          ))
                        ) 
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
                        : (
                          <span className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
                            {job.company}
                          </span>
                        )}
                      </div>

                      {/* LOCALIZAÇÃO (À Direita) */}
                      <div className="shrink-0">
                        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                          <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{typeof job.location === 'string' ? job.location : job.location.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* CURSOS LECIONADOS */}
                    {(job as any).courses && (job as any).courses.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
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
                
                {/* BLOCO PROJECTS */}
                {Array.isArray((job as any).projecttitle) && (job as any).projecttitle.length > 0 && (
                  <motion.div
                    className="group relative mt-4 overflow-hidden rounded-lg border border-blue-500/10 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-blue-900 dark:text-blue-100 tracking-wider uppercase">
                          Projects
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                          <span className="text-[9px] uppercase tracking-widest text-blue-600/70 dark:text-blue-300/70 hidden sm:block">Reveal</span>
                          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="max-h-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[800px]">
                      <div className="px-4 pb-4 pt-0">
                        <div className="h-px w-full bg-blue-500/10 mb-3" />
                        <ul className="space-y-2">
                          {(job as any).projecttitle.map((p: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                                  <span className="block mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                                  {p}
                              </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* BLOCO KEY IMPACT */}
                {Array.isArray(job.achievements) && job.achievements.length > 0 && (
                  <motion.div
                    className="group relative mt-3 overflow-hidden rounded-lg border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          <BarChart3 className="h-3.5 w-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-100 tracking-wider uppercase">
                          Key Impact
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                          <span className="text-[9px] uppercase tracking-widest text-emerald-600/70 dark:text-emerald-300/70 hidden sm:block">Reveal</span>
                          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="max-h-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[2000px]">
                      <div className="px-4 pb-4 pt-0">
                          <div className="h-px w-full bg-emerald-500/10 mb-3" />
                          <ul className="space-y-3">
                          {job.achievements.map((ach: string, i: number) => (
                              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                              {ach === "__chart__" ? (
                                  <div className="mt-2 p-3 rounded-lg bg-zinc-100 dark:bg-black/20 border border-zinc-200 dark:border-white/5">
                                      <PeerReviewChart company={job.company} />
                                  </div>
                              ) : (
                                  <div className="flex items-start gap-3">
                                      <span className="block mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                      {ach}
                                  </div>
                              )}
                              </li>
                          ))}
                          </ul>
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