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

      <div className="container max-w-[1600px] mx-auto px-6 md:px-8 relative z-10 space-y-16">
        
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

        {/* =========================================================
            PARTE 1: CERTIFICAÇÕES (Blue Theme)
           ========================================================= */}
        <div>
            <div className="flex items-center gap-3 mb-6 px-1">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <BadgeCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Certifications</h3>
            </div>

            {/* MUDANÇA 1: gap-4 -> gap-3 (Aproximar cartões) */}
            <div className="
              flex overflow-x-auto gap-3 snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-blue-500/10
              md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
            ">
                {certifications.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        /* MUDANÇA 2: min-w-[85vw] -> min-w-[78vw] (Mostrar o próximo cartão) */
                        className="min-w-[78vw] md:min-w-0 snap-center flex"
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
            PARTE 2: EVENTOS CIENTÍFICOS (Purple Theme)
           ========================================================= */}
        <div>
            <div className="flex items-center gap-3 mb-6 px-1">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Speech className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Scientific Events</h3>
                <button 
                  onClick={() => setShowAllEvents(!showAllEvents)}
                  className="ml-auto text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {showAllEvents ? "Show Less" : "View All"}
                </button>
            </div>

            {/* MUDANÇA 1: gap-4 -> gap-3 */}
            <div className="
              flex overflow-x-auto gap-3 snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-purple-500/10
              md:grid md:grid-cols-1 xl:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
            ">
                <AnimatePresence>
                    {visibleEvents.map((ev, idx) => (
                        <motion.div 
                            key={ev.title + idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            /* MUDANÇA 2: min-w-[85vw] -> min-w-[78vw] */
                            className="min-w-[78vw] md:min-w-0 snap-center flex"
                        >
                            <GlassCard className="
                                group relative w-full p-5 rounded-xl border border-zinc-200 dark:border-white/5 
                                bg-white/50 dark:bg-white/5 backdrop-blur-md
                                hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5
                            ">
                                {/* Cabeçalho do Cartão */}
                                <div className="flex justify-between items-start mb-3 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
                                            {ev.date}
                                        </span>
                                        <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {ev.title}
                                        </h4>
                                    </div>
                                    {ev.role && (
                                        <div className="shrink-0 p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                            <RoleIcon type={ev.type} />
                                        </div>
                                    )}
                                </div>

                                {/* Localização e Org */}
                                <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4 border-b border-zinc-200 dark:border-white/5 pb-3">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {ev.location}
                                    </div>
                                    {ev.org && (
                                        <div className="flex items-center gap-1 truncate max-w-[200px]">
                                            <Building2 className="h-3 w-3" />
                                            {ev.org}
                                        </div>
                                    )}
                                </div>

                                {/* Descrição */}
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                                    {ev.description}
                                </p>

                                {/* Rodapé (Tags + Links) */}
                                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                                    <div className="flex gap-2">
                                        {ev.tags?.slice(0, 2).map(t => (
                                            <span key={t} className="text-[10px] font-medium text-zinc-400 border border-zinc-200 dark:border-white/10 px-1.5 py-0.5 rounded">
                                                #{t}
                                            </span>
                                        ))}
                                    </div>

                                    {ev.links && (
                                        <div className="flex gap-3">
                                            {ev.links.map((lnk, i) => (
                                                <a key={i} href={lnk.href} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-500 transition-colors">
                                                    <LinkIconHelper kind={lnk.kind} />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

      </div>
    </section>
  );
}