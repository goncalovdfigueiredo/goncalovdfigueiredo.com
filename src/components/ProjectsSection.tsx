"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, ArrowUpRight, Cpu, Smartphone, 
  Zap, Bluetooth, Microchip, 
  BrainCircuit, Construction, Sparkles
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";

// Tipagem para os projetos
interface Project {
  id: string;
  title: string;
  highlight: string; 
  category: string;
  icon: any;
  tags: string[]; // Propriedade restaurada para as etiquetas
}

// DADOS DOS PROJETOS (Com as tags incluídas)
const myProjects: Project[] = [
  {
    id: "vlc-app",
    title: "Secure VLC Decoder",
    highlight: "Android Mobile App",
    category: "Mobile Software Stack",
    icon: Smartphone,
    tags: ["Android Studio", "Java/Kotlin"]
  },
  {
    id: "capacitance-iot",
    title: "Bluetooth Capacitance Logger",
    highlight: "Android Mobile App",
    category: "Industrial IoT",
    icon: Bluetooth,
    tags: ["Android", "Bluetooth LE"]
  },
  {
    id: "vlc-pcb",
    title: "Integrated VLC Transceiver",
    highlight: "PCB Design",
    category: "Hardware Engineering",
    icon: Microchip,
    tags: ["Altium", "VLC Design"]
  },
  {
    id: "energy-harvesting",
    title: "Energy Harvesting PMU",
    highlight: "PCB Design",
    category: "Hardware Engineering",
    icon: Zap,
    tags: ["Power Mgmt", "PCB Design"]
  }
];

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="projects" className="py-20 md:py-24 relative overflow-hidden ">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* CABEÇALHO DA SECÇÃO */}
        <MotionWrapper>
          <div className="mb-12 md:mb-16 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-[-8px]">
              <div className="h-[1px] w-8 bg-emerald-500/50" />
              <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em]">Engineering Portfolio</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <BrainCircuit className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Projects
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-4xl text-sm md:text-lg leading-relaxed ml-1">
              Developing integrated solutions across hardware design, embedded systems, and mobile software architecture.
            </p>
          </div>
        </MotionWrapper>

        {/* PROJETOS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          
          {/* NAVEGAÇÃO À ESQUERDA */}
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

            {myProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`
                  relative p-5 rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden
                  ${hoveredIndex === idx 
                    ? "bg-zinc-100 dark:bg-zinc-900/50 border-emerald-500/40 shadow-[0_10px_30px_-15px_rgba(16,185,129,0.2)]" 
                    : "bg-transparent border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10"}
                `}
              >
                {hoveredIndex === idx && (
                  <motion.div layoutId="active-bar" className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 z-10" />
                )}
                
                <div className="flex items-center gap-4 relative z-20">
                  <div className={`p-2 rounded-lg ${hoveredIndex === idx ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-100 dark:bg-white/5 text-zinc-400"}`}>
                    <project.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-sm font-bold transition-colors ${hoveredIndex === idx ? "text-zinc-900 dark:text-white" : "text-zinc-500"}`}>
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
              </motion.div>
            ))}
          </div>

          {/* VISUALIZADOR À DIREITA (COCKPIT PROTEGIDO) */}
          <div className="lg:col-span-7 relative">
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
                  
                  {/* CABEÇALHO DO COCKPIT (Nítido) */}
                  <div className="flex justify-between items-start mb-10 relative z-30">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Active Module</span>
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {myProjects[hoveredIndex].title}
                      </h4>
                    </div>
                    {/* ETIQUETAS TÉCNICAS (Tags) Restauradas e Nítidas */}
                    <div className="flex gap-2">
                       {myProjects[hoveredIndex].tags.map(tag => (
                         <span key={tag} className="text-[9px] font-mono border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md text-zinc-500 bg-white dark:bg-white/5">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>

                  {/* CONTEÚDO TÉCNICO (Desfocado) */}
                  <div className="relative flex-1 flex flex-col overflow-hidden">
                    <div className="absolute inset-x-0 -inset-y-4 z-40 flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-white/50 dark:bg-[#0c0c0e]/50 backdrop-blur-[10px] rounded-2xl border border-zinc-100 dark:border-white/5" />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative z-50 p-6 rounded-2xl border border-emerald-500/20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl text-center max-w-sm"
                        >
                            <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                <Construction className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Under Construction</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                                I am currently documenting my latest research and engineering projects. This section will be updated very soon with detailed technical documentation.
                            </p>
                        </motion.div>
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