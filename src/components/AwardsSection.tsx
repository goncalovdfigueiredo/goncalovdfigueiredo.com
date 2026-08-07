"use client"; import React, { useState, useEffect } from "react"; import { awards, featuredIn } from "@/lib/data"; import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion"; import { Trophy, Calendar, Building2, Globe, Layers, FileText, Newspaper, Mic, Tv, ArrowUpRight, Dumbbell, Activity, Languages, Brain, Flag, Gauge, Timer, Footprints, Zap, Terminal, Car, Clock, ChevronDown, ChevronRight, Plus, X, Speech } from "lucide-react"; import MotionWrapper from "./MotionWrapper"; import { GlassCard } from "./ui/glass-card";

const F1StartingLights = () => {
  const [lights, setLights] = useState(0);
  const [phase, setPhase] = useState(1);
  const [speed, setSpeed] = useState(0);



  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        setPhase(1);
        setLights(0);
        setSpeed(0);
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) break;
        
        setPhase(2);
        await new Promise(res => setTimeout(res, 2500));
        if (!isMounted) break;
        
        setPhase(3);
        await new Promise(res => setTimeout(res, 1000));
        if (!isMounted) break;
        
        setPhase(4);
        for (let i = 1; i <= 5; i++) {
          setLights(i);
          await new Promise(res => setTimeout(res, 800));
          if (!isMounted) break;
        }
        if (!isMounted) break;
        
        setPhase(5);
        await new Promise(res => setTimeout(res, 800 + Math.random() * 1000));
        if (!isMounted) break;
        
        setPhase(6);
        setSpeed(285);
        await new Promise(res => setTimeout(res, 3000));
        if (!isMounted) break;
        
        setPhase(7);
        setLights(0);
        setSpeed(0);
        await new Promise(res => setTimeout(res, 2000));
      }
    };
    sequence();
    return () => {
      isMounted = false;
    };
  }, []);

  // Simulação de pequenas variações no velocímetro quando o carro arranca (Phase 6)
  useEffect(() => {
    if (phase !== 6) return;
    const interval = setInterval(() => {
      setSpeed(prev => Math.floor(280 + Math.random() * 12));
    }, 150);
    return () => clearInterval(interval);
  }, [phase]);

  // Cálculo SVG para o half progress gauge (arco de 180 graus)
  const radius = 42;
  const circumference = Math.PI * radius;
  const progressRatio = speed / 320;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      {/* SEÇÃO DO SEMÁFORO */}
      <div className={`flex gap-1 bg-black/40 p-1.5 rounded border border-white/5 backdrop-blur-sm transition-all duration-500 ${phase === 7 ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-800" />
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${lights >= i ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.9)]" : "bg-zinc-800"}`} />
          </div>
        ))}
      </div>
      
      {/* MENSAGEM / ESTADO */}
      <div className="h-7 flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {phase === 6 && (
            <motion.div key="go" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[7.5px] font-mono font-black text-red-500 uppercase leading-[1.1] text-center tracking-tighter">It's Lights Out<br />and Away We Go!</motion.div>
          )}
          {phase === 2 && (
            <motion.span key="formation" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[7px] font-mono font-bold text-zinc-400 uppercase tracking-widest text-center">FORMATION LAP</motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* HALF PROGRESS GAUGE (VELOCÍMETRO) */}
      <div className="relative flex flex-col items-center justify-center -mt-1">
        <svg className="w-28 h-16 overflow-visible" viewBox="0 0 100 55">
          {/* Fundo do arco (cinzento meio transparente) */}
          <path
            d="M 8 50 A 42 42 0 0 1 92 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-zinc-800/60"
            strokeLinecap="round"
          />
          {/* Arco de progresso ativo (avermelhado) */}
          <motion.path
            d="M 8 50 A 42 42 0 0 1 92 50"
            fill="none"
            stroke="#ef4444"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.6))" }}
          />
        </svg>
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className="text-sm font-mono font-black text-zinc-100 tracking-tight">
            {speed}<span className="text-[9px] font-normal text-zinc-500 ml-0.5">km/h</span>
          </span>
          <span className="text-[8px] font-mono font-semibold text-zinc-500 uppercase tracking-widest">Telemetry</span>
        </div>
      </div>
    </div>
  );
};

const GermanTypewriterSpeech = () => {
  const germanWords = ["Sprache", "Technik", "Wissen", "Lernen", "Zukunft", "Algorithmus", "Logik", "Gedanke", "Entwicklung"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % germanWords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-purple-500">
        <Speech className="w-14 h-14 animate-pulse" />
      </div>
      <div className="h-6 overflow-hidden flex items-center relative w-28 justify-end">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, x: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
            className="text-xs font-mono font-bold text-purple-400 tracking-wider bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"
          >
            {germanWords[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

function HobbyCard({ children, className = "" }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;
  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={{ scale: 0.98 }} style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className={`relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/10 transition-colors duration-500 cursor-pointer group ${className}`}>
      <motion.div className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotlight }} />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 pointer-events-none" />
        {children}
      </div>
    </motion.div>
  );
}

// --- HELPERS ---
const MediaIcon = ({ type }: { type: string }) => {
  const c = "h-6 w-6";
  if (type === "Podcast") return <Mic className={c} />;
  if (type === "TV News") return <Tv className={c} />;
  if (type === "Institutional") return <Building2 className={c} />;
  if (type === "Print Newspaper") return <Newspaper className={c} />;
  if (type === "Online News") return <Globe className={c} />;
  return <Newspaper className={c} />;
};

const getMediaColor = (type: string) => {
  if (type === "Podcast") return { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]", iconColor: "text-emerald-500", border: "border-emerald-200 dark:border-emerald-500/20", pulse: "rgba(16,185,129,0.25)" };
  if (type === "TV News") return { bg: "bg-rose-500/10 dark:bg-rose-500/20", text: "text-rose-600 dark:text-rose-400", glow: "group-hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]", iconColor: "text-rose-500", border: "border-rose-200 dark:border-rose-500/20", pulse: "rgba(244,63,94,0.25)" };
  if (type === "Institutional") return { bg: "bg-indigo-500/10 dark:bg-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400", glow: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]", iconColor: "text-indigo-500", border: "border-indigo-200 dark:border-indigo-500/20", pulse: "rgba(99,102,241,0.25)" };
  if (type === "Print Newspaper") return { bg: "bg-amber-500/10 dark:bg-amber-500/20", text: "text-amber-700 dark:text-amber-400", glow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]", iconColor: "text-amber-600", border: "border-amber-200 dark:border-amber-500/20", pulse: "rgba(245,158,11,0.25)" };
  if (type === "Online News") return { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]", iconColor: "text-blue-500", border: "border-blue-200 dark:border-blue-500/20", pulse: "rgba(59,130,246,0.25)" };
  return { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", glow: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]", iconColor: "text-blue-500", border: "border-blue-200 dark:border-blue-500/20", pulse: "rgba(59,130,246,0.25)" };
};

const parseBoldText = (text: string, highlightColor = "bg-emerald-500/10") => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className={`font-bold text-zinc-900 dark:text-white ${highlightColor} px-1 rounded mx-0.5`}>{part.slice(2, -2)}</strong>
      );
    }
    return part;
  });
};

export default function AwardsSection() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [selectedFeatured, setSelectedFeatured] = useState<any | null>(null);
  const [activeHobby, setActiveHobby] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="awards" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />
      <div className="container max-w-8xl mx-auto px-5 md:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <Trophy className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Awards & Recognition</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
              Recognition of academic achievements, media coverage, and personal pursuits beyond the lab.
            </p>
          </div>
        </MotionWrapper>

        {/* 1. ACHIEVEMENT GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-16">
          {awards.map((award: any, index: number) => {
            const colSpanClass = index === 0 ? "md:col-span-7" : "md:col-span-5";
            const [isExpanded, setIsExpanded] = useState(false);
            const ExtraDetails = () => (
              <div className="pt-2 pb-2 space-y-4">
                {award.hosts && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40 dark:text-zinc-500">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Host Institutions</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {award.hosts.map((host: any, i: number) => {
                        const isObj = typeof host === 'object' && host !== null;
                        const name = isObj ? host.name : host;
                        const url = isObj ? host.url : null;
                        return url ? (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-white/5 border border-amber-200/50 dark:border-white/5 text-[10px] md:text-[11px] text-zinc-700 dark:text-zinc-300 hover:border-amber-500/40 hover:bg-white dark:hover:bg-amber-500/10 transition-all group/host shadow-sm">
                            <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            <span className="font-medium">{name}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-40 group-hover/host:opacity-100" />
                          </a>
                        ) : (
                          <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-white/5 border border-amber-200/50 dark:border-white/5 text-[10px] md:text-[11px] text-zinc-500 shadow-sm">
                            <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                            <span className="font-medium">{name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                {award.links && award.links.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40 dark:text-zinc-500">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>Featured In</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {award.links.map((link: any, i: number) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-white/5 border border-amber-500/30 text-[10px] md:text-[11px] font-medium text-amber-600 dark:text-amber-500 hover:bg-white dark:hover:bg-amber-500/10 hover:border-amber-500/50 transition-all shadow-sm group/btn">
                          <span className="truncate">{link.label}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-70 group-hover/btn:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
            return (
              <MotionWrapper key={index} delay={index * 0.1} className={colSpanClass}>
                <div className="group relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 via-transparent to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
                  <motion.div layout onClick={() => !isDesktop && setIsExpanded(!isExpanded)} className={`relative h-full flex flex-col overflow-hidden rounded-3xl bg-zinc-50 dark:bg-[#0c0c0e] border border-amber-200/50 dark:border-white/5 p-6 md:p-8 transition-all duration-500 group-hover:-translate-y-1 ${!isDesktop ? 'cursor-pointer' : ''}`} >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                      <Trophy className="w-32 h-32 rotate-12 text-amber-600" />
                    </div>
                    
                    <div className="flex flex-col gap-3 relative z-10">
                      {award.position && (
                        <div className="flex items-start">
                          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-amber-500/40">
                            {award.position}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-1">
                          {award.name}
                        </h3>
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium text-xs md:text-sm">
                          <Building2 className="w-4 h-4 shrink-0" />
                          <span>{award.issuer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col relative z-10 text-justify">
                      {isDesktop && (
                        <div className="flex flex-col space-y-4">
                          {award.description && (
                            <div>
                              <motion.p layout className={`text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic pr-2 ${!isExpanded ? 'line-clamp-1' : ''}`}>
                                {award.description}
                              </motion.p>
                              <button onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} className="mt-2 text-amber-600 dark:text-amber-500 text-[10px] font-bold uppercase flex items-center gap-1 hover:text-amber-400 transition-colors" >
                                {isExpanded ? (<>Show Less <ChevronDown className="w-3 h-3 rotate-180 transition-transform" /></>) : (<>Read More <ChevronDown className="w-3 h-3 transition-transform" /></>)}
                              </button>
                            </div>
                          )}
                          <ExtraDetails />
                        </div>
                      )}
                      {!isDesktop && (
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden" >
                              {award.description && (
                                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic pr-2 mb-4">
                                  {award.description}
                                </p>
                              )}
                              <ExtraDetails />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>

                    <div className="flex-grow" />

                    <div className={`mt-auto border-t border-amber-200/60 dark:border-white/5 flex items-center justify-between relative z-10 ${isDesktop ? 'pt-6 mt-6' : 'pt-5 mt-6'}`}>
                      <div className="flex items-center gap-6 md:gap-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2.5">
                          <Calendar className="h-4 w-4 opacity-70 text-amber-600" />
                          <span className="whitespace-nowrap leading-none pt-0.5">{award.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Globe className="h-4 w-4 opacity-70 text-amber-600" />
                          <span className="whitespace-nowrap leading-none pt-0.5">{award.type}</span>
                        </div>
                      </div>
                      {!isDesktop && (
                        <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-600 transition-colors">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>

        {/* 2. FEATURED IN */}
        <MotionWrapper delay={0.3}>
          <div className="relative mb-16">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <span className="w-6 h-1 bg-zinc-900 dark:bg-white rounded-full"></span>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Featured In</h3>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4">
              {featuredIn.map((item: any, idx: number) => {
                const colors = getMediaColor(item.type);
                const hasLink = item.link && item.link.trim() !== "" && item.link !== "#";
                const Wrapper = hasLink && isDesktop ? 'a' : 'div';
                return (
                  <Wrapper key={idx} href={hasLink && isDesktop ? item.link : undefined} target={hasLink && isDesktop ? "_blank" : undefined} rel={hasLink && isDesktop ? "noopener noreferrer" : undefined} className={`block h-full cursor-pointer ${hasLink && isDesktop ? 'group' : ''}`} onClick={() => { if (!isDesktop) { setSelectedFeatured(item); } }} >
                    <motion.div animate={!isDesktop ? { boxShadow: [ "0px 0px 0px 0px rgba(0,0,0,0)", `0px 0px 15px 1px ${colors.pulse}`, "0px 0px 0px 0px rgba(0,0,0,0)" ] } : { boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.15 }} className="h-full rounded-xl" >
                      <GlassCard className={`h-full p-2.5 md:p-6 flex flex-col items-center text-center rounded-xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 ${isDesktop && hasLink ? 'hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-lg hover:-translate-y-1' : ''} ${!isDesktop ? 'active:scale-95' : ''}`}>
                        <div className={`mb-1.5 md:mb-4 p-2 md:p-3 rounded-full ${colors.bg} ${colors.iconColor} ${isDesktop && hasLink ? 'group-hover:scale-110' : ''} ${isDesktop && hasLink ? colors.glow : ''} transition-all duration-300 transform md:scale-100 scale-75 origin-bottom`}>
                          <MediaIcon type={item.type} />
                        </div>
                        <h4 className="text-[9px] md:text-sm font-bold text-zinc-900 dark:text-white mb-0.5 md:mb-1 leading-[1.1] line-clamp-2 md:line-clamp-none">
                          {item.source}
                        </h4>
                        {isDesktop && (
                          <>
                            <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${colors.text}`}>{item.type}</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                            <div className={`mt-auto text-[10px] font-medium flex items-center gap-1 ${colors.text} ${hasLink ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'} transition-opacity`}>
                              {item.date} {hasLink && <ArrowUpRight className="h-3 w-3" />}
                            </div>
                          </>
                        )}
                        {!isDesktop && (
                          <div className="mt-auto pt-1.5 flex flex-col items-center gap-1 w-full">
                            <span className={`inline-block px-1 py-0.5 rounded-[3px] text-[5.5px] font-bold uppercase tracking-tighter bg-white/50 dark:bg-black/20 ${colors.border} ${colors.text} border`}>
                              {item.type}
                            </span>
                            <div className={`text-[7px] font-medium flex items-center justify-center gap-0.5 text-zinc-500 dark:text-zinc-400`}>
                              {item.date} {hasLink && <ArrowUpRight className="h-2 w-2 opacity-60" />}
                            </div>
                          </div>
                        )}
                      </GlassCard>
                    </motion.div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </MotionWrapper>

        {/* MODAL MOBILE PARA FEATURED IN */}
        <AnimatePresence>
          {selectedFeatured && !isDesktop && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFeatured(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} className="relative w-full max-w-sm z-10">
                <button onClick={() => setSelectedFeatured(null)} className="absolute -top-12 right-0 p-2 text-white"><X className="w-8 h-8" /></button>
                <GlassCard className={`flex flex-col w-full rounded-2xl overflow-hidden border ${getMediaColor(selectedFeatured.type).border} bg-zinc-50 dark:bg-[#0c0c0e]`}>
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full ${getMediaColor(selectedFeatured.type).bg} ${getMediaColor(selectedFeatured.type).iconColor}`}>
                        <MediaIcon type={selectedFeatured.type} />
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-0.5 mb-1.5 rounded text-[10px] font-bold uppercase tracking-wider ${getMediaColor(selectedFeatured.type).bg} ${getMediaColor(selectedFeatured.type).text}`}>
                          {selectedFeatured.type}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">{selectedFeatured.source}</h3>
                      </div>
                    </div>
                    <p className={`text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify mb-6`}>
                      {selectedFeatured.description}
                    </p>
                    <div className="pt-4 border-t border-zinc-200/50 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        <Calendar className="h-3.5 w-3.5 opacity-70" />
                        <span className="pt-0.5">{selectedFeatured.date}</span>
                      </div>
                      {selectedFeatured.link && selectedFeatured.link.trim() !== "" && selectedFeatured.link !== "#" && (
                        <a href={selectedFeatured.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 text-[10px] font-bold uppercase ${getMediaColor(selectedFeatured.type).text}`}>
                          View Source <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3. BEYOND THE LAB - HÍBRIDO (Grid Desktop / Acordeão Mobile) */}
        <MotionWrapper delay={0.5}>
          <div className="relative">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <span className="w-6 h-1 bg-zinc-900 dark:bg-white rounded-full"></span>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                Beyond the Lab <span className="text-[9px] font-mono font-medium text-zinc-400 border border-zinc-200 dark:border-white/10 px-1.5 py-0.5 rounded uppercase bg-zinc-100 dark:bg-white/5">Status: Operational</span>
              </h3>
            </div>

            {/* VISÃO DESKTOP: Grelha de 5 Colunas (Completamente restaurada e polida) */}
            {isDesktop && (
              <div className="hidden md:grid md:grid-cols-5 gap-5 pb-6 items-stretch" style={{ perspective: "1000px" }}>
                
                {/* Cartão 1: The Quantified Self (3 colunas) */}
                <div className="w-full md:col-span-3 flex">
                  <HobbyCard className="w-full h-full flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-500 relative shadow-xl">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                      <div className="absolute -right-4 top-10 transform -rotate-12 opacity-10 text-emerald-500"><Footprints className="w-48 h-48" /></div>
                      <div className="absolute right-20 -bottom-8 transform rotate-12 opacity-10 text-emerald-500"><Dumbbell className="w-40 h-40" /></div>
                    </div>
                    <div className="relative z-20 flex flex-col h-full p-8 justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-5">
                          <div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 group-hover:text-emerald-500 transition-colors">
                              <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500" /> The Quantified Self
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-3 leading-relaxed text-justify font-medium">{parseBoldText("Balancing mental rigor with physical conditioning.", "bg-emerald-500/10")}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed text-justify">{parseBoldText("I approach fitness (**running & gym**) with the same discipline as engineering:", "bg-emerald-500/10")}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed text-justify">{parseBoldText("consistency, metrics, and progressive overload.", "bg-emerald-500/10")}</p>

                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-sm z-30 shrink-0 ml-4">
                            <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                            <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 tracking-wider">ACTIVE</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-3"><Timer className="w-3.5 h-3.5 text-emerald-500" /><span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Personal Bests</span></div>
                        <div className="grid grid-cols-3 gap-6">
                          {[{ dist: "3KM", time: "00:00", width: "15%" }, { dist: "5KM", time: "00:00", width: "25%" }, { dist: "10KM", time: "00:00", width: "70%" }].map((stat, i) => (
                            <div key={i} className="flex flex-col relative group/stat bg-white/40 dark:bg-black/20 p-3 rounded-xl border border-zinc-200/50 dark:border-white/5">
                              <span className="text-[10px] font-bold text-zinc-400 mb-1">{stat.dist}</span>
                              <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{stat.time}</span>
                              <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden mt-2"><div className="h-full bg-emerald-500/80 rounded-full" style={{ width: stat.width }}></div></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </HobbyCard>
                </div>

                {/* Cartão 2: Precision & Strategy (1 coluna) */}
                <div className="w-full md:col-span-1 flex">
                  <HobbyCard className="w-full h-full flex flex-col justify-between hover:border-blue-500/40 transition-all duration-500 relative shadow-xl p-6">
                    <div className="absolute inset-0 pointer-events-none select-none z-0"><div className="absolute -right-0 -bottom-0 transform -rotate-12 opacity-[0.08] text-blue-500"><Gauge className="w-16 h-16" /></div></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-blue-500 transition-colors mb-3">
                          <Flag className="w-4 h-4 text-blue-500 shrink-0" /> Precision & Strategy
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                          {parseBoldText("Passionate about **automotive engineering** and **Formula 1**. Fascinated by the intersection of aerodynamics, real-time telemetry, and high-stakes strategy.", "bg-blue-500/10")}
                        </p>
                      </div>
                      <div className="mt-6 pt-5 border-t border-zinc-200/60 dark:border-white/5 flex flex-col items-center">
                        <span className="text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-widest mb-3">Starting lights</span>
                        <F1StartingLights />
                      </div>
                    </div>
                  </HobbyCard>
                </div>

                {/* Cartão 3: Expanding Horizons (1 coluna) - Atualizado commáquina de escrever de palavras alemãs */}
                <div className="w-full md:col-span-1 flex">
                  <HobbyCard className="w-full h-full flex flex-col justify-between hover:border-purple-500/40 transition-all duration-500 relative shadow-xl p-6">
                    <div className="absolute inset-0 pointer-events-none select-none z-0"><div className="absolute -right-0 -top-0 transform rotate-12 opacity-[0.08] text-purple-500"><Languages className="w-16 h-16" /></div></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-purple-500 transition-colors mb-3">
                          <Brain className="w-4 h-4 text-purple-500 shrink-0" /> Expanding Horizons
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                          {parseBoldText("Exploring the logic of languages. Currently studying **German** for the challenge, while diving deep into **AI & Programming** to push my technical boundaries.", "bg-purple-500/10")}
                        </p>
                      </div>
                      <GermanTypewriterSpeech />
                    </div>
                  </HobbyCard>
                </div>

              </div>
            )}

            {/* VISÃO MOBILE: Acordeão de Botões */}
            {!isDesktop && (
              <div className="flex flex-col gap-3">
                
                {/* Botão 1: Quantified Self */}
                <div className="flex flex-col bg-zinc-50 dark:bg-[#0c0c0e] rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
                  <button onClick={() => setActiveHobby(activeHobby === 1 ? null : 1)} className="flex items-center justify-between p-4 w-full text-left active:bg-zinc-100 dark:active:bg-white/5 transition-colors relative z-20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500"><Zap className="w-4 h-4"/></div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">The Quantified Self</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${activeHobby === 1 ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeHobby === 1 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-white/30 dark:bg-white/5 relative">
                        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
                          <div className="absolute -right-4 top-2 transform -rotate-12 opacity-[0.06] text-emerald-500"><Footprints className="w-32 h-32" /></div>
                          <div className="absolute right-16 -bottom-6 transform rotate-12 opacity-[0.06] text-emerald-500"><Dumbbell className="w-24 h-24" /></div>
                        </div>
                        <div className="p-4 pt-2 border-t border-zinc-200/50 dark:border-white/5 relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col gap-2">
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{parseBoldText("Balancing mental rigor with physical conditioning.", "bg-emerald-500/10")}</p>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{parseBoldText("I approach fitness (**running & gym**) with the same discipline as engineering: consistency, metrics, and progressive overload.", "bg-emerald-500/10")}</p>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-sm shrink-0">
                              <Activity className="w-3 h-3 text-rose-500 animate-pulse" />
                              <span className="text-[8px] font-mono font-bold text-rose-600 dark:text-rose-400">ACTIVE</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2"><Timer className="w-3.5 h-3.5 text-zinc-400" /><span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Personal Bests</span></div>
                          <div className="grid grid-cols-3 gap-3 border-t border-zinc-200 dark:border-white/5 pt-3">
                            {[{ dist: "3KM", time: "00:00", width: "15%" }, { dist: "5KM", time: "00:00", width: "25%" }, { dist: "10KM", time: "00:00", width: "70%" }].map((stat, i) => (
                              <div key={i} className="flex flex-col">
                                <span className="text-[9px] font-bold text-zinc-500 mb-0.5">{stat.dist}</span>
                                <span className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">{stat.time}</span>
                                <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden mt-1"><div className="h-full bg-emerald-500/80 rounded-full" style={{ width: stat.width }}></div></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Botão 2: Precision & Strategy */}
                <div className="flex flex-col bg-zinc-50 dark:bg-[#0c0c0e] rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
                  <button onClick={() => setActiveHobby(activeHobby === 2 ? null : 2)} className="flex items-center justify-between p-4 w-full text-left active:bg-zinc-100 dark:active:bg-white/5 transition-colors relative z-20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-500/10 text-blue-500"><Flag className="w-4 h-4"/></div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">Precision & Strategy</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${activeHobby === 2 ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeHobby === 2 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-white/30 dark:bg-white/5 relative">
                        <div className="absolute inset-0 pointer-events-none select-none z-0">
                          <div className="absolute -right-2 -bottom-2 transform -rotate-12 opacity-[0.06] text-blue-500"><Gauge className="w-24 h-24" /></div>
                        </div>
                        <div className="p-4 pt-3 border-t border-zinc-200/50 dark:border-white/5 relative z-10">
                          <div className="flex justify-between items-start gap-4">
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify flex-1">
                              {parseBoldText("Passionate about **automotive engineering** and **Formula 1**. Fascinated by the intersection of aerodynamics, real-time telemetry, and high-stakes strategy.", "bg-blue-500/10")}
                            </p>
                            <div className="shrink-0 mt-1">
                              <F1StartingLights />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Botão 3: Expanding Horizons */}
                <div className="flex flex-col bg-zinc-50 dark:bg-[#0c0c0e] rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
                  <button onClick={() => setActiveHobby(activeHobby === 3 ? null : 3)} className="flex items-center justify-between p-4 w-full text-left active:bg-zinc-100 dark:active:bg-white/5 transition-colors relative z-20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-500/10 text-purple-500"><Brain className="w-4 h-4"/></div>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">Expanding Horizons</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${activeHobby === 3 ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeHobby === 3 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-white/30 dark:bg-white/5 relative">
                        <div className="absolute inset-0 pointer-events-none select-none z-0">
                          <div className="absolute -right-2 -top-2 transform rotate-12 opacity-[0.06] text-purple-500"><Languages className="w-24 h-24" /></div>
                        </div>
                        <div className="p-4 pt-3 border-t border-zinc-200/50 dark:border-white/5 relative z-10">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                            {parseBoldText("Exploring the logic of languages. Currently studying **German** for the challenge, while diving deep into **AI & Programming** to push my technical boundaries.", "bg-purple-500/10")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            )}

          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}