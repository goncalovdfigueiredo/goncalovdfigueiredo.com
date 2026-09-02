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
  type Variants,
} from "framer-motion";

// IMPORTAÇÕES DE FUNDOS E EFEITOS 3D
import MagicRings from "./MagicRings";
import GhostCursor from "./GhostCursor";

/* ========================================================================
   0. VARIANTES DE ANIMAÇÃO
   ======================================================================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1.1,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  },
};

const itemZoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 3.8,
    },
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
        if (currentText === fullWord)
          setTimeout(() => setIsDeleting(true), 2500);
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
    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.2)] dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -right-2 top-0 bottom-0 w-[3px] bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_#34d399]"
      />
    </span>
  );
}

/* ========================================================================
   2. MAGNETIC BUTTONS
   ======================================================================== */
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-medium transition-all duration-300 group overflow-hidden shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.02)] z-10 backdrop-blur-md hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-zinc-950 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
    >
      {children}
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
      imageControls.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3 },
      });
      await particleControls.start("exploded");
      await new Promise((resolve) => setTimeout(resolve, 10));
      particleControls.start("assembled");
      await imageControls.start({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.3, duration: 0.6 },
      });
    };

    const timer = setTimeout(triggerDisintegration, 2000);
    const loopTimer = setInterval(triggerDisintegration, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(loopTimer);
      particleControls.stop();
      imageControls.stop();
    };
  }, [particleControls, imageControls]);

  const gridSize = 8;
  const totalParticles = gridSize * gridSize;

  const particleVariants: Variants = {
    assembled: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exploded: (i) => {
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 60;
      const randomRotation = (Math.random() - 0.5) * 360;
      return {
        x: randomX,
        y: randomY,
        scale: 0,
        rotate: randomRotation,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          delay: (i % gridSize) * 0.02 + Math.random() * 0.1,
        },
      };
    },
  };

  return (
    <div className="relative w-24 h-24 md:w-40 md:h-40 group flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[420px] md:h-[420px] z-0 pointer-events-none opacity-50 mix-blend-screen">
        <MagicRings
          color="#34d399"
          colorTwo="#059669"
          ringCount={3}
          speed={0.8}
          baseRadius={0.22}
          radiusStep={0.08}
          opacity={0.6}
          followMouse={true}
        />
      </div>

      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-30 pointer-events-none rounded-full overflow-hidden">
        {[...Array(totalParticles)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            initial="assembled"
            animate={particleControls}
            className="w-full h-full bg-emerald-500/80"
          />
        ))}
      </div>

      <motion.div
        animate={imageControls}
        className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-emerald-500 via-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:shadow-[0_0_30px_rgba(16,185,129,0.3)] z-20"
      >
        <div className="w-full h-full rounded-full overflow-hidden border-2 md:border-4 border-white dark:border-[#09090b] bg-white dark:bg-[#09090b]">
          <img
            src={personalInfo.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover scale-110 filter contrast-125"
          />
        </div>
      </motion.div>

      <a
        href="/CV_Goncalo_Figueiredo.pdf"
        download
        className="absolute -bottom-1 -right-4 md:-bottom-2 md:-right-6 flex items-center gap-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs shadow-lg hover:scale-110 transition-transform z-50 pointer-events-auto"
      >
        <Download className="w-3.5 h-3.5" /> CV
      </a>
    </div>
  );
}

/* ========================================================================
   4. HARDWARE UNLOCK CARD
   ======================================================================== */
const HardwareSkillCard = ({ group, index }: { group: any; index?: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  let themeColor = "rgba(16,185,129,";
  let textColorClass = "text-emerald-600 dark:text-emerald-400";
  let glowColor = "bg-emerald-500/10";
  let glowHoverColor = "group-hover/card:bg-emerald-500/20";

  if (group.color.includes("blue")) {
    themeColor = "rgba(59,130,246,";
    textColorClass = "text-blue-600 dark:text-blue-400";
    glowColor = "bg-blue-500/10";
    glowHoverColor = "group-hover/card:bg-blue-500/20";
  }
  if (group.color.includes("purple")) {
    themeColor = "rgba(168,85,247,";
    textColorClass = "text-purple-600 dark:text-purple-400";
    glowColor = "bg-purple-500/10";
    glowHoverColor = "group-hover/card:bg-purple-500/20";
  }

  return (
    <motion.div
      variants={itemFadeUp}
      className="relative w-full rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group/card flex flex-col backdrop-blur-md h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-[#0a0a0c]/70 border border-zinc-200 dark:border-white/5 rounded-xl md:rounded-2xl z-0 backdrop-blur-xl" />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[1000px] md:h-[1000px] z-0 pointer-events-none opacity-20 dark:opacity-60 group-hover/card:opacity-40 dark:group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 80%, ${themeColor}1) 100%)`,
        }}
        animate={{
          x: "-50%",
          y: "-50%",
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
        }}
      />

      <div className="absolute inset-[1.5px] bg-white/80 dark:bg-[#09090b]/80 rounded-[calc(0.75rem-1.5px)] md:rounded-[calc(1rem-1.5px)] z-0" />
      <div className="absolute inset-[1.5px] bg-zinc-50/50 dark:bg-zinc-900/40 rounded-[calc(0.75rem-1.5px)] md:rounded-[calc(1rem-1.5px)] z-0 transition-colors duration-500" />

      <div
        className={`absolute top-0 right-0 w-24 h-24 md:w-48 md:h-48 ${glowColor} rounded-full blur-[30px] md:blur-[50px] ${glowHoverColor} transition-colors pointer-events-none z-0`}
      />

      <group.icon
        className={`absolute -bottom-2 -right-2 w-16 h-16 md:w-28 md:h-28 ${textColorClass} opacity-[0.03] dark:opacity-[0.06] -rotate-12 pointer-events-none z-10`}
      />

      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20 flex flex-col items-center justify-center p-3 text-center md:flex-col md:p-6 h-full min-h-[90px] md:min-h-0"
          >
            <div
              className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 ${textColorClass} mb-1.5 md:mb-3`}
            >
              <group.icon className="w-4 h-4 md:w-10 md:h-10" />
            </div>

            <h3 className="text-[10px] md:text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight md:tracking-wider leading-tight line-clamp-1">
              {group.title}
            </h3>

            <span
              className={`text-[8px] md:hidden font-bold uppercase tracking-widest ${textColorClass} mt-0.5 opacity-80`}
            >
              Tap
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="relative z-30 p-3 md:p-6 flex flex-col justify-center bg-transparent h-full"
          >
            <div className="flex justify-between items-start mb-2 md:mb-3">
              <div>
                <span
                  className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${textColorClass} mb-0.5 block`}
                >
                  {group.subtitle}
                </span>
                <h4 className="text-xs md:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                  {group.title}
                </h4>
              </div>
              <div
                className={`p-1.5 md:p-2 rounded-lg bg-zinc-100 dark:bg-white/5 ${textColorClass}`}
              >
                <group.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {group.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-1.5 py-0.5 md:px-2.5 md:py-1 rounded bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-white text-[7px] md:text-[8px] font-medium border border-zinc-300 dark:border-white/5 shadow-sm"
                >
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
   5. O COMPONENTE PRINCIPAL
   ======================================================================== */
const skillGroups = [
  {
    id: "core",
    title: "Core Engineering",
    subtitle: "Hardware",
    icon: Cpu,
    color: "text-emerald-500",
    skills: [
      "FPGA & Verilog",
      "PCB Design",
      "Embedded Systems & Firmware",
      "Hardware Prototyping",
      "Python & MATLAB",
    ],
  },
  {
    id: "research",
    title: "Research Domains",
    subtitle: "Scientific Focus",
    icon: Microscope,
    color: "text-blue-500",
    skills: [
      "Optical Communications",
      "Data Encryption & Security",
      "Photonic Devices",
      "Smart Cities & IoT Solutions",
      "Energy Harvesting",
    ],
  },
  {
    id: "leadership",
    title: "Professional Skills",
    subtitle: "Leadership & Management",
    icon: Users,
    color: "text-purple-500",
    skills: [
      "R&D Project Leadership",
      "Technical Communication",
      "Community & Event Management",
      "Science Outreach",
      "Mentoring",
    ],
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yElement = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

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
      {/* 
        GhostCursor com as configurações do código original!
      */}
      <GhostCursor
        color="#10b981"         // Verde Esmeralda
        trailLength={15}        // BEM MAIS CURTO (antes era 30 ou 40)
        brightness={1.5}        
        inertia={0.5}           
        fadeDelayMs={200}       // Começa a desaparecer muito mais rápido
        fadeDurationMs={800}    // Dissipa-se mais rápido
        style={{ zIndex: 0 }}
        className="fixed inset-0 w-screen h-screen pointer-events-none"
      />

<section
        id="hero"
        ref={sectionRef}
        /* 1. Removi o overflow-hidden daqui para o fumo poder espalhar-se livremente */
        className="relative pt-28 pb-12 md:pt-25 md:pb-32 perspective-1000"
      >
        {/* 2. Mantive o overflow-hidden APENAS na div da grelha de fundo, para ela não passar por cima das outras secções */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Grelha Cibernética de Fundo */}
          <div className="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] opacity-80 mix-blend-overlay">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          
          {/* BLOCO DE TOPO (Perfil, Título, Info, Botões) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: yElement }}
            className="flex flex-col items-center text-center mb-6 md:mb-8 group"
          >
            <motion.div variants={itemZoomIn} className="relative mb-4 md:mb-8 group pointer-events-auto">
              <DisintegratingProfile />
            </motion.div>

            <motion.div variants={itemFadeUp} className="inline-flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[9px] md:text-xxs font-black uppercase tracking-[0.25em] mb-3 md:mb-6 shadow-sm backdrop-blur-md pointer-events-auto">
              <Terminal className="w-3 h-3" /> Ph.D. Candidate
            </motion.div>

            <motion.h1 variants={itemFadeUp} className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white mb-4 md:mb-6 uppercase leading-[0.85] pointer-events-auto">
              Gonçalo <br className="md:hidden" />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 drop-shadow-sm">
                Figueiredo
              </span>
            </motion.h1>

            <motion.p variants={itemFadeUp} className="text-xs sm:text-sm md:text-lg text-zinc-600 dark:text-zinc-300 font-medium max-w-Lg leading-relaxed mb-4 md:mb-4 relative z-10 pointer-events-auto px-2">
              Bridging the gap between{" "}
              <strong className="text-zinc-900 dark:text-white font-bold ml-0.5">
                Theoretical Science
              </strong>{" "}
              and{" "}
              <strong className="text-zinc-900 dark:text-white font-bold ml-0.5">
                Industrial Application
              </strong>{" "}
              <br />{" "}
              <span className="mt-1 inline-block">
                through <TypewriterExpertise />
              </span>
            </motion.p>

            <motion.div variants={itemFadeUp} className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 max-w-4xl mb-4 md:mb-7 relative z-10 pointer-events-auto px-2">
              {contacts.map((c, i) => {
                if (!c.href) {
                  return (
                    <div key={i} className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-full bg-white/50 dark:bg-black/20 border border-zinc-200/50 dark:border-white/10 backdrop-blur-md text-[10px] md:text-xs">
                      <c.icon className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-semibold">{c.text}</span>
                    </div>
                  );
                }
                return (
                  <MagneticButton key={i} href={c.href}>
                    <c.icon className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-[10px] md:text-xs">{c.text}</span>
                  </MagneticButton>
                );
              })}
            </motion.div>
          </motion.div>

          {/* BLOCO INFERIOR (Perfil Detalhado + Cartões) */}
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ y: yElement }}
            className="grid grid-cols-1 md:grid-cols-15 gap-3 md:gap-6 relative z-20"
          >
            {/* Cartão Central / Esquerdo */}
            <motion.div variants={itemFadeUp} className="col-span-1 md:col-span-10 flex flex-col">
              <div className="flex-1 w-full relative rounded-xl md:rounded-2xl bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 p-4 md:px-10 md:pt-10 md:pb-6 overflow-hidden group flex flex-col shadow-sm">
                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/10 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex flex-col flex-1 h-full">
                  <div>
                    <div className="flex items-center gap-2.5 md:gap-4 mb-3 md:mb-8">
                      <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-emerald-500 text-white dark:text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <User className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <h2 className="text-base md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Professional Profile
                      </h2>
                    </div>

                    <div
                      className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                        isProfileExpanded
                          ? "max-h-[800px]"
                          : "max-h-[60px] md:max-h-[800px]"
                      }`}
                    >
                      <div className="text-justify space-y-3 md:space-y-2 text-xs sm:text-sm md:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                        <p>
                          Gonçalo Figueiredo is a Ph.D. Candidate in{" "}
                          <strong className="text-zinc-900 dark:text-white">
                            Electrical and Computer Engineering
                          </strong>{" "}
                          at{" "}
                          <strong className="text-zinc-900 dark:text-white border-b border-emerald-500/50">
                            Instituto Superior Técnico
                          </strong>
                          , researching photonics for future sustainable smart
                          cities. He holds an M.Sc. in Physics Engineering from
                          the University of Aveiro.
                        </p>
                        <p>
                          With a unique{" "}
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            dual-background
                          </span>{" "}
                          in <strong>Physics Engineering</strong> and{" "}
                          <strong>Electrical Engineering</strong>, he bridges the
                          gap between theoretical science and industrial
                          application.
                        </p>
                        <p>
                          His focus is on developing robust{" "}
                          <span className="text-zinc-900 dark:text-white font-bold bg-white/50 dark:bg-white/10 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5">
                            hardware prototypes
                          </span>
                          , from{" "}
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            Smart Cities
                          </span>{" "}
                          to{" "}
                          <span className="text-blue-600 dark:text-blue-400 font-bold">
                            Industrial IoT
                          </span>
                          .
                        </p>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 dark:from-[#0a0a0c]/90 to-transparent md:hidden pointer-events-none transition-opacity duration-300 ${
                          isProfileExpanded ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    </div>

                    <div className="md:hidden mt-1 flex justify-center">
                      <button
                        onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                        className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest py-1 transition-colors"
                      >
                        {isProfileExpanded ? "Read Less" : "Read More"}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isProfileExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-auto flex items-center justify-between border-t border-zinc-200 dark:border-white/10 pt-3 md:pt-4">
                    <div>
                      <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
                        Status
                      </p>
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] md:text-sm">
                        <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-emerald-500"></span>
                        </span>
                        Ph.D. Candidate
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">
                        CORE EXPERTISE
                      </p>
                      <p className="text-zinc-900 dark:text-white font-bold flex items-center gap-1 justify-end text-[11px] md:text-sm">
                        <EarthLock className="w-3 h-3 md:w-4 md:h-4 text-emerald-600 dark:text-emerald-500" />{" "}
                        Secure IoT & Systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cartões da Direita */}
            <div className="col-span-1 md:col-span-5 grid grid-cols-3 md:flex md:flex-col gap-2 md:gap-6">
              {skillGroups.map((group, idx) => (
                <div key={idx} className="flex flex-col flex-1">
                  <HardwareSkillCard group={group} index={idx} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}