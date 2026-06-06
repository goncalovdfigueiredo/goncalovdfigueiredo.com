// src/components/ScientificOutreachSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scientificEvents } from "@/lib/data";
import { 
  ChevronRight, Cpu, CircuitBoard, BrainCircuit, Speech, Layers, Globe,
  Calendar, Star, Mic, MapPin, Quote, ExternalLink, BadgeCheck, ArrowLeft
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";

// =======================
// DADOS (CERTIFICAÇÕES)
// =======================

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
        { title: "Fundamentals of PCB Material Selection and Stack-Up Design", org: "Sierra Circuits", year: "2026" },
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
        { title: "🇩🇪 German A1", org: "University of Lisbon", year: "2025" },
        { title: "🇬🇧 First Certificate in English (B2)", org: "University of Cambridge", year: "2016" },
        { title: "🇬🇧 English Courses (A1-B2)", org: "The Anglophil Centre", year: "2010–2016", link: "https://www.theanglophilcentre.pt/" },
      ]
    },
  ];

// =======================
// CORNER BRACKETS TECH
// =======================
const TechCorners = () => (
  <>
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-400 dark:border-emerald-600" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-400 dark:border-emerald-600" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-400 dark:border-emerald-600" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-400 dark:border-emerald-600" />
  </>
);

export default function ScientificOutreachSection() {
  // Nível 1: Root Module
  const [activeModule, setActiveModule] = useState<"certs" | "events">("certs");
  
  // Nível 2: Selection Index
  const [activeCertId, setActiveCertId] = useState(certs[0].id);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // NOVO: Estado para gerir qual Coluna está visível no Mobile
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3>(1);

  const totalCerts = certs.reduce((acc, curr) => acc + curr.items.length, 0);

  // Módulos
  const modules = [
    { id: "certs", label: "CERTIFICATIONS", icon: BadgeCheck },
    { id: "events", label: "EVENTS & TALKS", icon: Layers },
  ] as const;

  // Dados Selecionados (Nível 3)
  const activeCertCategory = certs.find(c => c.id === activeCertId) || certs[0];
  const activeEventData = scientificEvents[activeEventIndex] || scientificEvents[0];

  // Lógica para avançar no telemóvel
  const handleRootClick = (id: "certs" | "events") => {
    setActiveModule(id);
    if (window.innerWidth < 1024) setMobileStep(2);
  };

  const handleIndexClick = (idOrIndex: any, type: "cert" | "event") => {
    if (type === "cert") setActiveCertId(idOrIndex);
    if (type === "event") setActiveEventIndex(idOrIndex);
    if (window.innerWidth < 1024) setMobileStep(3);
  };

  return (
    // 👇 Secção imaculada como me enviaste
    <section id="scientific Outreach and Certifications" className="py-20 md:py-24 relative overflow-hidden">
      
      {/* Background Consistente (Idêntico ao das Publicações) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-8xl mx-auto px-4 md:px-8 relative z-10 flex flex-col h-full">
        
        <MotionWrapper>
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
                <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                  <Globe className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                Scientific Outreach
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
                A curated list of professional certifications, scientific events, and public engagement activities.
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-right pt-2 pr-2"> 
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white leading-none">{totalCerts}</span>
                <span className="text-[16px] font-bold uppercase tracking-widest text-zinc-500 mt-2">Certifications</span>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white leading-none">{scientificEvents.length}</span>
                <span className="text-[16px] font-bold uppercase tracking-widest text-zinc-500 mt-2">Events</span>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* GRID DE 3 COLUNAS (TECH DASHBOARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-grow">
          
          {/* ================= COLUNA 1: ROOT MODULE ================= */}
          <div className={`lg:col-span-3 flex flex-col relative p-4 border border-emerald-400 dark:border-emerald-800/50 ${mobileStep !== 1 ? 'hidden lg:flex' : 'flex'}`}>
            <TechCorners />
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
              // 1. ROOT_MODULE
            </p>
            
            <div className="flex flex-col lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {modules.map((mod) => {
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleRootClick(mod.id)}
                    className={`
                      relative px-4 py-3 flex items-center justify-between font-mono text-sm font-bold uppercase transition-all duration-200 border min-w-[200px] lg:min-w-0
                      ${isActive 
                        ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                        : "bg-transparent border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <mod.icon className="w-4 h-4" />
                      {mod.label}
                    </div>
                    {/* A seta aparece no mobile mesmo se não estiver ativo, para indicar que dá para clicar */}
                    <ChevronRight className={`w-4 h-4 opacity-70 ${isActive ? 'block' : 'block lg:hidden'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-8 hidden lg:block">
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 mb-1.5">
                <span>SYS_UPTIME</span>
                <span className="text-emerald-500">99.9%</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 mb-4">
                <div className="bg-emerald-500 h-full w-[99.9%]" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>DB_SYNC</span>
                <span className="text-blue-500">CONNECTED</span>
              </div>
            </div>
          </div>

          {/* ================= COLUNA 2: SELECTION INDEX ================= */}
          <div className={`lg:col-span-4 flex flex-col relative p-4 min-h-[300px] border border-emerald-400 dark:border-emerald-800/50 ${mobileStep !== 2 ? 'hidden lg:flex' : 'flex'}`}>
            <TechCorners />
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                // 2. SELECTION INDEX
              </p>
              {/* Botão VOLTAR (só mobile) */}
              <button onClick={() => setMobileStep(1)} className="lg:hidden flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                <ArrowLeft className="w-3 h-3" /> BACK
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 flex flex-col gap-2">
              <AnimatePresence mode="wait">
                
                {/* LISTA CERTIFICAÇÕES */}
                {activeModule === "certs" && (
                  <motion.div key="index-certs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                    {certs.map((cert) => {
                      const isActive = activeCertId === cert.id;
                      return (
                        <button 
                          key={cert.id} 
                          onClick={() => handleIndexClick(cert.id, "cert")}
                          className={`
                            text-left p-3 border flex items-center justify-between font-mono transition-all duration-200
                            ${isActive 
                              ? "bg-blue-600/20 border-blue-500/50" 
                              : "bg-transparent border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <cert.icon className={`w-6 h-6 ${isActive ? "text-blue-500" : "text-zinc-500"}`} />
                            <div className="flex flex-col">
                              <span className={`text-sm md:text-[16px] font-bold truncate max-w-[260px] ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                                {cert.title}
                              </span>
                              <span className="text-[11px] text-zinc-500">{cert.items.length} Certifications</span>
                            </div>
                          </div>
                          <ChevronRight className={`w-3 h-3 text-blue-500 ${isActive ? 'block' : 'block lg:hidden'}`} />
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* LISTA EVENTOS */}
                {activeModule === "events" && (
                  <motion.div key="index-events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                    {scientificEvents.map((ev, idx) => {
                      const isActive = activeEventIndex === idx;
                      return (
                        <button 
                          key={idx} 
                          onClick={() => handleIndexClick(idx, "event")}
                          className={`
                            text-left p-3 border flex items-center justify-between font-mono transition-all duration-200
                            ${isActive 
                              ? "bg-purple-600/20 border-purple-500/50" 
                              : "bg-transparent border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"}
                          `}
                        >
                          <div className="flex flex-col w-full pr-2">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{ev.date}</span>
                                {ev.featured && <Star className="w-2.5 h-2.5 text-purple-500 fill-purple-500" />}
                            </div>
                            <span className={`text-[11px] font-bold line-clamp-2 leading-snug ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                              {ev.title}
                            </span>
                          </div>
                          <ChevronRight className={`w-3 h-3 text-purple-500 ${isActive ? 'block' : 'block lg:hidden'}`} />
                        </button>
                      );
                    })}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* ================= COLUNA 3: SYSTEM DETAILS ================= */}
          <div className={`lg:col-span-5 flex flex-col relative p-4 md:p-6 min-h-[450px] border border-emerald-400 dark:border-emerald-800/50 ${mobileStep !== 3 ? 'hidden lg:flex' : 'flex'}`}>
            <TechCorners />
            
            <div className="flex justify-between items-center mb-6 border-b border-zinc-300 dark:border-zinc-800 pb-2">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                // 3. SYSTEM_DETAILS
              </p>
              {/* Botão VOLTAR (só mobile) */}
              <button onClick={() => setMobileStep(2)} className="lg:hidden flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  <ArrowLeft className="w-3 h-3" /> BACK
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
              <AnimatePresence mode="wait">

                {/* DETALHE CERTIFICAÇÃO */}
                {activeModule === "certs" && (
                  <motion.div key={`det-cert-${activeCertId}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 border rounded-lg ${activeCertCategory.bgActive} shadow-sm`}>
                        <activeCertCategory.icon className={`w-6 h-6 ${activeCertCategory.color}`} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-base md:text-lg font-bold font-mono text-zinc-900 dark:text-white">
                          {activeCertCategory.title}
                        </h3>
                        <span className="text-[9px] font-mono text-zinc-500">CERT_DETECTED: {activeCertCategory.items.length}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                    {activeCertCategory.items.map((item: any, i: number) => (
  <div key={i} className="group relative p-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all rounded-lg flex justify-between items-center">
    
    <div className="flex flex-col gap-1.5 overflow-hidden">
      {/* Título com Link à esquerda */}
      <div className="flex items-start gap-2">
        {item.link ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link">
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-blue-400 group-hover/link:text-emerald-500 transition-colors" />
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200 hover:text-emerald-500 transition-colors leading-tight">
              {item.title}
            </span>
          </a>
        ) : (
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200 leading-tight">
            {item.title}
          </span>
        )}
      </div>

      {/* Instituição com ponto uniforme */}
      {item.org && (
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500/80 truncate">
            {item.org}
          </span>
        </div>
      )}
    </div>
    
    {/* Ano (Alinhado à direita, mantido fixo) */}
    <div className="text-[10px] font-mono bg-zinc-200 dark:bg-black px-2 py-1 rounded text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-800 shrink-0 ml-4">
      {item.year}
    </div>
  </div>
))}
                    </div>
                  </motion.div>
                )}

                {/* DETALHE EVENTO */}
                {activeModule === "events" && (
                  <motion.div key={`det-ev-${activeEventIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full font-mono">
                    
                    <div className="flex justify-between items-start mb-4">
                       <span className="px-2 py-1 border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] uppercase tracking-widest font-bold">
                         {activeEventData.type}
                       </span>
                       {activeEventData.featured && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-4">
                      {activeEventData.title}
                    </h3>
                    
                    
                    <div className="flex flex-col gap-2 mb-6 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                      <div className="flex items-center gap-2">
                        <Mic className="w-3.5 h-3.5 text-emerald-500" /> 
                        <span> {activeEventData.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" /> 
                        <span> {activeEventData.location}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-400 leading-relaxed mb-6">
                      <span className="text-purple-500 block mb-1 opacity-70">&gt; DESCRIPTION_LOG</span>
                      {activeEventData.description}
                    </div>

                    {activeEventData.links && activeEventData.links.length > 0 && (
                    <div className="mt-auto pt-4 border-t border-zinc-300 dark:border-zinc-800 flex flex-wrap gap-3">
                      {activeEventData.links.map((link: any, i: number) => (
                        <a 
                          key={i} 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group flex items-center gap-1.5 px-3 py-1.5 text-[16px] font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                        >
                          {link.label} <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}