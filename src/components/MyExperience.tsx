// src/components/ExperienceSection.tsx
"use client";

import React, { useState } from "react";
import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Briefcase, MapPin, BarChart3, ChartGantt, FileText, ExternalLink, BookOpen, ChevronDown, Calendar, GraduationCap, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

/* ========================= MICRO-COMPONENTE: BOTÃO DE NAVEGAÇÃO COM TOOLTIP ========================= */
const NavButtonWithTooltip = ({ href, icon: Icon, text, tooltip, colorClass }: { href: string, icon: any, text: string, tooltip: string, colorClass: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative shrink-0">
      <a href={href} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`group flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl border transition-all duration-300 shadow-sm backdrop-blur-md ${colorClass}`} >
        <Icon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider">
          <span className="inline md:hidden">Map</span>
          <span className="hidden md:inline">{text}</span>
        </span>
      </a>
      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: 0.95 }} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden md:block" >
            <div className="bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-[10px] py-1.5 px-3 rounded-lg shadow-2xl whitespace-nowrap backdrop-blur-xl">
              {tooltip}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-t border-l border-zinc-800 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========================= MICRO-COMPONENTE: BADGE DE TIPO DE AMBIENTE ========================= */
const EnvironmentBadge = ({ type }: { type: 'Academic' | 'Industry' }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wider border shrink-0 ${type === 'Academic' ? 'bg-blue-500/[0.02] border-blue-500/10 text-blue-500/80 dark:text-blue-400/80' : 'bg-amber-500/[0.02] border-amber-500/10 text-amber-500/80 dark:text-amber-400/80'} `}>
    {type === 'Academic' ? <GraduationCap className="w-2.5 h-2.5 opacity-70" /> : <Building2 className="w-2.5 h-2.5 opacity-70" />}
    {type}
  </span>
);

/* ========================= MICRO-COMPONENTE: ENTRADA DE TRABALHO (JOB ENTRY) ========================= */
const JobEntry = ({ job, index, isLast }: { job: any, index: number, isLast: boolean }) => {
  const isCurrent = job.period.toLowerCase().includes('present');
  const [activeTab, setActiveTab] = useState<'projects' | 'key impact' | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  
  const toggleTab = (tab: 'projects' | 'key impact') => {
    setActiveTab(prev => prev === tab ? null : tab);
  };

  const hasProjects = Array.isArray(job.projecttitle) && job.projecttitle.length > 0;
  const hasImpact = Array.isArray(job.achievements) && job.achievements.length > 0;
  const hasCourses = job.courses && job.courses.length > 0;

  const renderCompanyName = (companyName: string) => {
    const targetWithSpace = " (Aveiro and Lisbon)";
    const targetWithoutSpace = "(Aveiro and Lisbon)";
    
    let target = "";
    if (companyName.includes(targetWithSpace)) target = targetWithSpace;
    else if (companyName.includes(targetWithoutSpace)) target = targetWithoutSpace;

    if (target) {
      const parts = companyName.split(target);
      return (
        <span className="align-middle">
          {parts[0]}
          <span className="hidden md:inline">{target}</span>
          {parts[1]}
        </span>
      );
    }
    return <span className="align-middle">{companyName}</span>;
  };

  const isMultiple = Array.isArray(job.companyLinks) && job.companyLinks.length > 1;

  const renderCompanyBlock = (name: string, url: string, location: string, logo: string | null, isAcademic: boolean, courses?: any[]) => {
    if (!isMultiple) {
      return (
        <div className="flex flex-col p-3 md:px-4 md:py-3 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 transition-all group min-w-0 w-full h-full justify-between">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2.5 md:gap-3 min-w-0 flex-1">
              {logo && (
                <div className="relative z-10 w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-1 shadow-sm shrink-0">
                  <img src={logo} alt={name} className="w-full h-full object-contain" />
                </div>
              )}
              <a href={url || "#"} target="_blank" rel="noopener noreferrer" className={`text-xs md:text-sm font-bold hover:underline leading-snug truncate ${isAcademic ? 'text-blue-500 md:text-blue-600 dark:text-blue-400' : 'text-amber-500 md:text-amber-600 dark:text-amber-400'}`}>
                {renderCompanyName(name)}
                <ExternalLink className="inline-block w-2.5 h-2.5 opacity-50 ml-1 align-baseline relative -top-[1px]" />
              </a>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-3 pl-8 md:pl-0 text-[10px] text-zinc-500 dark:text-zinc-400">
              <EnvironmentBadge type={isAcademic ? "Academic" : "Industry"} />
              <span className="hidden md:inline-block text-zinc-300 dark:text-zinc-700">•</span>
              <span className="flex items-center gap-1 font-medium truncate">
                <MapPin className="w-2.5 h-2.5 shrink-0 opacity-70" />
                <span className="truncate">{location}</span>
              </span>
            </div>
          </div>
          {courses && courses.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mt-2.5 pt-2 border-t border-zinc-200/40 dark:border-white/5 w-full">
              {courses.map((course: any, idx: number) => (
                <a key={idx} href={course.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-600/5 text-[9px] font-medium text-yellow-600 dark:text-[#c4b59b] border border-yellow-600/10 hover:underline transition-all group/course max-w-full">
                  <BookOpen className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{course.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col p-2.5 md:p-3 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 transition-all group min-w-0 w-full h-full justify-between">
        <div className="flex items-start gap-2.5 min-w-0">
          {logo && (
            <div className="relative z-10 w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-1 shadow-sm shrink-0 mt-0.5">
              <img src={logo} alt={name} className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0">
            <a href={url || "#"} target="_blank" rel="noopener noreferrer" className={`text-xs md:text-sm font-bold hover:underline leading-snug line-clamp-2 ${isAcademic ? 'text-blue-500 md:text-blue-600 dark:text-blue-400' : 'text-amber-500 md:text-amber-600 dark:text-amber-400'}`}>
              {renderCompanyName(name)}
              <ExternalLink className="inline-block w-2.5 h-2.5 opacity-50 ml-1 align-baseline relative -top-[1px]" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-zinc-200/40 dark:border-white/5 text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400">
          <EnvironmentBadge type={isAcademic ? "Academic" : "Industry"} />
          <span className="flex items-center gap-1 font-medium truncate">
            <MapPin className="w-2.5 h-2.5 shrink-0 opacity-70" />
            <span className="truncate">{location}</span>
          </span>
        </div>
        {courses && courses.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-2 pt-2 border-t border-zinc-200/40 dark:border-white/5 w-full">
            {courses.map((course: any, idx: number) => (
              <a key={idx} href={course.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-600/5 text-[9px] font-medium text-yellow-600 dark:text-[#c4b59b] border border-yellow-600/10 hover:underline transition-all group/course max-w-full">
                <BookOpen className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">{course.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <TimelineItem index={index} isLast={isLast} period={job.period} isCurrent={isCurrent} title={
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] md:text-xs font-bold uppercase tracking-wider border ${isCurrent ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'} `}>
            <Calendar className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
            <span>{job.period}</span>
            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />}
          </div>
        </div>

        {/* TÍTULO E LOGOS NO MOBILE */}
        <div className="flex items-center justify-between min-w-0 cursor-pointer md:cursor-default gap-2" onClick={() => setIsMobileExpanded(!isMobileExpanded)}>
          
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="flex md:hidden items-center -space-x-1.5 shrink-0">
              {Array.isArray(job.logos) ? job.logos.map((logo: string, lIdx: number) => (
                <div key={lIdx} className="w-6 h-6 rounded-md bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-0.5 shadow-sm shrink-0">
                  <img src={logo} alt="logo" className="w-full h-full object-contain" />
                </div>
              )) : job.logos && (
                <div className="w-6 h-6 rounded-md bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-0.5 shadow-sm shrink-0">
                  <img src={job.logos} alt="logo" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <span className="text-[14px] md:text-xl font-extrabold text-zinc-900 dark:text-white leading-tight truncate">{job.position}</span>
          </div>

          <div className="flex md:hidden items-center justify-center w-7 h-7 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 shrink-0 ml-1">
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileExpanded ? 'rotate-180 text-emerald-500' : ''}`} />
          </div>
        </div>
      </div>
    } subtitle={
      <div className="mt-2 md:mt-3 pl-0 md:pl-4 relative pb-3 md:pb-6 min-w-0 w-full">
        
        {/* ========================================================= */}
        {/* VERSÃO MOBILE: ACORDEÃO EXPANSÍVEL */}
        {/* ========================================================= */}
        <AnimatePresence>
          {(isMobileExpanded || window.innerWidth >= 768) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              transition={{ duration: 0.3 }}
              className="overflow-hidden block md:hidden flex flex-col gap-2.5 mb-3"
            >
              {Array.isArray(job.companyLinks) ? (
                job.companyLinks.map((link: any, i: number) => {
                  const isAcademic = !link.name.toLowerCase().includes("lightenjin");
                  return (
                    <div key={i} className="flex flex-col gap-1 py-1.5 px-3 rounded-lg bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/40 dark:border-white/5">
                      <div className="flex items-center justify-between gap-2">
                        <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className={`text-xs font-bold hover:underline ${isAcademic ? 'text-blue-500 dark:text-blue-400' : 'text-amber-500 dark:text-amber-400'}`}>
                          {link.name}
                        </a>
                        <EnvironmentBadge type={isAcademic ? "Academic" : "Industry"} />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                        <MapPin className="w-2.5 h-2.5 shrink-0 opacity-70" />
                        <span>{link.location?.city || "Portugal"}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-1 py-1.5 px-3 rounded-lg bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200/40 dark:border-white/5">
                  <div className="flex items-center justify-between gap-2">
                    <a href={job.url || "#"} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-500 dark:text-blue-400 hover:underline">
                      {job.company}
                    </a>
                    <EnvironmentBadge type="Academic" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-2.5 h-2.5 shrink-0 opacity-70" />
                    <span>{typeof job.location === 'string' ? job.location : job.location?.city}</span>
                  </div>
                </div>
              )}

              {hasCourses && job.courses.map((c: any, idx: number) => (
                <a key={idx} href={c.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-yellow-600 dark:text-[#c4b59b] underline truncate px-1">
                  • {c.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* VERSÃO DESKTOP: GRELHA BENTO COM ALTURA SINCRONIZADA E GAP FIXO */}
        {/* ========================================================= */}
        <div className="hidden md:grid grid-cols-[1fr_9rem] gap-6 items-stretch w-full min-w-0">
          
          <div className="min-w-0 w-full flex">
            {Array.isArray(job.companyLinks) ? (
              <div className={`grid grid-cols-1 ${job.companyLinks.length > 1 ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-2.5 w-full min-w-0`}>
                {job.companyLinks.map((link: any, i: number) => {
                  const isAcademic = !link.name.toLowerCase().includes("lightenjin");
                  const currentLogo = Array.isArray(job.logos) ? job.logos[i] : (i === 0 ? job.logos : null);
                  const currentCourses = (hasCourses && i === 0) ? job.courses : undefined;
                  return (
                    <div key={i} className="min-w-0 w-full flex">
                      {renderCompanyBlock(link.name, link.url, link.location?.city || "Portugal", currentLogo, isAcademic, currentCourses)}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="min-w-0 w-full flex">
                {(() => {
                  const isAcademic = !job.company.toLowerCase().includes("lightenjin");
                  const currentLogo = Array.isArray(job.logos) ? job.logos[0] : job.logos;
                  const loc = typeof job.location === 'string' ? job.location : job.location.city;
                  return renderCompanyBlock(job.company, job.url, loc, currentLogo, isAcademic, hasCourses ? job.courses : undefined);
                })()}
              </div>
            )}
          </div>

          {/* Coluna dos botões: gap-2.5 fixo, botões esticam-se uniformemente para preencher a altura exata */}
          <div className="hidden lg:flex flex-col gap-2.5 relative z-10 w-36 h-full">
            {hasProjects && (
              <button onClick={() => toggleTab('projects')} className={`flex items-center justify-between px-3.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 w-full shadow-sm ${activeTab === 'projects' ? 'bg-blue-600 text-white border-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-500'} ${hasProjects && hasImpact ? 'flex-1' : 'h-full'}`} >
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Projects</span>
                </div>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-300 ${activeTab === 'projects' ? 'rotate-180' : ''}`} />
              </button>
            )}
            {hasImpact && (
              <button onClick={() => toggleTab('key impact')} className={`flex items-center justify-between px-3.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 w-full shadow-sm ${activeTab === 'key impact' ? 'bg-emerald-600 text-white border-emerald-700 shadow-[0_0_15px_rgba(5,150,105,0.4)]' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500'} ${hasProjects && hasImpact ? 'flex-1' : 'h-full'}`} >
                <div className="flex items-center gap-1.5 min-w-0">
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Key Impact</span>
                </div>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-300 ${activeTab === 'key impact' ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

        </div>

        {/* BOTÕES MOBILE (Discretos e diretos) */}
        <div className="flex md:hidden gap-2 mt-2 mb-1">
          {hasProjects && (
            <button onClick={() => toggleTab('projects')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border text-[9px] font-bold uppercase tracking-wider ${activeTab === 'projects' ? 'bg-blue-600 text-white border-blue-700' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'}`}>
              <FileText className="w-3 h-3" /> Projects
            </button>
          )}
          {hasImpact && (
            <button onClick={() => toggleTab('key impact')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border text-[9px] font-bold uppercase tracking-wider ${activeTab === 'key impact' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'}`}>
              <BarChart3 className="w-3 h-3" /> Key Impact
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden min-w-0">
              <div className={`p-3 md:p-5 rounded-xl border backdrop-blur-md ${activeTab === 'projects' ? 'bg-blue-500/5 border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.05)]' : 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]'}`}>
                <ul className="space-y-2">
                  {(activeTab === 'projects' ? job.projecttitle : job.achievements).map((item: string, i: number) => {
                    const parts = item.split(':');
                    const isProjectStyle = parts.length > 1 && (item.includes('Project') || item.includes('Area'));
                    return (
                      <li key={i} className="text-[10px] md:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed w-full flex gap-2 items-start text-justify">
                        <span className={`mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full shrink-0 ${activeTab === 'projects' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                        <span className="flex-1">
                          {isProjectStyle ? (
                            <>
                              <span className="font-bold text-blue-500 dark:text-blue-400">
                                {parts[0].replace(/\*\*/g, '')}:
                              </span>
                              <span className="ml-1">{parts[1]}</span>
                            </>
                          ) : (
                            item
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLast && (
          <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-zinc-200 via-zinc-300 to-transparent dark:from-white/5 dark:via-white/10 dark:to-transparent rounded-full" />
        )}
      </div>
    } />
  );
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-10 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-6 md:mb-8 flex items-center justify-between gap-2 min-w-0">
            
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] md:text-xs font-mono font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">
                  MODULE // 01_PROFESSIONAL_LOG
                </span>
              </div>
              <h2 className="text-xl md:text-4xl font-extrabold flex items-center tracking-tight text-zinc-900 dark:text-white gap-2 md:gap-3 min-w-0">
                
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="relative p-2 md:p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm backdrop-blur-md group shrink-0"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Briefcase className="relative z-10 h-4 w-4 md:h-7 md:w-7 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                
                <div className="print:hidden relative inline-block truncate">
                  <span className="truncate">Experience</span>
                  <div className="absolute left-0 -bottom-1 w-12 md:w-16 h-[3px] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </h2>
            </div>
            
            <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
              <NavButtonWithTooltip href="#map" icon={MapPin} text="Global Footprint" tooltip="Interactive map of my research, conferences and academic reach" colorClass="border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" />
              <NavButtonWithTooltip href="#timeline" icon={ChartGantt} text="Timeline" tooltip="Visual roadmap of my academic career" colorClass="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400" />
            </div>

          </div>
        </MotionWrapper>

        <div className="grid gap-0 md:gap-0 min-w-0">
          {workExperience.map((job, index) => {
            const isCurrent = job.period.toLowerCase().includes('present');
            return (
              <div key={`${job.position}-${index}`} className={`transition-all duration-700 min-w-0 ${isCurrent ? 'ml-0 opacity-100' : 'md:ml-20 ml-8 opacity-85 hover:opacity-100'}`} >
                <JobEntry job={job} index={index} isLast={index === workExperience.length - 1} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}