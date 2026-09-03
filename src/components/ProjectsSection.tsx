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
  const [selectedMobileProject, setSelectedMobileProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 md:py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col gap-4">
            
            <div className="flex flex-col gap-1 items-start md:items-start">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">
                  MODULE // 03_DEPLOY
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative p-2.5 md:p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm backdrop-blur-md group"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <BrainCircuit className="relative z-10 h-5 w-5 md:h-7 md:w-7 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                
                <div className="relative inline-block">
                  <span>Projects</span>
                  <div className="absolute left-0 -bottom-1 w-16 h-[3px] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </h2>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
              Developing integrated solutions across hardware design, embedded systems, and mobile software architecture.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          
          {/* ================================================================== */}
          {/* COLUNA DA ESQUERDA (Project Log) */}
          {/* ================================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-1.5 relative">
            <div className="flex justify-between items-end mb-3 px-2">
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

            {/* Container para conter a animação de fundo */}
            <div className="relative flex flex-col gap-1.5" onMouseLeave={() => setHoveredIndex(hoveredIndex)}> 
              {myProjects.map((project, idx) => {
                const isActive = hoveredIndex === idx;
                const IconComp = project.icon;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onClick={() => {
                      if (window.innerWidth < 1024) setSelectedMobileProject(project);
                    }}
                    className="relative rounded-xl transition-colors duration-300 cursor-pointer outline-none"
                  >
                    {/* O SEGREDO DO S-TIER: Sliding Background Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="project-hover-bg"
                        className="absolute inset-0 bg-white dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 rounded-xl shadow-sm hidden lg:block"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    
                    {/* Background fallback para mobile (já que não usa o hover sliding) */}
                    <div className={`absolute inset-0 bg-zinc-50/50 dark:bg-white/5 rounded-xl border border-zinc-200/50 dark:border-white/5 lg:hidden ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Barra lateral indicadora de ativo */}
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? '50%' : '0%', opacity: isActive ? 1 : 0 }}
                      className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-emerald-500 rounded-r-full z-20" 
                    />
                    
                    <div className="p-3.5 sm:p-4 relative z-20 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2.5 rounded-lg shrink-0 transition-colors duration-300 ${isActive ? "bg-emerald-500/10 text-emerald-500 shadow-inner shadow-emerald-500/20" : "bg-zinc-100/50 dark:bg-black/20 text-zinc-400"}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <h3 className={`text-xs sm:text-sm font-bold transition-colors duration-300 truncate ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{project.category}</span>
                            <span className={`text-[7px] sm:text-[8px] font-mono px-1.5 py-[1px] rounded border transition-colors duration-300 ${
                              project.highlight.includes('PCB') 
                                ? (isActive ? 'border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10' : 'border-blue-500/20 text-blue-500/70 bg-transparent') 
                                : (isActive ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' : 'border-emerald-500/20 text-emerald-500/70 bg-transparent')
                            }`}>
                              {project.highlight}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-mono font-semibold transition-colors duration-300 ${isActive ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-600"}`}>
                          {project.year}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 lg:hidden" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================================================================== */}
          {/* VISUALIZADOR À DIREITA (Blueprint Mainframe) */}
          {/* ================================================================== */}
          <div className="hidden lg:block lg:col-span-7 relative h-full">
            <GlassCard className="w-full h-full border border-zinc-200 dark:border-white/10 rounded-3xl p-8 flex flex-col min-h-[500px] shadow-2xl relative overflow-hidden bg-zinc-50/80 dark:bg-[#0c0c0e]/80">
              
              {/* Efeito de Scanner a Laser (Linha que desce e sobe) */}
              <motion.div
                animate={{ top: ["-10%", "110%", "-10%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10 pointer-events-none opacity-50"
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
              
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    // Efeito Blur-Reveal em vez do salto genérico
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(4px)", scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative z-30 flex flex-col h-full"
                  >
                    
                    {/* Cabeçalho do Projeto */}
                    <div className="flex justify-between items-start mb-10 pb-6 border-b border-zinc-200 dark:border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {myProjects[hoveredIndex].year} • Active Blueprint
                        </span>
                        <h4 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                          {myProjects[hoveredIndex].title}
                        </h4>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end max-w-[40%]">
                        {myProjects[hoveredIndex].tags.map(tag => (
                          <span key={tag} className="text-[9px] font-mono border border-zinc-200 dark:border-white/10 px-2.5 py-1 rounded-md text-zinc-600 dark:text-zinc-400 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Conteúdo "Under Construction" Tech-Style */}
                    <div className="relative flex-1 flex flex-col overflow-hidden items-center justify-center">
                      <div className="relative z-50 p-8 rounded-3xl border border-emerald-500/20 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-2xl text-center max-w-sm">
                        <div className="relative w-16 h-16 mx-auto mb-5">
                          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-50" />
                          <div className="relative w-full h-full bg-zinc-100 dark:bg-white/5 border border-emerald-500/30 rounded-full flex items-center justify-center">
                            <Construction className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">Compiling Documentation</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                          Technical specifications, schematics, and project details are currently being structured for deployment.
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                      
                      {/* Falso código estrutural em background */}
                      <div className="absolute inset-0 pt-6 opacity-[0.03] dark:opacity-[0.05] font-mono text-[8px] leading-relaxed text-left pointer-events-none select-none overflow-hidden text-zinc-900 dark:text-white">
                        {`function initPowerMgmt() {
  const vIn = readADC(PIN_VIN);
  const iOut = measureCurrent();
  if (vIn < THRESHOLD_UVLO) {
    system.fault("Undervoltage Lockout");
    return false;
  }
  buckConverter.enable(PWM_FREQ_500K);
  setTargetVoltage(3.3);
  startTelemetryLoop();
}

async function startTelemetryLoop() {
  while(system.isRunning) {
    let telemetry = await sensors.readAll();
    cloud.publish("device/telemetry", telemetry);
    await sleep(1000);
  }
}`}
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>

        </div>

        {/* ====== MODAL MOBILE (MANTIDO INTACTO) ====== */}
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

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedMobileProject.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md text-zinc-600 dark:text-zinc-400 bg-white dark:bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

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