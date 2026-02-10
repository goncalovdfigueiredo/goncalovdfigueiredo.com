// src/components/HeroSection.tsx
"use client";

import { useState, useRef } from "react";
import { personalInfo } from "@/lib/data";
import { 
  Mail, Github, Linkedin, BookOpen, 
  User, Microscope, Download, Sparkles, MapPin, FileText,
  Cpu, Users, Terminal, Fingerprint, FileBadge
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useAnimation, type Variants } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

/* =========================
   GLOWING CIRCUIT BORDER (Versão Corrigida com Padding)
   ========================= */
function GlowingCircuitBorder({ 
  children, 
  className = "", 
  borderColor = "#10b981" 
}: { 
  children: React.ReactNode; 
  className?: string;
  borderColor?: string;
}) {
  return (
    <div className={`relative group rounded-[2rem] overflow-hidden p-[1.5px] ${className}`}>
      
      {/* 1. FUNDO DA BORDA */}
      <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800/60 transition-colors duration-500" />

      {/* 2. O GLOW QUE RODA */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500%] w-[500%] animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ 
           background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${borderColor} 360deg)`
        }}
       />
      
      {/* 3. CONTEÚDO REAL (Relative para manter altura) */}
      <div className="relative h-full w-full bg-white dark:bg-[#09090b] rounded-[calc(2rem-1.5px)] z-10 overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  );
}

/* =========================
   1. COMPONENTE: SPOTLIGHT CARD
   ========================= */
function SpotlightCard({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.1)" }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,  
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full w-full z-10">{children}</div>
    </div>
  );
}

/* =========================
   2. COMPONENTE: PARTICLE IMAGE
   ========================= */
function ParticleImage() {
  const particleControls = useAnimation();
  const imageControls = useAnimation();
  const contentControls = useAnimation(); 

  const gridSize = 8;
  const totalParticles = gridSize * gridSize;

  const particleVariants: Variants = {
    assembled: {
      x: 0, y: 0, scale: 1, opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exploded: (i) => {
      const randomX = (Math.random() - 0.5) * 250; 
      const randomY = (Math.random() - 0.5) * 250; 
      const randomRotation = (Math.random() - 0.5) * 360;
      
      return {
        x: randomX, y: randomY, scale: 0, rotate: randomRotation, opacity: 1,
        transition: { duration: 0.6, ease: "easeOut", delay: (i % gridSize) * 0.01 + Math.random() * 0.05 }
      };
    }
  };

  const handleMouseEnter = async () => {
    imageControls.start({ opacity: 0, scale: 0.8, transition: { duration: 0.2 } });
    particleControls.start("exploded");
    await contentControls.start({ opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.1 } });
  };

  const handleMouseLeave = async () => {
    await contentControls.start({ opacity: 0, scale: 0.8, transition: { duration: 0.2 } });
    particleControls.start("assembled");
    await imageControls.start({ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.4 } });
  };

  return (
    <div 
      className="relative w-32 h-32 md:w-48 md:h-48 z-20 group cursor-pointer" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={contentControls}
        className="absolute inset-0 rounded-full bg-[#09090b] flex flex-col items-center justify-center p-4 border-2 border-emerald-500/30 shadow-xl overflow-hidden z-10 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-emerald-900/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-2 rounded-full bg-emerald-500/10">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Full CV</p>
          <a href="/CV_Goncalo_Figueiredo.pdf" download className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] md:text-xs font-bold transition-transform active:scale-95 shadow-lg">
            Download <Download className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-30 pointer-events-none rounded-full overflow-hidden">
        {[...Array(totalParticles)].map((_, i) => (
          <motion.div key={i} custom={i} variants={particleVariants} initial="assembled" animate={particleControls} className="w-full h-full bg-zinc-500/80 dark:bg-zinc-400/80" />
        ))}
      </div>

      <motion.div animate={imageControls} className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 shadow-2xl shadow-emerald-500/20 z-20">
        <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white dark:border-[#09090b] bg-white dark:bg-[#09090b]">
           <img src={personalInfo.profilePicture} alt="Profile" className="w-full h-full object-cover scale-105" />
        </div>
        <div className="absolute bottom-2 right-2 w-7 h-7 bg-emerald-500 border-2 border-white dark:border-[#09090b] rounded-full flex items-center justify-center shadow-lg z-30 animate-pulse pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
        </div>
      </motion.div>

    </div>
  );
}

/* =========================
   3. COMPONENTE: PREMIUM SKILL CARD
   ========================= */
const PremiumSkillCard = ({ group }: { group: any }) => {
  let spotlightColor = "rgba(255, 255, 255, 0.1)"; 
  let borderColor = "#10b981"; // default emerald

  if (group.color.includes('blue')) {
     spotlightColor = "rgba(59, 130, 246, 0.15)";
     borderColor = "#3b82f6";
  }
  else if (group.color.includes('purple')) {
     spotlightColor = "rgba(168, 85, 247, 0.15)";
     borderColor = "#a855f7";
  }
  else if (group.color.includes('red')) {
     spotlightColor = "rgba(239, 68, 68, 0.15)";
     borderColor = "#ef4444";
  }

  return (
    <GlowingCircuitBorder className="h-full rounded-[1.5rem]" borderColor={borderColor}>
      <SpotlightCard className="h-full bg-zinc-50 dark:bg-zinc-900/50" spotlightColor={spotlightColor}>
        <motion.div className="relative h-full w-full overflow-hidden cursor-default group" whileHover={{ y: -2 }}>
          <group.icon className={`absolute -bottom-4 -right-4 w-24 h-24 ${group.color} opacity-[0.10] -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110`} />
          <div className="relative z-10 p-5 flex flex-col h-full justify-between">
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 ${group.color} shadow-sm border border-zinc-200 dark:border-white/10`}>
                <group.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">{group.title}</h4>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-widest opacity-80">{group.subtitle}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2"> 
              {group.skills.map((skill: string) => (
                <span key={skill} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 leading-tight hover:bg-white dark:hover:bg-white/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </SpotlightCard>
    </GlowingCircuitBorder>
  );
};

/* =========================
   DADOS & HERO
   ========================= */
const skillGroups = [
  {
    id: "core",
    title: "Core Engineering",
    subtitle: "Hardware",
    icon: Cpu,
    color: "text-blue-600 dark:text-blue-400",
    skills: ["FPGA & Verilog", "PCB Design", "Embedded Systems & Firmware", "Hardware Prototyping", "Python & MATLAB"]
  },
  {
    id: "research",
    title: "Research Domains",
    subtitle: "Scientific Focus",
    icon: Microscope,
    color: "text-purple-600 dark:text-purple-400",
    skills: ["Optical Communications", "Data Encryption & Security", "Photonic Devices", "Smart Cities & IoT Solutions", "Energy Harvesting"]
  },
  {
    id: "leadership",
    title: "Professional Skills",
    subtitle: "Leadership & Management",
    icon: Users,
    color: "text-red-600 dark:text-red-400",
    skills: ["R&D Project Leadership", "Technical Communication", "Community & Event Management", "Science Outreach", "Mentoring"]
  }
];

export default function HeroSection() {
  const contacts = [
    { icon: MapPin, text: "Lisbon, Portugal", href: null },
    { icon: Mail, text: "Email", href: `mailto:goncalovdfigueiredo@gmail.com` },
    { icon: Linkedin, text: "LinkedIn", href: personalInfo.linkedin },
    { icon: Github, text: "GitHub", href: personalInfo.github },
    { icon: BookOpen, text: "Scholar", href: personalInfo.scholar },
    { icon: FileBadge, text: "CiênciaVitae", href: personalInfo.cienciavitae },
    { icon: Fingerprint, text: "ORCID", href: personalInfo.orcid },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85; 
      const index = Math.round(scrollPosition / cardWidth);
      setActiveSlide(index);
    }
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
         <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 mb-20 md:mb-24">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.8 }} className="shrink-0 relative">
            <ParticleImage />
          </motion.div>

          <div className="flex-1 text-center md:text-left pt-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Terminal className="w-3 h-3" /> PhD Candidate & Researcher
            </motion.div>
            <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Hello, I am <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-400 dark:to-blue-500 animate-gradient-x">{personalInfo.name}</span>
            </motion.h1>
            <motion.p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto md:mx-0 leading-relaxed mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Bridging the gap between <span className="font-medium text-zinc-900 dark:text-white">Theoretical Science</span> and <span className="font-medium text-zinc-900 dark:text-white">Industrial Application</span> through advanced FPGA systems and photonics.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center md:justify-start gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {contacts.map((c, i) => (
                <a key={i} href={c.href || "#"} target={c.href ? "_blank" : undefined} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 ${c.href ? "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-zinc-600 dark:text-zinc-300" : "bg-transparent border-transparent text-zinc-400 cursor-default px-0"}`}>
                  <c.icon className="w-3.5 h-3.5" /> {c.text}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        <MotionWrapper delay={0.4}>
            
            {/* MOBILE AREA */}
            <div className="md:hidden">
                <GlowingCircuitBorder className="mb-6 h-full rounded-[1.5rem]" borderColor="#10b981">
                  <SpotlightCard className="h-full bg-zinc-50 dark:bg-zinc-900/50" spotlightColor="rgba(16, 185, 129, 0.15)">
                      <div className="p-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-6 opacity-5"><User className="w-24 h-24 text-zinc-500" /></div>
                          <div>
                              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-4">
                                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><User className="w-5 h-5" /></div>
                                  Professional Profile
                              </h3>
                              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed relative z-10">
                                  <p>
                                    Gonçalo Figueiredo is a Ph.D. Candidate in <strong className="text-zinc-900 dark:text-white">Electrical and Computer Engineering</strong> at <strong>Instituto Superior Técnico</strong>, researching photonics for future sustainable smart cities. He holds an M.Sc. in Physics Engineering from the University of Aveiro.
                                  </p>
                                  <p>
                                    With a unique <span className="font-semibold text-zinc-900 dark:text-white">dual-background</span> in <strong>Physics Engineering</strong> and <strong>Electrical Engineering</strong>, he bridges the gap between <span className="font-semibold text-zinc-900 dark:text-white">theoretical science</span> and industrial application.
                                  </p>
                                  <p>
                                    His focus is on developing robust <span className="font-semibold text-zinc-900 dark:text-white">hardware prototypes</span>, from <span className="text-emerald-600 dark:text-emerald-400 font-medium">Smart Cities</span> to <span className="text-blue-600 dark:text-blue-400 font-medium">Industrial IoT</span>.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </SpotlightCard>
                </GlowingCircuitBorder>

                <div className="relative">
                    <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {skillGroups.map((group, idx) => (
                        <div key={idx} className="min-w-[85vw] snap-center h-[220px]">
                            <PremiumSkillCard group={group} />
                        </div>
                    ))}
                    </div>
                    <div className="flex justify-center gap-1.5 mt-2">
                        {skillGroups.map((_, idx) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-4 bg-emerald-500' : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* DESKTOP GRID */}
            <div className="hidden md:grid grid-cols-12 gap-6 items-stretch h-full">
                
                {/* 1. PROFESSIONAL PROFILE (Coluna Esquerda - Mais larga) */}
                <div className="col-span-7 flex flex-col h-full">
                    <GlowingCircuitBorder className="flex-1 rounded-[2rem]" borderColor="#10b981">
                      <SpotlightCard className="h-full bg-zinc-50 dark:bg-zinc-900/50" spotlightColor="rgba(16, 185, 129, 0.15)">
                          <div className="p-8 h-full flex flex-col relative overflow-hidden group">
                              
                              {/* Conteúdo Principal */}
                              <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-6">
                                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                                          <User className="w-5 h-5" />
                                      </div>
                                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Professional Profile</h3>
                                  </div>
                                  
                                  {/* 👇 TEXTO RESTAURADO AQUI NA VERSÃO DESKTOP TAMBÉM 👇 */}
                                  <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-300 leading-relaxed relative z-10">
                                      <p>
                                        Gonçalo Figueiredo is a Ph.D. Candidate in <strong className="text-zinc-900 dark:text-white">Electrical and Computer Engineering</strong> at <strong>Instituto Superior Técnico</strong>, researching photonics for future sustainable smart cities. He holds an M.Sc. in Physics Engineering from the University of Aveiro.
                                      </p>
                                      <p>
                                        With a unique <span className="font-semibold text-zinc-900 dark:text-white">dual-background</span> in <strong>Physics Engineering</strong> and <strong>Electrical Engineering</strong>, he bridges the gap between <span className="font-semibold text-zinc-900 dark:text-white">theoretical science</span> and industrial application.
                                      </p>
                                      <p>
                                        His focus is on developing robust <span className="font-semibold text-zinc-900 dark:text-white">hardware prototypes</span>, from <span className="text-emerald-600 dark:text-emerald-400 font-medium">Smart Cities</span> to <span className="text-blue-600 dark:text-blue-400 font-medium">Industrial IoT</span>.
                                      </p>
                                  </div>
                              </div>

                              {/* Footer com Metadados */}
                              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5 grid grid-cols-2 gap-8 relative z-10">
                                  <div>
                                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1 block">Primary Focus</span>
                                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                        <Cpu className="w-3.5 h-3.5" /> Hardware & IoT
                                      </span>
                                  </div>
                                  <div>
                                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1 block">Current Status</span>
                                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Open to Research
                                      </span>
                                  </div>
                              </div>
                              
                              {/* Decoração de Fundo */}
                              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                                <User className="w-40 h-40 text-zinc-500" />
                              </div>

                          </div>
                      </SpotlightCard>
                    </GlowingCircuitBorder>
                </div>

                {/* 2. SKILL CARDS (Coluna Direita - Empilhada uniformemente) */}
                <div className="col-span-5 flex flex-col gap-4 h-full">
                    {skillGroups.map((group, idx) => (
                      <div key={idx} className="flex-1">
                          <PremiumSkillCard group={group} />
                      </div>
                    ))}
                </div>
            </div>

        </MotionWrapper>

      </div>
    </section>
  );
}