// src/components/SkillsSection.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { education, workExperience, projects, skills } from "@/lib/data";
import { Cpu, Terminal, Activity, Zap, Briefcase, GraduationCap, CircuitBoard, Monitor, Globe, Tag, X, SlidersHorizontal, Calendar, Sparkles } from "lucide-react";
import ElectricBorder from "./ElectricBorder";

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
  if (["kicad", "altium", "ltspice", "quartus", "pcb", "optoelectronic", "fpga", "lsc", "solar"].some(t => lower.includes(t))) return subCategories["Circuit Design"];
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
// 2. BINARY STREAM
// =========================================================
const BinaryDataStream = ({ isTransferring, transferKey }: { isTransferring: boolean, transferKey: string }) => {
  const bits = useMemo(() => {
    const colors = ["text-emerald-300", "text-emerald-400", "text-emerald-500", "text-green-400", "text-teal-400"];
    return Array.from({ length: 45 }).map(() => ({ char: Math.random() > 0.5 ? '1' : '0', color: colors[Math.floor(Math.random() * colors.length)] }));
  }, [transferKey]);

  return (
    <div className="w-[10%] relative z-10 px-2 h-full flex flex-col items-center">
      <div className="absolute top-[166px] w-full h-8 -translate-y-1/2 flex items-center justify-center">
        <div className="w-full h-px bg-zinc-300/50 dark:bg-white/10 absolute top-1/2 -translate-y-1/2 z-0" />
        <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-white/20 shadow-sm z-20 top-1/2 -translate-y-1/2" />
        <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-white/20 shadow-sm z-20 top-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10 rounded-full">
          <AnimatePresence>
            {isTransferring && (
              <motion.div key={transferKey} initial={{ left: "-150%", opacity: 0 }} animate={{ left: "150%", opacity: [0, 1, 1, 0] }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 1.5, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 flex items-center whitespace-nowrap font-mono text-[10px] font-black tracking-[0.15em]" style={{ textShadow: "0 0 8px rgba(16,185,129,0.9), 0 0 15px rgba(16,185,129,0.5)" }} >
                {bits.map((b, i) => ( <span key={i} className={`${b.color}`}>{b.char}</span> ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// 3. CONSOLA (DESKTOP)
// =========================================================
const ConsoleWindow = ({ activeSkill, usageData, subCategory, isReceiving, onMobileClose }: { activeSkill: string | null, usageData: any[], subCategory: any, isReceiving: boolean, onMobileClose?: () => void }) => {
  return (
    <GlassCard className="h-full min-h-[400px] lg:min-h-[500px] border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0c0c0e]/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl relative w-full">
      <div className="h-12 bg-zinc-200/90 dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/10 flex items-center px-4 justify-between relative z-50 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        {onMobileClose && (
          <button onClick={onMobileClose} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/25 transition-colors lg:hidden">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        )}
        <div className="hidden lg:block text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          {isReceiving && <span className="animate-pulse text-emerald-500">RECEIVING DATA...</span>}
          {!isReceiving && <span>MAINFRAME_OUTPUT</span>}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isReceiving ? (
            <motion.div key="receiving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50/80 dark:bg-[#0c0c0e]/80 backdrop-blur-sm z-10">
              <div className="relative mb-4">
                <CircuitBoard className="w-12 h-12 text-emerald-500 opacity-20" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-emerald-500 rounded-full" />
              </div>
              <p className="text-xs font-mono text-emerald-500 tracking-widest animate-pulse uppercase">Decrypting Binary Stream...</p>
            </motion.div>
          ) : activeSkill ? (
            <motion.div key={activeSkill} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col overflow-hidden">
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
              <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[350px] custom-scrollbar">
                {usageData.length > 0 ? usageData.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                    <div className={`p-2.5 rounded-xl shrink-0 ${item.type === 'experience' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {item.type === 'experience' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-1.5">{item.title}</h5>
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
              <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">Select a capability to initiate data transfer...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

// =========================================================
// 4. COMPONENTE PRINCIPAL
// =========================================================
export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [pendingSkill, setPendingSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [mounted, setMounted] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [orderedSkills, setOrderedSkills] = useState<string[]>([]);
  const [mobileInspectSkill, setMobileInspectSkill] = useState<string | null>(null);

  const currentCategoryData = useMemo(() => skillCategories.find(c => c.id === activeCategory), [activeCategory]);

  useEffect(() => {
    if (currentCategoryData) {
      setOrderedSkills(currentCategoryData.items);
    }
  }, [currentCategoryData]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSkillTransfer = (skill: string) => {
    if (activeSkill === skill || pendingSkill === skill || isTransferring) return;
    setIsTransferring(true);
    setPendingSkill(skill);
    setActiveSkill(null);
    setOrderedSkills(prev => {
      const filtered = prev.filter(s => s !== skill);
      return [skill, ...filtered];
    });
    setTimeout(() => {
      setActiveSkill(skill);
      setPendingSkill(null);
      setIsTransferring(false);
    }, 1500);
  };

  const handleMobileSkillTap = (skill: string) => {
    setActiveSkill(skill);
    setMobileInspectSkill(skill);
  };

  const usageData = useMemo(() => activeSkill ? findSkillUsage(activeSkill) : [], [activeSkill]);
  const subCategory = useMemo(() => activeSkill ? getSkillSubCategory(activeSkill) : null, [activeSkill]);

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-5 relative z-10">
        <MotionWrapper>
          <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">
                  MODULE // 02_TECHNICAL_STACK
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative p-2.5 md:p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm backdrop-blur-md group">
                  <Cpu className="relative z-10 h-5 w-5 md:h-7 md:w-7 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <div className="relative inline-block">
                  <span>Skills</span>
                  <div className="absolute left-0 -bottom-1 w-16 h-[3px] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </h2>
            </div>
          </div>
        </MotionWrapper>

        {/* =================================================== */}
        {/* VERSÃO MOBILE REFORMULADA (Estilo App Nativa de Alta Gama) */}
        {/* =================================================== */}
        <div className="block lg:hidden">
          <GlassCard className="p-4 rounded-3xl border border-emerald-500/20 dark:border-emerald-500/30 bg-gradient-to-b from-zinc-50/80 via-zinc-50/40 to-[#0c0c0e]/40 dark:from-[#0c0c0e]/90 dark:via-[#0c0c0e]/60 dark:to-black backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Substituir o div do overflow-x-auto por esta grelha compacta de 2 linhas */}
<div className="grid grid-cols-3 gap-1.5 mb-4">
  {skillCategories.map((cat, idx) => {
    const isSelected = activeCategory === cat.id;
    const style = getColorStyles(cat.color);
    
    // Para centrar os últimos 2 elementos se formarem a segunda linha (opcional, mas fica lindo)
    const isLastTwo = idx >= 3;

    return (
      <button 
        key={cat.id} 
        onClick={() => { 
          setActiveCategory(cat.id); 
          setActiveSkill(null); 
          setMobileInspectSkill(null);
        }} 
        className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-[9px] font-bold uppercase transition-all border backdrop-blur-md truncate ${
          isLastTwo ? 'col-span-1.5' : 'col-span-1'
        } ${
          isSelected 
            ? `${style.activeBg} text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border-transparent scale-[1.02]` 
            : `bg-white/70 dark:bg-white/5 border-zinc-200/80 dark:border-white/10 ${style.text} opacity-80 hover:opacity-100`
        }`}
      >
        <cat.icon className="w-3 h-3 shrink-0" />
        <span className="truncate">{cat.label.split(" ")[0]}</span>
      </button>
    );
  })}
</div>

            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" /> Tap capability to inspect telemetry
              </span>
              <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                {orderedSkills.length} nodes
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory} 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.98 }} 
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-2 pt-1 pb-2"
              >
                {orderedSkills.map((skill) => {
                  const isActive = activeSkill === skill;
                  const style = getColorStyles(currentCategoryData!.color);
                  return (
                    <motion.button 
                      layout 
                      transition={{ type: "spring", stiffness: 80, damping: 15 }} 
                      key={skill} 
                      onClick={() => handleMobileSkillTap(skill)} 
                      className={`group relative px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border flex items-center gap-2 ${
                        isActive 
                          ? `${style.activeBg} text-white border-transparent shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105 z-10` 
                          : `bg-white/90 dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-200 border-zinc-200/80 dark:border-white/10 hover:border-emerald-500/40 active:scale-95`
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-ping' : 'bg-emerald-500/60 group-hover:bg-emerald-500'}`} />
                      <span>{skill}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* =================================================== */}
        {/* VERSÃO DESKTOP (100% Intacta e Inalterada) */}
        {/* =================================================== */}
        <div className="hidden lg:flex items-stretch justify-center min-h-[500px] w-full relative">
          <GlassCard className="w-[50%] p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-[#0c0c0e]/80 backdrop-blur-2xl shadow-xl flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-200 dark:border-white/5">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Interactive Skill Matrix</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">Navigate categories and select any technical capability.</p>
              </div>
            </div>
            <div className="flex gap-6 h-full overflow-hidden">
              <div className="w-[45%] flex flex-col gap-2 border-r border-zinc-200 dark:border-white/5 pr-4">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2"> // Modules </div>
                {skillCategories.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const style = getColorStyles(cat.color);
                  return (
                    <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setActiveSkill(null); setPendingSkill(null); setIsTransferring(false); }} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 border text-left ${ isSelected ? `bg-zinc-200/60 dark:bg-white/5 border-zinc-300 dark:border-white/10 shadow-sm` : `border-transparent hover:bg-zinc-100 dark:hover:bg-white/5 opacity-70 hover:opacity-100` }`} >
                      <cat.icon className={`w-4 h-4 ${style.text}`} />
                      <span className={`text-sm font-bold ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="w-[55%] flex flex-col h-full relative">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2"> // Capabilities </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeCategory} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-2 relative">
                      {orderedSkills.map((skill) => {
                        const isActive = activeSkill === skill || pendingSkill === skill;
                        const style = getColorStyles(currentCategoryData!.color);
                        return (
                          <motion.button layout transition={{ type: "spring", stiffness: 60, damping: 14 }} key={skill} onClick={() => handleSkillTransfer(skill)} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-colors duration-300 border ${ isActive ? `${style.activeBg} text-white border-transparent shadow-md z-10` : `bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 hover:bg-zinc-100/50 dark:hover:bg-white/5` }`} >
                            {skill}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </GlassCard>

          <BinaryDataStream isTransferring={isTransferring} transferKey={pendingSkill || 'empty'} />

          <div className="w-[40%] h-full z-20 relative">
            <div className={`w-full h-full transition-all duration-500 ${isTransferring ? 'scale-[1.01]' : 'scale-100'}`}>
              <ElectricBorder color={isTransferring ? "#10b981" : "rgba(16,185,129,0)"} speed={isTransferring ? 3 : 0} chaos={isTransferring ? 0.2 : 0} className={`w-full h-full rounded-3xl transition-all duration-500 ${isTransferring ? 'shadow-[0_0_40px_rgba(16,185,129,0.2)]' : ''}`} >
                <ConsoleWindow activeSkill={activeSkill} usageData={usageData} subCategory={subCategory} isReceiving={isTransferring} />
              </ElectricBorder>
            </div>
          </div>
        </div>

        {/* PORTAL MOBILE PARA A CONSOLA IMERSIVA */}
        {mounted && createPortal(
          <AnimatePresence>
            {mobileInspectSkill && typeof window !== "undefined" && window.innerWidth < 1024 && (
              <div className="fixed inset-0 flex items-end justify-center px-3 pb-6" style={{ zIndex: 999999 }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileInspectSkill(null)} className="absolute inset-0 bg-black/85 backdrop-blur-md" />
                <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-md">
                  <div className="w-12 h-1.5 bg-zinc-400/50 rounded-full mx-auto mb-3" />
                  <ConsoleWindow activeSkill={mobileInspectSkill} usageData={usageData} subCategory={subCategory} isReceiving={false} onMobileClose={() => setMobileInspectSkill(null)} />
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