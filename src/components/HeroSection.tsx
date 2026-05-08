"use client";

import { useState, useRef, useEffect } from "react";
import { personalInfo } from "@/lib/data";
import { 
  Mail, Github, Linkedin, BookOpen, 
  User, Microscope, Download, MapPin, FileText,
  Cpu, Users, Terminal, Fingerprint, FileBadge, ChevronDown
} from "lucide-react"; // <-- ChevronDown Adicionado
import { 
  motion, 
  AnimatePresence, 
  useSpring, 
  useScroll, 
  useTransform,
  useAnimation,
  type Variants
} from "framer-motion";

/* =========================
   1. CYBER TYPEWRITER
   ========================= */
function TypewriterExpertise() {
  const words = [
    "Hardware-Software Integration.",
    "Smart IoT Ecosystems.",
    "Photonics & Sensing.",
    "Embedded Systems.",
    "Industrial Application."
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
    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -right-2 top-0 bottom-0 w-[3px] bg-emerald-400 shadow-[0_0_8px_#34d399]"
      />
    </span>
  );
}

/* =========================
   2. ELECTRON BACKGROUND
   ========================= */
function ElectronBackground() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 1400 });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const electrons = [
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
    { color: "rgba(16, 185, 129, 0.6)", duration: 50 },
    { color: "rgba(59, 130, 246, 0.6)", duration: 50 },
    { color: "rgba(168, 85, 247, 0.6)", duration: 50 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {electrons.map((e, i) => (
        <motion.div
          key={i}
          animate={{
            x: [Math.random() * windowSize.width, Math.random() * windowSize.width],
            y: [Math.random() * windowSize.height, Math.random() * windowSize.height],
          }}
          transition={{ duration: e.duration, repeat: Infinity, ease: "linear" }}
          className="absolute w-2 h-2 rounded-full shadow-[0_0_20px_5px] transition-colors"
          style={{ backgroundColor: e.color, boxShadow: `0 0 25px 5px ${e.color}` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: e.color }} />
        </motion.div>
      ))}
    </div>
  );
}

/* =========================
   3. MAGNETIC BUTTONS 
   ========================= */
function MagneticButton({ children, href }: { children: React.ReactNode, href: string | null }) {
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
      className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-colors duration-300 group overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] z-10"
    >
      {children}
    </motion.a>
  );
}

/* =========================
   4. DISINTEGRATING PROFILE
   ========================= */
function DisintegratingProfile() {
  const particleControls = useAnimation();
  const imageControls = useAnimation();

  useEffect(() => {
    const triggerDisintegration = async () => {
      imageControls.start({ opacity: 0, scale: 0.8, transition: { duration: 0.3 } });
      await particleControls.start("exploded");
      await new Promise((resolve) => setTimeout(resolve, 500));
      particleControls.start("assembled");
      await imageControls.start({ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.4 } });
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
      x: 0, y: 0, scale: 1, opacity: 0, 
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exploded: (i) => {
      const randomX = (Math.random() - 0.5) * 60; 
      const randomY = (Math.random() - 0.5) * 60; 
      const randomRotation = (Math.random() - 0.5) * 360;
      return {
        x: randomX, y: randomY, scale: 0, rotate: randomRotation, opacity: 1, 
        transition: {
          duration: 0.8, ease: "easeOut", delay: (i % gridSize) * 0.02 + Math.random() * 0.1
        }
      };
    }
  };

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 group">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-30 pointer-events-none rounded-full overflow-hidden">
        {[...Array(totalParticles)].map((_, i) => (
          <motion.div
            key={i} custom={i} variants={particleVariants} initial="assembled" animate={particleControls}
            className="w-full h-full bg-emerald-500/80"
          />
        ))}
      </div>
      <motion.div 
        animate={imageControls} 
        className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 shadow-[0_0_40px_rgba(16,185,129,0.3)] z-20"
      >
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#09090b] bg-[#09090b]">
          <img src={personalInfo.profilePicture} alt="Profile" className="w-full h-full object-cover scale-110 filter contrast-125" />
        </div>
      </motion.div>
      <a href="/CV_Goncalo_Figueiredo.pdf" download className="absolute -bottom-2 -right-6 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-110 transition-transform z-50 pointer-events-auto">
        <Download className="w-4 h-4" /> CV
      </a>
    </div>
  );
}

/* =========================
   5. HARDWARE UNLOCK CARD 
   ========================= */
const HardwareSkillCard = ({ group, index }: { group: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  let themeColor = "rgba(16,185,129,"; 
  let textColor = "text-emerald-400";
  let glowColor = "bg-emerald-500/10";
  let glowHoverColor = "group-hover/card:bg-emerald-500/20";
  
  if (group.color.includes('blue')) { 
    themeColor = "rgba(59,130,246,"; 
    textColor = "text-blue-400"; 
    glowColor = "bg-blue-500/10";
    glowHoverColor = "group-hover/card:bg-blue-500/20";
  }
  if (group.color.includes('purple')) { 
    themeColor = "rgba(168,85,247,"; 
    textColor = "text-purple-400"; 
    glowColor = "bg-purple-500/10";
    glowHoverColor = "group-hover/card:bg-purple-500/20";
  }
  if (group.color.includes('red')) { 
    themeColor = "rgba(239,68,68,"; 
    textColor = "text-red-400"; 
    glowColor = "bg-red-500/10";
    glowHoverColor = "group-hover/card:bg-red-500/20";
  }

  const startAngle = index * 120; 

  return (
    <motion.div 
      className="relative w-full flex-1 min-h-[140px] rounded-2xl overflow-hidden cursor-pointer group/card flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-[#0a0a0c] border border-white/5 rounded-2xl z-0" />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] z-0 pointer-events-none opacity-60 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 80%, ${themeColor}1) 100%)` }}
        animate={{ x: "-50%", y: "-50%", rotate: [startAngle, startAngle + 360] }}
        transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" } }}
      />
      
      <div className="absolute inset-[1.5px] bg-[#09090b] rounded-[calc(1rem-1.5px)] z-0" />

      <div className="absolute inset-[1.5px] bg-zinc-900/40 rounded-[calc(1rem-1.5px)] z-0 transition-colors duration-500" />
      
      <div className={`absolute top-0 right-0 w-48 h-48 ${glowColor} rounded-full blur-[50px] ${glowHoverColor} transition-colors pointer-events-none z-0`} />

      <group.icon 
        className={`absolute -bottom-4 -right-4 w-28 h-28 ${textColor} opacity-[0.06] -rotate-12 transition-all duration-700 group-hover/card:rotate-0 group-hover/card:scale-125 group-hover/card:opacity-[0.25] pointer-events-none z-10`} 
      />

      <AnimatePresence>
        {!isHovered && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center"
          >
            <group.icon className={`w-10 h-10 mb-3 opacity-30 ${textColor}`} />
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em]">{group.title}</h3>
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 rounded-full animate-pulse bg-zinc-500" />
              <div className="w-2 h-2 rounded-full animate-pulse bg-zinc-500" />
              <div className="w-2 h-2 rounded-full animate-pulse bg-zinc-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 z-30 p-6 flex flex-col justify-center bg-transparent overflow-hidden h-full"
          >
            <motion.div 
              animate={{ top: ['0%', '150%', '0%'] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] shadow-[0_0_10px_currentColor] z-50 pointer-events-none"
              style={{ backgroundColor: `${themeColor}0.8)`, color: `${themeColor}1)` }}
            />
            
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${textColor} mb-1 block`}>{group.subtitle}</span>
                <h4 className="text-lg font-bold text-white leading-none">{group.title}</h4>
              </div>
              <div className={`p-2 rounded-lg bg-white/5 ${textColor}`}><group.icon className="w-5 h-5" /></div>
            </div>
            
            <div className="flex flex-wrap gap-1 relative z-10"> 
              {group.skills.map((skill: string) => (
                <span key={skill} className="px-2.5 py-1 rounded bg-white/10 text-white text-[8px] font-medium border border-white/5 shadow-sm">
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

/* =========================
   6. O COMPONENTE PRINCIPAL
   ========================= */
const skillGroups = [
  { id: "core", title: "Core Engineering", subtitle: "Hardware", icon: Cpu, color: "text-emerald-500", skills: ["FPGA & Verilog", "PCB Design", "Embedded Systems & Firmware", "Hardware Prototyping", "Python & MATLAB"] },
  { id: "research", title: "Research Domains", subtitle: "Scientific Focus", icon: Microscope, color: "text-blue-500", skills: ["Optical Communications", "Data Encryption & Security", "Photonic Devices", "Smart Cities & IoT Solutions", "Energy Harvesting"] },
  { id: "leadership", title: "Professional Skills", subtitle: "Leadership & Management", icon: Users, color: "text-purple-500", skills: ["R&D Project Leadership", "Technical Communication", "Community & Event Management", "Science Outreach", "Mentoring"] }
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yElement = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // ESTADO PARA O ACORDEÃO NO MOBILE
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const contacts = [
    { icon: MapPin, text: "Lisbon, Portugal", href: null }, 
    { icon: Mail, text: "Email", href: `mailto:goncalovdfigueiredo@gmail.com` }, 
    { icon: Linkedin, text: "LinkedIn", href: personalInfo.linkedin }, 
    { icon: Github, text: "GitHub", href: personalInfo.github }, 
    { icon: BookOpen, text: "Scholar", href: personalInfo.scholar }, 
    { icon: FileBadge, text: "CiênciaVitae", href: personalInfo.cienciavitae }, 
    { icon: Fingerprint, text: "ORCID", href: personalInfo.orcid }
  ];

  return (
    <section ref={sectionRef} className="relative pt-25 pb-16 md:pt-30 md:pb-32 overflow-hidden perspective-1000">
      
      {/* ENVOLVEDOR DE FUNDO COM FADE-OUT SUAVE */}
      <div className="absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <ElectronBackground />
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
      </div>

      <div className="container max-w-8xl mx-auto px-6 relative z-10">
        
        {/* === ZONA 1: INTRODUÇÃO GIGANTE === */}
        <motion.div style={{ y: yElement }} className="flex flex-col items-center text-center mb-4 md:mb-8 group">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 12 }}
            className="relative mb-6 md:mb-8 group"
          >
            <DisintegratingProfile />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] md:text-xxs font-black uppercase tracking-[0.3em] mb-4 md:mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Terminal className="w-3.5 h-3.5" /> PhD Candidate
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 md:mb-6 uppercase leading-[0.9]"
          >
            Gonçalo <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">Figueiredo</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-zinc-400 font-light max-w-l leading-relaxed mb-6 md:mb-4">
            Bridging the gap between <strong className="text-white font-bold">Theoretical Science</strong> and <strong className="text-white font-bold">Industrial Application</strong>  <br className="hidden md:block"/>
            through <TypewriterExpertise />
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-4xl mb-4 md:mb-7"
          >
            {contacts.map((c, i) => {
              if (!c.href) {
                // Localização
                return (
                  <div key={i} className="flex items-center gap-1.5 text-zinc-400 mr-1 md:mr-3">
                    <c.icon className="w-3.5 h-3.5 md:w-4 md:h-4" /> 
                    <span className="text-[11px] md:text-xs font-medium">{c.text}</span>
                  </div>
                );
              }
              // Botões Magnéticos
              return (
                <MagneticButton key={i} href={c.href}>
                  <c.icon className="w-3.5 h-3.5 md:w-4 md:h-4" /> 
                  <span className="text-[11px] md:text-xs">{c.text}</span>
                </MagneticButton>
              );
            })}
          </motion.div>

        </motion.div>

        {/* === ZONA 2: BENTO BOX INTERATIVA === */}
        <motion.div 
          style={{ y: yElement }}
          className="grid grid-cols-1 md:grid-cols-15 gap-4 md:gap-6 mt-2" 
        >
          {/* Main Profile Card */}
          <div className="col-span-1 md:col-span-10 flex flex-col">
            <div className="flex-1 w-full relative rounded-2xl bg-zinc-900/40 border border-white/10 px-6 pt-6 pb-5 md:px-10 md:pt-10 md:pb-6 overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
              
              <div className="relative z-10 flex flex-col flex-1 h-full">
                <div>
                  <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
                    <div className="p-2 md:p-3 rounded-2xl bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                      <User className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Professional Profile</h2>
                  </div>
                  
                  {/* CONTEÚDO DO PERFIL COM ACORDEÃO (Expansível no Mobile) */}
                  <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isProfileExpanded ? 'max-h-[800px]' : 'max-h-[70px] md:max-h-[800px]'}`}>
                    
                    <div className="space-y-4 md:space-y-2 text-sm md:text-lg text-zinc-300 font-light leading-relaxed">
                      <p> Gonçalo Figueiredo is a Ph.D. Candidate in <strong className="text-white">Electrical and Computer Engineering</strong> at <strong className="text-white border-b border-emerald-500/50">Instituto Superior Técnico</strong>, researching photonics for future sustainable smart cities. He holds an M.Sc. in Physics Engineering from the University of Aveiro. </p>
                      <p> With a unique <span className="text-emerald-400 font-medium">dual-background</span> in <strong>Physics Engineering</strong> and <strong>Electrical Engineering</strong>, he bridges the gap between theoretical science and industrial application. </p>
                      <p> His focus is on developing robust <span className="text-white font-medium bg-white/10 px-2 py-1 rounded">hardware prototypes</span>, from <span className="text-emerald-400 font-bold">Smart Cities</span> to <span className="text-blue-400 font-bold">Industrial IoT</span>. </p>
                    </div>

                    {/* FADE EFFECT: Invisível no PC, visível no Mobile quando está encolhido */}
                    <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#131315] to-transparent md:hidden pointer-events-none transition-opacity duration-300 ${isProfileExpanded ? 'opacity-0' : 'opacity-100'}`} />
                  
                  </div>

                  {/* BOTÃO READ MORE (Aparece só no Mobile) */}
                  <div className="md:hidden mt-2 flex justify-center">
                    <button 
                      onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                      className="flex items-center gap-1.5 text-[10px] text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-widest py-2 transition-colors"
                    >
                      {isProfileExpanded ? "Read Less" : "Read More"}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProfileExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                </div>

                <div className="mt-0 md:mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Status</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs md:text-sm">
                      <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-emerald-500"></span>
                      </span>
                      Open to Research
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Primary Focus</p>
                    <p className="text-white font-bold flex items-center gap-1.5 md:gap-2 justify-end text-xs md:text-sm"><Cpu className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500"/> Hardware & IoT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sci-Fi Skill Cards (Scroll Horizontal em Mobile) */}
          <div 
            className="col-span-1 md:col-span-5 flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 h-full [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {skillGroups.map((group, idx) => (
              <div key={idx} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center flex flex-col flex-1">
                <HardwareSkillCard group={group} index={idx} />
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}