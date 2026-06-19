"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, ArrowUpRight, Cpu, Smartphone, 
  Zap, Bluetooth, Microchip, 
  BrainCircuit, Construction, Sparkles, ChevronDown
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";

// Tipagem para os projetos
interface Project {
  id: string;
  title: string;
  highlight: string; 
  category: string;
  icon: any;
  tags: string[];
}

const myProjects: Project[] = [
  {
    id: "vlc-app",
    title: "Real-Time VLC Mobile Decoder",
    highlight: "Android App",
    category: "Mobile Software Stack",
    icon: Smartphone,
    tags: ["Java/Kotlin", "Signal Processing", "Cryptography"]
  },
  {
    id: "planeta-iot",
    title: "Solar-Powered IoT Telemetry Board",
    highlight: "IoT Hardware",
    category: "Embedded Systems",
    icon: Zap,
    tags: ["ESP32", "Power Management", "Data Acquisition", "Cloud Integration"]
  },
  {
    id: "vlc-pcb-kicad",
    title: "Full-Duplex VLC Transceiver PCB",
    highlight: "PCB Design & Assembly",
    category: "Hardware Engineering",
    icon: Microchip,
    tags: ["KiCad", "Simultaneous Rx/Tx", "Hardware"]
  },
  {
    id: "capacitance-wireless",
    title: "Wireless Capacitive Sensor Node",
    highlight: "Hardware & Firmware",
    category: "Embedded Systems",
    icon: Bluetooth,
    tags: ["ATmega328P", "Bluetooth", "Custom Android App"]
  },
  {
    id: "smart-tags-crypto",
    title: "Sustainable Anti-Counterfeiting Tags",
    highlight: "Optical Cryptography",
    category: "Security & Applied R&D",
    icon: BrainCircuit,
    tags: ["SHA-256", "Reed-Solomon", "Cryptography", "Eco-Materials"]
  }
];

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  // Estado para mobile: permite fechar ou abrir o acordeão
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-24 relative overflow-hidden">
      <div className="container max-w-8xl mx-auto px-6 relative z-10">
        
        <MotionWrapper>
        <div className="mb-8 md:mb-12 flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <BrainCircuit className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Projects
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
              Developing integrated solutions across hardware design, embedded systems, and mobile software architecture.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          
          {/* COLUNA DA ESQUERDA (Lista em Desktop / Acordeão em Mobile) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-end mb-4 px-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Project_Log: {myProjects.length.toString().padStart(2, '0')}
                </span>
                <div className="flex items-center gap-1.5 opacity-70">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">
                    Technical Selection
                    </span>
                </div>
            </div>

            {myProjects.map((project, idx) => {
              const isExpanded = mobileExpanded === idx;
              
              return (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                  className={`
                    relative rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden
                    ${hoveredIndex === idx || isExpanded
                      ? "bg-zinc-100 dark:bg-zinc-900/50 border-emerald-500/40 shadow-sm" 
                      : "bg-transparent border-zinc-200 dark:border-white/5"}
                  `}
                >
                  {/* Barra lateral ativa em Desktop */}
                  <div className={`hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 transition-opacity ${hoveredIndex === idx ? "opacity-100" : "opacity-0"}`} />
                  
                  <div className="p-5 relative z-20">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${(hoveredIndex === idx || isExpanded) ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-100 dark:bg-white/5 text-zinc-400"}`}>
                          <project.icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className={`text-sm font-bold transition-colors ${(hoveredIndex === idx || isExpanded) ? "text-zinc-900 dark:text-white" : "text-zinc-500"}`}>
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{project.category}</span>
                              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                                  project.highlight.includes('PCB') 
                                  ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' 
                                  : 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                              }`}>
                                  {project.highlight}
                              </span>
                          </div>
                        </div>
                      </div>
                      {/* Seta indicadora apenas para Mobile */}
                      <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform lg:hidden ${isExpanded ? "rotate-180" : ""}`} />
                    </div>

                    {/* CONTEÚDO EXPANSÍVEL (Apenas visível em Mobile quando aberto) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="lg:hidden mt-6 pt-6 border-t border-zinc-200 dark:border-white/10"
                        >
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                              <span key={tag} className="text-[9px] font-mono border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md text-zinc-500 bg-white dark:bg-white/5">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-6 border border-emerald-500/10 text-center">
                            <Construction className="h-5 w-5 text-emerald-500 mx-auto mb-3" />
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              Detailed documentation under construction.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* VISUALIZADOR À DIREITA (Mantido intacto para Desktop / Escondido em Mobile) */}
          <div className="hidden lg:block lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -10 }}
                  className="w-full bg-zinc-50 dark:bg-[#0c0c0e]/50 border border-zinc-200 dark:border-white/10 rounded-3xl p-8 flex flex-col min-h-[480px] shadow-2xl relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-10 relative z-30">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Active Module</span>
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {myProjects[hoveredIndex].title}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                       {myProjects[hoveredIndex].tags.map(tag => (
                         <span key={tag} className="text-[9px] font-mono border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md text-zinc-500 bg-white dark:bg-white/5">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="relative flex-1 flex flex-col overflow-hidden">
                    <div className="absolute inset-x-0 -inset-y-4 z-40 flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-white/50 dark:bg-[#0c0c0e]/50 backdrop-blur-[10px] rounded-2xl border border-zinc-100 dark:border-white/5" />
                        <div className="relative z-50 p-6 rounded-2xl border border-emerald-500/20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl text-center max-w-sm">
                            <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                <Construction className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Under Construction</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                                I am currently documenting my latest research and engineering projects. This section will be updated very soon with detailed technical documentation.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-1 opacity-20 filter blur-[1px] select-none pointer-events-none">
                        <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse mt-4" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}