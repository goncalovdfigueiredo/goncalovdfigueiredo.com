"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/theme-toggle";
import {
  GraduationCap, Briefcase, Handshake, Globe, BookOpen, Trophy, 
  CircuitBoard, BrainCircuit, MapPinned, Menu, X
} from "lucide-react";

// === DADOS DE NAVEGAÇÃO ===
const navItems = [
  { id: "experience",   Icon: Briefcase,     label: "Experience" },
  { id: "skills",       Icon: CircuitBoard,  label: "Skills" },
  { id: "projects",     Icon: BrainCircuit,  label: "Projects" },
  { id: "education",    Icon: GraduationCap, label: "Education" },
  { id: "leadership",   Icon: Handshake,     label: "Leadership" },
  { id: "scientific Outreach and Certifications", Icon: Globe, label: "Scientific Outreach" }, 
  { id: "publications", Icon: BookOpen,      label: "Publications" },
  { id: "map",          Icon: MapPinned,     label: "Global Impact" },
  { id: "awards",       Icon: Trophy,        label: "Awards & Recognition" },
];

// === SCROLL SPY HOOK ===
function useScrollSpy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(id);
            return;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
}

export default function GlassHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(navItems.map((n) => n.id));

  // === FUNÇÃO DE SCROLL TO TOP ROBUSTA ===
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do link
    
    // Tenta fazer o scroll suave
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Fecha o menu mobile se estiver aberto
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
      >
        <div className="
          relative flex items-center justify-between px-4 py-2 
          rounded-full 
          bg-white/80 dark:bg-[#09090b]/70 
          backdrop-blur-xl 
          border border-white/40 dark:border-white/10
          shadow-lg shadow-black/5 dark:shadow-black/40
        ">
          
          {/* === ESQUERDA: Logo + Nome (CORRIGIDO) === */}
          <div 
            onClick={handleScrollToTop}
            className="flex items-center gap-3 group shrink-0 pr-4 cursor-pointer select-none" 
            role="button"
            aria-label="Back to Top"
          >
            <div className="
              relative h-9 w-9 rounded-full overflow-hidden 
              border border-zinc-200/50 dark:border-white/10 shadow-sm
              group-hover:scale-110 transition-transform duration-300
              bg-white dark:bg-zinc-800/50
            ">
               <img 
                 src="/favicon2.svg" 
                 alt="Logo Gonçalo" 
                 className="w-full h-full object-cover scale-125" 
               />
            </div>
            
            <span className="hidden sm:block font-semibold text-sm tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Gonçalo Figueiredo
            </span>
          </div>

          {/* === CENTRO: Navegação Desktop === */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, Icon, label }) => {
              const isActive = activeSection === id;
              
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`
                    relative px-3 py-2 rounded-full transition-all duration-300
                    flex items-center justify-center group
                    ${isActive 
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full border border-emerald-500/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <div className="relative z-10">
                    <Icon 
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="
                    absolute top-full mt-3 left-1/2 -translate-x-1/2 
                    px-3 py-1.5 rounded-lg 
                    bg-zinc-800/90 dark:bg-zinc-100/90 backdrop-blur-md
                    text-white dark:text-zinc-900 
                    text-[11px] font-semibold tracking-wide whitespace-nowrap
                    opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0
                    transition-all duration-200 pointer-events-none shadow-xl
                    border border-white/10 dark:border-black/5
                    z-50
                  ">
                    {label}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800/90 dark:bg-zinc-100/90 rotate-45" />
                  </div>
                </a>
              );
            })}
          </nav>

          {/* === DIREITA: Ações === */}
          <div className="flex items-center gap-3 pl-2 border-l border-zinc-200 dark:border-white/10 ml-2">
            <div className="scale-95 hover:scale-105 transition-transform">
                <ThemeToggle />
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* === MENU MOBILE === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
            />
            
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 p-3 rounded-3xl bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl"
            >
              <div className="grid grid-cols-3 gap-2">
                {navItems.map(({ id, Icon, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="
                      flex flex-col items-center justify-center gap-2 
                      p-2 min-h-[100px] 
                      rounded-2xl bg-zinc-50/50 dark:bg-white/5 
                      hover:bg-emerald-50 dark:hover:bg-emerald-900/20 
                      text-zinc-600 dark:text-zinc-400 
                      hover:text-emerald-600 dark:hover:text-emerald-400 
                      transition-all active:scale-95
                    "
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold text-center leading-tight px-1">
                      {label} 
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}