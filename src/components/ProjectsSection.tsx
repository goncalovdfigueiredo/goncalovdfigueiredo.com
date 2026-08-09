"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, Cpu, Smartphone, Zap, Bluetooth, Microchip, BrainCircuit, Construction, Sparkles, ChevronDown, X } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";

// Tipagem para os projetos
interface Project {
  id: string;
  title: string;
  highlight: string;
  category: string;
  year: string;
  icon: any;
  tags: string[];
}

const myProjects: Project[] = [
  {
    id: "power-mgmt-charger",
    title: "Integrated Power Management & Charging Circuit",
    highlight: "PCB Design & Power Electronics",
    category: "Power Electronics",
    year: "2026",
    icon: Zap,
    tags: ["KiCad", "Buck Converter", "Energy Harvesting", "Battery Charging"]
  },
  {
    id: "vlc-pcb-kicad",
    title: "Full-Duplex VLC Transceiver PCB",
    highlight: "PCB Design & Assembly",
    category: "Hardware Engineering",
    year: "2025",
    icon: Microchip,
    tags: ["KiCad", "Simultaneous Rx/Tx", "Hardware"]
  },
  {
    id: "capacitance-wireless",
    title: "Wireless Capacitive Sensor Node",
    highlight: "Hardware & Firmware",
    category: "Embedded Systems",
    year: "2024",
    icon: Bluetooth,
    tags: ["ATmega328P", "Bluetooth", "Java/Kotlin"]
  },
  {
    id: "planeta-iot",
    title: "Solar-Powered IoT Telemetry Board",
    highlight: "IoT Hardware",
    category: "Embedded Systems",
    year: "2023",
    icon: Zap,
    tags: ["ESP32", "Power Management", "Data Acquisition", "Cloud Integration"]
  },
  {
    id: "smart-tags-crypto",
    title: "Sustainable Anti-Counterfeiting Tags",
    highlight: "Optical Cryptography",
    category: "Security & Applied R&D",
    year: "2023",
    icon: BrainCircuit,
    tags: ["SHA-256", "Reed-Solomon", "Cryptography", "Eco-Materials"]
  },
  {
    id: "vlc-app",
    title: "Real-Time VLC Mobile Decoder",
    highlight: "Android App",
    category: "Mobile Software Stack",
    year: "2022",
    icon: Smartphone,
    tags: ["Java/Kotlin", "Signal Processing", "Cryptography"]
  }
];

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  
  // Estado para o modal mobile (substitui o acordeão longo)
  const [selectedMobileProject, setSelectedMobileProject] = useState<Project | null>(null);

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
          
          {/* COLUNA DA ESQUERDA (Lista Compacta em Desktop / Cartões Minimalistas em Mobile) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex justify-between items-end mb-3 px-1">
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
              const IconComp = project.icon;
              return (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={() => {
                    // Em mobile abre o modal limpo; em desktop controla o hover/preview
                    if (window.innerWidth < 1024) {
                      setSelectedMobileProject(project);
                    }
                  }}
                  className={`
                    relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                    ${hoveredIndex === idx 
                      ? "bg-zinc-100 dark:bg-zinc-900/50 border-emerald-500/40 shadow-sm" 
                      : "bg-transparent border-zinc-200 dark:border-white/5"}
                  `}
                >
                  {/* Barra lateral ativa em Desktop */}
                  <div className={`hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 transition-opacity ${hoveredIndex === idx ? "opacity-100" : "opacity-0"}`} />
                  
                  <div className="p-3.5 sm:p-4 relative z-20">
                    <div className="flex items-center justify-between gap-3">
                      
                      {/* Ícone e Títulos Compactos */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${hoveredIndex === idx ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-100 dark:bg-white/5 text-zinc-400"}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <h3 className={`text-xs sm:text-sm font-bold transition-colors truncate ${hoveredIndex === idx ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{project.category}</span>
                            <span className={`text-[7px] sm:text-[8px] font-mono px-1.5 py-0.2 rounded border ${
                              project.highlight.includes('PCB') 
                                ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' 
                                : 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                            }`}>
                              {project.highlight}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ano e Indicador */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-mono font-semibold transition-colors ${hoveredIndex === idx ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-600"}`}>
                          {project.year}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 lg:hidden" />
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* VISUALIZADOR À DIREITA (Mantido para Desktop / Oculto em Mobile) */}
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
                      <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                        {myProjects[hoveredIndex].year} • Active Module
                      </span>
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

        {/* ====== MODAL MOBILE (COMPACTO, FLUIDO E COM Z-[200] PARA NUNCA FICARescondido) ====== */}
        <AnimatePresence>
          {selectedMobileProject && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMobileProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="relative w-full max-w-sm z-10 max-h-[85vh] flex flex-col"
              >
                <GlassCard className="flex flex-col w-full rounded-2xl overflow-hidden border border-emerald-500/30 bg-zinc-50 dark:bg-[#0c0c0e] relative p-6 shadow-2xl text-left">
                  
                  {/* Botão de Fechar */}
                  <button
                    onClick={() => setSelectedMobileProject(null)}
                    className="absolute top-3 right-3 z-30 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 mb-4 pr-8">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                      <selectedMobileProject.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                        {selectedMobileProject.year} • {selectedMobileProject.category}
                      </span>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">
                        {selectedMobileProject.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-5">
                    <span className="text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/30 text-emerald-500 bg-emerald-500/5 inline-block font-semibold">
                      {selectedMobileProject.highlight}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedMobileProject.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md text-zinc-600 dark:text-zinc-400 bg-white dark:bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Caixa de Under Construction */}
                  <div className="bg-white/60 dark:bg-black/30 rounded-xl p-5 border border-emerald-500/20 text-center">
                    <Construction className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Under Construction</h4>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Detailed documentation for this module is currently being compiled.
                    </p>
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