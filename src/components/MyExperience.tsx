// src/components/ExperienceSection.tsx
"use client";

import React, { useState } from "react";
import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { 
  Briefcase, MapPin, BarChart3, ChartGantt, FileText, ExternalLink, BookOpen, 
  ChevronDown, Calendar, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import PeerReviewChart from "./PeerReviewChart";

// --- MICRO-COMPONENTE: Botão de Navegação com Tooltip ---
const NavButtonWithTooltip = ({ href, icon: Icon, text, tooltip, colorClass }: { href: string, icon: any, text: string, tooltip: string, colorClass: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex-1 md:flex-none">
      <a 
        href={href} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${colorClass}`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{text}</span>
      </a>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden md:block"
          >
            <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] py-1.5 px-3 rounded-md shadow-2xl whitespace-nowrap">
              {tooltip}
              {/* Seta do Tooltip */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-t border-l border-zinc-800 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MICRO-COMPONENTE: Entrada de Trabalho Individual ---
const JobEntry = ({ job, index, isLast }: { job: any, index: number, isLast: boolean }) => {
  const isCurrent = job.period.toLowerCase().includes('present');
  const [activeTab, setActiveTab] = useState<'projects' | 'key impact' | null>(null);

  const toggleTab = (tab: 'projects' | 'key impact') => {
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
            <div className="flex -space-x-2 overflow-hidden shrink-0"> 
              {Array.isArray(job.logos) ? (
                  job.logos.map((logo: string, i: number) => (
                      <div key={i} className="relative z-10 w-8 h-8 rounded-lg bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-1 shadow-sm">
                          <img src={logo} alt="" className="w-full h-full object-contain" />
                      </div>
                  ))
              ) : job.logos ? (
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-1 shadow-sm">
                      <img src={job.logos} alt="" className="w-full h-full object-contain" />
                  </div>
              ) : null}
            </div>
            <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-tight">{job.position}</span>
          </div>
        </div>
      }
      subtitle={
        <div className="mt-2 pl-1">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start justify-between">
            
            <div className="flex-1 space-y-3">
               <div className="flex flex-wrap items-center gap-x-1.5">
                  {Array.isArray(job.companyLinks) ? (
                      job.companyLinks.map((link: any, i: number) => (
                        <React.Fragment key={i}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 transition-colors">
                            {link.name} <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                          </a>
                          {i < job.companyLinks.length - 1 && <span className="text-zinc-400 dark:text-zinc-500 font-light">&</span>}
                        </React.Fragment>
                      ))
                  ) : job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">{job.company} <ExternalLink className="w-3.5 h-3.5 opacity-50" /></a>
                  ) : <span className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-semibold">{job.company}</span>}
               </div>
               
               <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {typeof job.location === 'string' ? job.location : job.location.city}</span>
               </div>

               {hasCourses && (
                 <div className="flex flex-wrap gap-2 pt-1">
                   {job.courses.map((course: any, idx: number) => (
                     <a key={idx} href={course.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/5 text-[10px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/10 hover:bg-blue-500/10 transition-all">
                       <BookOpen className="w-3 h-3" /> {course.name}
                     </a>
                   ))}
                 </div>
               )}
            </div>

            <div className="flex flex-row lg:flex-col gap-2.5 shrink-0">
               {hasProjects && (
                 <button 
                  onClick={() => toggleTab('projects')} 
                  className={`
                    flex items-center justify-between gap-3 py-2.5 px-5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 min-w-[160px]
                    ${activeTab === 'projects' 
                      ? 'bg-blue-600 text-white border-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                      : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:scale-[1.02]'}
                  `}
                 >
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Projects</div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === 'projects' ? 'rotate-180' : ''}`} />
                 </button>
               )}
               {hasImpact && (
                 <button 
                  onClick={() => toggleTab('key impact')} 
                  className={`
                    flex items-center justify-between gap-3 py-2.5 px-5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 min-w-[160px]
                    ${activeTab === 'key impact' 
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-[0_0_20px_rgba(5,150,105,0.3)]' 
                      : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-[1.02]'}
                  `}
                 >
                    <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Key Impact</div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === 'key impact' ? 'rotate-180' : ''}`} />
                 </button>
               )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                <div className={`p-4 md:p-6 rounded-2xl border backdrop-blur-sm ${activeTab === 'projects' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                  <ul className="space-y-3">
                    {(activeTab === 'projects' ? job.projecttitle : job.achievements).map((item: string, i: number) => (
                      <li key={i} className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed w-full">
                        {item === "__chart__" ? (
                          <div className="mt-2 p-2 rounded-lg bg-zinc-900/5 dark:bg-black/20 border border-white/5">
                            <PeerReviewChart company={job.company} />
                          </div>
                        ) : (
                          <div className="flex gap-3 items-start">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${activeTab === 'projects' ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`} />
                            <span className="flex-1">{item}</span>
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
      }
    />
  );
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container max-w-8xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Experience
            </h2>
            
            <div className="flex gap-2 w-full md:w-auto">
               <NavButtonWithTooltip 
                 href="#map" 
                 icon={MapPin} 
                 text="Global Footprint" 
                 tooltip="Interactive map of my research, conferences and academic reach"
                 colorClass="border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
               />
               <NavButtonWithTooltip 
                 href="#timeline" 
                 icon={ChartGantt} 
                 text="Timeline" 
                 tooltip="Visual roadmap of my academic and leadership career since 2008"
                 colorClass="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400"
               />
            </div>
          </div>
        </MotionWrapper>

        <div className="grid gap-8">
          {workExperience.map((job, index) => {
            const isCurrent = job.period.toLowerCase().includes('present');
            return (
              <div 
                key={`${job.position}-${index}`}
                className={`transition-all duration-700 ${isCurrent ? 'ml-0 opacity-100' : 'md:ml-12 ml-4 opacity-75 hover:opacity-100'}`}
              >
                <JobEntry job={job} index={index} isLast={index === workExperience.length - 1} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}