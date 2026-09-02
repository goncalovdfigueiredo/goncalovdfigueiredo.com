// src/components/StickySidebar.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  BookOpen, 
  FileBadge, 
  Fingerprint, 
  PanelLeftClose, 
  PanelLeftOpen,
  Search,
  Command,
  ArrowRight
} from "lucide-react";

// IMPORTAR TODA A TUA DATA!
import { 
  personalInfo, 
  workExperience, 
  education, 
  awards, 
  publications,
  scientificEvents,
  LeadershipExperience
} from "@/lib/data"; 

/* =========================================================
   COMPONENTE: AIR HOCKEY ARENA
   ========================================================= */
const AirHockeyLogosArena = ({ logos }: { logos: { name: string; logo: string }[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Inicializar posições em grelha 2x5 para nunca começarem colados
  const discsRef = useRef(
    logos.map((item, idx) => {
      const col = idx % 5;
      const row = Math.floor(idx / 5);
      return {
        ...item,
        id: idx,
        x: 18 + col * 26 + (Math.random() * 4),
        y: 25 + row * 38 + (Math.random() * 4),
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        radius: 13, // Tamanho ideal para os discos na arena
      };
    })
  );

  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      const discs = discsRef.current;

      // 1. Atualizar posições e ressaltos nas bordas
      discs.forEach((disc) => {
        disc.x += disc.vx;
        disc.y += disc.vy;

        if (disc.x - disc.radius < 0) {
          disc.x = disc.radius;
          disc.vx *= -1;
        } else if (disc.x + disc.radius > width) {
          disc.x = width - disc.radius;
          disc.vx *= -1;
        }

        if (disc.y - disc.radius < 0) {
          disc.y = disc.radius;
          disc.vy *= -1;
        } else if (disc.y + disc.radius > height) {
          disc.y = height - disc.radius;
          disc.vy *= -1;
        }
      });

      // 2. Colisões elásticas entre os discos
      for (let i = 0; i < discs.length; i++) {
        for (let j = i + 1; j < discs.length; j++) {
          const d1 = discs[i];
          const d2 = discs[j];

          const dx = d2.x - d1.x;
          const dy = d2.y - d1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = d1.radius + d2.radius;

          if (distance < minDist) {
            const overlap = minDist - distance;
            const nx = dx / (distance || 1);
            const ny = dy / (distance || 1);

            d1.x -= nx * overlap * 0.5;
            d1.y -= ny * overlap * 0.5;
            d2.x += nx * overlap * 0.5;
            d2.y += ny * overlap * 0.5;

            const kx = d1.vx - d2.vx;
            const ky = d1.vy - d2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            d1.vx -= p * nx;
            d1.vy -= p * ny;
            d2.vx += p * nx;
            d2.vy += p * ny;
          }
        }
      }

      setRenderTrigger(prev => prev + 1);
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (logos.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      // Removidas as margens automáticas (my-auto, my-2) para alinhar perfeitamente no bloco inferior
      className="h-28 w-full relative overflow-hidden rounded-xl bg-zinc-950/40 border border-zinc-200/20 dark:border-white/10 shadow-inner"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
        <div className="w-10 h-10 rounded-full border border-emerald-500/40" />
        <div className="absolute inset-x-0 h-px bg-emerald-500/20" />
      </div>

      {discsRef.current.map((disc) => (
        <div
          key={disc.id}
          title={disc.name}
          className="absolute w-7 h-7 rounded-full bg-white dark:bg-[#111113] border border-zinc-200 dark:border-white/20 p-0.5 flex items-center justify-center shadow-md cursor-pointer select-none"
          style={{
            left: `${disc.x}px`,
            top: `${disc.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={disc.logo} alt={disc.name} className="w-full h-full object-contain rounded-full pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default function StickySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [time, setTime] = useState<string>("00:00");
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/Lisbon",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery(""); 
    }
  }, [isSearchOpen]);

  const links = [
    { label: "Aveiro, Portugal", icon: MapPin, href: null, isLocation: true },
    { label: "Email", icon: Mail, href: `mailto:${personalInfo?.email || "email@example.com"}` },
    { label: "LinkedIn", icon: Linkedin, href: personalInfo?.linkedin || "#" },
    { label: "GitHub", icon: Github, href: personalInfo?.github || "#" },
    { label: "Scholar", icon: BookOpen, href: personalInfo?.scholar || "#" },
    { label: "CiênciaVitae", icon: FileBadge, href: personalInfo?.cienciavitae || "#" },
    { label: "ORCID", icon: Fingerprint, href: personalInfo?.orcid || "#" },
  ];

  // EXATAMENTE 9 LOGÓTIPOS ÚNICOS 
  const uniqueLogos = useMemo(() => [
    { name: "Instituto Superior Técnico", logo: "/IST.png" },
    { name: "Universidade de Aveiro", logo: "/UA.png" },
    { name: "Lightenjin", logo: "/lightenjin.png" },
    { name: "Instituto de Telecomunicações", logo: "/it.png" },
    { name: "CICECO", logo: "/ciceco.png" },
    { name: "IEEE", logo: "/IEEE.png" },
    { name: "Elsevier", logo: "/Elsevier.png" },
    { name: "Optica", logo: "/Optica.png" },
    { name: "Corpo Nacional de Escutas", logo: "/scout.png" },
  ], []);

  const scrollToSection = (id: string) => {
    setIsSearchOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const searchableItems = useMemo(() => {
    const items = [
      { title: "About Me", type: "Section", action: () => scrollToSection("hero") },
      { title: "Work Experience", type: "Section", action: () => scrollToSection("experience") },
      { title: "Skills", type: "Section", action: () => scrollToSection("skills") },
      { title: "Projects", type: "Section", action: () => scrollToSection("projects") },
      { title: "Academic Background", type: "Section", action: () => scrollToSection("education") },
      { title: "Leadership", type: "Section", action: () => scrollToSection("leadership") },
      { title: "Scientific Outreach and Certifications", type: "Section", action: () => scrollToSection("scientific Outreach and Certifications") },
      { title: "Global Footprint Map", type: "Section", action: () => scrollToSection("map") },
      { title: "Awards & Recognition", type: "Section", action: () => scrollToSection("awards") },
      { title: "Publications", type: "Section", action: () => scrollToSection("publications") },
      
      ...links.filter(l => l.href !== null).map(l => ({
        title: l.label,
        type: "External Link",
        action: () => window.open(l.href!, "_blank")
      }))
    ];

    workExperience?.forEach(job => {
      items.push({ title: `${job.position} at ${job.company}`, type: "Experience", action: () => scrollToSection("experience") });
    });

    education?.forEach(edu => {
      items.push({ title: `${edu.degree} - ${edu.institution}`, type: "Education", action: () => scrollToSection("education") });
    });

    LeadershipExperience?.forEach(lead => {
      items.push({ title: `${lead.position} at ${lead.company}`, type: "Leadership", action: () => scrollToSection("leadership") });
    });

    awards?.forEach(award => {
      items.push({ title: award.name, type: "Award", action: () => scrollToSection("awards") });
    });

    publications?.forEach(pub => {
      items.push({ title: pub.title, type: "Publication", action: () => scrollToSection("publications") });
    });

    scientificEvents?.forEach(evt => {
      items.push({ title: evt.title, type: "Scientific Event", action: () => scrollToSection("scientific Outreach and Certifications") });
    });

    return items;
  }, [links]);

  const filteredItems = searchableItems
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 20);

  const waveVariants = {
    animate: (i: number) => ({
      color: ["#71717a", "#10b981", "#71717a"],
      filter: [
        "drop-shadow(0px 0px 0px rgba(16,185,129,0))",
        "drop-shadow(0px 0px 8px rgba(16,185,129,0.8))",
        "drop-shadow(0px 0px 0px rgba(16,185,129,0))"
      ],
      transition: { duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }
    })
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 0 : "auto" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden lg:flex flex-col shrink-0 sticky top-32 h-[calc(100vh-8rem)] z-40 relative"
      >
        {/* BOTÃO DE TOGGLE */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          initial={false}
          animate={{
            left: isCollapsed ? "30px" : "100%",
            x: isCollapsed ? 0 : 34, 
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 z-50 p-2 rounded-lg bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shadow-sm backdrop-blur-md"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </motion.button>

        {/* LINHA VERTICAL */}
        <motion.div
          initial={false}
          animate={{
            left: isCollapsed ? "47px" : "100%",
            x: isCollapsed ? 0 : 49,
            opacity: isCollapsed ? 0.4 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-10 bottom-0 w-px bg-gradient-to-b from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/10 to-transparent z-30"
        />

        {/* CONTEÚDO DA BARRA LATERAL */}
        <motion.div
          animate={{
            opacity: isCollapsed ? 0 : 1,
            filter: isCollapsed ? "blur(4px)" : "blur(0px)",
            x: isCollapsed ? -20 : 0,
          }}
          transition={{ duration: 0.4 }}
          className={`flex flex-col h-full w-44 xl:w-48 ${
            isCollapsed ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {/* PERFIL */}
          <div className="flex items-center gap-3 mb-8 pl-1">
            <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-sm">
              <img 
                src={personalInfo.profilePicture} 
                alt="Gonçalo Figueiredo" 
                className="w-full h-full rounded-full object-cover border border-white dark:border-[#09090b]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">Gonçalo Figueiredo</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase">Ph.D. Candidate</span>
            </div>
          </div>

          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-6 pl-5">
            Info & Connect
          </h3>
          
          {/* LINKS E ELETRÃO */}
          <div className="relative flex flex-col gap-1 pl-4 mb-2">
            <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-zinc-200/30 dark:bg-white/5 overflow-hidden rounded-full">
              <motion.div 
                className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-emerald-500 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {links.map((item, i) => {
              const isLink = item.href !== null;
              const Tag = isLink ? "a" : "div";
              
              return (
                <motion.div key={i} initial="initial" whileHover="hover" className="relative">
                  <Tag
                    href={isLink ? item.href : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noopener noreferrer" : undefined}
                    className={`group flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors duration-300 ${
                      isLink ? "cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/5" : "cursor-default"
                    }`}
                  >
                    <motion.div custom={i} variants={waveVariants} animate="animate" className="shrink-0 flex items-center justify-center">
                      <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </motion.div>
                    <motion.span
                      variants={{ initial: { x: 0 }, hover: { x: isLink ? 5 : 0 } }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${
                        item.isLocation 
                          ? "text-zinc-700 dark:text-zinc-300" 
                          : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  </Tag>
                </motion.div>
              );
            })}
          </div>

          {/* =========================================================
              ZONA INFERIOR AGRUPADA (ARENA + PESQUISA + STATUS)
          ========================================================= */}
          <div className="mt-auto flex flex-col gap-6 pb-4">
            
            {/* ÁREA DE COLISÃO */}
            <div className="px-2 w-full flex flex-col">
              <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1 pl-1">
                // COLLABORATING_ENTITIES
              </span>
              <AirHockeyLogosArena logos={uniqueLogos} />
            </div>

            {/* SEARCH / COMMAND PALETTE TRIGGER */}
            <div className="px-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-full relative group cursor-pointer text-left outline-none"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div className="w-full bg-zinc-100/50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-xs rounded-lg pl-9 pr-2 py-2 flex items-center justify-between group-hover:border-emerald-500/50 group-hover:bg-white dark:group-hover:bg-white/5 transition-all shadow-sm">
                  <span className="font-medium opacity-70">Search...</span>
                  <kbd className="font-sans px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/20 bg-white dark:bg-white/10 text-[9px] font-bold text-zinc-500 dark:text-zinc-400">
                    ⌘K
                  </kbd>
                </div>
              </button>
            </div>

            {/* STATUS */}
            <div className="pl-5">
              <div className="flex flex-col gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    System Online
                  </span>
                </div>
                <div className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                  Local Time • {time} WEST
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>
      </motion.aside>

      {/* =========================================
          MODAL DE PESQUISA (COMMAND PALETTE)
      ========================================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] px-4">
            {/* Fundo Escuro */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-zinc-900/60 dark:bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Principal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: -10 }} 
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0c0c0e] rounded-xl shadow-2xl border border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col"
            >
              {/* Input Area */}
              <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30">
                <Search className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Search anything (experience, papers, awards, skills...)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-base font-medium text-zinc-900 dark:text-white placeholder-zinc-400"
                />
                <kbd className="hidden sm:inline-block font-sans px-1.5 py-0.5 ml-3 rounded border border-zinc-200 dark:border-white/20 bg-zinc-100 dark:bg-white/5 text-[10px] font-bold text-zinc-400">
                  ESC
                </kbd>
              </div>

              {/* Lista de Resultados */}
              <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-500 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors shrink-0">
                          <Command className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white truncate">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-12 text-center flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mb-3" />
                    <p className="text-sm font-medium text-zinc-500">No results found for <span className="text-zinc-900 dark:text-white">"{searchQuery}"</span></p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}