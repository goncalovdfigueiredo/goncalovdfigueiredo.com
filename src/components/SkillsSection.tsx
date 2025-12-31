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
   🎨 PALETA DE CORES
   ========================================================= */
const toolGroups: Record<string, { label: string; color: string; dot: string }> = {
  "Circuit Design & Simulation": {
    label: "Circuit Design & Simulation",
    color: "bg-emerald-50/80 border-emerald-200 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:bg-emerald-500/20",
    dot: "bg-emerald-500",
  },
  "Embedded Systems & Software": {
    label: "Embedded Systems & Software",
    color: "bg-blue-50/80 border-blue-200 text-blue-800 hover:bg-blue-100 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-300 dark:hover:bg-blue-500/20",
    dot: "bg-blue-500",
  },
  "Data Analysis & Visualization": {
    label: "Data Analysis & Visualization",
    color: "bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-300 dark:hover:bg-amber-500/20",
    dot: "bg-amber-500",
  },
  "General Tools": {
    label: "General Tools",
    color: "bg-zinc-100/80 border-zinc-200 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-500/10 dark:border-zinc-500/30 dark:text-zinc-300 dark:hover:bg-zinc-500/20",
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
    { id: "core", icon: Cpu, title: "Core Technical Skills", items: skills.coreTechnical, colSpan: "md:[grid-column:span_13]" },
    { id: "tools", icon: Wrench, title: "Tools & Software", items: skills.toolsAndSoftware, colSpan: "md:[grid-column:span_10]" },
    { id: "os", icon: Monitor, title: (<>Operating <br/> Systems</>), items: skills.operatingSystems, disableContext: false, colSpan: "md:[grid-column:span_3]" },
    { id: "code", icon: Code2, title: "Programming Languages", items: skills.programmingLanguages, colSpan: "md:[grid-column:span_9]" },
    { id: "lang", icon: Globe, title: "Languages", items: skills.languages, disableContext: true, colSpan: "md:[grid-column:span_4]" },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <CircuitBoard className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Technical & Personal Skills
            </h2>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(13,minmax(0,1fr))] gap-6">
          {categories.map((cat, idx) => {
            const activeSkill = hoveredSkills[cat.id] || selectedSkills[cat.id];
            
            return (
              <MotionWrapper key={cat.id} delay={idx * 0.1} className={cat.colSpan}>
                <GlassCard className="group p-0 h-full flex flex-col rounded-2xl bg-zinc-50/50 border border-zinc-200 dark:bg-emerald-500/5 dark:border-emerald-500/10 relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-emerald-500/30">
                  
                  {/* HEADER + BOTÕES */}
                  <div className={`p-6 ${cat.disableContext ? "" : "pb-24"} relative z-10 flex-grow`}>
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-200/50 dark:border-white/5">
                      <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400">
                        <cat.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                        {cat.title}
                      </h3>
                    </div>

                    {/* LÓGICA DE LAYOUT */}
                    {cat.id === "os" ? (
                      // MODO VERTICAL (Para OS)
                      <div className="flex flex-col gap-2 items-center w-full px-1">
                        {cat.items.map((item: any, i: number) => (
                          <SkillItem 
                            key={item} 
                            item={item} 
                            cat={cat} 
                            i={i} 
                            selectedSkills={selectedSkills} 
                            hoveredSkills={hoveredSkills} 
                            handleClick={handleClick} 
                            handleHover={handleHover}
                            forceVertical={false} 
                          />
                        ))}
                      </div>
                    ) : (
                      // MODO NUVEM
                      <div className="flex flex-wrap gap-2 justify-center">
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
                            forceVertical={false} 
                          />
                        ))}
                      </div>
                    )}

                    {/* LEGENDA (APENAS TOOLS) */}
                    {cat.id === "tools" && (
                      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-3">
                          <Layers className="h-3 w-3 text-zinc-400" />
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-500">Legend</h4>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-8">
                          {Object.entries(toolGroups).map(([key, { label, dot }]) => (
                            <div key={key} className="flex items-start gap-2 text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                              {/* Bolinha */}
                              <span className={`inline-block w-2 h-2 rounded-full ${dot} shadow-sm flex-shrink-0 mt-0.5`} />
                              {/* Texto */}
                              <span className="leading-tight">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PAINEL INFERIOR (BARRA PRETA) */}
                  {!(cat as any).disableContext && (
                    <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-zinc-100/90 dark:bg-[#09090b]/90 border-t border-zinc-200 dark:border-white/5 backdrop-blur-md flex items-center px-6 overflow-hidden z-20">
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
   SUB-COMPONENTES
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
  
  const style = groupKey && toolGroups[groupKey] 
    ? toolGroups[groupKey].color 
    : "bg-white border-zinc-200 text-zinc-700 dark:bg-white/5 dark:border-white/10 dark:text-zinc-300";

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
      whileHover={cat.disableContext ? undefined : { scale: 1.05, y: -2 }}
      className={`
        px-3 py-2 rounded-md text-sm font-medium tracking-wide border shadow-sm flex items-center justify-center select-none text-center
        ${style}
        ${!cat.disableContext ? "cursor-pointer transition-all duration-300" : ""}
        ${isSelected ? "ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/20" : ""}
        ${!isSelected && isHovered ? "border-emerald-400 dark:border-emerald-500/50" : ""}
        ${forceVertical ? "w-full" : ""} 
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full flex flex-col justify-center h-full py-2"
    >
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
          Applied Context
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
      </div>

      {usage.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar">
          {usage.map((u, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              {u.type === "experience" && <Briefcase className="h-3 w-3 text-amber-500 shrink-0" />}
              {u.type === "project" && <StickyNote className="h-3 w-3 text-blue-500 shrink-0" />}
              {u.type === "education" && <GraduationCap className="h-3 w-3 text-emerald-500 shrink-0" />}
              <span className="font-medium truncate max-w-[120px]">{u.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-zinc-400 italic">
          <Search className="h-3 w-3" />
          <span>General knowledge / Core foundation</span>
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
      className="flex items-center gap-3 text-xs text-zinc-400"
    >
      <div className="flex items-center gap-2">
        <MousePointerClick className="h-3.5 w-3.5 opacity-50" />
        <span>Click any skill to lock details</span>
      </div>

      <div className="relative w-3 h-3">
                <div className="absolute inset-0 bg-red-500/50 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-red-500 rounded-full scale-50" />
              </div>
    </motion.div>
  );
}