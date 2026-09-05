"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, Cpu, Smartphone, Zap, Bluetooth, Microchip, BrainCircuit, Construction, Sparkles, ChevronDown, X, Lock } from "lucide-react";
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
  isRestricted?: boolean; 
  content?: {
    image?: string;
    image2?: string;
    layout?: "stacked" | "side-by-side"; 
    summary: string;
    specs: string[];
  };
}

// Dados dos projetos atualizados
const myProjects: Project[] = [
  {
    id: "power-mgmt-charger",
    title: "Integrated Power Management & Charging Circuit",
    highlight: "PCB Design & Power Electronics",
    category: "Power Electronics",
    year: "2026",
    icon: Zap,
    tags: ["KiCad", "Buck Converter", "Energy Harvesting", "Battery Charging"],
  },
  {
    id: "vlc-pcb-kicad",
    title: "Full-Duplex VLC Transceiver PCB",
    highlight: "PCB Design & Assembly",
    category: "Hardware Engineering",
    year: "2025",
    icon: Microchip,
    tags: ["KiCad", "Simultaneous Rx/Tx", "Hardware"],
    isRestricted: true,
    content: {
      image: "/FigProj3.png",
      layout: "side-by-side", 
      summary: "Hardware design of a Full-Duplex VLC Transceiver featuring independent transmitter and receiver modules.",
      specs: [
        "Transmitter built with a TLV9101IDBVR Op-Amp and AO3400A N-Channel MOSFET.",
        "Receiver incorporates a Photodiode amplified by a TLV9101IDBVR Op-Amp.",
        "PCB layout, schematic capture, and routing executed in KiCad."
      ]
    }
  },
  {
    id: "capacitance-wireless",
    title: "Wireless Capacitive Sensor & Android App",
    highlight: "Hardware, Firmware & Android App",
    category: "Embedded Systems",
    year: "2024",
    icon: Bluetooth,
    tags: ["ATmega328P", "Bluetooth", "Android (Java/Kotlin)"],
    isRestricted: true,
    content: {
      image: "/FigProj5.png",
      image2: "/FigProj4.png",
      layout: "stacked",
      summary: "Wireless data acquisition node and Android application ('CapacitApp') developed to interface with flexible poly(glycerol sebacate) (PGS) capacitive pressure sensors for continuous respiratory monitoring.",
      specs: [
        "Hardware node designed with an ATmega328P microcontroller and an HC-05 Bluetooth module.",
        "Android app processes real-time capacitance data to estimate thoracic volume changes.",
        "Clinical validation in 38 subjects showed high correlation (R² > 0.91) against airflow transducers.",
        "System enables continuous assessment with Mean Absolute Errors (MAE) as low as 0.100 L."
      ]
    }
  },
  {
    id: "planeta-iot",
    title: "Solar-Powered IoT Telemetry Board",
    highlight: "IoT Hardware",
    category: "Embedded Systems",
    year: "2023",
    icon: Zap,
    tags: ["ESP32", "Power Management", "Data Acquisition", "Cloud Integration"],
  },
  {
    id: "smart-tags-crypto",
    title: "Sustainable Anti-Counterfeiting Tags",
    highlight: "Optical Cryptography",
    category: "Security & Applied R&D",
    year: "2023",
    icon: BrainCircuit,
    tags: ["SHA-256", "Reed-Solomon", "Cryptography", "Eco-Materials"],
    isRestricted: true,
    content: {
      image: "/FigProj2.png", 
      layout: "stacked",
      summary: "Anti-counterfeiting labels based on serigraphic varnish mixed with cork and sand to generate unique physical random patterns. Authentication is achieved through a pipeline combining Perceptual Hashing (Phash), Reed-Solomon error correction, and SHA-256.",
      specs: [
        "Evaluated Type-II DCT, DHA, and Phash processing methodologies.",
        "Achieved 100% Precision, Recall, Accuracy, and F1 Score.",
        "Zero probability of false positives or false negatives (Reliability: 1.000).",
        "Maintains a low computational requirement while ensuring high security."
      ]
    }
  },
  {
    id: "vlc-app",
    title: "Real-Time VLC Mobile Decoder",
    highlight: "Android App",
    category: "Mobile Software Stack",
    year: "2022",
    icon: Smartphone,
    tags: ["Java/Kotlin", "Signal Processing", "Cryptography"],
    isRestricted: true, 
    content: {
      image: "/FigProj1.png", 
      layout: "stacked",
      summary: "Android application capable of detecting and decoding optical signals via smartphone camera, utilizing a 3D hyperchaotic map (sine ICMIC).",
      specs: [
        "Tested at 1m distance with 2 baud transmission rate.",
        "Symbol error rate (SER) of 0.02 at 22 µW optical power.",
        "Decryption parameter accuracy required within 10^-15."
      ]
    }
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
                  <span>MODULE // 03_DEPLOY</span>
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
              <span>Developing integrated solutions across hardware design, embedded systems, and mobile software architecture.</span>
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
                <span>Project_Log: {myProjects.length.toString().padStart(2, '0')}</span>
              </span>
              <div className="flex items-center gap-1.5 opacity-70">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">
                  <span>Technical Selection</span>
                </span>
              </div>
            </div>

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
                    {isActive && (
                      <motion.div
                        layoutId="project-hover-bg"
                        className="absolute inset-0 bg-white dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 rounded-xl shadow-sm hidden lg:block"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    
                    <div className={`absolute inset-0 bg-zinc-50/50 dark:bg-white/5 rounded-xl border border-zinc-200/50 dark:border-white/5 lg:hidden ${isActive ? 'opacity-100' : 'opacity-0'}`} />

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
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <h3 className={`text-xs sm:text-sm font-bold transition-colors duration-300 truncate ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                            <span>{project.title}</span>
                          </h3>
                          <div className="flex items-center">
                            <span className={`text-[8px] font-mono px-1.5 py-[2px] rounded border transition-colors duration-300 ${
                              project.highlight.includes('PCB') 
                                ? (isActive ? 'border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10' : 'border-blue-500/20 text-blue-500/70 bg-transparent') 
                                : (isActive ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' : 'border-emerald-500/20 text-emerald-500/70 bg-transparent')
                            }`}>
                              <span>{project.highlight}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-mono font-semibold transition-colors duration-300 ${isActive ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-600"}`}>
                          <span>{project.year}</span>
                        </span>
                        {project.isRestricted && <Lock className={`w-3 h-3 ${isActive ? 'text-emerald-500' : 'text-zinc-400'}`} />}
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
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(4px)", scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative z-30 flex flex-col h-full"
                  >
                    
                    {/* NOVO CABEÇALHO: Layout flex-col com as Tags por baixo do Título */}
                    <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-zinc-200 dark:border-white/5 shrink-0">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{myProjects[hoveredIndex].year} • {myProjects[hoveredIndex].category}</span>
                        </span>
                        <h4 className="text-xl xl:text-2xl font-bold text-zinc-900 dark:text-white leading-tight pr-4">
                          <span>{myProjects[hoveredIndex].title}</span>
                        </h4>
                      </div>
                      
                      {/* TAGS EM AZUL POR BAIXO DO TÍTULO */}
                      <div className="flex gap-2 flex-wrap justify-start">
                        {myProjects[hoveredIndex].tags.map(tag => (
                          <span key={tag} className="text-[9px] font-mono border border-blue-500/30 dark:border-blue-400/30 px-2.5 py-1 rounded-md text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-400/5 backdrop-blur-sm">
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative flex-1 flex flex-col overflow-y-auto custom-scrollbar pr-2 pb-2 mt-1">
                      
                      {myProjects[hoveredIndex].content ? (
                        
                        /* ============================================================== */
                        /* BORDA "BOLINHA + RASTO"                                        */
                        /* ============================================================== */
                        <div className="relative flex-1 rounded-[20px] overflow-hidden p-[4px] shrink-0 bg-zinc-200/50 dark:bg-white/5">
                          
                          {/* 1. Glow da Bolinha */}
                          <div className="absolute top-1/2 left-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_70%,rgba(16,185,129,0.8)_95%,#6ee7b7_100%)] blur-[8px]" />

                          {/* 2. O Rasto e o Core físico da luz */}
                          <div className="absolute top-1/2 left-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_80%,rgba(16,185,129,1)_98%,#a7f3d0_99%,#ffffff_100%)]" />

                          {/* 3. O Cartão Branco Real do Conteúdo */}
                          <div className="relative z-10 h-full w-full rounded-2xl bg-white p-5 lg:p-6 overflow-hidden">
                            
                            {/* CADEADO NÍTIDO FLUTUANTE */}
                            {myProjects[hoveredIndex].isRestricted && (
                              <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                                <div className="relative flex items-center justify-center p-4 rounded-full bg-zinc-900 dark:bg-[#0a0a0c] border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-50" />
                                  <Lock className="relative z-10 w-8 h-8 text-emerald-400" />
                                </div>
                              </div>
                            )}

                            {/* CONTEÚDO (Imagem + Texto) */}
                            {(() => {
                              const contentLayout = myProjects[hoveredIndex].content!.layout || "stacked";
                              const isRestrictedClass = myProjects[hoveredIndex].isRestricted ? 'blur-[4px] opacity-50 select-none pointer-events-none' : '';
                              const hasImages = !!myProjects[hoveredIndex].content!.image || !!myProjects[hoveredIndex].content!.image2;
                              
                              return (
                                <div className={`flex ${contentLayout === 'side-by-side' ? 'flex-col xl:flex-row items-stretch' : 'flex-col'} gap-6 h-full ${isRestrictedClass}`}>
                                  
                                  {hasImages && (
                                    <div className={`${contentLayout === 'side-by-side' ? 'w-full xl:w-1/2 flex flex-col gap-3 min-h-[160px]' : 'w-full h-40 xl:h-48 shrink-0 flex flex-row gap-3'} mb-2`}>
                                      
                                      {myProjects[hoveredIndex].content!.image && (
                                        <div className="flex-1 flex items-center justify-center rounded-xl overflow-hidden border border-zinc-200/50 dark:border-white/5 bg-white">
                                          <img 
                                            src={myProjects[hoveredIndex].content!.image} 
                                            alt="Project Preview 1" 
                                            className="max-w-full max-h-full object-contain p-2" 
                                          />
                                        </div>
                                      )}

                                      {myProjects[hoveredIndex].content!.image2 && (
                                        <div className="flex-1 flex items-center justify-center rounded-xl overflow-hidden border border-zinc-200/50 dark:border-white/5 bg-white">
                                          <img 
                                            src={myProjects[hoveredIndex].content!.image2} 
                                            alt="Project Preview 2" 
                                            className="max-w-full max-h-full object-contain p-2" 
                                          />
                                        </div>
                                      )}

                                    </div>
                                  )}

                                  <div className={`flex flex-col flex-1 ${contentLayout === 'side-by-side' ? 'justify-center' : ''}`}>
                                    <p className="text-sm text-zinc-700 leading-relaxed font-medium mb-4">
                                      <span>{myProjects[hoveredIndex].content!.summary}</span>
                                    </p>

                                    <div className={`space-y-3 ${contentLayout === 'side-by-side' ? '' : 'mt-auto'}`}>
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Technical Specs:</h5>
                                      <ul className={`grid grid-cols-1 ${contentLayout === 'side-by-side' ? 'xl:grid-cols-1' : 'xl:grid-cols-2'} gap-3`}>
                                        {myProjects[hoveredIndex].content!.specs.map((spec, i) => (
                                          <li key={i} className="flex items-start gap-2.5 text-[11px] xl:text-xs text-zinc-600 leading-snug">
                                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-500/60 shrink-0" />
                                            <span>{spec}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                      ) : (
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
                      )}
                      
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>

        </div>

        {/* ====== MODAL MOBILE ====== */}
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
                      <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <span>{selectedMobileProject.year} • {selectedMobileProject.category}</span>
                        {selectedMobileProject.isRestricted && <Lock className="w-2.5 h-2.5 text-emerald-500" />}
                      </span>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight mt-0.5">
                        <span>{selectedMobileProject.title}</span>
                      </h3>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center">
                    <span className="text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/30 text-emerald-500 bg-emerald-500/5 inline-block font-semibold">
                      <span>{selectedMobileProject.highlight}</span>
                    </span>
                  </div>

                  {/* TAGS EM AZUL NO MOBILE */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedMobileProject.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono border border-blue-500/30 dark:border-blue-400/30 px-2 py-1 rounded-md text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-400/5">
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <div className="relative overflow-y-auto custom-scrollbar max-h-[40vh] pr-2 pt-1">
                    
                    {selectedMobileProject.content ? (
                      
                      <div className="relative rounded-[20px] overflow-hidden p-[4px] mb-2 shrink-0 bg-zinc-200/50 dark:bg-white/5">
                        
                        <div className="absolute top-1/2 left-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_70%,rgba(16,185,129,0.8)_95%,#6ee7b7_100%)] blur-[8px]" />
                        
                        <div className="absolute top-1/2 left-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_80%,rgba(16,185,129,1)_98%,#a7f3d0_99%,#ffffff_100%)]" />

                        <div className="relative z-10 h-full w-full bg-white rounded-2xl p-5 overflow-hidden">
                          
                          {selectedMobileProject.isRestricted && (
                            <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                              <div className="relative flex items-center justify-center p-3 rounded-full bg-zinc-900 dark:bg-[#0a0a0c] border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-50" />
                                <Lock className="relative z-10 w-6 h-6 text-emerald-400" />
                              </div>
                            </div>
                          )}

                          <div className={`flex flex-col gap-4 pb-2 ${selectedMobileProject.isRestricted ? 'blur-[3.5px] opacity-50 select-none pointer-events-none' : ''}`}>
                            
                            {(selectedMobileProject.content.image || selectedMobileProject.content.image2) && (
                              <div className="w-full shrink-0 flex flex-col gap-3 mb-2">
                                {selectedMobileProject.content.image && (
                                  <div className="w-full h-32 flex items-center justify-center rounded-xl overflow-hidden border border-zinc-200/50 dark:border-white/5 bg-white">
                                    <img 
                                      src={selectedMobileProject.content.image} 
                                      alt="Project Preview 1" 
                                      className="max-w-full max-h-full object-contain p-2" 
                                    />
                                  </div>
                                )}
                                {selectedMobileProject.content.image2 && (
                                  <div className="w-full h-32 flex items-center justify-center rounded-xl overflow-hidden border border-zinc-200/50 dark:border-white/5 bg-white">
                                    <img 
                                      src={selectedMobileProject.content.image2} 
                                      alt="Project Preview 2" 
                                      className="max-w-full max-h-full object-contain p-2" 
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                              <span>{selectedMobileProject.content.summary}</span>
                            </p>
                            <ul className="space-y-2">
                              {selectedMobileProject.content.specs.map((spec, i) => (
                                <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-600 leading-snug">
                                  <span className="w-1 h-1 mt-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/60 dark:bg-black/30 rounded-xl p-5 border border-emerald-500/20 text-center">
                        <Construction className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1"><span>Under Construction</span></h4>
                        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          <span>Detailed documentation for this module is currently being compiled.</span>
                        </p>
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