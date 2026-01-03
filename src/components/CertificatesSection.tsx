"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import {
  Globe,
  BadgeCheck,
  Speech,
  Cpu,          
  CircuitBoard, 
  BrainCircuit, 
  MapPin,
  Building2,
  Mic,
  Megaphone,
  Newspaper,
  ExternalLink,
  FileText,
  Video,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import { scientificEvents, type SciEvent, type LinkItem } from "@/lib/data";

/* =========================
   TIPOS
   ========================= */
type CertItem = {
  title: string;
  year?: string | number;
  link?: string;
};

type CertCategory = {
  category: string;
  items: CertItem[];
  icon: any; 
};

/* =========================
   DADOS (CERTIFICAÇÕES)
   ========================= */
const certifications: CertCategory[] = [
  {
    category: "FPGA & Digital Design", 
    icon: Cpu,
    items: [
      { title: "Verilog HDL Advanced (Instructor-Led Training) — Intel Corporation", year: 2025 },
      { title: "Beginner Altera® FPGA Designer — Intel Corporation", year: 2025 },
      { title: "FPGA computing systems: Background knowledge — Politecnico di Milano", year: 2025 },
    ],
  },
  {
    category: "Electronics & PCB Design", 
    icon: CircuitBoard,
    items: [
      { title: "PCB Basic Design Course — Altium Education", year: 2024, link: "https://education.altium.com/" },
    ],
  },
  {
    category: "Data Science & AI", 
    icon: BrainCircuit,
    items: [
      { title: "PCEP™ – Certified Entry-Level Python Programmer", year: 2024, link: "https://pythoninstitute.org/pcep" },
      { title: "Machine Learning, Maths & Ethics — IST", year: 2024 },
      { title: "Building AI — University of Helsinki", year: 2023, link: "https://buildingai.elementsofai.com/" },
    ],
  },
  {
    category: "Languages",
    icon: Speech,
    items: [
      { title: "German A1 — University of Lisbon", year: 2025 },
      { title: "First Certificate in English (B2) — Cambridge", year: 2016 },
      { title: "English Courses (A1-B2)", year: "2010–2016", link: "https://www.theanglophilcentre.pt/" },
    ],
  },
];

/* Icons Helpers */
function RoleIcon({ type }: { type: SciEvent["type"] }) {
  const c = "h-3.5 w-3.5";
  switch (type) {
    case "Seminar": return <Mic className={c} />;
    case "Congress": return <Megaphone className={c} />;
    case "Press": return <Newspaper className={c} />;
    case "Record": default: return <BadgeCheck className={c} />;
  }
}

function LinkIconHelper({ kind }: { kind?: LinkItem["kind"] }) {
  const c = "h-3 w-3";
  switch (kind) {
    case "press": return <Newspaper className={c} />;
    case "video": return <Video className={c} />;
    case "slides": return <FileText className={c} />;
    case "post": return <LinkIcon className={c} />;
    case "site": default: return <ExternalLink className={c} />;
  }
}

export default function CertificatesSection() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  const visibleEvents = showAllEvents 
    ? scientificEvents 
    : scientificEvents.filter(ev => ev.featured);

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      {/* CORREÇÃO AQUI: 
         Mudei de max-w-[1600px] para max-w-6xl.
         Isto volta a "apertar" o conteúdo para a largura original que gostavas.
      */}
      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10 space-y-12">
        
        {/* CABEÇALHO */}
        <MotionWrapper>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-4 mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                  <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Scientific Outreach & Certifications
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 ml-1 md:ml-[4.5rem] max-w-2xl text-lg leading-relaxed">
              A curated list of professional certifications, scientific events, and public engagement activities.
            </p>
          </div>
        </MotionWrapper>

        {/* LAYOUT GRID: ESQUERDA (Certificados) | DIREITA (Eventos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* =========================================================
                COLUNA ESQUERDA: CERTIFICAÇÕES
               ========================================================= */}
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 px-1">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <BadgeCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Certifications</h3>
                </div>

                {/* HÍBRIDO: 
                   Mobile: flex + overflow-x-auto (Slider)
                   Desktop (lg): flex-col (Lista Vertical)
                */}
                <div className="
                  flex overflow-x-auto gap-3 snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-blue-500/10
                  lg:flex-col lg:pb-0 lg:mx-0 lg:px-0 lg:overflow-visible lg:gap-4
                ">
                    {certifications.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="min-w-[78vw] lg:min-w-0 lg:w-full snap-center flex"
                        >
                            <GlassCard 
                                className="
                                    group w-full p-5 rounded-xl border border-zinc-200 dark:border-white/5 
                                    bg-white/50 dark:bg-white/5 backdrop-blur-sm
                                    hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5
                                "
                            >
                                <div className="flex items-center gap-3 mb-4 border-b border-zinc-200 dark:border-white/5 pb-3">
                                    <cat.icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200">
                                        {cat.category}
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    {cat.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-start gap-3">
                                            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300 leading-snug">
                                                {item.link ? (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline decoration-blue-500/30 underline-offset-2 transition-all">
                                                        {item.title}
                                                    </a>
                                                ) : item.title}
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-blue-400 dark:text-blue-500 bg-zinc-100 dark:bg-black/20 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5 shrink-0">
                                                {item.year}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* =========================================================
                COLUNA DIREITA: EVENTOS CIENTÍFICOS
               ========================================================= */}
            <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 px-1">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <Speech className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Scientific Events</h3>
                    
                    {/* Botões Toggle */}
                    <button 
                      onClick={() => setShowAllEvents(!showAllEvents)}
                      className="hidden lg:block ml-auto text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {showAllEvents ? "Show Less" : "View All"}
                    </button>
                    <button 
                      onClick={() => setShowAllEvents(!showAllEvents)}
                      className="lg:hidden ml-auto text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {showAllEvents ? "Less" : "All"}
                    </button>
                </div>

                {/* --- MODO MOBILE: SLIDER HORIZONTAL (CARDS) --- */}
                <div className="lg:hidden flex overflow-x-auto gap-3 snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-purple-500/10">
                   {visibleEvents.map((ev, idx) => (
                      <div key={idx} className="min-w-[78vw] snap-center flex">
                         <GlassCard className="w-full p-5 rounded-xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md">
                            <div className="flex justify-between items-start mb-3 gap-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">{ev.date}</span>
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">{ev.title}</h4>
                                </div>
                                {ev.role && (
                                    <div className="shrink-0 p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                        <RoleIcon type={ev.type} />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4 pb-3 border-b border-zinc-200 dark:border-white/5">
                                <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</div>
                            </div>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">{ev.description}</p>
                            <div className="flex gap-3 mt-auto">
                                {ev.links?.map((lnk, i) => (
                                    <a key={i} href={lnk.href} target="_blank" className="text-zinc-400 hover:text-purple-500 transition-colors">
                                        <LinkIconHelper kind={lnk.kind} />
                                    </a>
                                ))}
                            </div>
                         </GlassCard>
                      </div>
                   ))}
                </div>

                {/* --- MODO DESKTOP: TIMELINE VERTICAL (ORIGINAL) --- */}
                <div className="hidden lg:block relative border-l border-zinc-200 dark:border-white/10 ml-3 space-y-8 pb-12 pl-8">
                    <AnimatePresence>
                        {visibleEvents.map((ev, idx) => (
                            <motion.div 
                                key={ev.title + idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="relative group"
                            >
                                {/* Bolinha da Timeline */}
                                <div className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 border border-white dark:border-zinc-900 group-hover:bg-purple-500 group-hover:scale-125 transition-all duration-300 shadow-sm" />
                                
                                <div className="flex items-baseline justify-between gap-1 mb-1">
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {ev.title}
                                    </h4>
                                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-500 shrink-0">
                                        {ev.date}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                                    {ev.role && (
                                        <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/5">
                                            <RoleIcon type={ev.type} />
                                            {ev.role}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {ev.location}
                                    </div>
                                    {ev.org && (
                                        <div className="flex items-center gap-1">
                                            <Building2 className="h-3 w-3" />
                                            {ev.org}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:border-purple-500/20 transition-colors">
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
                                        {ev.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                                        <div className="flex gap-2">
                                            {ev.tags?.map(t => (
                                                <span key={t} className="text-[10px] font-medium text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-white/10 px-1.5 py-0.5 rounded">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>

                                        {ev.links && (
                                            <div className="flex gap-2">
                                                {ev.links.map((lnk, i) => (
                                                    <a key={i} href={lnk.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline decoration-emerald-500/30 underline-offset-2">
                                                        <LinkIconHelper kind={lnk.kind} />
                                                        {lnk.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Gradiente do Show Less/More */}
                    {!showAllEvents && (
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 dark:from-[#09090b] to-transparent pointer-events-none z-10" />
                    )}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}