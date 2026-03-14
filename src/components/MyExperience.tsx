// src/components/ExperienceSection.tsx
"use client";

import React, { useState } from "react";
import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { 
  Briefcase, MapPin, BarChart3, FileText, ExternalLink, BookOpen, 
  ChevronDown, ChevronUp, Calendar 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import PeerReviewChart from "./PeerReviewChart";

// --- MICRO-COMPONENTE: Entrada de Trabalho Individual ---
const JobEntry = ({ job, index, isLast }: { job: any, index: number, isLast: boolean }) => {
  const isCurrent = job.period.toLowerCase().includes('present');
  const [activeTab, setActiveTab] = useState<'projects' | 'impact' | null>(null);

  const toggleTab = (tab: 'projects' | 'impact') => {
    setActiveTab(prev => prev === tab ? null : tab);
  };

  const hasProjects = Array.isArray(job.projecttitle) && job.projecttitle.length > 0;
  const hasImpact = Array.isArray(job.achievements) && job.achievements.length > 0;
  const hasCourses = job.courses && job.courses.length > 0;

  return (
    <TimelineItem
      index={index}
      isLast={isLast}
      period={job.period}
      isCurrent={isCurrent}
      
      title={
        <div className="flex flex-col gap-2">
          {/* DATA */}
          <div className="flex items-center">
             <div className={`
                flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider border transition-colors duration-300
                ${isCurrent 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}
             `}>
               <Calendar className={`w-3 h-3 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
               <span>{job.period}</span>
               {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />}
             </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Logos */}
            <div className="flex -space-x-2 overflow-hidden shrink-0"> 
              {Array.isArray(job.logos) ? (
                  job.logos.map((logo: string, i: number) => (
                      <div key={i} className="relative z-10 w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1">
                          <img src={logo} alt="" className="w-full h-full object-contain" />
                      </div>
                  ))
              ) : job.logos ? (
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1">
                      <img src={job.logos} alt="" className="w-full h-full object-contain" />
                  </div>
              ) : null}
            </div>
            
            {/* Cargo */}
            <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
              {job.position}
            </span>
          </div>
        </div>
      }
      
      subtitle={
        <div className="mt-1 pl-1">
          <div className="flex flex-col gap-1 mb-4">
            {/* Empresa e Link (Lógica Corrigida para múltiplos links) */}
            <div className="flex flex-wrap items-center gap-x-1.5">
               {Array.isArray(job.companyLinks) ? (
                  job.companyLinks.map((link: any, i: number) => (
                    <React.Fragment key={i}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1 transition-colors"
                      >
                        {link.name} <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                      {i < job.companyLinks.length - 1 && (
                        <span className="text-zinc-400 dark:text-zinc-500 font-light">&</span>
                      )}
                    </React.Fragment>
                  ))
               ) : job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1 transition-colors">
                    {job.company} <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
               ) : (
                  <span className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium">{job.company}</span>
               )}
            </div>
            
            {/* Localização e Cursos */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400">
               <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {typeof job.location === 'string' ? job.location : job.location.city}</span>
               
               {hasCourses && (
                 <>
                   <span className="md:hidden flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/5 text-blue-500 border border-blue-500/10">
                      <BookOpen className="w-3 h-3" /> {job.courses.length} Courses
                   </span>

                   <div className="hidden md:flex flex-wrap gap-2">
                     {job.courses.map((course: any, idx: number) => (
                       <a
                         key={idx}
                         href={course.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50/50 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                       >
                         <BookOpen className="w-3 h-3 opacity-70" />
                         {course.name}
                         <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                       </a>
                     ))}
                   </div>
                 </>
               )}
            </div>
          </div>

          {/* BOTÕES INTELIGENTES */}
          {(hasProjects || hasImpact) && (
            <div className="mt-2">
              <div className={`grid gap-3 mb-3 ${hasProjects && hasImpact ? 'grid-cols-2' : 'grid-cols-1'}`}>
                
                {hasProjects && (
                  <button
                    onClick={() => toggleTab('projects')}
                    className={`
                      flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300
                      ${activeTab === 'projects' 
                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                        : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 hover:bg-blue-500/5 hover:border-blue-500/20 hover:text-blue-500'}
                    `}
                  >
                    <FileText className="w-3.5 h-3.5" /> Projects
                    {activeTab === 'projects' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}

                {hasImpact && (
                  <button
                    onClick={() => toggleTab('impact')}
                    className={`
                      flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300
                      ${activeTab === 'impact' 
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 hover:bg-emerald-500/5 hover:border-emerald-500/20 hover:text-emerald-500'}
                    `}
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Key Impact
                    {activeTab === 'impact' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'projects' && hasProjects && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 md:p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                      <ul className="space-y-2">
                        {(job as any).projecttitle.map((p: string, i: number) => (
                          <li key={i} className="flex gap-2 leading-relaxed">
                            <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'impact' && hasImpact && (
                  <motion.div
                    key="impact"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 md:p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                      <ul className="space-y-2">
                        {job.achievements.map((ach: string, i: number) => (
                          <li key={i} className="leading-relaxed">
                            {ach === "__chart__" ? (
                              <div className="mt-2 p-2 rounded bg-black/10 dark:bg-black/20">
                                <PeerReviewChart company={job.company} />
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                {ach}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      }
    />
  );
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Experience
            </h2>
            
            <div className="flex gap-2 w-full md:w-auto">
               <a href="#map" className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 transition-all">
                 <MapPin className="w-3.5 h-3.5" /> Global Footprint
               </a>
               <a href="#timeline" className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 transition-all">
                 <BarChart3 className="w-3.5 h-3.5" /> Timeline
               </a>
            </div>
          </div>
        </MotionWrapper>

        <div className="space-y-4 md:space-y-8">
          {workExperience.map((job, index) => (
            <JobEntry 
              key={`${job.position}-${job.company}-${index}`} 
              job={job} 
              index={index} 
              isLast={index === workExperience.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}