"use client";

import {
  Handshake,
  Calendar,
  MapPin,
  Briefcase,
  ChartGantt,
  Rocket,
  BrainCircuit,
  Gamepad2,
  BookOpen,
  MessageCircleHeart,
  Globe,
  HeartHandshake
} from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import GanttTimeline from "@/components/GanttTimeline";
import PeerReviewChart from "./PeerReviewChart";
import { LeadershipExperience } from "@/lib/data";

// 1. Mapa de Ícones
const IconMap: any = {
  Rocket,
  BrainCircuit,
  Gamepad2,
  BookOpen,
  MessageCircleHeart,
  Globe, 
  HeartHandshake,
};

// 2. Cores das Tags
const TagColors: Record<string, string> = {
  Event: "text-amber-600 bg-amber-500/10 border-amber-500/20",       
  Resource: "text-blue-600 bg-blue-500/10 border-blue-500/20",       
  Community: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20", 
  Networking: "text-purple-600 bg-purple-500/10 border-purple-500/20",   
};

export default function LeadershipSection() {
  return (
    <section id="leadership" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-[1600px] mx-auto px-6 md:px-8 relative z-10">
        <MotionWrapper>
          {/* Header + Buttons */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-4 backdrop-blur-sm">
                <Handshake className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Leadership
            </h2>

            {/* Button Group */}
            <div className="flex gap-3">
              <a href="#map" className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-900/5 dark:shadow-emerald-900/20">
                <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Global Footprint
              </a>
              <a href="#timeline" className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 text-sm font-medium text-blue-700 dark:text-blue-400 transition-all duration-300 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20">
                <ChartGantt className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Timeline
              </a>
            </div>
          </div>
        </MotionWrapper>

        {/* CARDS CAROUSEL */}
        <div className="
          overflow-x-auto overflow-y-visible py-12 pl-4 
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-500/10 hover:scrollbar-thumb-emerald-500/20
        ">
          <div className="
            flex items-start 
            lg:min-w-max /* Desktop behavior */
            gap-4 /* Mobile spacing (substitui o ml-3 manual) */
          ">
            {LeadershipExperience.map((job, idx) => {
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
                    /* MOBILE: snap-start cola à esquerda, w-[85vw] reduz a largura */
                    w-[85vw] snap-start
                    
                    /* DESKTOP: Mantém o overlap original */
                    md:w-[400px] md:snap-align-none
                    ${idx > 0 ? "md:-ml-32" : ""}
                    
                    transition-all duration-500 ease-out
                    group
                    hover:!ml-4 hover:z-50 hover:scale-105 hover:-translate-y-2
                  `}
                >
                  {/* Data Flutuante */}
                  <div className="absolute -top-3 right-6 z-30 px-3 py-1.5 rounded-full flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-emerald-500/30 dark:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Calendar className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-700 dark:text-emerald-100">
                      {job.period}
                    </span>
                  </div>

                  <GlassCard className="
                    p-6 relative overflow-visible rounded-2xl min-h-[320px] flex flex-col justify-between 
                    bg-zinc-100/90 border border-zinc-200 shadow-xl 
                    dark:bg-[#09090b]/60 dark:backdrop-blur-xl dark:border-emerald-500/10 dark:shadow-2xl dark:shadow-black/50 
                    transition-all duration-500 hover:border-emerald-500/30 dark:hover:bg-emerald-500/10 dark:hover:border-emerald-500/40
                  ">
                    
                    {/* Header do Card */}
                    <div className="mb-6 mt-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2.5 bg-white dark:bg-white/5 rounded-xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-inner shrink-0">
                          <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold leading-tight text-zinc-900 dark:text-white mb-1">{job.position}</h3>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-white/5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{locationDisplay}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content / Achievements */}
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
                              
                              // CASO 1: GRID DE ATIVIDADES
                              if (typeof ach === 'object' && ach.type === 'activity_grid') {
                                return (
                                  <motion.div 
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="grid grid-cols-2 gap-2 pt-2"
                                  >
                                    {ach.items.map((item: any, k: number) => {
                                      const IconComp = IconMap[item.icon] || Rocket;
                                      const tagColor = TagColors[item.tag] || "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";

                                      return (
                                        <div key={k} className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-center hover:bg-emerald-50 dark:hover:bg-emerald-500/20 transition-all duration-300 group/item">
                                          
                                          {/* Ícone */}
                                          <IconComp className="h-5 w-5 mb-2 text-zinc-400 dark:text-zinc-500 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors" />
                                          
                                          {/* Título */}
                                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-tight mb-1.5">{item.label}</span>
                                          
                                          {/* NOVA TAG COLORIDA */}
                                          <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${tagColor}`}>
                                            {item.tag}
                                          </span>

                                        </div>
                                      )
                                    })}
                                  </motion.div>
                                );
                              }

                              // CASO 2: CHART
                              if (ach === "__chart__") {
                                return (
                                  <div key={i} className="w-full pt-2">
                                      <PeerReviewChart company={job.company} />
                                  </div>
                                );
                              }

                              // CASO 3: TEXTO NORMAL
                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.05 * i }}
                                  viewport={{ once: true }}
                                  className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-light"
                                >
                                  <span className="block mt-1.5 w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-500/50 shrink-0" />
                                  <p className="leading-relaxed">{ach}</p>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="absolute bottom-3 right-4 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                            <span className="text-[10px] uppercase tracking-widest font-medium text-emerald-600/60 dark:text-emerald-500/60">
                                Hover to expand
                            </span>
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

        {/* TIMELINE INFERIOR (Mantém-se igual) */}
        <MotionWrapper>
          <div id="timeline" className="mt-20 scroll-mt-24">
             {/* ... conteúdo da timeline ... */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        <ChartGantt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Timeline Overview</h3>
                      <p className="text-sm text-blue-600/80 dark:text-blue-400/60 font-medium">Chronological view of my career path</p>
                    </div>
                </div>
                <a href="#map" className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-900/5 dark:shadow-emerald-900/20">
                  <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Global Footprint
                </a>
            </div>
             <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/5 backdrop-blur-md shadow-lg dark:shadow-2xl dark:shadow-black/40 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-400/30 before:to-transparent">
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
                <div className="p-6 md:p-8 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/40">
                    <GanttTimeline rowHeight={28} barHeight={20} fontSize={13} />
                </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}