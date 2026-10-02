// src/components/HeroSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { personalInfo } from "@/lib/data";
import { Mail, Github, Linkedin, BookOpenText, User, Microscope, Download, MapPin, Cpu, Users, Terminal, Fingerprint, FileBadge, Shield, Lock, Unlock, ChevronRight, EarthLock, X } from "lucide-react";
import { motion, AnimatePresence, useAnimation, useScroll, useTransform, useMotionTemplate, useMotionValue, type Variants, } from "framer-motion";
import MagicRings from "./MagicRings";
import GhostCursor from "./GhostCursor";
import { GlassCard } from "./ui/glass-card";

const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

/* ========================================================================
   0. FUNDO DE CIBERSEGURANÇA (MATRIZ DE CARACTERES A CAIR)
======================================================================== */
function CyberMatrixBackground() {
  const [columns, setColumns] = useState<{ id: number; left: number; speed: number; chars: string }[]>([]);

  useEffect(() => {
    const symbols = "0101010101ABCDEFXYZ#$&<>[]{}0101";
    const colCount = Math.floor(window.innerWidth / 35);
    const newCols = Array.from({ length: Math.min(colCount, 40) }).map((_, i) => {
      let charStr = "";
      const len = Math.floor(Math.random() * 10) + 8;
      for (let j = 0; j < len; j++) {
        charStr += symbols[Math.floor(Math.random() * symbols.length)] + "\n";
      }
      return {
        id: i,
        left: i * (100 / Math.min(colCount, 40)),
        speed: Math.random() * 8 + 6,
        chars: charStr,
      };
    });
    setColumns(newCols);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.8, 0] }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute top-0 text-[10px] md:text-xs font-mono text-emerald-600/40 dark:text-emerald-400/50 whitespace-pre leading-none select-none"
          style={{ left: `${col.left}%` }}
        >
          {col.chars}
        </motion.div>
      ))}
    </div>
  );
}

/* ========================================================================
   1. VARIANTES DE ANIMAÇÃO GERAIS E EFEITO SCRAMBLE CONTÍNUO
======================================================================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } },
};

const itemZoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 60, damping: 20 } },
};

// COMPONENTE: Efeito contínuo de Scramble/Decode
function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const runScramble = () => {
      let iteration = 0;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:\"<>?|[];',./~`";

      intervalId = setInterval(() => {
        if (!isMounted) return;
        
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            if (isMounted) runScramble();
          }, 1500);
        }
        iteration += 1 / 4;
      }, 40);
    };

    runScramble();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text]);

  return <span>{displayText}</span>;
}

/* ========================================================================
   2. CYBER TYPEWRITER
======================================================================== */
function TypewriterExpertise() {
  const words = [
    "Cybersecurity Architecture.",
    "Hardware-Software Integration.",
    "Smart IoT Ecosystems.",
    "Zero-Trust Embedded Systems.",
    "Photonics & Sensing.",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) setTimeout(() => setIsDeleting(true), 2500);
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };
    const timer = setTimeout(handleType, isDeleting ? 40 : 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="notranslate relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 md:from-emerald-500 md:to-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -right-2 top-0 bottom-0 md:top-1 md:bottom-1 w-[3px] md:w-[2px] bg-emerald-500 shadow-[0_0_8px_#34d399]"
      />
    </span>
  );
}

/* ========================================================================
   3. MAGNETIC BUTTONS
======================================================================== */
function MagneticButton({ children, href }: { children: React.ReactNode; href: string | null; }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const background = useMotionTemplate`radial-gradient(50px circle at ${mouseX}px ${mouseY}px, rgba(16,185,129,0.15), transparent 80%)`;

  return (
    <motion.a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all duration-300 group overflow-hidden z-10 shadow-sm bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white dark:hover:text-white dark:hover:border-emerald-500"
    >
      <motion.div className="absolute inset-0 z-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:block" style={{ background }} />
      <div className="relative z-10 flex items-center gap-1.5 pointer-events-none">{children}</div>
    </motion.a>
  );
}

/* ========================================================================
   4. DISINTEGRATING PROFILE
======================================================================== */
function DisintegratingProfile() {
  const particleControls = useAnimation();
  const imageControls = useAnimation();

  useEffect(() => {
    const triggerDisintegration = async () => {
      imageControls.start({ opacity: 0, scale: 0.8, filter: "blur(8px)", transition: { duration: 0.3 } });
      await particleControls.start("exploded");
      await new Promise((resolve) => setTimeout(resolve, 10));
      particleControls.start("assembled");
      await imageControls.start({ opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: 0.3, duration: 0.6 } });
    };
    const timer = setTimeout(triggerDisintegration, 2000);
    const loopTimer = setInterval(triggerDisintegration, 6000);
    return () => { clearTimeout(timer); clearInterval(loopTimer); particleControls.stop(); imageControls.stop(); };
  }, [particleControls, imageControls]);

  const gridSize = 8;
  const totalParticles = gridSize * gridSize;
  const particleVariants: Variants = {
    assembled: { x: 0, y: 0, scale: 1, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    exploded: (i) => {
      const randomX = (Math.random() - 0.5) * 50;
      const randomY = (Math.random() - 0.5) * 50;
      const randomRotation = (Math.random() - 0.5) * 180;
      return { x: randomX, y: randomY, scale: 0, rotate: randomRotation, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: (i % gridSize) * 0.02 + Math.random() * 0.1 } };
    },
  };

  return (
    <div className="relative w-24 h-24 md:w-40 md:h-40 group flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[400px] md:h-[400px] z-0 pointer-events-none opacity-40 mix-blend-screen">
        <MagicRings color="#10b981" colorTwo="#059669" ringCount={3} speed={0.8} baseRadius={0.22} radiusStep={0.08} opacity={0.6} followMouse={true} />
      </div>
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-30 pointer-events-none rounded-full overflow-hidden">
        {[...Array(totalParticles)].map((_, i) => (
          <motion.div key={i} custom={i} variants={particleVariants} initial="assembled" animate={particleControls} className="w-full h-full bg-emerald-500/80" />
        ))}
      </div>
      <motion.div animate={imageControls} className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-emerald-500 via-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-20">
        <div className="w-full h-full rounded-full overflow-hidden border-2 md:border-[3px] border-white dark:border-[#09090b] bg-white dark:bg-[#09090b]">
          <img src={personalInfo.profilePicture} alt="Profile" className="w-full h-full object-cover scale-105 filter contrast-125 md:saturate-110" />
        </div>
      </motion.div>
      <a href="/CV_Goncalo_Figueiredo.pdf" download className="absolute border border-emerald-500/10 -bottom-1 -right-4 md:bottom-1 md:right-1 flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1.5 md:px-2 md:py-1 rounded-full font-bold text-[10px] md:text-xs shadow-lg hover:scale-110 transition-transform z-50 pointer-events-auto">
        <Download className="w-3.5 h-3.5" />
        <span>CV</span>
      </a>
    </div>
  );
}

/* ========================================================================
   5. CARTÃO DA ESQUERDA (PROFILE)
======================================================================== */
const LeftProfileCard = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <motion.div
      layout
      className={`relative w-full overflow-hidden flex flex-col group bg-white/90 dark:bg-zinc-950/70 border backdrop-blur-xl shadow-lg transition-colors duration-300 h-full ${
        isExpanded 
          ? 'rounded-3xl border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] p-5 md:p-8' 
          : 'rounded-2xl border-zinc-200/50 dark:border-white/10 p-5 justify-center'
      }`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: noiseOverlay }} />
      
      {/* MARCA DE ÁGUA / LOGOTIPO NO FUNDO À DIREITA */}
      <User className={`absolute -bottom-10 -right-10 w-56 h-56 text-emerald-500 pointer-events-none z-0 transition-all duration-700 ${isExpanded ? 'opacity-[0.1] scale-100 rotate-15' : 'opacity-[0.05] scale-90 -rotate-0'}`} />

      <motion.div layout className="relative z-10 flex flex-col h-full w-full justify-between">
        {/* CABEÇALHO */}
        <motion.div layout className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
              isExpanded ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Professional Profile</h2>
              <p className="text-[9px] md:text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">// MAIN_IDENTITY</p>
            </div>
          </div>
          
          {!isExpanded && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)] text-[10px] font-mono font-bold tracking-widest">
              <Shield className="w-3.5 h-3.5" /> [DATA PROTECTED]
            </div>
          )}
        </motion.div>

        {/* ÁREA CENTRAL */}
        <div className="flex-1 flex flex-col justify-center relative min-h-[80px]">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded-text"
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-justify space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-400 font-medium leading-relaxed py-6"
              >
                <p>
                  <span>Gonçalo Figueiredo is a Ph.D. Candidate in</span> <strong className="text-zinc-900 dark:text-white">Electrical and Computer Engineering</strong> <span>at</span> <strong className="text-zinc-900 dark:text-white border-b border-emerald-500/50">Instituto Superior Técnico</strong><span>, researching photonics for future sustainable smart cities. He holds an M.Sc. in Physics Engineering from the University of Aveiro.</span>
                </p>
                <p>
                  <span>With a unique</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">dual-background</span> <span>in</span> <strong>Physics Engineering</strong> <span>and</span> <strong>Electrical Engineering</strong><span>, he bridges the gap between theoretical science and industrial application.</span>
                </p>
                <p>
                  <span>His focus is on developing robust</span> <span className="text-zinc-900 dark:text-white font-bold bg-white/50 md:bg-white/80 dark:bg-white/10 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5 md:shadow-sm">hardware prototypes</span><span>, integrating hardware-level cybersecurity from</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">Smart Cities</span> <span>to</span> <span className="text-blue-600 dark:text-blue-400 font-bold">Industrial IoT</span><span>.</span>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="locked-badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-zinc-200/90 dark:bg-zinc-900/60 border border-zinc-300 dark:border-emerald-500/30 shadow-inner backdrop-blur-sm">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-500 animate-pulse" />
                  <span className="text-zinc-700 dark:text-zinc-400 font-mono text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase w-[330px] text-center">
                    <ScrambleText text="System Locked" /> <span className="text-emerald-600 dark:text-emerald-500 mx-1.5">//</span> <ScrambleText text="Hover to Decrypt" />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RODAPÉ */}
        <motion.div layout className={`pt-4 border-t transition-colors duration-300 flex items-center justify-between ${isExpanded ? 'border-zinc-200 dark:border-white/10' : 'border-zinc-200/50 dark:border-white/5'}`}>
          <div>
            <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold md:font-mono mb-1">Status</p>
            <div className="flex items-center gap-1.5 md:gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] md:text-sm md:bg-emerald-500/10 md:px-3 md:py-1.5 md:rounded-lg md:border md:border-emerald-500/20">
              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500" />
              </span>
              <span>Ph.D. Candidate</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold md:font-mono mb-1">CORE EXPERTISE</p>
            <p className="text-zinc-900 dark:text-white font-bold flex items-center gap-1.5 text-[11px] md:text-sm md:bg-white/60 md:dark:bg-white/5 md:px-3 md:py-1.5 md:rounded-lg md:border md:border-zinc-200 md:dark:border-white/10 shadow-sm">
              <EarthLock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
              <span>Secure IoT & Systems</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ========================================================================
   6. CARTÕES DA DIREITA (SKILLS)
======================================================================== */
const RightSkillCard = ({ group, isExpanded }: { group: any; isExpanded: boolean }) => {
  let themeColor = "text-emerald-600 dark:text-emerald-400";
  let bgTheme = "bg-emerald-500/10";
  let borderTheme = "border-emerald-500/30";
  if (group.color.includes("blue")) { themeColor = "text-blue-600 dark:text-blue-400"; bgTheme = "bg-blue-500/10"; borderTheme = "border-blue-500/30"; }
  if (group.color.includes("purple")) { themeColor = "text-purple-600 dark:text-purple-400"; bgTheme = "bg-purple-500/10"; borderTheme = "border-purple-500/30"; }

  return (
    <motion.div
      layout
      className={`relative w-full overflow-hidden flex flex-col group bg-white/90 dark:bg-zinc-950/70 border backdrop-blur-xl shadow-lg transition-colors duration-300 h-full ${
        isExpanded 
          ? 'rounded-2xl border-zinc-300 dark:border-white/20 p-5 justify-center' 
          : `rounded-xl border-zinc-200/50 dark:border-white/5 p-4 justify-center`
      }`}
    >
      <group.icon className={`absolute -bottom-6 -right-6 w-36 h-36 ${themeColor} pointer-events-none z-0 transition-all duration-700 ${isExpanded ? 'opacity-[0.05] scale-100 rotate-0' : 'opacity-[0.03] scale-90 -rotate-12'}`} />
      <motion.div layout className="relative z-10 flex flex-col h-full w-full justify-center">
        <motion.div layout className="flex items-start justify-between w-full">
          <div>
            <span className={`text-[9px] font-mono uppercase tracking-widest ${themeColor} mb-1 block`}>
              // {group.subtitle}
            </span>
            <h4 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white tracking-tight">{group.title}</h4>
          </div>
          <div className={`p-2 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 ${themeColor}`}>
            <group.icon className="w-4 h-4" />
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="flex flex-wrap gap-1.5"
            >
              {group.skills.map((skill: string) => (
                <div key={skill} className={`px-2 py-1 rounded-md ${bgTheme} border ${borderTheme} shadow-sm backdrop-blur-sm`}>
                  <span className={`block text-[10px] font-bold ${themeColor}`}>{skill}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ========================================================================
   7. DADOS PRINCIPAIS E HERO SECTION ESTRUTURAL
======================================================================== */
const skillGroups = [
  { id: "core", title: "Core Engineering", subtitle: "Hardware Security", icon: Cpu, color: "text-emerald-500", skills: ["FPGA & Verilog", "PCB Design", "Embedded Systems", "Hardware Prototyping", "Python & MATLAB"] },
  { id: "research", title: "Research Domains", subtitle: "Scientific Focus", icon: Microscope, color: "text-blue-500", skills: ["Optical Communications", "Data Encryption", "Photonic Devices", "Smart Cities", "Energy Harvesting"] },
  { id: "leadership", title: "Professional Skills", subtitle: "Leadership", icon: Users, color: "text-purple-500", skills: ["R&D Project Leadership", "Technical Communication", "Community Management", "Science Outreach", "Mentoring"] },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Estado Desktop (Hover) e Mobile (Tab ativa)
  const [isExpanded, setIsExpanded] = useState(false); 
  const [mobileActiveTab, setMobileActiveTab] = useState<number | null>(null);

  const contacts = [
    { icon: MapPin, text: "Aveiro, Portugal", href: null },
    { icon: Mail, text: "Email", href: `mailto:${personalInfo.email}` },
    { icon: Linkedin, text: "LinkedIn", href: personalInfo.linkedin },
    { icon: Github, text: "GitHub", href: personalInfo.github },
    { icon: BookOpenText, text: "Scholar", href: personalInfo.scholar },
    { icon: FileBadge, text: "CiênciaVitae", href: personalInfo.cienciavitae },
    { icon: Fingerprint, text: "ORCID", href: personalInfo.orcid },
  ];

  return (
    <>
      <GhostCursor color="#10b981" trailLength={15} brightness={1.5} inertia={0.5} fadeDelayMs={200} fadeDurationMs={800} style={{ zIndex: 0 }} className="fixed inset-0 w-screen h-screen pointer-events-none" />
      
      <section id="hero" ref={sectionRef} className="relative pt-20 pb-16 min-h-[96vh] flex flex-col justify-between overflow-hidden perspective-1000">
        
        {/* FUNDO CYBERSECURITY MATRIX */}
        <CyberMatrixBackground />
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] opacity-80 md:opacity-50 mix-blend-overlay">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        </div>

        {/* CONTAINER PRINCIPAL */}
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col flex-1 h-full">
          
          {/* TOPO (PERFIL E TÍTULOS) */}
          <motion.div 
            layout 
            animate={{ 
              scale: isExpanded ? 0.95 : 1, 
              y: isExpanded ? -10 : 35, 
              opacity: isExpanded ? 0.8 : 1
            }} 
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="flex flex-col items-center text-center w-full my-auto"
          >
            <motion.div variants={itemZoomIn} initial="hidden" animate="visible" className="relative mb-3 group pointer-events-auto">
              <DisintegratingProfile />
            </motion.div>

            <motion.div variants={itemFadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 animate-pulse" />
              <span>Ph.D. Candidate</span>
            </motion.div>

            <motion.h1 variants={itemFadeUp} initial="hidden" animate="visible" className="text-4xl md:text-[5.5rem] font-black tracking-tighter text-zinc-900 dark:text-white mb-2 md:mb-4 uppercase leading-[0.85] md:leading-[0.9]">
              <span>GONÇALO</span> <br className="md:hidden" />{" "}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#71717a,45%,#e4e4e7,55%,#71717a)] dark:bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)] bg-[length:250%_100%] animate-[shimmer_3s_linear_infinite]">
                <span>FIGUEIREDO</span>
              </span>
            </motion.h1>

            <motion.p variants={itemFadeUp} initial="hidden" animate="visible" className="text-xs sm:text-sm md:text-lg text-zinc-600 dark:text-zinc-300 font-medium max-w-Lg md:max-w-3xl leading-relaxed mb-6 md:mb-8 px-2">
              <span>Bridging the gap between</span> <strong className="text-zinc-900 dark:text-white font-bold ml-0.5 md:ml-0">Theoretical Science</strong> <span>and</span> <strong className="text-zinc-900 dark:text-white font-bold ml-0.5 md:ml-0">Industrial Application</strong> <br className="hidden md:block"/>
              <span className="mt-1 md:mt-0 inline-block md:inline"><span>through</span> <TypewriterExpertise /></span>
            </motion.p>

            <motion.div variants={itemFadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 max-w-4xl relative z-10 pointer-events-auto px-2 mb-10 md:mb-16">
              {contacts.map((c, i) => {
                if (!c.href) {
                  return (
                    <div key={i} className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/50 dark:bg-black/20 md:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-md text-[10px] md:text-xs shadow-sm">
                      <c.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span className="font-semibold md:font-medium">{c.text}</span>
                    </div>
                  );
                }
                return (
                  <MagneticButton key={i} href={c.href}>
                    <c.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="text-[10px] md:text-xs">{c.text}</span>
                  </MagneticButton>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ========================================================================
             GRELHA INFERIOR (DESKTOP / MOBILE)
          ======================================================================== */}
          
          {/* Versão Desktop */}
          <motion.div 
            layout 
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 relative z-20 w-full mt-auto cursor-pointer"
          >
            <div className="col-span-1 md:col-span-8 flex flex-col h-full">
              <LeftProfileCard isExpanded={isExpanded} />
            </div>
            <div className="col-span-1 md:col-span-4 flex flex-col justify-between gap-3 h-full">
              {skillGroups.map((group) => (
                <RightSkillCard key={group.id} group={group} isExpanded={isExpanded} />
              ))}
            </div>
          </motion.div>

          {/* Versão Mobile (Com suporte impecável a Light/Dark Mode nos botões) */}
          <div className="flex md:hidden flex-col gap-3 relative z-20 w-full mt-10">
            {/* Cartão de Perfil Mobile */}
            <div onClick={() => setIsExpanded(!isExpanded)}>
              <LeftProfileCard isExpanded={isExpanded} />
            </div>

            {/* Os 3 Botões Horizontais com Light/Dark Mode Corrigido */}
            <div className="grid grid-cols-3 gap-2">
              {skillGroups.map((group, idx) => {
                const isActive = mobileActiveTab === idx;
                let activeColor = "text-emerald-600 dark:text-emerald-400 border-emerald-500/50 bg-emerald-500/10";
                if (idx === 1) activeColor = "text-blue-600 dark:text-blue-400 border-blue-500/50 bg-blue-500/10";
                if (idx === 2) activeColor = "text-purple-600 dark:text-purple-400 border-purple-500/50 bg-purple-500/10";

                return (
                  <button
                    key={group.id}
                    onClick={() => setMobileActiveTab(isActive ? null : idx)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl border backdrop-blur-xl transition-all ${
                      isActive 
                        ? `${activeColor} shadow-md` 
                        : 'bg-zinc-200/70 dark:bg-zinc-950/60 border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <group.icon className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold truncate">{group.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Painel expansível das skills mobile */}
            <AnimatePresence>
              {mobileActiveTab !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-white/95 dark:bg-zinc-950/90 border border-zinc-300 dark:border-emerald-500/30 backdrop-blur-xl shadow-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                      // {skillGroups[mobileActiveTab].title}
                    </span>
                    <button onClick={() => setMobileActiveTab(null)} className="p-1 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skillGroups[mobileActiveTab].skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* INDICADOR DE SCROLL */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 1.5, duration: 1 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
            className="hidden md:flex flex-col items-center justify-center mt-8 relative z-25 pointer-events-auto cursor-pointer"
            onClick={() => { window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" }); }}
          >
            <motion.div whileHover="hovered" initial="initial" className="relative flex items-center bg-white/80 dark:bg-zinc-950/70 border border-zinc-300 dark:border-emerald-500/20 backdrop-blur-xl rounded-2xl px-3.5 py-2 shadow-lg hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-5 h-8 rounded-md border-2 border-emerald-600 dark:border-emerald-500/70 flex items-start justify-center p-1 relative shadow-[inset_0_0_4px_rgba(16,185,129,0.2)] shrink-0 bg-zinc-100/50 dark:bg-transparent">
                <motion.div animate={{ y: [0, 6, 0], opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-1 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-sm shadow-[0_0_6px_#10b981]" />
              </div>
              <motion.div variants={{ initial: { width: 0, opacity: 0, marginLeft: 0 }, hovered: { width: "auto", opacity: 1, marginLeft: 10 } }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden whitespace-nowrap">
                <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-800 dark:text-emerald-400 uppercase pr-2 inline-block">
                  Scroll to explore
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}} />
    </>
  );
}