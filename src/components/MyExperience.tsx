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
    <div className="relative flex-1 md:flex-none min-w-0">
      <a href={href} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`group w-full flex items-center justify-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-lg border transition-all duration-300 ${colorClass}`} >
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider truncate">{text}</span>
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

/* ========================= MICRO-COMPONENTE: BADGE DE TIPO DE AMBIENTE (SÓ DESKTOP) ========================= */
const EnvironmentBadge = ({ type }: { type: 'Academic' | 'Industry' }) => (
  <span className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-black tracking-tighter border shrink-0 ${type === 'Academic' ? 'bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400'} `}>
    {type === 'Academic' ? <GraduationCap className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
    {type}
  </span>
);

/* ========================= MICRO-COMPONENTE: ENTRADA DE TRABALHO (JOB ENTRY) ========================= */
const JobEntry = ({ job, index, isLast }: { job: any, index: number, isLast: boolean }) => {
  const isCurrent = job.period.toLowerCase().includes('present');
  const [activeTab, setActiveTab] = useState<'projects' | 'key impact' | null>(null);
  
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

  const renderCompanyBlock = (name: string, url: string, location: string, logo: string | null, isAcademic: boolean, courses?: any[]) => (
    <div className="flex items-start gap-2 md:gap-3.5 group min-w-0 w-full">
      {/* LOGO REFINADO NO DESKTOP */}
      {logo && (
        <div className="relative z-10 w-7 h-7 md:w-10 md:h-10 rounded-md md:rounded-lg bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/10 flex items-center justify-center p-1 shadow-sm shrink-0 mt-0.5">
          <img src={logo} alt={name} className="w-full h-full object-contain" />
        </div>
      )}
      
      <div className="flex flex-col flex-1 min-w-0 w-full">
        {/* NOME DA EMPRESA (Tamanho refinado no desktop: text-base) */}
        <div className="min-w-0">
          <a href={url || "#"} target="_blank" rel="noopener noreferrer" className={`inline text-xs md:text-base font-bold hover:underline leading-tight ${isAcademic ? 'text-blue-500 md:text-blue-600 dark:text-blue-400' : 'text-amber-500 md:text-amber-600 dark:text-amber-400'}`}>
            {renderCompanyName(name)}
            <ExternalLink className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 opacity-50 ml-1.5 align-baseline relative -top-[1px]" />
          </a>
        </div>
        
        {/* INFO CONTEXTUAL: DESKTOP */}
        <div className="hidden md:flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 min-w-0">
          <EnvironmentBadge type={isAcademic ? "Academic" : "Industry"} />
          <span className="flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 min-w-0">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{location}</span>
          </span>
        </div>

        {/* INFO CONTEXTUAL: MOBILE */}
        <div className="flex md:hidden items-center gap-1.5 mt-1 text-[9px] text-zinc-500 dark:text-zinc-400 font-medium min-w-0">
          <span className="flex items-center gap-1 shrink-0">
            {isAcademic ? <GraduationCap className="w-2.5 h-2.5" /> : <Building2 className="w-2.5 h-2.5" />}
            {isAcademic ? "Academic" : "Industry"}
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
          <span className="flex items-center gap-0.5 truncate min-w-0">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{location}</span>
          </span>
        </div>
        
        {/* UNIDADES CURRICULARES */}
        {courses && courses.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-1.5 w-full">
            {courses.map((course: any, idx: number) => (
              <a 
                key={idx} 
                href={course.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2 py-0.5 md:py-1 rounded-md bg-yellow-600/5 md:bg-yellow-600/10 text-[9px] md:text-xs font-medium text-yellow-600 dark:text-[#c4b59b] border border-yellow-600/10 md:border-yellow-600/20 hover:bg-yellow-600/20 hover:underline transition-all group/course max-w-full"
              >
                <BookOpen className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                <span className="truncate">{course.name}</span>
                <ExternalLink className="w-2 h-2 md:w-2.5 md:h-2.5 opacity-40 group-hover/course:opacity-100 transition-opacity shrink-0" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <TimelineItem index={index} isLast={isLast} period={job.period} isCurrent={isCurrent} title={
      <div className="flex flex-col gap-1 md:gap-1.5 min-w-0">
        <div className="flex items-center">
          <div className={` flex items-center gap-1.5 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md text-[9px] md:text-xs font-bold uppercase tracking-wider border transition-colors duration-300 ${isCurrent ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'} `}>
            <Calendar className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isCurrent ? 'text-emerald-500' : 'text-zinc-400'}`} />
            <span>{job.period}</span>
            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />}
          </div>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          {/* CARGO: Reduzido subtilmente no Desktop para text-xl */}
          <span className="text-[15px] md:text-xl font-extrabold text-zinc-900 dark:text-white leading-tight break-words">{job.position}</span>
        </div>
      </div>
    } subtitle={
      <div className="mt-2 md:mt-3 pl-0 md:pl-4 relative pb-5 md:pb-8 min-w-0 w-full">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 lg:items-start justify-between w-full min-w-0">
          
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-1.5 md:gap-3 min-w-0 w-full">
              {Array.isArray(job.companyLinks) ? (
                job.companyLinks.map((link: any, i: number) => {
                  const isAcademic = !link.name.toLowerCase().includes("lightenjin");
                  const currentLogo = Array.isArray(job.logos) ? job.logos[i] : (i === 0 ? job.logos : null);
                  const currentCourses = (hasCourses && i === 0) ? job.courses : undefined;
                  return (
                    <div key={i} className="min-w-0 w-full">
                      {renderCompanyBlock(link.name, link.url, link.location?.city || "Portugal", currentLogo, isAcademic, currentCourses)}
                    </div>
                  );
                })
              ) : (
                <div className="min-w-0 w-full">
                  {(() => {
                    const isAcademic = !job.company.toLowerCase().includes("lightenjin");
                    const currentLogo = Array.isArray(job.logos) ? job.logos[0] : job.logos;
                    const loc = typeof job.location === 'string' ? job.location : job.location.city;
                    return renderCompanyBlock(job.company, job.url, loc, currentLogo, isAcademic, hasCourses ? job.courses : undefined);
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* BOTÕES */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 shrink-0 mt-2 lg:-mt-10 relative z-10 w-full lg:w-36 lg:ml-auto">
            {hasProjects && (
              <button onClick={() => toggleTab('projects')} className={`flex items-center justify-center lg:justify-between gap-1.5 py-1.5 px-2 md:py-2 md:px-3.5 rounded-md md:rounded-lg border text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 w-full min-w-0 ${activeTab === 'projects' ? 'bg-blue-600 text-white border-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-500'} `} >
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileText className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                  <span className="truncate">Projects</span>
                </div>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-300 hidden lg:block ${activeTab === 'projects' ? 'rotate-180' : ''}`} />
              </button>
            )}
            {hasImpact && (
              <button onClick={() => toggleTab('key impact')} className={`flex items-center justify-center lg:justify-between gap-1.5 py-1.5 px-2 md:py-2 md:px-3.5 rounded-md md:rounded-lg border text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 w-full min-w-0 ${activeTab === 'key impact' ? 'bg-emerald-600 text-white border-emerald-700 shadow-[0_0_15px_rgba(5,150,105,0.3)]' : 'bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500'} `} >
                <div className="flex items-center gap-1.5 min-w-0">
                  <BarChart3 className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                  <span className="truncate">Key Impact</span>
                </div>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-300 hidden lg:block ${activeTab === 'key impact' ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 md:mt-3 overflow-hidden min-w-0">
              <div className={`p-3 md:p-5 rounded-lg md:rounded-xl border backdrop-blur-sm ${activeTab === 'projects' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                <ul className="space-y-2 md:space-y-2.5">
                  {(activeTab === 'projects' ? job.projecttitle : job.achievements).map((item: string, i: number) => {
                    const parts = item.split(':');
                    const isProjectStyle = parts.length > 1 && (item.includes('Project') || item.includes('Area'));
                    return (
                      <li key={i} className="text-[10px] md:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed w-full flex gap-2 md:gap-3 items-start text-justify">
                        <span className={`mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full shrink-0 ${activeTab === 'projects' ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`} />
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
          <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[1px] md:h-[2px] bg-zinc-200/30 dark:bg-white/5 overflow-hidden rounded-full">
            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: isCurrent ? 2.5 : 5, repeat: Infinity, ease: "linear", delay: index * 0.8 }} className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-current to-transparent ${isCurrent ? 'via-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] text-emerald-500' : 'via-zinc-400/50 shadow-[0_0_8px_rgba(161,161,170,0.3)] text-zinc-400'} `} />
          </div>
        )}
      </div>
    } />
  );
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container max-w-8xl mx-auto px-4 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-4 md:mb-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 min-w-0">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-2 md:gap-3">
              <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                <Briefcase className="h-5 w-5 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Experience
            </h2>
            
            <div className="flex w-full md:w-auto gap-2 md:gap-3 shrink-0">
              <NavButtonWithTooltip href="#map" icon={MapPin} text="Global Footprint" tooltip="Interactive map of my research, conferences and academic reach" colorClass="border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" />
              <NavButtonWithTooltip href="#timeline" icon={ChartGantt} text="Timeline" tooltip="Visual roadmap of my academic career" colorClass="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400" />
            </div>
          </div>
        </MotionWrapper>

        <div className="grid gap-0 md:gap-0 min-w-0">
          {workExperience.map((job, index) => {
            const isCurrent = job.period.toLowerCase().includes('present');
            return (
              <div key={`${job.position}-${index}`} className={`transition-all duration-700 min-w-0 ${isCurrent ? 'ml-0 opacity-100' : 'md:ml-20 ml-3 opacity-85 hover:opacity-100'}`} >
                <JobEntry job={job} index={index} isLast={index === workExperience.length - 1} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}