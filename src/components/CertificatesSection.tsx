"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import {
  Globe, BadgeCheck, Speech, Cpu, CircuitBoard, BrainCircuit,
  MapPin, Mic, ExternalLink, Calendar, ArrowRight, Layers, Quote, Star, ChevronDown
} from "lucide-react";
import { scientificEvents, type SciEvent } from "@/lib/data";

/* =========================
   DADOS: CERTIFICAÇÕES (MANTIDOS)
   ========================= */
const certs = [
  {
    id: "semiconductors",
    title: "Digital Design & Semiconductors",
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/20",
    border: "hover:border-blue-500/30",
    items: [
        { 
            title: "Digital IC Design Fundamentals", 
            org: "Cadence Design Systems", 
            year: "2026", 
            link: "https://www.credly.com/badges/719c63f0-1b05-4400-b271-c65cde384bcc/public_url" 
          },
      { 
        title: "Semiconductor 101", 
        org: "Cadence Design Systems", 
        year: "2026", 
        link: "https://www.credly.com/badges/54ed918d-4857-4239-aace-c947ab303a53/public_url" 
      },
      { title: "Verilog HDL Advanced (Instructor-Led Training)", org: "Intel Corporation", year: "2025", link: "https://learn.altera.com/share/gamification/badges/external/a30d1263-6358-40a9-8493-b739811148d0?lang=en" },
      { title: "Beginner Altera® FPGA Designer", org: "Intel Corporation", year: "2025" },
      { title: "FPGA computing systems: Background knowledge", org: "Politecnico di Milano", year: "2025" },
    ]
  },
  {
    id: "elec",
    title: "Electronics & PCB Design",
    icon: CircuitBoard,
    color: "text-emerald-500",
    bg: "bg-emerald-500/20",
    border: "hover:border-emerald-500/30",
    items: [
      { title: "PCB Basic Design Course", org: "Altium Education", year: "2024", link: "https://education.altium.com/" },
    ]
  },
  {
    id: "ai",
    title: "Data Science & AI",
    icon: BrainCircuit,
    color: "text-purple-500",
    bg: "bg-purple-500/20",
    border: "hover:border-purple-500/30",
    items: [
      { title: "PCEP™ – Certified Entry-Level Python Programmer", org: "Python Institute", year: "2024", link: "https://www.credly.com/badges/2ad45f39-bf39-48c4-8f43-b8300d84e1a9" },
      { title: "Machine Learning, Maths & Ethics", org: "Instituto Superior Técnico", year: "2024" },
      { title: "Building AI", org: "University of Helsinki", year: "2023", link: "https://buildingai.elementsofai.com/" },
    ]
  },
  {
    id: "lang",
    title: "Languages",
    icon: Speech,
    color: "text-amber-500",
    bg: "bg-amber-500/20",
    border: "hover:border-amber-500/30",
    items: [
      { title: "German A1", org: "University of Lisbon", year: "2025" },
      { title: "First Certificate in English (B2)", org: "University of Cambridge", year: "2016" },
      { title: "English Courses (A1-B2)", org: "The Anglophil Centre", year: "2010–2016", link: "https://www.theanglophilcentre.pt/" },
    ]
  },
];

export default function CertificatesSection() {
  const [stackIndex, setStackIndex] = useState(0);
  
  const activeEvent = scientificEvents[stackIndex % scientificEvents.length];
  const nextEvent = scientificEvents[(stackIndex + 1) % scientificEvents.length];
  const thirdEvent = scientificEvents[(stackIndex + 2) % scientificEvents.length];

  const handleNextCard = () => {
    setStackIndex((prev) => prev + 1);
  };

  const totalCerts = certs.reduce((acc, curr) => acc + curr.items.length, 0);

  return (
    <section id="scientific Outreach and Certifications" className="py-12 md:py-24 relative overflow-hidden flex flex-col justify-center">
      
      {/* O BLOCO "BACKGROUND DECORATIVO" FOI REMOVIDO PARA ELIMINAR AS MANCHAS */}

      <div className="container max-w-5xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-white/5">
            <div className="flex flex-col gap-4 max-w-3xl"> 
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-4">
                    <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm shrink-0">
                        <Globe className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    Scientific Outreach
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-lg leading-relaxed ml-1">
                    A curated list of professional certifications, scientific events, and public engagement activities.
                </p>
            </div>

            <div className="hidden md:flex items-center gap-10 text-right pb-1"> 
                <div>
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">{totalCerts}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Certifications</span>
                </div>
                <div>
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">{scientificEvents.length}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1 text-center">Events</span>
                </div>
            </div>
        </div>

        {/* RESTO DO CONTEÚDO (PRESERVADO) */}
        <div className="flex items-center gap-2 mb-6 opacity-90">
            <BadgeCheck className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">Professional Certifications</h3>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
            <div className="order-1 md:order-none">
                <BentoItem cert={certs[0]} />
            </div>

            <div className="order-last md:order-none lg:col-span-2 lg:row-span-2 relative h-full min-h-[500px] md:min-h-[380px]">
                <div className="absolute inset-0 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-purple-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Events & Talks Deck</h3>
                        </div>
                        <div className="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded-md border border-zinc-200 dark:border-white/5">
                            {String(stackIndex % scientificEvents.length + 1).padStart(2, '0')} / {String(scientificEvents.length).padStart(2, '0')}
                        </div>
                    </div>

                    <div className="relative flex-1 w-full group" style={{ perspective: "1200px" }}>
                        <motion.div
                            key={`back-2-${stackIndex}`}
                            className="absolute w-full top-0 h-full origin-bottom"
                            animate={{ rotateX: -5, y: 25, z: -50, scale: 0.90, opacity: 0.3 }}
                            transition={{ duration: 0.4 }}
                        >
                            <EventCard event={thirdEvent} isBackCard isGlass />
                        </motion.div>

                        <motion.div
                            key={`back-${stackIndex}`}
                            className="absolute w-full top-0 h-full origin-bottom"
                            animate={{ rotateX: -3, y: 12, z: -25, scale: 0.95, opacity: 0.6 }}
                            transition={{ duration: 0.4 }}
                        >
                            <EventCard event={nextEvent} isBackCard isGlass />
                        </motion.div>

                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={stackIndex}
                                className="absolute inset-0 z-10 cursor-pointer active:cursor-default h-full origin-bottom"
                                initial={{ x: 50, opacity: 0, scale: 0.95, rotate: 5 }}
                                animate={{ x: 0, opacity: 1, rotate: 0, scale: 1, y: 0 }}
                                exit={{ x: -200, opacity: 0, rotate: -10, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -100) handleNextCard();
                                    if (info.offset.x > 100) setStackIndex((prev) => prev - 1);
                                }}
                                whileHover={{ rotateX: 2, scale: 1.01 }}
                            >
                                <EventCard event={activeEvent} isGlass />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute bottom-5 left-0 right-0 flex justify-center pb-0 z-30 md:absolute md:bottom-6 md:right-6 md:left-auto md:pb-0 md:justify-end">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 animate-pulse hidden md:block mr-4 mt-2">
                                Drag or Click
                            </p>
                            <button 
                                onClick={handleNextCard}
                                className="flex items-center gap-2 px-6 py-3 md:px-5 md:py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                            >
                                Next Event <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-2 md:order-none">
                <BentoItem cert={certs[1]} />
            </div>

            <div className="order-3 md:order-none">
                <BentoItem cert={certs[2]} />
            </div>

            <div className="order-4 md:order-none lg:col-span-2">
                <BentoItem cert={certs[3]} isGrid /> 
            </div>
        </div>
      </div>
    </section>
  );
}

// OS SUBCOMPONENTES (BentoItem e EventCard) MANTÊM-SE IGUAIS AO TEU CÓDIGO ORIGINAL
function BentoItem({ cert, isGrid = false }: { cert: any, isGrid?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-auto md:h-full"
        >
            <GlassCard 
                onClick={() => setIsOpen(!isOpen)}
                className={`h-full flex flex-col p-5 md:p-6 relative overflow-hidden group border-zinc-200 dark:border-white/10 transition-all duration-300 ${cert.border} cursor-pointer md:cursor-default`}
            >
                <div className={`absolute -top-4 -right-4 p-4 opacity-[0.06] group-hover:opacity-[0.26] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${cert.color}`}>
                    <cert.icon className="w-24 h-24" />
                </div>
                {cert.id === "lang" && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-3 opacity-20 group-hover:opacity-60 transition-opacity pointer-events-none">
                    <span className="text-2xl -rotate-12">🇵🇹</span>
                    <span className="text-2xl rotate-12">🇬🇧</span>
                    <span className="text-2xl -rotate-6">🇩🇪</span>
                  </div>
                )}
                <div className={`relative z-10 flex items-center justify-between transition-all duration-300 ${isOpen ? 'mb-6' : 'mb-0 md:mb-6'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${cert.bg} ${cert.color} border border-white/10 shadow-sm`}>
                            <cert.icon className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">{cert.title}</h4>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden md:!h-auto md:!opacity-100 md:!block"
                >
                    <ul className={`relative z-10 md:mt-auto pt-2 md:pt-0 ${isGrid ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}`}>
                        {cert.items.map((item: any, i: number) => (
                            <li key={i} className={`flex justify-between items-start gap-4 ${isGrid ? 'bg-transparent p-3 rounded-lg transition-colors' : 'pb-2 border-b border-zinc-100 dark:border-white/5 last:border-0 last:pb-0'}`}>
                                <div className="flex flex-col">
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-500 hover:underline decoration-dotted underline-offset-4 leading-snug block">
                                            {item.title} <ExternalLink className="inline h-3 w-3 opacity-50 ml-1 -mt-0.5" />
                                        </a>
                                    ) : (
                                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug block">{item.title}</span>
                                    )}
                                    {item.org && <span className="text-xs text-zinc-500 dark:text-zinc-500 font-medium mt-0.5">{item.org}</span>}
                                </div>
                                <span className={`shrink-0 text-[10px] font-mono font-bold text-zinc-500 bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded ${isGrid ? '' : 'mt-0.5'}`}>{item.year}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </GlassCard>
        </motion.div>
    );
}

function EventCard({ event, isBackCard = false, isGlass = false }: { event: any, isBackCard?: boolean, isGlass?: boolean }) {
    const isFeatured = event.featured;
    const bgStyle = isGlass ? "bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-xl border border-white/20 dark:border-white/10" : "bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10";
    const featuredBorder = isFeatured ? "ring-1 ring-amber-500/50 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.2)]" : "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]";
    return (
        <div className={`w-full h-full rounded-2xl select-none flex flex-col overflow-hidden transition-all duration-500 ${bgStyle} ${isBackCard ? 'grayscale opacity-70 pointer-events-none' : ''} ${featuredBorder}`}>
            <div className={`h-2 w-full opacity-90 ${isFeatured ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`} />
            <div className="p-5 md:p-6 pb-20 md:pb-6 flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 dark:bg-white/5 px-2 py-1 rounded"><Calendar className="h-3 w-3" /> {event.date}</div>
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] font-bold border border-purple-500/20 uppercase tracking-wide">{event.type}</span>
                        {isFeatured && <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"><Star className="w-2.5 h-2.5 fill-current" /></div>}
                    </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-3 md:mb-4 drop-shadow-sm">{event.title}</h3>
                <div className="flex flex-col gap-2 mb-4 md:mb-6 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2"><Mic className={`h-4 w-4 ${isFeatured ? 'text-amber-500' : 'text-purple-500'}`} /><span className="font-medium text-zinc-700 dark:text-zinc-300">{event.role}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-zinc-400" /> <span>{event.location}</span></div>
                </div>
                <div className="relative mb-4 flex-1">
                    <Quote className={`absolute -top-2 -left-1 h-6 w-6 opacity-20 ${isFeatured ? 'text-amber-500' : 'text-purple-500'}`} /><p className={`text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6 border-l-2 line-clamp-4 md:line-clamp-5 ${isFeatured ? 'border-amber-500/30' : 'border-purple-500/20'}`}>{event.description}</p>
                </div>
                {event.links && event.links.length > 0 && (
                     <div className="mt-auto pt-3 md:pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-3">
                         {event.links.map((link: any, i: number) => (
                             <a key={i} href={link.href} target="_blank" className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide ${isFeatured ? 'text-amber-600' : 'text-emerald-500'} hover:underline`}>{link.label} <ExternalLink className="h-3 w-3" /></a>
                         ))}
                     </div>
                )}
            </div>
        </div>
    );
}