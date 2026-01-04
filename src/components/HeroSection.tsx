"use client";

import { useState, useRef, useEffect } from "react"; // Adicionado useRef e useEffect
import { personalInfo } from "@/lib/data";
import { 
  Mail, Github, Linkedin, BookOpen, 
  User, Microscope, Download, Sparkles, MapPin, FileText,
  Cpu, Users, Terminal, Fingerprint, FileBadge
} from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

/* =========================
   COMPONENT: FLIP CARD
   ========================= */
function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-40 h-40 md:w-56 md:h-56 perspective group cursor-pointer z-20"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* FRENTE */}
        <div className="absolute w-full h-full backface-hidden rounded-full p-1.5 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 shadow-2xl shadow-emerald-500/20">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#09090b] bg-white dark:bg-[#09090b]">
              <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-2 border-white dark:border-[#09090b] rounded-full flex items-center justify-center shadow-lg z-10 animate-pulse">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
        
        {/* VERSO */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#09090b] flex flex-col items-center justify-center p-4 rounded-full border-2 border-emerald-500/30 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-emerald-900/20 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="p-2 rounded-full bg-emerald-500/10 mb-1">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Full CV</p>
              <a 
                href="/CV_Goncalo_Figueiredo.pdf"
                download
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-bold transition-transform active:scale-95 shadow-lg"
                onClick={(e) => e.stopPropagation()} 
              >
                Download
                <Download className="w-3 h-3" />
              </a>
            </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================
   DADOS DAS SKILLS
   ========================= */
const skillGroups = [
  {
    title: "Core Engineering",
    subtitle: "Hardware & Instrumentation",
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/5",
    border: "border-blue-500/10",
    skills: ["FPGA & Verilog", "PCB Design", "Embedded Systems & Firmware", "Hardware Prototyping", "Python & MATLAB"]
  },
  {
    title: "Research Domains",
    subtitle: "Scientific Focus",
    icon: Microscope,
    color: "text-purple-500",
    bg: "bg-purple-500/5",
    border: "border-purple-500/10",
    skills: ["Optical Communications", "Data Encryption & Security", "Smart Cities & IoT Solutions", "Photonic Devices", "Energy Harvesting","Luminescent Solar Concentrators", 
]
  },
  {
    title: "Professional Capabilities",
    subtitle: "Leadership & Management",
    icon: Users,
    color: "text-emerald-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/10",
    skills: ["R&D Project Leadership", "Technical Communication", "Community & Event Management", "Science Outreach", "Mentoring"]
  }
];

/* =========================
   HERO SECTION PRINCIPAL
   ========================= */
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

  // Lógica para os pontos do slider mobile
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85; // Aproximação da largura do cartão
      const index = Math.round(scrollPosition / cardWidth);
      setActiveSlide(index);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden">
      
      {/* 1. BACKGROUND GRID */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
         <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* 2. HERO HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 mb-16 md:mb-20">
          
          {/* Foto */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="shrink-0 relative"
          >
            <FlipCard />
            <p className="md:hidden text-[10px] text-zinc-400 uppercase tracking-widest opacity-60 mt-4 animate-pulse">
               Tap photo for CV
            </p>
          </motion.div>

          {/* Texto Principal */}
          <div className="flex-1 text-center md:text-left pt-2">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Terminal className="w-3 h-3" />
              PhD Candidate & Researcher
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hello, I am <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-400 dark:to-blue-500 animate-gradient-x">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Bridging the gap between <span className="font-medium text-zinc-900 dark:text-white">Theoretical Science</span> and <span className="font-medium text-zinc-900 dark:text-white">Industrial Application</span> through advanced FPGA systems and photonics.
            </motion.p>

            {/* Links Sociais */}
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href || "#"}
                  target={c.href ? "_blank" : undefined}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-300
                    ${c.href 
                      ? "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-zinc-600 dark:text-zinc-300" 
                      : "bg-transparent border-transparent text-zinc-400 cursor-default px-0"}
                  `}
                >
                  <c.icon className="w-3.5 h-3.5" />
                  {c.text}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 3. BENTO GRID */}
        <MotionWrapper delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
            
            {/* BIO CARD (Sempre Visível) */}
            <div className="md:col-span-2 h-full p-6 md:p-8 rounded-[2rem] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-sm relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <User className="w-32 h-32 text-zinc-500" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <User className="w-5 h-5" />
                      </div>
                      Professional Profile
                  </h3>
                  
                  <div className="space-y-4 text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed relative z-10">
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

                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span>Open to collaborations in Hardware & Photonics.</span>
                </div>
            </div>

            {/* =======================================
                MOBILE SKILLS CAROUSEL (NOVO PREMIUM)
               ======================================= */}
            <div className="md:hidden relative">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                 {skillGroups.map((group, idx) => (
                    <div 
                        key={idx}
                        className={`
                            min-w-[85vw] snap-center
                            p-6 rounded-[2rem] border ${group.border} bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl
                            flex flex-col justify-center
                            shadow-lg shadow-black/5
                        `}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2.5 rounded-full bg-white dark:bg-white/5 ${group.color} shrink-0 border border-black/5 dark:border-white/5`}>
                                <group.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-zinc-900 dark:text-white leading-none mb-1">{group.title}</h4>
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">{group.subtitle}</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map(skill => (
                                <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/80 dark:bg-black/40 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/5 leading-tight text-center">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
              </div>
              
              {/* Indicadores de Pontos */}
              <div className="flex justify-center gap-1.5 mt-2">
                {skillGroups.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-4 bg-emerald-500' : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'}`} 
                  />
                ))}
              </div>
            </div>


            {/* =======================================
                DESKTOP SKILLS GRID (MANTIDO IGUAL)
               ======================================= */}
            <div className="hidden md:flex md:col-span-1 flex-col gap-4 h-full">
                {skillGroups.map((group, idx) => (
                    <div 
                        key={idx}
                        className={`
                            flex-1 min-h-[140px] 
                            p-5 rounded-[2rem] border ${group.border} ${group.bg} 
                            hover:scale-[1.02] transition-transform duration-300 cursor-default
                            flex flex-col justify-center backdrop-blur-sm
                        `}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-full bg-white dark:bg-white/5 ${group.color} shrink-0 border border-black/5 dark:border-white/5`}>
                                <group.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-none mb-1">{group.title}</h4>
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider block">{group.subtitle}</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                            {group.skills.map(skill => (
                                <span key={skill} className="px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-medium bg-white/80 dark:bg-black/40 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/5 leading-tight text-center hover:border-zinc-300 dark:hover:border-white/20 transition-colors cursor-default hover:scale-105">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}