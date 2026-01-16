// src/components/SkillsSection.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { 
  skills, 
  education, 
  workExperience, 
  projects 
} from "@/lib/data";
import { 
  CircuitBoard, 
  Cpu, 
  Wrench, 
  Code2, 
  Globe, 
  Monitor, 
  Briefcase,
  GraduationCap,
  StickyNote,
  Search,
  MousePointerClick,
  Layers
} from "lucide-react";

/* =========================================================
   🎨 PALETA DE CORES (Ajustada para ser mais subtil)
   ========================================================= */
const toolGroups: Record<string, { label: string; color: string; dot: string }> = {
  "Circuit Design & Simulation": {
    label: "Circuit Design",
    color: "bg-emerald-50/50 border-emerald-200/50 text-emerald-700 dark:bg-emerald-500/5 dark:border-emerald-500/20 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "Embedded Systems & Software": {
    label: "Embedded Systems",
    color: "bg-blue-50/50 border-blue-200/50 text-blue-700 dark:bg-blue-500/5 dark:border-blue-500/20 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  "Data Analysis & Visualization": {
    label: "Data & Viz",
    color: "bg-amber-50/50 border-amber-200/50 text-amber-700 dark:bg-amber-500/5 dark:border-amber-500/20 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "General Tools": {
    label: "General",
    color: "bg-zinc-50/50 border-zinc-200/50 text-zinc-600 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400",
    dot: "bg-zinc-400",
  },
};

/* =========================================================
   HELPERS
   ========================================================= */
function getToolCategory(toolName: string): string {
  const toolLower = toolName.toLowerCase();
  if (["kicad", "altium designer", "ltspice", "quartus"].some(t => toolLower.includes(t))) return "Circuit Design & Simulation";
  if (["arduino ide", "visual studio code", "android studio"].some(t => toolLower.includes(t))) return "Embedded Systems & Software";
  if (["apache spark", "originlab"].some(t => toolLower.includes(t))) return "Data Analysis & Visualization";
  return "General Tools"; 
}

function findSkillUsage(skill: string) {
  const usage: any[] = [];
  const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|\\s|\\W)${safeSkill}($|\\s|\\W)`, "i");

  const isMatch = (text: string, tags?: string[]) => {
    if (tags && tags.some(tag => tag.toLowerCase() === skill.toLowerCase())) return true;
    return regex.test(text || "");
  };

  workExperience.forEach((job) => {
    const tags = (job as any).relatedSkills || [];
    const text = `${job.position} ${job.company} ${job.achievements.join(" ")} ${job.projecttitle?.join(" ")}`;
    if (isMatch(text, tags)) usage.push({ type: "experience", title: job.position });
  });

  projects.forEach((proj) => {
    const tags = (proj as any).relatedSkills || [];
    const text = `${proj.title} ${proj.description.join(" ")}`;
    if (isMatch(text, tags)) usage.push({ type: "project", title: proj.title });
  });

  education.forEach((edu) => {
    const tags = (edu as any).relatedSkills || [];
    const text = `${edu.degree} ${edu.achievements.join(" ")}`;
    if (isMatch(text, tags)) usage.push({ type: "education", title: edu.degree });
  });

  return Array.from(new Set(usage.map(u => JSON.stringify(u)))).map(s => JSON.parse(s)).slice(0, 7);
}

/* =========================================================
   COMPONENTE PRINCIPAL
   ========================================================= */
export default function SkillsSection() {
  const [hoveredSkills, setHoveredSkills] = useState<Record<string, string | null>>({});
  const [selectedSkills, setSelectedSkills] = useState<Record<string, string | null>>({});

  const handleHover = (category: string, skill: string | null) => {
    setHoveredSkills((prev) => ({ ...prev, [category]: skill }));
  };

  const handleClick = (category: string, skill: string) => {
    setSelectedSkills((prev) => ({ ...prev, [category]: prev[category] === skill ? null : skill }));
  };

  const categories = [
    { id: "core", icon: Cpu, title: "Core Technical Skills", items: skills.coreTechnical, colSpan: "md:col-span-13" },
    { id: "tools", icon: Wrench, title: "Tools & Software", items: skills.toolsAndSoftware, colSpan: "md:col-span-10" },
    { id: "os", icon: Monitor, title: "OS", items: skills.operatingSystems, disableContext: false, colSpan: "md:col-span-3" }, // Simplifiquei titulo OS
    { id: "code", icon: Code2, title: "Programming", items: skills.programmingLanguages, colSpan: "md:col-span-9" }, // Simplifiquei titulo
    { id: "lang", icon: Globe, title: "Languages", items: skills.languages, disableContext: true, colSpan: "md:col-span-4" },
  ];

  return (
    <section id="skills" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
      <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-10 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <CircuitBoard className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Skills
            </h2>
          </div>
        </MotionWrapper>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-13 gap-4 md:gap-6">
          {categories.map((cat, idx) => {
            const activeSkill = hoveredSkills[cat.id] || selectedSkills[cat.id];
            
            return (
              <MotionWrapper key={cat.id} delay={idx * 0.1} className={cat.colSpan}>
                <GlassCard className="group p-0 h-full flex flex-col rounded-xl md:rounded-2xl bg-zinc-50/50 border border-zinc-200 dark:bg-emerald-500/5 dark:border-emerald-500/10 relative overflow-hidden hover:border-emerald-500/30 transition-colors">
                  
                  {/* HEADER + CONTENT */}
                  <div className={`p-5 md:p-6 ${cat.disableContext ? "" : "pb-20 md:pb-24"} relative z-10 flex-grow`}>
                    
                    {/* Título da Categoria */}
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 pb-2 border-b border-zinc-200/50 dark:border-white/5">
                      <cat.icon className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 dark:text-emerald-400 opacity-80" />
                      <h3 className="text-sm md:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight uppercase md:normal-case">
                        {cat.title}
                      </h3>
                    </div>

                    {/* MODO NUVEM (CLOUD) PARA TUDO EM MOBILE */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                      {cat.items.map((item: any, i: number) => (
                        <SkillItem 
                          key={typeof item === "string" ? item : item.name} 
                          item={item} 
                          cat={cat} 
                          i={i} 
                          selectedSkills={selectedSkills} 
                          hoveredSkills={hoveredSkills} 
                          handleClick={handleClick} 
                          handleHover={handleHover}
                          // Em mobile, forceVertical é sempre falso para poupar espaço
                          forceVertical={cat.id === "os" ? "desktop-only" : false} 
                        />
                      ))}
                    </div>

                    {/* LEGENDA (APENAS TOOLS) */}
                    {cat.id === "tools" && (
                      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-zinc-200/50 dark:border-white/5">
                        {/* Mobile: Scroll horizontal / Desktop: Wrap */}
                        <div className="flex overflow-x-auto md:flex-wrap items-center gap-3 md:gap-x-6 md:gap-y-2 pb-1 no-scrollbar">
                          {Object.entries(toolGroups).map(([key, { label, dot }]) => (
                            <div key={key} className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap shrink-0">
                              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                              <span>{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PAINEL INFERIOR (CONTEXT) */}
                  {!(cat as any).disableContext && (
                    <div className="absolute bottom-0 left-0 right-0 h-[60px] md:h-[80px] bg-white/80 dark:bg-[#09090b]/80 border-t border-zinc-200 dark:border-white/5 backdrop-blur-md flex items-center px-4 md:px-6 z-20">
                      <AnimatePresence mode="wait">
                        {activeSkill ? (
                          <UsageDisplay key="usage" skill={activeSkill} />
                        ) : (
                          <DefaultLegend key="legend" />
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                </GlassCard>
              </MotionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SUB-COMPONENTES (OTIMIZADOS MOBILE)
   ========================================================= */

function SkillItem({ item, cat, i, selectedSkills, hoveredSkills, handleClick, handleHover, forceVertical }: any) {
  let name = "";
  let groupKey = undefined;

  if (typeof item === "string") {
      name = item;
      if (cat.id === "tools") {
          const categoryName = getToolCategory(name);
          groupKey = categoryName;
          name = name.split("(")[0].trim();
      }
  } else {
      name = item.name;
      groupKey = item.group;
  }
  
  // Estilos Base (Mais leve e subtil)
  const style = groupKey && toolGroups[groupKey] 
    ? toolGroups[groupKey].color 
    : "bg-white/50 border-zinc-200 text-zinc-600 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400";

  const isSelected = selectedSkills[cat.id] === name;
  const isHovered = hoveredSkills[cat.id] === name;

  return (
    <motion.div
      onClick={cat.disableContext ? undefined : () => handleClick(cat.id, name)}
      onMouseEnter={cat.disableContext ? undefined : () => handleHover(cat.id, name)}
      onMouseLeave={cat.disableContext ? undefined : () => handleHover(cat.id, null)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.02 * i }}
      // Em mobile removemos o hover scale para evitar toques acidentais estranhos
      whileHover={cat.disableContext ? undefined : { y: -2 }}
      className={`
        px-2.5 py-1 md:px-3 md:py-1.5 
        rounded-full md:rounded-md 
        text-[10px] md:text-xs font-medium uppercase md:normal-case tracking-wide md:tracking-normal
        border shadow-sm flex items-center justify-center select-none text-center cursor-pointer transition-all duration-300
        ${style}
        ${isSelected ? "ring-1 ring-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : ""}
        ${!isSelected && isHovered ? "border-emerald-400/50 dark:border-emerald-500/50" : ""}
        ${forceVertical === "desktop-only" ? "w-auto md:w-full" : ""} 
      `}
    >
      {name}
    </motion.div>
  );
}

function UsageDisplay({ skill }: { skill: string }) {
  const usage = useMemo(() => findSkillUsage(skill), [skill]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className="w-full flex flex-col justify-center h-full py-1"
    >
      <div className="flex items-center gap-2 mb-1 shrink-0">
        <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 truncate">
          Used in:
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
      </div>

      {usage.length > 0 ? (
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar mask-gradient-right">
          {usage.map((u, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] md:text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap bg-zinc-100/50 dark:bg-white/5 px-1.5 py-0.5 rounded border border-zinc-200/50 dark:border-white/5">
              {u.type === "experience" && <Briefcase className="h-2.5 w-2.5 text-amber-500 shrink-0" />}
              {u.type === "project" && <StickyNote className="h-2.5 w-2.5 text-blue-500 shrink-0" />}
              {u.type === "education" && <GraduationCap className="h-2.5 w-2.5 text-emerald-500 shrink-0" />}
              <span className="font-medium truncate max-w-[100px] md:max-w-[150px]">{u.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 italic">
          <Search className="h-3 w-3" />
          <span>Core knowledge / General foundation</span>
        </div>
      )}
    </motion.div>
  );
}

function DefaultLegend() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-between w-full text-[10px] md:text-xs text-zinc-400"
    >
      <div className="flex items-center gap-2">
        <MousePointerClick className="h-3 w-3 md:h-3.5 md:w-3.5 opacity-50" />
        <span>Tap skill for details</span>
      </div>

      <div className="relative w-2 h-2 md:w-3 md:h-3">
         <div className="absolute inset-0 bg-red-500/50 rounded-full animate-ping" />
         <div className="absolute inset-0 bg-red-500 rounded-full scale-50" />
      </div>
    </motion.div>
  );
}