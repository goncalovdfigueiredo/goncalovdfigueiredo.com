// src/components/EducationSection.tsx
"use client";

import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import {
  MapPin, GraduationCap, BarChart3, FileText, ListChecks, ExternalLink,
  BookOpen, Calendar, ChevronDown, ChevronUp, ScrollText
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// --- MICRO-COMPONENTE: Entrada de Educação Individual ---
const EducationEntry = ({ edu, index, isLast }: { edu: any, index: number, isLast: boolean }) => {
  const isCurrent = edu.period.toLowerCase().includes('present') || edu.period.toLowerCase().includes('atual');
  
  // Estado para abrir o cartão principal "Academic Details"
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  // Estado para expandir o texto do Abstract (Read More)
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);

  // Limpeza das curricular units
  const curriculumItems = (edu.achievements || [])
    .map((a: string) => a.replace(/^-+\s*/, "").replace(/[;,.]\s*$/, ""));

  return (
    <TimelineItem
      index={index}
      isLast={isLast}
      period={edu.period}
      isCurrent={isCurrent}
      
      // TÍTULO (MANTIDO IGUAL)
      title={
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className={`
              flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider border transition-colors duration-300
              ${isCurrent 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'}
            `}>
              <Calendar className={`w-3 h-3 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
              <span>{edu.period}</span>
              {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />}
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative z-10 w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1 shrink-0">
                <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
             </div>
             <span className="text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
               {edu.degree}
             </span>
          </div>
        </div>
      }

      subtitle={
        <div className="mt-1 pl-1 w-full">
           {/* INSTITUIÇÃO E LOCAL (MANTIDO IGUAL) */}
           <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                 {edu.url ? (
                   <a href={edu.url} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1 transition-colors">
                     {edu.institution} <ExternalLink className="w-3 h-3 opacity-50" />
                   </a>
                 ) : (
                   <span className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium">
                     {edu.institution}
                   </span>
                 )}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="w-3 h-3 text-emerald-500/70" />
                  <span>{typeof edu.location === 'string' ? edu.location : edu.location.city}</span>
              </div>
           </div>

           {/* BOTÃO DE DETALHES */}
           <div className="mt-2">
             <button
               onClick={toggleOpen}
               className={`
                 flex items-center justify-between w-full py-2.5 px-4 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300
                 ${isOpen 
                   ? 'bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                   : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 hover:bg-blue-500/5 hover:border-blue-500/20 hover:text-blue-500'}
               `}
             >
               <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> 
                  <span>Academic Details</span>
               </div>
               {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
             </button>

             <AnimatePresence>
               {isOpen && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="mt-2 p-4 md:p-5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs md:text-sm text-zinc-600 dark:text-zinc-300">
                      
                      {/* --- PARTE 1: Resumo e Cadeiras (Layout lado a lado) --- */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                          
                          {/* Coluna Esquerda: Summary (Texto curto) */}
                          <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80 mb-1">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <h5 className="text-[10px] font-bold uppercase tracking-wider">
                                    {/* Usa 'thesisType' se existir, senão usa 'Key Details' */}
                                    {edu.thesisType ? "Key Details / Focus" : "Key Details"}:
                                  </h5>
                              </div>
                              <div className="pl-3 border-l-2 border-blue-500/20">
                                <p className="leading-relaxed font-medium text-zinc-700 dark:text-zinc-200">
                                    {edu.summary}
                                </p>
                              </div>
                          </div>

                          {/* Coluna Direita: Unidades Curriculares */}
                          {curriculumItems.length > 0 && (
                              <div className="space-y-1.5">
                                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-80 mb-1">
                                      <ListChecks className="w-3.5 h-3.5" />
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider">Relevant Curricular Units:</h5>
                                  </div>
                                  <ul className="pl-3 border-l-2 border-blue-500/20 space-y-1">
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

                      {/* --- SEPARADOR --- */}
                      {edu.abstract && <div className="h-px w-full bg-blue-500/10 mb-5" />}

                      {/* --- PARTE 2: Abstract com "Read More" --- */}
                      {/* --- SEPARADOR --- */}
                      {edu.abstract && <div className="h-px w-full bg-blue-500/10 mb-5" />}

                      {/* --- PARTE 2: Abstract com "Read More" --- */}
                      {edu.abstract && (
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 opacity-90 mb-1">
                              <ScrollText className="w-4 h-4" />
                              {/* 👇 ALTERAÇÃO AQUI: Título fixo e limpo */}
                              <h5 className="text-[11px] font-bold uppercase tracking-wider">
                                  Abstract
                              </h5>
                           </div>
                           
                           <div className="pl-3 border-l-2 border-blue-500/20 space-y-2">
                              {/* Título da Tese */}
                              {edu.thesisTitle && (
                                <p className="font-bold text-zinc-800 dark:text-white italic text-sm">
                                    "{edu.thesisTitle}"
                                </p>
                              )}
                              
                              {/* Texto do Abstract com Lógica de Expansão */}
                              <div className="relative">
                                <p className={`leading-relaxed font-light text-justify opacity-90 text-xs md:text-sm transition-all duration-500 ${isAbstractExpanded ? "" : "line-clamp-3"}`}>
                                    {edu.abstract}
                                </p>
                                
                                {/* Botão Read More */}
                                <button 
                                  onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
                                  className="mt-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                                >
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
      }
    />
  );
};

export default function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Education
            </h2>

            <div className="flex gap-2 w-full md:w-auto">
              <a href="#map" className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 transition-all">
                <MapPin className="w-3.5 h-3.5" /> Global Footprint
              </a>
              <a href="#timeline" className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 transition-all">
                <BarChart3 className="w-3.5 h-3.5" /> Timeline
              </a>
            </div>
          </div>
        </MotionWrapper>

        <div className="space-y-4 md:space-y-8">
          {education.map((edu, index) => (
            <EducationEntry 
              key={index} 
              edu={edu} 
              index={index} 
              isLast={index === education.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}