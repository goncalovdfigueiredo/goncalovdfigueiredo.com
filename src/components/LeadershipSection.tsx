// src/components/LeadershipSection.tsx
"use client";

import { useState } from "react";
import { Handshake, Calendar, MapPin, Briefcase, ChartGantt, Rocket, BrainCircuit, Gamepad2, BookOpen, MessageCircleHeart, Globe, HeartHandshake, ChevronDown, ChevronUp, Mic, Medal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import GanttTimeline from "@/components/GanttTimeline";
import PeerReviewChart from "./PeerReviewChart";
import { LeadershipExperience } from "@/lib/data";

// --- MICRO-COMPONENTE: Botão de Navegação com Tooltip ---
const NavButtonWithTooltip = ({ href, icon: Icon, text, tooltip, colorClass }: { href: string, icon: any, text: string, tooltip: string, colorClass: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative flex-1 md:flex-none">
      <a href={href} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`group w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${colorClass}`} >
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{text}</span>
      </a>
      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: 0.95 }} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden md:block">
            <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] py-1.5 px-3 rounded-md shadow-2xl whitespace-nowrap">
              {tooltip}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-t border-l border-zinc-800 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const IconMap: any = { Rocket, BrainCircuit, Gamepad2, BookOpen, MessageCircleHeart, Globe, HeartHandshake, Mic, Medal };
const TagColors: Record<string, string> = {
  Event: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  Resource: "text-blue-600 bg-blue-500/10 border-blue-500/20",
  Community: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  Networking: "text-purple-600 bg-purple-500/10 border-purple-500/20",
  "PhD Jury": "text-rose-600 bg-rose-500/10 border-rose-500/20",
};

const CompanyLogo = ({ job }: { job: any }) => {
  if (job.logos && job.logos.length > 0) {
    return (
      <div className="flex items-center -space-x-2 overflow-hidden py-1 pl-1">
        {job.logos.map((logo: string, idx: number) => (
          <div key={idx} className="relative z-10 inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900 bg-white dark:bg-white/10 p-0.5" style={{ zIndex: 10 - idx }} >
            <img src={logo} alt="Publisher Logo" className="h-full w-full object-contain rounded-full" />
          </div>
        ))}
      </div>
    );
  }
  return <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />;
};

export default function LeadershipSection() {
  const [selectedMobileJob, setSelectedMobileJob] = useState<any | null>(null);

  const renderActivityGrid = (ach: any, isModal: boolean) => (
    <div className="pt-2 first:pt-0">
      {ach.year && (
        <div className="flex items-center gap-2 mb-3 mt-1">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {ach.year}
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10"></div>
        </div>
      )}
      
      <div className={`grid ${isModal ? "grid-cols-4" : "grid-cols-4 sm:group-hover:grid-cols-4"} gap-2 transition-all duration-500`}>
        {ach.items.map((item: any, k: number) => {
          const IconComp = IconMap[item.icon] || Rocket;
          const tagColor = TagColors[item.tag] || "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
          
          return (
            <div key={k} className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-center transition-all duration-300">
              <IconComp className="h-4 w-4 mb-1.5 text-emerald-500" />
              <span className="text-[10px] font-semibold text-zinc-800 dark:text-zinc-200 leading-tight mb-1">{item.label}</span>
              <span className={`text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${tagColor}`}>{item.tag}</span>
            </div>
          )
        })}
      </div>
    </div>
  );

  return (
    <section id="leadership" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-8xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <Handshake className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Leadership
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

        {/* =======================
            VERSÃO MOBILE (Com a seta no canto superior direito)
           ======================= */}
        <div className="lg:hidden flex flex-col gap-3">
            {LeadershipExperience.map((job: any, idx: number) => {
              const locationDisplay = typeof job.location === 'string' ? job.location : job.location.city;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div 
                    onClick={() => setSelectedMobileJob(job)}
                    className="relative rounded-xl border bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden cursor-pointer p-4 active:scale-[0.98]"
                  >
                    {/* Seta no canto superior direito */}
                    <div className="absolute top-3 right-3">
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </div>

                    <div className="flex items-start gap-3 pr-6">
                       <div className={`
                         rounded-lg border border-zinc-200 dark:border-white/10 shrink-0 flex items-center justify-center bg-white dark:bg-white/5 shadow-sm
                         ${job.logos ? 'px-1.5 py-1 w-auto' : 'p-2 w-10 h-10'} 
                       `}>
                          <CompanyLogo job={job} />
                       </div>
                       
                       <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight">{job.position}</h3>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 mb-0">{job.company}</p>
                          
                          
                          <div className="flex flex-wrap items-center gap-y-0 gap-x-3 text-[8px] text-zinc-500 dark:text-zinc-400">
                             <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-emerald-500/70" /> {job.period}</span>
                             <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500/70" /> {locationDisplay}</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* =======================
            MODAL MOBILE (Popup Flutuante com os detalhes completos)
           ======================= */}
        <AnimatePresence>
          {selectedMobileJob && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:hidden">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedMobileJob(null)} 
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }} 
                animate={{ scale: 1, y: 0, opacity: 1 }} 
                exit={{ scale: 0.9, y: 20, opacity: 0 }} 
                className="relative w-full max-w-sm z-10 max-h-[85vh] flex flex-col"
              >
                <GlassCard className="flex flex-col w-full rounded-2xl overflow-hidden border border-emerald-500/30 bg-zinc-50 dark:bg-[#0c0c0e] relative p-5 shadow-2xl text-left">
                  
                  <button 
                    onClick={() => setSelectedMobileJob(null)} 
                    className="absolute top-3 right-3 z-30 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1 mb-2 pr-8">
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0">
                      <CompanyLogo job={selectedMobileJob} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                        {selectedMobileJob.period}
                      </span>
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                        {selectedMobileJob.position}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mb-3 pb-2.5 border-b border-zinc-200 dark:border-white/10">
                    {selectedMobileJob.company} • {typeof selectedMobileJob.location === 'string' ? selectedMobileJob.location : selectedMobileJob.location.city}
                  </p>

                  <div className="space-y-2.5 overflow-y-auto max-h-[50vh] no-scrollbar pr-1">
                    {selectedMobileJob.achievements.map((ach: any, i: number) => {
                      if (typeof ach === 'object' && ach.type === 'activity_grid') {
                        return renderActivityGrid(ach, true);
                      }
                      if (ach === "__chart__") {
                        return (
                          <div key={i} className="w-full pt-0">
                              <PeerReviewChart company={selectedMobileJob.company} forceAnimation={true} />
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                          <span className="block mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          <p>{ach}</p>
                        </div>
                      );
                    })}
                  </div>

                </GlassCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =======================
            VERSÃO DESKTOP (Inalterada)
           ======================= */}
        <div className="hidden lg:block overflow-x-auto overflow-y-visible py-12 pl-4">
          <div className="flex items-start min-w-max gap-8">
            {LeadershipExperience.map((job: any, idx: number) => {
              const zIndex = LeadershipExperience.length - idx;
              const locationDisplay = typeof job.location === 'string' ? job.location : job.location.city;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  style={{ zIndex }} 
                  className={`
                    relative flex-shrink-0 
                    w-[400px] hover:w-[550px]
                    ${idx > 0 ? "-ml-32" : ""}
                    transition-all duration-500 ease-out group
                    hover:!ml-4 hover:z-50 hover:-translate-y-2
                  `}
                >
                  <div className="absolute -top-3 right-6 z-30 px-3 py-1.5 rounded-full flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-emerald-500/30 dark:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Calendar className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-700 dark:text-emerald-100">{job.period}</span>
                  </div>

                  <GlassCard className="p-6 relative overflow-visible rounded-2xl min-h-[320px] flex flex-col justify-between bg-zinc-100/0 border border-zinc-200 shadow-xl dark:bg-[#09090b]/0 dark:backdrop-blur-xl dark:border-emerald-500/10 dark:shadow-2xl dark:shadow-black/50 transition-all duration-500 hover:border-emerald-500/30 dark:hover:bg-emerald-500/10 dark:hover:border-emerald-500/40">
                    <div className="mb-6 mt-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`
                           rounded-xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-inner shrink-0 bg-white dark:bg-white/5
                           ${job.logos ? 'px-2 py-1.5 w-auto' : 'p-2.5 w-12 h-12 flex items-center justify-center'}
                        `}>
                           <CompanyLogo job={job} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold leading-tight text-zinc-900 dark:text-white mb-1">{job.position}</h3>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-[300px] group-hover:max-w-none transition-all duration-500">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-white/5">
                          <MapPin className="h-3.5 w-3.5" /> <span>{locationDisplay}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Content */}
                    {job.achievements.length > 0 && (
                      <div className="relative p-4 bg-white/50 dark:bg-black/40 rounded-xl border border-zinc-200 dark:border-white/5 group/achieve hover:border-emerald-500/20 transition-colors duration-300 flex-grow">
                        <div className="flex items-center mb-3">
                          <div className="h-6 w-6 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 mr-2.5">
                            <Briefcase className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover/achieve:text-emerald-600 dark:group-hover/achieve:text-emerald-400 transition-colors">Key Initiatives</h4>
                        </div>

                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-h-[3000px] group-hover:opacity-100">
                          <div className="space-y-3 mt-2 pl-1">
                            {job.achievements.map((ach: any, i: number) => {
                              if (typeof ach === 'object' && ach.type === 'activity_grid') {
                                return renderActivityGrid(ach, false);
                              }
                              if (ach === "__chart__") {
                                return (
                                  <div key={i} className="w-full pt-2">
                                      <PeerReviewChart company={job.company} />
                                  </div>
                                );
                              }
                              return (
                                <div key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-light">
                                  <span className="block mt-1.5 w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-500/50 shrink-0" />
                                  <p className="leading-relaxed">{ach}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-4 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                            <span className="text-[10px] uppercase tracking-widest font-medium text-emerald-600/60 dark:text-emerald-500/60">Hover to expand</span>
                            <div className="w-1 h-1 rounded-full bg-emerald-500/40 animate-pulse" />
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TIMELINE */}
        <MotionWrapper>
          <div id="timeline" className="mt-16 md:mt-20 scroll-mt-24">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        <ChartGantt className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Timeline Overview</h3>
                      <p className="text-xs md:text-sm text-blue-600/80 dark:text-blue-400/60 font-medium">Chronological view of my career path</p>
                    </div>
                </div>
            </div>
             <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/5 backdrop-blur-md shadow-lg dark:shadow-2xl dark:shadow-black/40">
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
                <div className="p-4 md:p-8 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/40">
                    <GanttTimeline rowHeight={28} barHeight={20} fontSize={13} />
                </div>
            </div>
          </div>
        </MotionWrapper> 
      </div>
    </section>
  );
}