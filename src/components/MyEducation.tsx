// src/components/EducationSection.tsx
"use client";

import React, { useState } from "react";
import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import {
  MapPin, GraduationCap, ChartGantt, FileText, ListChecks, ExternalLink,
  BookOpen, Calendar, ChevronDown, ChevronUp, ScrollText, Activity
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";



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

// --- MICRO-COMPONENTE: Entrada de Educação Individual (Lista Direita) ---
const EducationEntry = ({ 
  edu, index, isLast, onHover 
}: { 
  edu: any, index: number, isLast: boolean, onHover: (idx: number | null) => void 
}) => {
  const isCurrent = edu.period.toLowerCase().includes('present') || edu.period.toLowerCase().includes('atual');
  const [isOpen, setIsOpen] = useState(false);
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);
  const curriculumItems = (edu.achievements || []).map((a: string) => a.replace(/^-+\s*/, "").replace(/[;,.]\s*$/, ""));

  return (
    <div onMouseEnter={() => onHover(index)} onMouseLeave={() => onHover(null)}>
      <TimelineItem
        index={index} isLast={isLast} period={edu.period} isCurrent={isCurrent}
        title={
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center">
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider border transition-colors duration-300
                ${isCurrent ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}`}>
                <Calendar className={`w-3 h-3 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
                <span>{edu.period}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 dark:text-zinc-100 text-zinc-800">
               <div className="relative z-10 w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1 shrink-0">
                  <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
               </div>
               <span className="text-base md:text-lg font-bold leading-tight">{edu.degree}</span>
            </div>
          </div>
        }
        subtitle={
          <div className="mt-1 pl-1 w-full dark:text-zinc-100 text-zinc-700 text-left">
             <div className="flex flex-col gap-1 mb-4">
                {edu.url ? (
                  <a href={edu.url} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1 transition-colors w-fit">
                    {edu.institution} <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                ) : (
                  <span className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium w-fit">{edu.institution}</span>
                )}
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-3 h-3 text-emerald-500/70" />
                    <span>{typeof edu.location === 'string' ? edu.location : edu.location.city}</span>
                </div>
             </div>
             <div className="mt-2 text-left">
               <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isOpen ? 'bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-sm' : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 hover:text-blue-500'}`}>
                 <div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /><span>Academic Details</span></div>{isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
               </button>
               <AnimatePresence>
                 {isOpen && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-left">
                     <div className="mt-2 p-4 md:p-5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs md:text-sm text-zinc-600 dark:text-zinc-300">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-1.5 text-left">
                                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80 mb-1"><BookOpen className="w-3.5 h-3.5" /><h5 className="text-[10px] font-bold uppercase tracking-wider">Key Details / Focus:</h5></div>
                                <div className="pl-3 border-l-2 border-blue-500/20 text-left">
                                  <p className="leading-relaxed font-medium dark:text-zinc-200 text-zinc-700">{edu.summary}</p>
                                </div>
                            </div>
                            {curriculumItems.length > 0 && (
                                <div className="space-y-1.5 text-left">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80 mb-1"><ListChecks className="w-3.5 h-3.5" /><h5 className="text-[10px] font-bold uppercase tracking-wider">Relevant Curricular Units:</h5></div>
                                    <ul className="pl-3 border-l-2 border-blue-500/20 space-y-1 text-left">
                                        {curriculumItems.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 font-light leading-snug"><span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 opacity-70" /><span>{item}</span></li>))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {edu.abstract && (
                          <div className="space-y-2 pt-4 border-t border-blue-500/10">
                             <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-90 mb-1"><ScrollText className="w-4 h-4" /><h5 className="text-[11px] font-bold uppercase tracking-wider">Abstract</h5></div>
                             <div className="pl-3 border-l-2 border-blue-500/20 space-y-2">
                                {edu.thesisTitle && <p className="font-bold text-zinc-800 dark:text-white italic text-sm">"{edu.thesisTitle}"</p>}
                                <div className="relative">
                                  <p className={`leading-relaxed font-light text-justify opacity-90 text-xs md:text-sm transition-all duration-500 ${isAbstractExpanded ? "" : "line-clamp-3"}`}>{edu.abstract}</p>
                                  <button onClick={() => setIsAbstractExpanded(!isAbstractExpanded)} className="mt-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:underline">{isAbstractExpanded ? "Read Less" : "Read More"}</button>
                                </div>
                             </div>
                          </div>
                        )}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        }
      />
    </div>
  );
};

// --- COMPONENTE VISUAL: Escadas Isométricas (Chão + 4 Paredes em cada bloco) ---
const IsometricStairs = ({ activeIndex }: { activeIndex: number | null }) => {
  const steps = [
    { label: 'Ph.D.', years: 4, size: 160, color: '#10b981', sideColor: '#10b981', status: 'In Progress', yearsLabel: '2022 - 2026', coords: '38.7367° N, 9.1389° W', ref: '', range: [5, 9] },
    { label: 'M.Sc.', years: 2, size: 210, color: '#3b82f6', sideColor: '#3b82f6', status: 'Completed', yearsLabel: '2020 - 2022', coords: '40.6308° N, 8.6559° W', ref: '', range: [3, 5] },
    { label: 'B.Sc.', years: 3, size: 260, color: '#5D3FD3', sideColor: '#5D3FD3', status: 'Completed', yearsLabel: '2017 - 2020', coords: '40.6308° N, 8.6559° W', ref: '', range: [0, 3] }
  ];

  // Estilo exato para recriar o grid com aspeto de wireframe vibrante
  const gridStyle = "absolute w-[350px] h-[350px] opacity-90 dark:opacity-50 border border-emerald-500/30 bg-[linear-gradient(to_right,#10b98130_1px,transparent_1px),linear-gradient(to_bottom,#10b98130_1px,transparent_1px)] bg-[size:40px_40px] bg-[position:right_top]";

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: "2000px" }}>
      
      {/* --- EFEITO CANTO DE SALA (3 GRIDS) --- */}
      <div className="relative mt-24" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
        
        {/* 1. CHÃO */}
        <div className={gridStyle} style={{ left: '-180px', top: '-180px', transform: "translateZ(-100px)" }} />
        
        {/* 2. PAREDE ESQUERDA (Sobe a partir da borda esquerda do chão) */}
        <div className={gridStyle} style={{ left: '-180px', top: '-180px', transformOrigin: "right", transform: "translateZ(-100px) rotateY(90deg)" }} />

        {/* 3. PAREDE DIREITA/TRASEIRA (Sobe a partir da borda superior do chão) */}
        <div className={gridStyle} style={{ left: '-180px', top: '-180px', transformOrigin: "top", transform: "translateZ(-100px) rotateX(90deg)" }} />


        {/* --- CAMADAS ISOMÉTRICAS --- */}
        {steps.map((step, idx) => {
          const isActive = activeIndex === idx;
          const thickness = step.years * 12; 
          const zBase = (2 - idx) * 50; 
          const yBase = (idx - 1) * 45;

          return (
            <motion.div 
              key={idx}
              animate={{ 
                z: isActive ? zBase + 60 : zBase,
                y: isActive ? yBase - 15 : yBase,
                opacity: activeIndex === null || isActive ? 1 : 0.15
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute transition-all duration-500"
              style={{ 
                width: `${step.size}px`, height: `${step.size}px`,
                transformStyle: "preserve-3d",
                left: `-${step.size / 2}px`, top: `-${step.size / 2}px`,
                zIndex: isActive ? 100 : 30 - idx
              }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="absolute -left-32 top-0 flex flex-col items-end gap-1 pointer-events-none"
                    style={{ transform: "rotateZ(90deg) rotateX(60deg) translateZ(0px)" }}
                  >
                    <div className="bg-white/90 dark:bg-black/80 border border-zinc-200 dark:border-white/10 px-2 py-1 rounded flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                       <Activity className="w-3 h-3 text-emerald-500" />
                       <span className="text-[12px] font-mono dark:text-white text-zinc-900 uppercase tracking-tighter">{step.status}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0  border-2 flex flex-col justify-center items-center overflow-hidden transition-all duration-500 bg-zinc-50 dark:bg-[#0d0d0f]"
                style={{ 
                  borderColor: isActive ? step.color : "rgba(128,128,128,0.2)",
                  transform: `translateZ(${thickness}px)`,
                  boxShadow: isActive ? `0 0 50px ${step.color}30` : "none"
                }}
              >
                 <div className="absolute top-2 left-3 font-mono text-[7px] text-zinc-400 dark:text-white/20 uppercase tracking-tighter">{step.coords}</div>
                 <div className="absolute top-2 right-3 font-mono text-[7px] text-zinc-400 dark:text-white/20">{step.ref}</div>

                 <div style={{ transform: "rotateZ(45deg) rotateX(-15deg)" }} className="flex flex-col items-center mb-6">
                    <GraduationCap className="w-10 h-10 mb-1 transition-colors" style={{ color: isActive ? step.color : "rgba(128,128,128,0.3)" }} />
                    <span className="font-mono text-[14px] font-bold normal-case tracking-tight transition-colors dark:text-white text-zinc-800">
                      {step.label}
                    </span>
                 </div>

                 <div className="absolute bottom-3 w-[80%] flex flex-col items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-wider transition-colors" style={{ color: isActive ? step.color : "rgba(128,128,128,0.4)" }}>
                      {step.yearsLabel}
                    </span>
                    <div className="w-full h-[3px] flex gap-1 justify-center items-center">
                        {[...Array(9)].map((_, i) => {
                          const isHighlighted = i >= step.range[0] && i < step.range[1];
                          return (
                            <div key={i} className="h-full flex-1 rounded-full transition-all duration-500"
                              style={{ backgroundColor: isHighlighted ? (isActive ? step.color : "rgba(128,128,128,0.4)") : "rgba(128,128,128,0.1)" }} />
                          )
                        })}
                    </div>
                 </div>
              </div>

              {/* --- 4 PAREDES LATERAIS (PARALELEPÍPEDO COMPLETO) --- */}
              <div className="absolute transition-colors" style={{ width: `${thickness}px`, height: "100%", backgroundColor: isActive ? step.sideColor : "rgba(161,161,170,0.3)", right: 0, top: 0, transformOrigin: "right", transform: `rotateY(90deg)` }} />
              <div className="absolute transition-colors" style={{ width: "100%", height: `${thickness}px`, backgroundColor: isActive ? step.sideColor : "rgba(161,161,170,0.2)", bottom: 0, left: 0, transformOrigin: "bottom", transform: `rotateX(-90deg)`, filter: "brightness(0.8)" }} />
              <div className="absolute transition-colors" style={{ width: `${thickness}px`, height: "100%", backgroundColor: isActive ? step.sideColor : "rgba(161,161,170,0.3)", left: 0, top: 0, transformOrigin: "left", transform: `rotateY(-90deg)`, filter: "brightness(0.7)" }} />
              <div className="absolute transition-colors" style={{ width: "100%", height: `${thickness}px`, backgroundColor: isActive ? step.sideColor : "rgba(161,161,170,0.2)", top: 0, left: 0, transformOrigin: "top", transform: `rotateX(90deg)`, filter: "brightness(0.6)" }} />

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default function EducationSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="education" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-8xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm shadow-sm text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              Education
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:flex lg:col-span-5 sticky top-32 justify-center h-[500px]">
            <IsometricStairs activeIndex={activeIndex} />
          </div>
          <div className="lg:col-span-7 space-y-4 md:space-y-8 lg:pl-12 xl:pl-20">
            {education.map((edu, index) => (
              <EducationEntry key={index} edu={edu} index={index} isLast={index === education.length - 1} onHover={setActiveIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}