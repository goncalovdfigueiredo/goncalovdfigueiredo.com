// src/components/SkillsSection.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { education, workExperience, projects, skills } from "@/lib/data";
import { Cpu, Terminal, Activity, Zap, Briefcase, GraduationCap, StickyNote, CircuitBoard, Monitor, Globe, Tag, Fingerprint, X, SlidersHorizontal, Calendar, Building2 } from "lucide-react";

// =========================================================
// 1. HELPERS E MAPEAMENTOS
// =========================================================
const subCategories: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "Circuit Design": { label: "Circuit Design", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  "Embedded Systems": { label: "Embedded Systems", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  "Data & Viz": { label: "Data & Visualization", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
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

  (workExperience || []).forEach((job: any) => {
    const tags = job.relatedSkills || [];
    const ach = Array.isArray(job.achievements) ? job.achievements.join(" ") : "";
    const proj = Array.isArray(job.projecttitle) ? job.projecttitle.join(" ") : "";
    const text = `${job.position || ""} ${job.company || ""} ${ach} ${proj}`;
    if (isMatch(text, tags)) {
      usage.push({ type: "experience", title: job.position, subtitle: job.company, period: job.period });
    }
  });

  (education || []).forEach((edu: any) => {
    const tags = edu.relatedSkills || [];
    const ach = Array.isArray(edu.achievements) ? edu.achievements.join(" ") : "";
    const text = `${edu.degree || ""} ${edu.thesisTitle || ""} ${edu.abstract || ""} ${edu.summary || ""} ${ach}`;
    if (isMatch(text, tags)) {
      usage.push({ type: "education", title: edu.degree, subtitle: edu.institution, period: edu.period });
    }
  });

  (projects || []).forEach((proj: any) => {
    const tags = proj.relatedSkills || [];
    const desc = Array.isArray(proj.description) ? proj.description.join(" ") : (proj.description || "");
    const text = `${proj.title || ""} ${desc}`;
    if (isMatch(text, tags)) {
      usage.push({ type: "project", title: proj.title, subtitle: "Personal Project", period: "Dev" });
    }
  });

  return Array.from(new Set(usage.map(u => JSON.stringify(u)))).map(s => JSON.parse(s));
}

const skillCategories = [
  { id: "core", label: "Core Technical Skills", icon: Zap, color: "emerald", items: skills.coreTechnical },
  { id: "programming", label: "Programming Languages", icon: Terminal, color: "purple", items: skills.programmingLanguages },
  { id: "tools", label: "Tools & Software", icon: Cpu, color: "blue", items: skills.toolsAndSoftware },
  { id: "os", label: "Operating Systems", icon: Monitor, color: "zinc", items: skills.operatingSystems },
  { id: "lang", label: "Languages", icon: Globe, color: "amber", items: skills.languages }
];

const getColorStyles = (colorName: string) => {
  const styles: Record<string, { activeBg: string, text: string, hover: string }> = {
    emerald: { activeBg: "bg-emerald-500", text: "text-emerald-500", hover: "hover:border-emerald-500/50" },
    purple: { activeBg: "bg-purple-500", text: "text-purple-500", hover: "hover:border-purple-500/50" },
    blue: { activeBg: "bg-blue-500", text: "text-blue-500", hover: "hover:border-blue-500/50" },
    zinc: { activeBg: "bg-zinc-500", text: "text-zinc-500", hover: "hover:border-zinc-500/50" },
    amber: { activeBg: "bg-amber-500", text: "text-amber-500", hover: "hover:border-amber-500/50" },
  };
  return styles[colorName] || styles.emerald;
};

// =========================================================
// 2. CONSOLA
// =========================================================
const ConsoleWindow = ({ activeSkill, usageData, subCategory, onMobileClose }: { activeSkill: string | null, usageData: any[], subCategory: any, onMobileClose?: () => void }) => {
  return (
    <GlassCard className="h-full min-h-[400px] lg:min-h-[550px] border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0c0c0e] backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">
      <div className="h-12 bg-zinc-200/90 dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/10 flex items-center px-4 justify-between relative z-50 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        {onMobileClose && (
          <button onClick={onMobileClose} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors lg:hidden">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        )}
        <div className="hidden lg:block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">CONTEXT_LOG</div>
      </div>

      <div className="p-6 flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.div key={activeSkill} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col overflow-hidden">
              <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-white/5 flex flex-col gap-2 shrink-0">
                <p className="text-[10px] text-zinc-400 font-mono">Querying database for:</p>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white flex items-start gap-2 leading-tight">
                  <Terminal className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                  <span>{activeSkill.split("(")[0]}</span>
                </h4>
                {subCategory && (
                  <div className={`self-start flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${subCategory.color} ${subCategory.bg} ${subCategory.border}`}>
                    <Tag className="w-3.5 h-3.5" />
                    {subCategory.label}
                  </div>
                )}
              </div>

              <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[350px] lg:max-h-[380px]">
                {usageData.length > 0 ? usageData.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                    <div className={`p-2.5 rounded-xl shrink-0 ${item.type === 'experience' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {item.type === 'experience' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-1.5">
                        {item.title}
                      </h5>
                      {item.period && (
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-300">
                          <Calendar className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{item.period}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-40 py-10">
                    <CircuitBoard className="w-10 h-10 mb-2" />
                    <p className="text-xs text-center">Core competence used across<br/>general R&D operations.</p>
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

      <div className="p-3 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/40 text-[10px] font-mono text-zinc-500 flex justify-between items-center shrink-0">
        <span>STATUS: <span className="text-emerald-500 font-bold">ONLINE</span></span>
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
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const usageData = useMemo(() => activeSkill ? findSkillUsage(activeSkill) : [], [activeSkill]);
  const subCategory = useMemo(() => activeSkill ? getSkillSubCategory(activeSkill) : null, [activeSkill]);
  const currentCategoryData = useMemo(() => skillCategories.find(c => c.id === activeCategory), [activeCategory]);

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-5 relative z-10">
        <MotionWrapper>
          <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                <CircuitBoard className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Skills
            </h2>
          </div>
        </MotionWrapper>

        {/* =================================================== */}
        {/* VERSÃO MOBILE: COM BOTÕES DE LARGURA INDEPENDENTE (FLEX) */}
        {/* =================================================== */}
        <div className="block md:hidden">
          <GlassCard className="p-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#0c0c0e]/60 backdrop-blur-xl shadow-xl">
            
            <div className="flex items-start gap-2.5 mb-5 pb-4 border-b border-zinc-200 dark:border-white/5">
              <SlidersHorizontal className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Interactive technical stack breakdown. Tap any category and select a skill to query execution context.
              </p>
            </div>

            {/* Grelha Flexível com largura independente por botão */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skillCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const style = getColorStyles(cat.color);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                      isSelected 
                        ? `${style.activeBg} text-white shadow-lg border-transparent` 
                        : `bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 ${style.text}`
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{cat.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            <div className="h-px w-full bg-zinc-200 dark:bg-white/10 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                  {currentCategoryData && (
                    <>
                      <currentCategoryData.icon className={`w-4 h-4 ${getColorStyles(currentCategoryData.color).text}`} />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-200">
                        {currentCategoryData.label}
                      </h3>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentCategoryData?.items.map((skill) => {
                    const isActive = activeSkill === skill;
                    const style = getColorStyles(currentCategoryData.color);
                    return (
                      <button
                        key={skill}
                        onClick={() => setActiveSkill(skill)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 border ${
                          isActive 
                            ? `${style.activeBg} text-white border-transparent shadow-md` 
                            : `bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 ${style.hover}`
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

          </GlassCard>
        </div>

        {/* =================================================== */}
        {/* VERSÃO DESKTOP */}
        {/* =================================================== */}
        <div className="hidden md:block">
          <GlassCard className="p-8 lg:p-10 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0c0c0e]/50 backdrop-blur-2xl shadow-2xl">
            
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Interactive Skill Matrix</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">Hover or select any technical capability to inspect execution context and real-world application logs.</p>
                </div>
              </div>
              <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-white/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ENVIRONMENT: SECURE_WORKSPACE
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 flex flex-col gap-6">
                {skillCategories.map((cat, idx) => {
                  const style = getColorStyles(cat.color);
                  return (
                    <div key={cat.id}>
                      <MotionWrapper delay={idx * 0.1}>
                        <div className="relative group">
                          <div className="flex items-center gap-3 mb-3 opacity-80">
                            <cat.icon className={`w-4 h-4 ${style.text}`} />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{cat.label}</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cat.items.map((skill) => {
                              const isActive = activeSkill === skill;
                              return (
                                <button
                                  key={skill}
                                  onMouseEnter={() => {
                                    if(typeof window !== "undefined" && window.innerWidth >= 1024) setActiveSkill(skill);
                                  }}
                                  onClick={() => {
                                    setActiveSkill(skill);
                                  }}
                                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 border ${
                                    isActive 
                                      ? `${style.activeBg} text-white border-transparent shadow-md` 
                                      : `bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 ${style.hover}`
                                  }`}
                                >
                                  {skill}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </MotionWrapper>
                    </div>
                  );
                })}
              </div>

              <div className="hidden lg:block lg:col-span-5 relative">
                <div className="sticky top-24">
                  <ConsoleWindow activeSkill={activeSkill} usageData={usageData} subCategory={subCategory} />
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

        {/* PORTAL MOBILE PARA A CONSOLA */}
        {mounted && createPortal(
          <AnimatePresence>
            {activeSkill && typeof window !== "undefined" && window.innerWidth < 1024 && (
              <div className="fixed inset-0 flex items-end justify-center px-4 pb-10" style={{ zIndex: 999999 }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveSkill(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-md">
                  <div className="w-12 h-1.5 bg-zinc-400/50 rounded-full mx-auto mb-4" />
                  <ConsoleWindow activeSkill={activeSkill} usageData={usageData} subCategory={subCategory} onMobileClose={() => setActiveSkill(null)} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
}