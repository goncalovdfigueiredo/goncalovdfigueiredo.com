// src/components/HeroSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { personalInfo } from "@/lib/data";
import {
  Mail,
  Github,
  Linkedin,
  BookOpen,
  User,
  Microscope,
  Download,
  MapPin,
  Cpu,
  Users,
  Terminal,
  Fingerprint,
  FileBadge,
  ChevronDown,
  EarthLock,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";

import MagicRings from "./MagicRings";
import GhostCursor from "./GhostCursor";

// Textura de Ruído (Fractal Noise) para dar efeito físico ao vidro no Desktop
const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

/* ========================================================================
   0. VARIANTES DE ANIMAÇÃO (Ajustadas para serem mais lentas e suaves)
   ======================================================================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 1.5 }, // Mais atraso inicial e mais tempo entre cada
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }, // Mola mais lenta
};

const itemZoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 60, damping: 20 } },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 4.2 }, // Aparecem mais tarde
  },
};

/* ========================================================================
   1. CYBER TYPEWRITER
   ======================================================================== */
function TypewriterExpertise() {
  const words = [
    "Hardware-Software Integration.",
    "Smart IoT Ecosystems.",
    "Photonics & Sensing.",
    "Embedded Systems.",
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
    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 md:from-emerald-500 md:to-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.2)] md:drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -right-2 top-0 bottom-0 md:top-1 md:bottom-1 w-[3px] md:w-[2px] bg-emerald-500 md:bg-emerald-400 shadow-[0_0_8px_#34d399]"
      />
    </span>
  );
}

/* ========================================================================
   2. MAGNETIC BUTTONS (Híbrido)
   ======================================================================== */
function MagneticButton({ children, href }: { children: React.ReactNode; href: string | null; }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Spotlight effect (Só corre no Desktop)
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
      className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium transition-all duration-300 group overflow-hidden z-10 shadow-sm 
                 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300
                 md:hover:text-zinc-900 md:dark:hover:text-white md:bg-white/5 md:dark:bg-white/[0.02] md:backdrop-blur-sm
                 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-zinc-950 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] md:hover:bg-transparent md:dark:hover:bg-transparent md:hover:border-zinc-200/50 md:dark:hover:border-white/10 md:hover:shadow-sm md:dark:hover:shadow-sm"
    >
      {/* Luz Spotlight (Hidden on Mobile) */}
      <motion.div className="absolute inset-0 z-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:block" style={{ background }} />
      <div className="relative z-10 flex items-center gap-1.5 pointer-events-none">
        {children}
      </div>
    </motion.a>
  );
}

/* ========================================================================
   3. DISINTEGRATING PROFILE + MAGIC RINGS
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
    const loopTimer = setInterval(triggerDisintegration, 6000); // Abrandado um pouco o ciclo

    return () => { clearTimeout(timer); clearInterval(loopTimer); particleControls.stop(); imageControls.stop(); };
  }, [particleControls, imageControls]);

  const gridSize = 8;
  const totalParticles = gridSize * gridSize;

  const particleVariants: Variants = {
    assembled: { x: 0, y: 0, scale: 1, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    exploded: (i) => {
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 60;
      const randomRotation = (Math.random() - 0.5) * 360;
      return {
        x: randomX, y: randomY, scale: 0, rotate: randomRotation, opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: (i % gridSize) * 0.02 + Math.random() * 0.1 },
      };
    },
  };

  return (
    <div className="relative w-24 h-24 md:w-44 md:h-44 group flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[480px] md:h-[480px] z-0 pointer-events-none opacity-50 md:opacity-40 mix-blend-screen">
        <MagicRings color="#10b981" colorTwo="#059669" ringCount={3} speed={0.8} baseRadius={0.22} radiusStep={0.08} opacity={0.6} followMouse={true} />
      </div>

      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-30 pointer-events-none rounded-full overflow-hidden">
        {[...Array(totalParticles)].map((_, i) => (
          <motion.div key={i} custom={i} variants={particleVariants} initial="assembled" animate={particleControls} className="w-full h-full bg-emerald-500/80" />
        ))}
      </div>

      <motion.div animate={imageControls} className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-emerald-500 via-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] md:shadow-[0_0_30px_rgba(16,185,129,0.3)] z-20">
        <div className="w-full h-full rounded-full overflow-hidden border-2 md:border-[3px] border-white dark:border-[#09090b] bg-white dark:bg-[#09090b]">
          <img src={personalInfo.profilePicture} alt="Profile" className="w-full h-full object-cover scale-110 filter contrast-125 md:saturate-110" />
        </div>
      </motion.div>

      <a href="/CV_Goncalo_Figueiredo.pdf" download className="absolute -bottom-1 -right-4 md:-bottom-2 md:-right-4 flex items-center gap-1.5 bg-zinc-900 dark:bg-white md:bg-zinc-900/90 md:dark:bg-white/90 md:backdrop-blur-md text-white dark:text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs shadow-lg md:shadow-xl hover:scale-110 md:hover:scale-105 md:hover:bg-emerald-500 md:hover:text-white transition-transform md:transition-all z-50 pointer-events-auto md:border md:border-zinc-700/50 md:dark:border-zinc-200/50">
        <Download className="w-3.5 h-3.5" /> CV
      </a>
    </div>
  );
}

/* ========================================================================
   4.A MOBILE HARDWARE SKILL CARD (O TEU CÓDIGO ORIGINAL INTOCADO)
   ======================================================================== */
const MobileHardwareSkillCard = ({ group, index }: { group: any; index?: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  let themeColor = "rgba(16,185,129,";
  let textColorClass = "text-emerald-600 dark:text-emerald-400";
  let glowColor = "bg-emerald-500/10";
  let glowHoverColor = "group-hover/card:bg-emerald-500/20";

  if (group.color.includes("blue")) {
    themeColor = "rgba(59,130,246,"; textColorClass = "text-blue-600 dark:text-blue-400"; glowColor = "bg-blue-500/10"; glowHoverColor = "group-hover/card:bg-blue-500/20";
  }
  if (group.color.includes("purple")) {
    themeColor = "rgba(168,85,247,"; textColorClass = "text-purple-600 dark:text-purple-400"; glowColor = "bg-purple-500/10"; glowHoverColor = "group-hover/card:bg-purple-500/20";
  }

  return (
    <motion.div
      variants={itemFadeUp}
      className="relative w-full rounded-xl overflow-hidden cursor-pointer group/card flex flex-col backdrop-blur-md h-full"
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-[#0a0a0c]/70 border border-zinc-200 dark:border-white/5 rounded-xl z-0 backdrop-blur-xl" />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] z-0 pointer-events-none opacity-20 dark:opacity-60 transition-opacity duration-500"
        style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 80%, ${themeColor}1) 100%)` }}
        animate={{ x: "-50%", y: "-50%", rotate: [0, 360] }}
        transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" } }}
      />

      <div className="absolute inset-[1.5px] bg-white/80 dark:bg-[#09090b]/80 rounded-[calc(0.75rem-1.5px)] z-0" />
      <div className="absolute inset-[1.5px] bg-zinc-50/50 dark:bg-zinc-900/40 rounded-[calc(0.75rem-1.5px)] z-0 transition-colors duration-500" />

      <div className={`absolute top-0 right-0 w-24 h-24 ${glowColor} rounded-full blur-[30px] ${glowHoverColor} transition-colors pointer-events-none z-0`} />

      <group.icon className={`absolute -bottom-2 -right-2 w-16 h-16 ${textColorClass} opacity-[0.03] dark:opacity-[0.06] -rotate-12 pointer-events-none z-10`} />

      <AnimatePresence>
        {!isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-20 flex flex-col items-center justify-center p-3 text-center h-full min-h-[90px]">
            <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 ${textColorClass} mb-1.5`}>
              <group.icon className="w-4 h-4" />
            </div>
            <h3 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight leading-tight line-clamp-1">
              {group.title}
            </h3>
            <span className={`text-[8px] font-bold uppercase tracking-widest ${textColorClass} mt-0.5 opacity-80`}>
              Tap
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="relative z-30 p-3 flex flex-col justify-center bg-transparent h-full">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className={`text-[8px] font-black uppercase tracking-widest ${textColorClass} mb-0.5 block`}>{group.subtitle}</span>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">{group.title}</h4>
              </div>
              <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 ${textColorClass}`}>
                <group.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {group.skills.map((skill: string) => (
                <span key={skill} className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-white text-[7px] font-medium border border-zinc-300 dark:border-white/5 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ========================================================================
   4.B DESKTOP HARDWARE SKILL CARD (S-TIER PREMIUM CORRIGIDO)
   ======================================================================== */
   const DesktopHardwareSkillCard = ({ group }: { group: any }) => {
    const [isHovered, setIsHovered] = useState(false); // Estado adicionado para 100% fiabilidade
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
  
    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  
    let themeColor = "rgba(16,185,129,";
    let textColorClass = "text-emerald-600 dark:text-emerald-400";
    let spotlightColor = "rgba(16,185,129,0.15)";
  
    if (group.color.includes("blue")) {
      themeColor = "rgba(59,130,246,"; textColorClass = "text-blue-600 dark:text-blue-400"; spotlightColor = "rgba(59,130,246,0.15)";
    }
    if (group.color.includes("purple")) {
      themeColor = "rgba(168,85,247,"; textColorClass = "text-purple-600 dark:text-purple-400"; spotlightColor = "rgba(168,85,247,0.15)";
    }
  
    const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  
    return (
      <motion.div 
        variants={itemFadeUp} 
        onMouseMove={handleMouseMove} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full rounded-2xl overflow-hidden flex flex-col h-full bg-zinc-50/40 dark:bg-[#0a0a0c]/40 border backdrop-blur-md shadow-lg transition-all duration-500 ${
          isHovered ? '-translate-y-1 border-zinc-300 dark:border-white/20' : 'border-zinc-200/50 dark:border-white/5'
        }`}
      >
        {/* Textura Física e Luz Dinâmica */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay" style={{ backgroundImage: noiseOverlay }} />
        <motion.div 
          className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none" 
          style={{ background: spotlight, opacity: isHovered ? 1 : 0 }} 
        />
  
        {/* Roda de Cor no Fundo */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] z-0 pointer-events-none transition-opacity duration-700"
          style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 80%, ${themeColor}1) 100%)`, opacity: isHovered ? 0.3 : 0.1 }}
          animate={{ x: "-50%", y: "-50%", rotate: [0, 360] }}
          transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" } }}
        />
  
        <group.icon className={`absolute -bottom-4 -right-4 w-32 h-32 ${textColorClass} pointer-events-none z-10 transition-all duration-500 ${isHovered ? 'scale-110 -rotate-6 opacity-[0.05]' : 'opacity-[0.02]'}`} />
  
        <div className="relative z-20 flex flex-col p-5 h-full justify-between">
          
          {/* Cabeçalho do Cartão */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`text-[9px] font-mono uppercase tracking-widest ${textColorClass} mb-1 block transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
                // {group.subtitle}
              </span>
              <h4 className={`text-base font-bold text-zinc-900 dark:text-white leading-tight transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                {group.title}
              </h4>
            </div>
            <div className={`p-2 rounded-xl bg-white/80 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 ${textColorClass} shadow-sm transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
              <group.icon className="w-5 h-5" />
            </div>
          </div>
  
          {/* Lista de Skills (Pills visíveis, Texto enublado com Hover para ler) */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {group.skills.map((skill: string) => (
              <div 
                key={skill} 
                className={`px-2 py-1 rounded-md border shadow-sm transition-all duration-500 overflow-hidden cursor-default ${
                  isHovered 
                    ? 'bg-zinc-200/80 dark:bg-white/10 border-zinc-300 dark:border-white/10' 
                    : 'bg-zinc-200/40 dark:bg-white/[0.03] border-zinc-300/30 dark:border-white/5'
                }`}
              >
                <span className={`block text-[10px] font-semibold transition-all duration-500 ${
                  isHovered 
                    ? 'blur-none opacity-100 text-zinc-900 dark:text-zinc-100' 
                    : 'blur-[2.5px] opacity-60 text-zinc-700 dark:text-zinc-300'
                }`}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
  
        </div>
      </motion.div>
    );
  };

/* ========================================================================
   5. O COMPONENTE PRINCIPAL
   ======================================================================== */
const skillGroups = [
  { id: "core", title: "Core Engineering", subtitle: "Hardware", icon: Cpu, color: "text-emerald-500", skills: ["FPGA & Verilog", "PCB Design", "Embedded Systems", "Hardware Prototyping", "Python & MATLAB"] },
  { id: "research", title: "Research Domains", subtitle: "Scientific Focus", icon: Microscope, color: "text-blue-500", skills: ["Optical Communications", "Data Encryption", "Photonic Devices", "Smart Cities", "Energy Harvesting"] },
  { id: "leadership", title: "Professional Skills", subtitle: "Leadership", icon: Users, color: "text-purple-500", skills: ["R&D Project Leadership", "Technical Communication", "Community Management", "Science Outreach", "Mentoring"] },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yElement = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Mouse Spotlight para o Profile Card (Desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleProfileMouse({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const profileSpotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.04), transparent 80%)`;

  const contacts = [
    { icon: MapPin, text: "Aveiro, Portugal", href: null },
    { icon: Mail, text: "Email", href: `mailto:${personalInfo.email}` },
    { icon: Linkedin, text: "LinkedIn", href: personalInfo.linkedin },
    { icon: Github, text: "GitHub", href: personalInfo.github },
    { icon: BookOpen, text: "Scholar", href: personalInfo.scholar },
    { icon: FileBadge, text: "CiênciaVitae", href: personalInfo.cienciavitae },
    { icon: Fingerprint, text: "ORCID", href: personalInfo.orcid },
  ];

  return (
    <>
      <GhostCursor color="#10b981" trailLength={15} brightness={1.5} inertia={0.5} fadeDelayMs={200} fadeDurationMs={800} style={{ zIndex: 0 }} className="fixed inset-0 w-screen h-screen pointer-events-none" />

      {/* Ajustado pt e pb conforme discutido na reposta anterior para elevar o layout */}
      <section id="hero" ref={sectionRef} className="relative pt-20 pb-12 md:pt-24 md:pb-24 perspective-1000">
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-80 md:opacity-50 mix-blend-overlay">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] md:[mask-image:none] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          
          {/* BLOCO DE TOPO */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ y: yElement }} className="flex flex-col items-center text-center mb-6 md:mb-8 group">
                        
            <motion.div variants={itemZoomIn} className="relative mb-4 md:mb-4 group pointer-events-auto">
              <DisintegratingProfile />
            </motion.div>

            <motion.div variants={itemFadeUp} className="inline-flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-emerald-50/80 dark:bg-emerald-500/10 md:border md:border-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[9px] md:text-xs font-black uppercase tracking-[0.25em] mb-3 md:mb-6 shadow-sm md:shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md pointer-events-auto relative overflow-hidden">
               <motion.div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full" animate={{ translateX: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
              <Terminal className="w-3 h-3 md:w-3.5 md:h-3.5" /> Ph.D. Candidate
            </motion.div>

            <motion.h1 variants={itemFadeUp} className="text-4xl md:text-[5.5rem] font-black tracking-tighter text-zinc-900 dark:text-white mb-4 md:mb-2 uppercase leading-[0.85] md:leading-[0.9] pointer-events-auto">
              GONÇALO <br className="md:hidden" />{" "}
              {/* Efeito Shimmer Premium no Desktop, Gradiente Simples no Mobile */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 md:bg-[linear-gradient(110deg,#71717a,45%,#e4e4e7,55%,#71717a)] md:dark:bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)] md:bg-[length:250%_100%] md:animate-[shimmer_4s_linear_infinite] drop-shadow-sm">
                FIGUEIREDO
              </span>
            </motion.h1>

            <motion.p variants={itemFadeUp} className="text-xs sm:text-sm md:text-xl text-zinc-600 dark:text-zinc-300 md:dark:text-zinc-400 font-medium max-w-Lg md:max-w-3xl leading-relaxed mb-4 md:mb-4 relative z-10 pointer-events-auto px-2 md:px-4">             
              Bridging the gap between <strong className="text-zinc-900 dark:text-white md:dark:text-zinc-100 font-bold ml-0.5 md:ml-0">Theoretical Science</strong> and <strong className="text-zinc-900 dark:text-white md:dark:text-zinc-100 font-bold ml-0.5 md:ml-0">Industrial Application</strong> <br className="hidden md:block"/> <span className="mt-1 md:mt-0 inline-block md:inline">through <TypewriterExpertise /></span>
            </motion.p>

            {/* BOTÕES DE CONTACTO (Estilo Antigo no Mobile, Magnetic no Desktop) */}
            <motion.div variants={itemFadeUp} className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 max-w-4xl relative z-10 pointer-events-auto px-2">
              {contacts.map((c, i) => {
                if (!c.href) {
                  return (
                    <div key={i} className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full bg-white/50 dark:bg-black/20 md:bg-white/5 md:dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/10 backdrop-blur-md text-[10px] md:text-xs md:font-medium shadow-sm">
                      <c.icon className="w-3 h-3 md:w-3.5 md:h-3.5" /> <span className="font-semibold md:font-medium">{c.text}</span>
                    </div>
                  );
                }
                return (
                  <MagneticButton key={i} href={c.href}>
                    <c.icon className="w-3 h-3 md:w-3.5 md:h-3.5" /> <span className="text-[10px] md:text-xs">{c.text}</span>
                  </MagneticButton>
                );
              })}
            </motion.div>

          </motion.div>

          {/* BLOCO INFERIOR (Perfil Detalhado + Cartões) */}
          <motion.div variants={cardContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ y: yElement }} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 relative z-20">
            
            {/* Cartão Central (Professional Profile) */}
            <motion.div variants={itemFadeUp} className="col-span-1 md:col-span-8 flex flex-col group/profile">
              <div 
                onMouseMove={handleProfileMouse}
                className="flex-1 w-full relative rounded-xl md:rounded-3xl bg-white/95 dark:bg-[#0a0a0c]/95 md:bg-zinc-50/60 md:dark:bg-[#0a0a0c]/60 backdrop-blur-xl md:backdrop-blur-2xl border border-zinc-200/50 md:border-zinc-200/80 dark:border-white/10 p-4 md:p-10 overflow-hidden shadow-sm md:shadow-2xl flex flex-col transition-all duration-500"
              >
                {/* Textura e Luz Interna (Desktop Only) */}
                <div className="hidden md:block absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: noiseOverlay }} />
                <motion.div className="hidden md:block absolute inset-0 z-0 opacity-0 group-hover/profile:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: profileSpotlight }} />
                
                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col flex-1 h-full">
                  <div>
                    <div className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-8">
                      <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-emerald-500 md:bg-gradient-to-br md:from-emerald-400 md:to-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] md:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        <User className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <h2 className="text-base md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Professional Profile
                      </h2>
                    </div>

                    <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isProfileExpanded ? "max-h-[800px]" : "max-h-[60px] md:max-h-[800px]"}`}>
                      <div className="text-justify space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-zinc-700 md:text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                        <p>
                          Gonçalo Figueiredo is a Ph.D. Candidate in <strong className="text-zinc-900 dark:text-white">Electrical and Computer Engineering</strong> at <strong className="text-zinc-900 dark:text-white border-b border-emerald-500/50 md:border-emerald-500/30 md:pb-0.5">Instituto Superior Técnico</strong>, researching photonics for future sustainable smart cities. He holds an M.Sc. in Physics Engineering from the University of Aveiro.
                        </p>
                        <p>
                          With a unique <span className="text-emerald-600 dark:text-emerald-400 font-bold">dual-background</span> in <strong>Physics Engineering</strong> and <strong>Electrical Engineering</strong>, he bridges the gap between theoretical science and industrial application.
                        </p>
                        <p>
                          His focus is on developing robust <span className="text-zinc-900 dark:text-white font-bold bg-white/50 md:bg-white/80 dark:bg-white/10 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5 md:border-white/10 md:shadow-sm md:backdrop-blur-sm">hardware prototypes</span>, from <span className="text-emerald-600 dark:text-emerald-400 font-bold">Smart Cities</span> to <span className="text-blue-600 dark:text-blue-400 font-bold">Industrial IoT</span>.
                        </p>
                      </div>
                      <div className={`absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-white/90 md:from-zinc-50 dark:from-[#0a0a0c]/90 md:dark:from-[#0a0a0c] to-transparent md:hidden pointer-events-none transition-opacity duration-300 ${isProfileExpanded ? "opacity-0" : "opacity-100"}`} />
                    </div>

                    <div className="md:hidden mt-1 flex justify-center">
                      <button onClick={() => setIsProfileExpanded(!isProfileExpanded)} className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest py-1 transition-colors">
                        {isProfileExpanded ? "Read Less" : "Read More"} <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isProfileExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-auto flex items-center justify-between border-t border-zinc-200 md:border-zinc-200/80 dark:border-white/10 pt-3 md:pt-6">
                    <div>
                      <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold md:font-mono mb-0.5 md:mb-1.5">Status</p>
                      <div className="flex items-center gap-1.5 md:gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] md:text-sm md:bg-emerald-500/10 md:px-3 md:py-1.5 md:rounded-lg md:border md:border-emerald-500/20 md:w-max">
                        <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
                        </span>
                        Ph.D. Candidate
                      </div>
                    </div>
                    <div className="text-right md:flex md:flex-col md:items-end">
                      <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold md:font-mono mb-0.5 md:mb-1.5">CORE EXPERTISE</p>
                      <p className="text-zinc-900 dark:text-white font-bold flex items-center gap-1 md:gap-1.5 justify-end text-[11px] md:text-sm md:bg-white/60 md:dark:bg-white/5 md:px-3 md:py-1.5 md:rounded-lg md:border md:border-zinc-200 md:dark:border-white/10 md:shadow-sm md:w-max">
                        <EarthLock className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600 md:text-emerald-500 dark:text-emerald-500" /> Secure IoT & Systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cartões da Direita (Divisão Mobile vs Desktop) */}
            <div className="col-span-1 md:col-span-4 flex flex-col md:gap-2 h-full">
              
              {/* VERSÃO MOBILE: Grid Original de 3 colunas que expande com o click */}
              <div className="grid grid-cols-3 gap-2 md:hidden">
                {skillGroups.map((group, idx) => (
                  <MobileHardwareSkillCard key={idx} group={group} index={idx} />
                ))}
              </div>

              {/* VERSÃO DESKTOP: S-Tier Premium Stack */}
              <div className="hidden md:flex flex-col gap-2 h-full">
                {skillGroups.map((group, idx) => (
                  <div key={idx} className="flex-1">
                    <DesktopHardwareSkillCard group={group} />
                  </div>
                ))}
              </div>

            </div>

          </motion.div>
        </div>
      </section>
      
      {/* Classe global de Shimmer embutida se necessário para o Desktop */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </>
  );
}