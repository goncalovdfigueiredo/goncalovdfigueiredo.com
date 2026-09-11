// src/components/LeadershipSection.tsx
"use client";

import { useState } from "react";
import { Handshake, Calendar, MapPin, Briefcase, ChartGantt, Rocket, BrainCircuit, Gamepad2, BookOpen, MessageCircleHeart, Globe, HeartHandshake, ChevronDown, X, Mic, Medal, Plus, Building2 } from "lucide-react";
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
    <div className="relative shrink-0">
      <a 
        href={href} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        className={`group flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl border transition-all duration-300 shadow-sm backdrop-blur-md ${colorClass}`}
      >
        <Icon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        {/* Texto adaptativo: "Map" em mobile para poupar espaço, nome completo em desktop */}
        <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider">
          <span className="inline md:hidden">{text === "Global Footprint" ? "Map" : text}</span>
          <span className="hidden md:inline">{text}</span>
        </span>
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

// --- COMPONENTE REFATORADO: O Retângulo Unificado por baixo! ---
const CompanyLogo = ({ job, isModal = false }: { job: any, isModal?: boolean }) => {
  const heightClass = isModal ? "h-10 md:h-10" : "h-10 md:h-[46px]";
  const singleWidthClass = isModal ? "w-10 md:w-10" : "w-10 md:w-[46px]";
  
  const isMulti = job.logos && job.logos.length > 1;

  return (
    <div className={`
      flex items-center justify-center shrink-0 rounded-xl shadow-sm
      bg-white dark:bg-white/5 border border-zinc-200/50 dark:border-white/10
      ${heightClass}
      ${isMulti ? 'w-auto px-2.5' : `${singleWidthClass} p-2`}
    `}>
      {isMulti ? (
        /* Logótipos em círculos sobrepostos DENTRO do retângulo */
        <div className="flex items-center -space-x-2">
          {job.logos.map((logo: string, idx: number) => (
            <div 
              key={idx} 
              className="relative z-10 h-7 w-7 md:h-8 md:w-8 rounded-full ring-2 ring-white dark:ring-[#1a1a1c] bg-white p-0.5 shadow-sm" 
              style={{ zIndex: 10 - idx }}
            >
              <img src={logo} alt="Publisher Logo" className="h-full w-full object-contain rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        /* Logótipo único ocupa o quadrado normal */
        <img src={job.logo || (job.logos && job.logos[0])} alt={job.company} className="w-10 h-10 object-contain" />
      )}
    </div>
  );
};

export default function LeadershipSection() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

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
      
      <div className={`grid ${isModal ? "grid-cols-2 md:grid-cols-4" : "grid-cols-4 sm:group-hover:grid-cols-4"} gap-2 transition-all duration-500`}>
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

      <div className="container max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
          {/* Cabeçalho atualizado com botões compactos alinhados ao lado em mobile */}
          <div className="mb-8 md:mb-12 flex items-center justify-between gap-2 min-w-0">
            
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] md:text-xs font-mono font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">
                  MODULE // 05_COMMUNITY_IMPACT
                </span>
              </div>
              <h2 className="text-xl md:text-4xl font-extrabold flex items-center tracking-tight text-zinc-900 dark:text-white gap-2 md:gap-3 min-w-0">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative p-2 md:p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm backdrop-blur-md group shrink-0"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Handshake className="relative z-10 h-4 w-4 md:h-7 md:w-7 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <div className="print:hidden relative inline-block truncate">
                  <span className="truncate">Leadership</span>
                  <div className="absolute left-0 -bottom-1 w-12 md:w-16 h-[3px] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </h2>
            </div>

            <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
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
                 colorClass="border-blue-500/5 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400"
               />
            </div>
          </div>
        </MotionWrapper>

        {/* =======================
            VERSÃO MOBILE 
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
                    onClick={() => setSelectedJob(job)}
                    className="relative rounded-xl border bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden cursor-pointer p-4 active:scale-[0.98]"
                  >
                    <div className="absolute top-3 right-3">
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </div>

                    <div className="flex items-start gap-3 pr-6">
                       {/* CompanyLogo agora trata das caixas sozinho! */}
                       <CompanyLogo job={job} />
                       
                       <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight">{job.position}</h3>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 mb-0 flex items-center gap-1">
                            <Building2 className="w-3 h-3 shrink-0" /> {job.company}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-y-0 gap-x-3 text-[8px] text-zinc-500 dark:text-zinc-400 mt-1">
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
            VERSÃO DESKTOP
           ======================= */}
        <div className="hidden lg:block overflow-x-auto overflow-y-visible py-12 pl-4 -ml-4 pr-12 pb-24">
          <div className="flex items-start min-w-max gap-6">
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
                  onClick={() => setSelectedJob(job)}
                  className={`
                    relative flex-shrink-0 cursor-pointer
                    w-[330px] 
                    ${idx > 0 ? "-ml-24" : ""} 
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group
                    hover:z-50 hover:translate-x-23 hover:-translate-y-5 hover:scale-[1.02]
                  `}
                >
                  {/* Badge de Data */}
                  <div className="absolute -top-3 right-6 z-30 px-3 py-1.5 rounded-full flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-emerald-500/30 dark:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Calendar className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-700 dark:text-emerald-100">{job.period}</span>
                  </div>

                  {/* Cartão Estático HUD */}
                  <div className="p-5 relative overflow-hidden rounded-2xl h-[210px] flex flex-col justify-between 
                    bg-zinc-200/10 dark:bg-black/1 backdrop-blur-md
                    border border-zinc-200/40 dark:border-emerald-500/30 
                    transition-all duration-500 
                    group-hover:bg-zinc-100/60 group-hover:dark:bg-black/40 
                    group-hover:backdrop-blur-xl 
                    group-hover:border-emerald-500/70 
                    group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]"
                  >
                    <div className="mb-4 mt-2">
                      {/* TOPO: Logótipo à esquerda | Cargo e Empresa ao lado */}
                      <div className="flex items-start gap-4 mb-4">
                        <CompanyLogo job={job} />
                        
                        <div className="min-w-0 flex-1">
                            <h3 className="text-[17px] font-bold leading-tight text-zinc-900 dark:text-white mb-1 line-clamp-2">
                              {job.position}
                            </h3>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 shrink-0" /> {job.company}
                            </p>
                        </div>
                      </div>
                      
                      {/* LOCALIZAÇÃO ENCOSTADA À DIREITA (com ml-auto) */}
                      <div className="flex justify-end text-xs text-zinc-500 dark:text-zinc-400 mt-5">
                        <div className="flex items-center gap-1.5 bg-white/50 dark:bg-white/5 px-2.5 py-1.5 rounded-md border border-zinc-200/50 dark:border-white/5">
                          <MapPin className="h-3.5 w-3.5" /> <span>{locationDisplay}</span>
                        </div>
                      </div>
                    </div>
                    

                    {/* RODAPÉ */}
                    <div className="pt-3 border-t border-zinc-200/40 dark:border-white/10 flex items-center justify-between text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" /> Explore Record
                      </span>
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-5 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =======================
            MODAL UNIFICADO
           ======================= */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedJob(null)} 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
              />
              
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }} 
                animate={{ scale: 1, y: 0, opacity: 1 }} 
                exit={{ scale: 0.95, y: 20, opacity: 0 }} 
                className="relative w-full max-w-sm md:max-w-3xl z-10 max-h-[95vh] flex flex-col"
              >
                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-0 md:opacity-40 blur-sm animate-pulse pointer-events-none" />
                
                <GlassCard className="flex flex-col w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-emerald-500/40 bg-zinc-50 dark:bg-[#0c0c0e] relative p-5 md:p-6 shadow-2xl text-left">
                  
                  <button 
                    onClick={() => setSelectedJob(null)} 
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-30 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <div className="flex items-center gap-3 mb-3 pr-8">
                    {/* CompanyLogo agora trata das caixas sozinho! */}
                    <CompanyLogo job={selectedJob} isModal={true} />
                    
                    <div>
                      <span className="text-[9px] md:text-[10px] font-mono text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {selectedJob.period}
                      </span>
                      <h3 className="text-sm md:text-xl font-bold text-zinc-900 dark:text-white leading-tight mt-0.5">
                        {selectedJob.position}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3 pb-2 border-b border-zinc-200 dark:border-white/10 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    {selectedJob.company} • {typeof selectedJob.location === 'string' ? selectedJob.location : selectedJob.location.city}
                  </p>

                  <div className="space-y-2 md:space-y-3 overflow-y-auto max-h-[75vh] no-scrollbar pr-2 pb-4">
                    
                    {/* 1. TEXTOS E GRÁFICO */}
                    {selectedJob.achievements.map((ach: any, i: number) => {
                      if (typeof ach === 'object' && ach.type === 'activity_grid') {
                        return renderActivityGrid(ach, true);
                      }
                      if (ach === "__chart__") {
                        return (
                          <div key={i} className="w-full pt-1">
                              <PeerReviewChart company={selectedJob.company} forceAnimation={true} />
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-light leading-tight">
                          <span className="block relative top-[0.35rem] w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
                          <p>{ach}</p>
                        </div>
                      );
                    })}

                    {/* 2. TIMELINE */}
                    {selectedJob.publishersTimeline && (
                      <div className="mt-4 pt-4 border-t border-zinc-200/50 dark:border-white/5">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-800 dark:text-zinc-300 mb-3 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" /> Timeline by Publisher
                        </h4>
                        
                        <div className="flex flex-wrap gap-2.5">
                          {selectedJob.publishersTimeline.map((pub: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2.5 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-2 rounded-lg shadow-sm hover:bg-zinc-50 hover:dark:bg-white/10 transition-colors">
                              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 p-0.5">
                                <img src={pub.logo} alt={pub.name} className="w-full h-full object-contain rounded-full" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 leading-none">{pub.name}</span>
                                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-500 mt-1 leading-none">{pub.period}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}