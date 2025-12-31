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

// 👇 IMPORTA OS DADOS DO FICHEIRO CENTRAL
import { scientificEvents, type SciEvent, type LinkItem } from "@/lib/data";

/* =========================
   TIPOS (CertItem mantém-se local pois é só usado aqui)
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
   DADOS (CERTIFICAÇÕES - Estas mantêm-se aqui pois são específicas desta secção)
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
    <section id="scientific Outreach and Certifications" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10 space-y-20">
        
        {/* CABEÇALHO */}
        <MotionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white gap-4 mb-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            Scientific Outreach & Certifications
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 ml-1 md:ml-[4.5rem] max-w-2xl">
            A curated list of professional certifications, scientific events, and public engagement activities.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* ESQUERDA: CERTIFICAÇÕES */}
            <div className="lg:col-span-5 space-y-8">
                <MotionWrapper delay={0.1}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <BadgeCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Certifications</h3>
                        <span className="ml-auto text-xs font-medium text-zinc-400 uppercase tracking-wide">[Selection]</span>
                    </div>

                    <div className="space-y-4">
                        {certifications.map((cat, idx) => (
                            <GlassCard 
                                key={idx}
                                className="
                                    group p-5 rounded-xl border border-zinc-200 dark:border-white/5 
                                    bg-white/50 dark:bg-white/5 backdrop-blur-sm
                                    hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300
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
                        ))}
                    </div>
                </MotionWrapper>
            </div>

            {/* DIREITA: EVENTOS CIENTÍFICOS */}
            <div className="lg:col-span-7 space-y-8">
                <MotionWrapper delay={0.2}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <Speech className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Scientific Events</h3>
                        <span className="ml-auto text-xs font-medium text-zinc-400 uppercase tracking-wide">[Selection]</span>
                    </div>

                    <div className="relative border-l border-zinc-200 dark:border-white/10 ml-3 space-y-8 pb-12">
                        
                        {visibleEvents.map((ev, idx) => (
                            <motion.div 
                                key={ev.title + idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative pl-8 group"
                            >
                                {/* Bolinha da Timeline */}
                                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 border border-white dark:border-zinc-900 group-hover:bg-purple-500 group-hover:scale-125 transition-all duration-300 shadow-sm" />
                                
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
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

                        {!showAllEvents && (
                          <div className="absolute bottom-10 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 dark:from-[#09090b] to-transparent pointer-events-none z-10" />
                        )}

                        <div className="absolute bottom-0 left-8 right-0 flex justify-center z-20">
                            <button 
                                onClick={() => setShowAllEvents(!showAllEvents)}
                                className="
                                    group flex items-center gap-2 px-5 py-2 rounded-full 
                                    bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 
                                    text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300
                                    hover:bg-purple-500 hover:border-purple-500 hover:text-white 
                                    dark:hover:bg-purple-500 dark:hover:border-purple-500 dark:hover:text-white
                                    transition-all duration-300 shadow-sm
                                "
                            >
                                {showAllEvents ? (
                                    <>
                                        Show Featured Only <ChevronUp className="h-4 w-4" />
                                    </>
                                ) : (
                                    <>
                                        Show Full Timeline <ChevronDown className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </MotionWrapper>
            </div>

        </div>
      </div>
    </section>
  );
}