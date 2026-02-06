// src/components/SkillsSection.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { 
  education, 
  workExperience, 
  projects,
  skills 
} from "@/lib/data";
import { 
  Cpu, 
  Terminal, 
  Activity, 
  Zap, 
  Briefcase, 
  GraduationCap, 
  StickyNote,
  CircuitBoard, 
  Monitor,      
  Globe,
  Tag,
  MousePointerClick // Importado para o aviso mobile
} from "lucide-react";

// =========================================================
// 1. HELPER: CATEGORIAS E DADOS
// =========================================================
const subCategories: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "Circuit Design": { label: "Circuit Design", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  "Embedded Systems": { label: "Embedded Systems", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  "Data & Visulatization": { label: "Data & Viz", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  "General": { label: "General Tool", color: "text-zinc-500", bg: "bg-zinc-500/10", border: "border-zinc-500/20" },
};

function getSkillSubCategory(skillName: string) {
  const lower = skillName.toLowerCase();
  if (["kicad", "altium", "ltspice", "quartus", "pcb", "optoelectronic", "fpga", "lSC", "solar"].some(t => lower.includes(t))) return subCategories["Circuit Design"];
  if (["arduino", "android", "verilog", "c/c++", "embedded", "intel"].some(t => lower.includes(t))) return subCategories["Embedded Systems"];
  if (["python", "matlab", "spark", "origin", "data"].some(t => lower.includes(t))) return subCategories["Data & Viz"];
  if (["visual studio", "git", "office", "latex", "java", "kotlin"].some(t => lower.includes(t))) return subCategories["General"];
  return null; 
}

function findSkillUsage(skill: string) {
  const usage: any[] = [];
  const cleanSkill = skill.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "").split("(")[0].trim();
  const safeSkill = cleanSkill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|\\s|\\W)${safeSkill}($|\\s|\\W)`, "i");
  const isMatch = (text: string, tags?: string[]) => {
    if (tags && tags.some(tag => tag.toLowerCase().includes(cleanSkill.toLowerCase()))) return true;
    return regex.test(text || "");
  };

  workExperience.forEach((job) => {
    const tags = (job as any).relatedSkills || [];
    const text = `${job.position} ${job.company} ${job.achievements.join(" ")} ${job.projecttitle?.join(" ")}`;
    if (isMatch(text, tags)) usage.push({ type: "experience", title: job.position, subtitle: job.company, year: job.period.split(" - ")[0] });
  });

  education.forEach((edu) => {
    const tags = (edu as any).relatedSkills || [];
    const text = `${edu.degree} ${(edu as any).thesisTitle} ${(edu as any).abstract} ${(edu as any).summary} ${edu.achievements.join(" ")}`;
    if (isMatch(text, tags)) usage.push({ type: "education", title: edu.degree, subtitle: edu.institution, year: edu.period.split(" - ")[0] });
  });

  projects.forEach((proj) => {
    const tags = (proj as any).relatedSkills || [];
    const text = `${proj.title} ${proj.description.join(" ")}`;
    if (isMatch(text, tags)) usage.push({ type: "project", title: proj.title, subtitle: "Personal Project", year: "Dev" });
  });

  return Array.from(new Set(usage.map(u => JSON.stringify(u)))).map(s => JSON.parse(s)).slice(0, 4);
}

const skillCategories = [
  { id: "core", label: "Core Technical Skills", icon: Zap, color: "emerald", items: skills.coreTechnical },
  { id: "programming", label: "Programming Languages", icon: Terminal, color: "purple", items: skills.programmingLanguages },
  { id: "tools", label: "Tools & Software", icon: Cpu, color: "blue", items: skills.toolsAndSoftware },
  { id: "os", label: "Operating Systems", icon: Monitor, color: "zinc", items: skills.operatingSystems },
  { id: "lang", label: "Languages", icon: Globe, color: "amber", items: skills.languages }
];

// =========================================================
// 2. COMPONENTE REUTILIZÁVEL: A CONSOLA
// =========================================================
const ConsoleWindow = ({ activeSkill, usageData, subCategory }: { activeSkill: string | null, usageData: any[], subCategory: any }) => {
  return (
    <GlassCard className="h-full min-h-[400px] lg:min-h-[550px] border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-[#0c0c0e]/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">
      {/* Console Header */}
      <div className="h-10 bg-zinc-200/50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 flex items-center px-4 justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">CONTEXT_LOG</div>
      </div>

      {/* Console Body */}
      <div className="p-5 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.div
              key={activeSkill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <div className="mb-4 pb-3 border-b border-zinc-200 dark:border-white/5 flex flex-col gap-2">
                <p className="text-[10px] text-zinc-400 font-mono">Querying database for:</p>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white flex items-start gap-2 leading-tight">
                    <Terminal className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="break-words">{activeSkill.split("(")[0]}</span>
                  </h4>
                  {subCategory && (
                    <div className={`self-start flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${subCategory.color} ${subCategory.bg} ${subCategory.border}`}>
                      <Tag className="w-3 h-3" />
                      {subCategory.label}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {usageData.length > 0 ? (
                  usageData.map((item: any, i: number) => (
                    <div key={i} className="group flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 hover:border-emerald-500/30 transition-all">
                      <div className={`mt-1 p-1.5 rounded-md shrink-0 ${item.type === 'experience' ? 'bg-blue-500/10 text-blue-500' : item.type === 'education' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {item.type === 'experience' && <Briefcase className="w-3.5 h-3.5" />}
                        {item.type === 'education' && <GraduationCap className="w-3.5 h-3.5" />}
                        {item.type === 'project' && <StickyNote className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{item.title}</h5>
                          <span className="text-[9px] text-zinc-400 font-mono shrink-0">[{item.year}]</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight line-clamp-2">{item.subtitle}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-lg border border-dashed border-zinc-300 dark:border-white/10 text-center">
                    <p className="text-xs text-zinc-400">Core competence used across general R&D and daily operations.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">System Ready</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">Hover over (or tap) the technical skills to view execution context.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-2 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/20 text-[9px] font-mono text-zinc-400 flex justify-between items-center">
        {activeSkill ? (
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{usageData.length > 0 ? `${usageData.length} REFERENCES FOUND` : "CORE COMPETENCE"}</span>
        ) : (
          <span>STATUS: <span className="text-emerald-500 font-bold">ONLINE</span></span>
        )}
        <span className="animate-pulse">_CURSOR_ACTIVE</span>
      </div>
    </GlassCard>
  );
};

// =========================================================
// 3. COMPONENTE PRINCIPAL
// =========================================================
export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);

  const usageData = useMemo(() => activeSkill ? findSkillUsage(activeSkill) : [], [activeSkill]);
  const subCategory = useMemo(() => activeSkill ? getSkillSubCategory(activeSkill) : null, [activeSkill]);

  useEffect(() => {
    if (!activeSkill || isPinned) return;
    const timer = setTimeout(() => { setActiveSkill(null); }, 5000);
    return () => clearTimeout(timer);
  }, [activeSkill, isPinned]);

  const handleMouseEnter = (skill: string) => { if (!isPinned) setActiveSkill(skill); };
  
  const handleClick = (skill: string) => {
    if (activeSkill === skill && isPinned) {
      setIsPinned(false);
      setActiveSkill(null);
    } else {
      setActiveSkill(skill);
      setIsPinned(true);
    }
  };

  const handleSectionLeave = () => { if (!isPinned) setActiveSkill(null); };

  return (
    <section id="skills" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-5 relative z-10">
        <MotionWrapper>
          <div className="mb-10 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <CircuitBoard className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Skills
            </h2>
            
            {/* DESKTOP STATUS */}
            <div className="hidden md:block text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Running diagnostic... 
            </div>

            {/* MOBILE INSTRUCTION (NOVO) */}
            <div className="md:hidden flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
                <MousePointerClick className="w-3 h-3 animate-pulse text-emerald-500" />
                <span>Tap to analyze</span>
            </div>

          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ESQUERDA: LISTA DE CATEGORIAS */}
          <div className="lg:col-span-7 flex flex-col gap-6" onMouseLeave={handleSectionLeave}>
            {skillCategories.map((cat, idx) => {
              const hasActiveSkillHere = activeSkill && cat.items.includes(activeSkill);

              return (
                <MotionWrapper key={cat.id} delay={idx * 0.1}>
                  <div className="relative group">
                    <div className="flex items-center gap-3 mb-3">
                      <cat.icon className={`w-4 h-4 text-${cat.color}-500`} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{cat.label}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cat.items.map((skill) => {
                        const isActive = activeSkill === skill;
                        const displayName = skill; 

                        return (
                          <button
                            key={skill}
                            onMouseEnter={() => handleMouseEnter(skill)}
                            onClick={() => handleClick(skill)}
                            className={`
                              relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border text-left
                              ${isActive 
                                ? `bg-${cat.color}-500 text-white border-${cat.color}-500 shadow-md scale-105` 
                                : `bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-${cat.color}-500/50 hover:text-${cat.color}-600 dark:hover:text-${cat.color}-400`}
                            `}
                          >
                            {displayName}
                          </button>
                        )
                      })}
                    </div>

                    {/* MOBILE ONLY CONSOLE */}
                    <AnimatePresence>
                      {hasActiveSkillHere && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="lg:hidden w-full overflow-hidden"
                        >
                          <div className="pb-4">
                            <ConsoleWindow 
                                activeSkill={activeSkill} 
                                usageData={usageData} 
                                subCategory={subCategory} 
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </MotionWrapper>
              );
            })}
          </div>

          {/* DIREITA: CONSOLA (APENAS DESKTOP) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="sticky top-24">
               <ConsoleWindow 
                  activeSkill={activeSkill} 
                  usageData={usageData} 
                  subCategory={subCategory} 
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}