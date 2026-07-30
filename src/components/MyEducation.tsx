// src/components/EducationSection.tsx 
"use client"; 

import React, { useState, useRef, useEffect, useCallback } from "react"; 
import { education } from "@/lib/data"; 
import TimelineItem from "./TimelineItem"; 
import { MapPin, GraduationCap, ChartGantt, FileText, ListChecks, ExternalLink, BookOpen, Calendar, ChevronDown, ChevronUp, ScrollText } from "lucide-react"; 
import MotionWrapper from "./MotionWrapper"; 
import { motion, AnimatePresence } from "framer-motion"; 

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
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: 0.95 }} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden md:block" > 
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

// --- MICRO-COMPONENTE: Entrada de Educação Individual (Lista Direita) --- 
const EducationEntry = ({ edu, index, isLast, onHover }: { edu: any, index: number, isLast: boolean, onHover: (idx: number | null) => void }) => { 
  const isCurrent = edu.period.toLowerCase().includes('present') || edu.period.toLowerCase().includes('atual'); 
  const [isOpen, setIsOpen] = useState(false); 
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false); 
  const curriculumItems = (edu.achievements || []).map((a: string) => a.replace(/^-+\s*/, "").replace(/[;,.]\s*$/, "")); 
  
  const entryRef = useRef<HTMLDivElement>(null); 
  
  useEffect(() => { 
    if (isOpen && entryRef.current) { 
      setTimeout(() => { 
        entryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); 
      }, 300); 
    } 
  }, [isOpen]); 

  return ( 
    <div ref={entryRef} onMouseEnter={() => onHover(index)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(index)} 
         onBlur={() => onHover(null)} tabIndex={0} 
         className="outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl transition-shadow" > 
      <TimelineItem index={index} isLast={isLast} period={edu.period} isCurrent={isCurrent} title={ 
        <div className="flex flex-col gap-2 text-left"> 
          <div className="flex items-center"> 
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider border transition-colors duration-300 ${isCurrent ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}`}> 
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
      } subtitle={ 
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
            <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isOpen ? 'bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-sm' : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 hover:text-blue-500'}`} > 
              <div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /><span>Academic Details</span></div> 
              {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} 
            </button> 
            <AnimatePresence> 
              {isOpen && ( 
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden text-left" > 
                  <div className="mt-2 p-4 md:p-5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs md:text-sm text-zinc-600 dark:text-zinc-300"> 
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> 
                      <div className="space-y-1.5 text-left"> 
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80 mb-1"> 
                          <BookOpen className="w-3.5 h-3.5" /> 
                          <h5 className="text-[10px] font-bold uppercase tracking-wider">Key Details / Focus:</h5> 
                        </div> 
                        <div className="pl-3 border-l-2 border-blue-500/20 text-left"> 
                          <p className="leading-relaxed font-medium dark:text-zinc-200 text-zinc-700">{edu.summary}</p> 
                        </div> 
                      </div> 
                      {curriculumItems.length > 0 && ( 
                        <div className="space-y-1.5 text-left"> 
                          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80 mb-1"> 
                            <ListChecks className="w-3.5 h-3.5" /> 
                            <h5 className="text-[10px] font-bold uppercase tracking-wider">Relevant Curricular Units:</h5> 
                          </div> 
                          <ul className="pl-3 border-l-2 border-blue-500/20 space-y-1 text-left"> 
                            {curriculumItems.map((item: string, i: number) => ( 
                              <li key={i} className="flex items-start gap-2 font-light leading-snug"> 
                                <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 opacity-70" /> 
                                <span>{item}</span> 
                              </li> 
                            ))} 
                          </ul> 
                        </div> 
                      )} 
                    </div> 
                    {edu.abstract && ( 
                      <div className="space-y-2 pt-4 border-t border-blue-500/10"> 
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-90 mb-1"> 
                          <ScrollText className="w-4 h-4" /> 
                          <h5 className="text-[11px] font-bold uppercase tracking-wider">Abstract</h5> 
                        </div> 
                        <div className="pl-3 border-l-2 border-blue-500/20 space-y-2"> 
                          {edu.thesisTitle && <p className="font-bold text-zinc-800 dark:text-white italic text-sm">"{edu.thesisTitle}"</p>} 
                          <div className="relative"> 
                            <p className={`leading-relaxed font-light text-justify opacity-90 text-xs md:text-sm transition-all duration-500 ${isAbstractExpanded ? "" : "line-clamp-3"}`}> 
                              {edu.abstract} 
                            </p> 
                            <button onClick={() => setIsAbstractExpanded(!isAbstractExpanded)} className="mt-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:underline"> 
                              {isAbstractExpanded ? "Read Less" : "Read More"} 
                            </button> 
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
      } /> 
    </div> 
  ); 
}; 

// --- COMPONENTE VISUAL PREMIUM: Academic Orbit --- 
const AcademicOrbit = ({ activeIndex }: { activeIndex: number | null }) => { 
  const rings = Array.from({ length: 9 }).map((_, i) => {
    let isMilestone = false;
    let eduIndex: number | null = null;
    let color = '#71717a'; 
    let label = '';
    let yearsLabel = '';
    let range = [0, 0];
    let orbSize = 6; 
    let initialRotation = (i * 73) % 360; 
    let direction = i % 2 === 0 ? 1 : -1; 
    
    // Orbita 3 (B.Sc.)
    if (i === 2) { isMilestone = true; eduIndex = 2; color = '#a855f7'; label = 'B.Sc.'; orbSize = 10; yearsLabel = '2017 - 2020'; range = [0, 3]; }
    // Orbita 5 (M.Sc.)
    if (i === 4) { isMilestone = true; eduIndex = 1; color = '#3b82f6'; label = 'M.Sc.'; orbSize = 8; yearsLabel = '2020 - 2022'; range = [3, 5]; }
    // Orbita 9 (Ph.D.)
    if (i === 8) { isMilestone = true; eduIndex = 0; color = '#10b981'; label = 'Ph.D.'; orbSize = 14; yearsLabel = '2022 - 2026'; range = [5, 9]; }

    return {
      id: i + 1,
      size: 130 + (i * 35),
      isMilestone,
      eduIndex,
      color,
      label,
      yearsLabel,
      range,
      orbSize,
      initialRotation,
      direction,
      orbitTime: 12 + (i * 3) 
    };
  });

  const activeRing = activeIndex !== null ? rings.find(r => r.eduIndex === activeIndex) : null;

  return ( 
    <div className="relative w-full h-[540px] flex flex-col items-center justify-center scale-95 lg:scale-100 origin-center pointer-events-auto"> 
      
      {/* Background Subtil */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Central Glow */}
      <div 
        className="absolute w-56 h-56 rounded-full blur-[80px] transition-colors duration-1000"
        style={{ backgroundColor: activeRing ? activeRing.color : 'rgba(255,255,255,0.02)' }}
      />

      {/* Core Hub */}
      <div className="absolute z-50 flex flex-col items-center justify-center w-[90px] h-[90px] rounded-full bg-zinc-50 dark:bg-[#0a0a0c] backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden">
         <GraduationCap 
           className={`w-7 h-7 transition-all duration-500 ${activeRing ? '-translate-y-2' : 'translate-y-0'}`} 
           style={{ color: activeRing ? activeRing.color : '#71717a' }} 
         />
         
         <AnimatePresence mode="wait">
           {activeRing && (
             <motion.span 
               key={activeRing.label}
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
               className="absolute bottom-3 font-mono text-[11px] font-bold tracking-widest text-zinc-900 dark:text-white"
             >
               {activeRing.label}
             </motion.span>
           )}
         </AnimatePresence>
      </div>

      {/* Órbitas */}
      {rings.map((ring) => {
        const isActiveMilestone = activeIndex === ring.eduIndex && ring.isMilestone;
        const isDimmed = activeIndex !== null && !isActiveMilestone;

        return (
          <div
            key={ring.id}
            className="absolute rounded-full flex items-center justify-center transition-all duration-700 pointer-events-none"
            style={{
              width: ring.size,
              height: ring.size,
              opacity: isDimmed && ring.isMilestone ? 0.3 : (isDimmed ? 0.1 : 0.6),
              border: isActiveMilestone 
                        ? `1.5px solid ${ring.color}` 
                        : ring.isMilestone 
                          ? `1px solid ${ring.color}` 
                          : `1px solid rgba(128,128,128,0.15)`,
              boxShadow: isActiveMilestone ? `inset 0 0 20px ${ring.color}30, 0 0 20px ${ring.color}30` : 'none',
              transform: `rotate(${ring.initialRotation}deg)`
            }}
          >
            <motion.div
              animate={{ rotate: ring.direction === 1 ? 360 : -360 }}
              transition={{ duration: isActiveMilestone ? ring.orbitTime * 0.25 : ring.orbitTime, repeat: Infinity, ease: "linear" }}
              className="w-full h-full absolute rounded-full flex items-start justify-center"
            >
              {ring.isMilestone ? (
                <div 
                  className="rounded-full transition-all duration-500"
                  style={{ 
                    width: `${ring.orbSize}px`,
                    height: `${ring.orbSize}px`,
                    marginTop: `-${ring.orbSize / 2}px`, 
                    backgroundColor: ring.color, 
                    boxShadow: isActiveMilestone ? `0 0 15px ${ring.color}, 0 0 30px ${ring.color}` : 'none',
                    opacity: isActiveMilestone ? 1 : 0.6,
                    transform: isActiveMilestone ? 'scale(1.4)' : 'scale(1)'
                  }} 
                />
              ) : (
                <div className="w-1.5 h-1.5 -mt-[3px] rounded-full bg-zinc-400 dark:bg-zinc-500 opacity-50" />
              )}
            </motion.div>
          </div>
        )
      })}

      {/* BARRA DE PROGRESSO E ANOS */}
      <div className="absolute bottom-6 flex flex-col items-center gap-3 w-full max-w-[260px] z-50">
         <AnimatePresence mode="wait">
            {activeRing ? (
              <motion.span 
                key={activeRing.yearsLabel}
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="font-mono text-xs font-bold tracking-widest"
                style={{ color: activeRing.color }}
              >
                {activeRing.yearsLabel}
              </motion.span>
            ) : (
              <motion.span 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-mono text-xs font-bold tracking-widest text-transparent select-none"
              >
                -
              </motion.span>
            )}
          </AnimatePresence>

          <div className="w-full h-[6px] flex gap-2 justify-center items-center">
            {[...Array(9)].map((_, i) => {
              const isHighlighted = activeRing && i >= activeRing.range[0] && i < activeRing.range[1];
              const bgColor = activeRing 
                ? (isHighlighted ? activeRing.color : "rgba(128,128,128,0.2)")
                : "rgba(128,128,128,0.3)";
              
              return (
                <div 
                  key={i} 
                  className="h-full flex-1 rounded-full transition-all duration-500" 
                  style={{ 
                    backgroundColor: bgColor,
                    boxShadow: isHighlighted ? `0 0 8px ${activeRing.color}80` : 'none'
                  }} 
                />
              )
            })}
          </div>
      </div>
      
    </div>
  );
};


export default function EducationSection() { 
  const [activeIndex, setActiveIndex] = useState<number | null>(null); 
  
  const handleHover = useCallback((idx: number | null) => { 
    setActiveIndex(idx); 
  }, []); 

  return ( 
    <section id="education" className="py-16 md:py-20 relative overflow-hidden"> 
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" /> 
      <div className="container max-w-8xl mx-auto px-5 md:px-8 relative z-10"> 
        <MotionWrapper> 
          <div className="mb-8 lg:mb-16 flex flex-col md:flex-row items-center justify-between gap-6"> 
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white"> 
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm shadow-sm text-emerald-600 dark:text-emerald-400"> 
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8" /> 
              </div> 
              Education 
            </h2> 
            <div className="flex gap-2 w-full md:w-auto"> 
              <NavButtonWithTooltip href="#map" icon={MapPin} text="Global Footprint" tooltip="Interactive map of my research, conferences and academic reach" colorClass="border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" /> 
              <NavButtonWithTooltip href="#timeline" icon={ChartGantt} text="Timeline" tooltip="Visual roadmap of my academic and leadership career since 2008" colorClass="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400" /> 
            </div> 
          </div> 
        </MotionWrapper> 

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-start"> 
          {/* Oculto no telemóvel (hidden), visível e com sticky correto apenas em desktop (lg:flex) */}
          <div className="hidden lg:flex lg:col-span-5 relative lg:sticky lg:top-32 justify-center h-[540px] z-0"> 
            <AcademicOrbit activeIndex={activeIndex} /> 
          </div> 

          <div className="lg:col-span-7 space-y-4 md:space-y-8 lg:pl-12 xl:pl-20 relative z-10"> 
            {education.map((edu, index) => ( 
              <EducationEntry key={index} edu={edu} index={index} isLast={index === education.length - 1} onHover={handleHover} /> 
            ))} 
          </div> 
        </div> 
      </div> 
    </section> 
  ); 
}