"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ui/theme-toggle";
import {
  GraduationCap, Briefcase, Handshake, Globe, BookOpen, Trophy, 
  CircuitBoard, BrainCircuit, MapPinned, Menu, X, Check, Info
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

// === LÍNGUAS SUPORTADAS (COM BANDEIRAS) ===
const languages = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "pt", label: "Português", short: "PT", flag: "🇵🇹" },
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
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
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [showWarning, setShowWarning] = useState(false); // Estado do aviso de tradução
  
  const activeSection = useScrollSpy(navItems.map((n) => n.id));
  const langMenuRef = useRef<HTMLDivElement>(null);

  // === LÓGICA DO TRADUTOR AUTOMÁTICO E AVISO ===
  useEffect(() => {
    // 1. Ler o cookie para saber qual a linguagem atual ao carregar a página
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    let detectedLang = "en";
    
    if (match && match[1]) {
      detectedLang = match[1];
      setCurrentLang(detectedLang);
    }

    // Se não for inglês e o aviso ainda não tiver sido fechado nesta sessão, mostra-o
    if (detectedLang !== "en") {
      const warningDismissed = sessionStorage.getItem("lang_warning_dismissed");
      if (!warningDismissed) {
        setShowWarning(true);
      }
    }

    // 2. Injetar o script do Google Translate se ainda não existir
    if (!window.googleTranslateElementInit) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,pt,de", autoDisplay: false },
          "google_translate_element"
        );
      };
    }

    // 3. Fechar menu de linguagens ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/;`;
      // Reseta o estado do aviso sempre que se muda ativamente de língua
      sessionStorage.removeItem("lang_warning_dismissed"); 
    }
    window.location.reload(); 
  };

  const dismissWarning = () => {
    setShowWarning(false);
    sessionStorage.setItem("lang_warning_dismissed", "true");
  };

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof document !== "undefined") {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
      const mainWrapper = document.querySelector('main') || document.getElementById('root') || document.getElementById('__next');
      if (mainWrapper) mainWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* CSS PARA ESCONDER O WIDGET FEIO DO GOOGLE E A BARRA NO TOPO */}
      <style dangerouslySetInnerHTML={{__html: `
        .skiptranslate { display: none !important; }
        body { top: 0 !important; }
        #goog-gt-tt { display: none !important; }
      `}} />

      {/* DIV INVISÍVEL OBRIGATÓRIA PARA O SCRIPT DO GOOGLE FUNCIONAR */}
      <div id="google_translate_element" className="hidden"></div>

      {/* === AVISO FLUTUANTE DE TRADUÇÃO (TOAST) === */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-24 md:top-20 left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-md"
          >
            <div className="flex items-start gap-3 p-3 md:p-4 bg-amber-50/95 dark:bg-[#1a1305]/95 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-2xl shadow-xl shadow-amber-500/5 dark:shadow-black/50">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-500/10 rounded-full shrink-0">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 pt-0.5">
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                  Auto-Translation Active
                </h4>
                <p className="text-[10px] md:text-xs text-amber-800/80 dark:text-amber-300/70 leading-relaxed font-medium">
                  This website was originally written in English. Automated translations may contain inaccuracies regarding technical engineering terms.
                </p>
              </div>
              <button 
                onClick={dismissWarning} 
                className="p-1.5 rounded-xl hover:bg-amber-200/50 dark:hover:bg-amber-500/20 text-amber-700/60 dark:text-amber-400/60 hover:text-amber-900 dark:hover:text-amber-300 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl pointer-events-none"
      >
        <div className="
          relative flex items-center justify-between px-4 py-3 
          rounded-2xl 
          bg-white/60 dark:bg-[#09090b]/50 
          backdrop-blur-xl 
          border border-white/40 dark:border-white/10
          shadow-lg shadow-black/5 dark:shadow-black/40
          pointer-events-auto
        ">

          {/* === ESQUERDA: Logo + Nome === */}
          <button 
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-3 group shrink-0 pr-4 cursor-pointer select-none bg-transparent border-none appearance-none outline-none z-50 pointer-events-auto" 
            aria-label="Back to Top"
          >
            <div className="
              relative h-9 w-9 rounded-full overflow-hidden 
              border border-zinc-200/50 dark:border-white/10 shadow-sm
              group-hover:scale-110 transition-transform duration-300
              bg-white dark:bg-zinc-800/50
            ">
               <img src="/favicon2.svg" alt="Logo Gonçalo" className="w-full h-full object-cover scale-125" />
            </div>
            <span className="hidden sm:block font-semibold text-sm tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Gonçalo Figueiredo
            </span>
          </button>

          {/* === CENTRO: Navegação Desktop === */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, Icon, label }) => {
              const isActive = activeSection === id;
              return (
                <a key={id} href={`#${id}`} className={`relative px-3 py-2 rounded-full transition-all duration-300 flex items-center justify-center group ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"}`}>
                  {isActive && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full border border-emerald-500/20" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <div className="relative z-10"><Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={isActive ? 2.5 : 2} /></div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-zinc-800/90 dark:bg-zinc-100/90 backdrop-blur-md text-white dark:text-zinc-900 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-xl border border-white/10 dark:border-black/5 z-50">
                    {label}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800/90 dark:bg-zinc-100/90 rotate-45" />
                  </div>
                </a>
              );
            })}
          </nav>

          {/* === DIREITA: Ações (Theme + Language + Mobile Menu) === */}
          <div className="flex items-center gap-2 md:gap-3 pl-2 border-l border-zinc-200 dark:border-white/10 ml-2">
            
            {/* LINGUAGEM MENU DROPDOWN */}
            <div className="relative" ref={langMenuRef}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300"
              >
                {/* Mostra a bandeira atual selecionada em ecrãs maiores, ou só o Globo em telemóvel para poupar espaço */}
                <span className="hidden md:block text-sm">{languages.find(l => l.code === currentLang)?.flag}</span>
                <Globe className="w-4 h-4 md:hidden" />
                <span className="text-[10px] md:text-xs font-bold uppercase">{languages.find(l => l.code === currentLang)?.short || "EN"}</span>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-40 bg-white/90 dark:bg-[#0c0c0e]/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="flex flex-col p-1.5">
                      <div className="px-2.5 py-1.5 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-white/5 mb-1">
                        Select Language
                      </div>
                      {languages.map((lang) => {
                        const isActive = currentLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              isActive 
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm shadow-sm">{lang.flag}</span>
                              {lang.label}
                            </span>
                            {isActive && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-4 bg-zinc-200 dark:bg-white/10 mx-0.5 hidden md:block" />

            {/* THEME TOGGLE */}
            <div className="scale-95 hover:scale-105 transition-transform">
                <ThemeToggle />
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300 pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* === MENU MOBILE (RESTO DO CÓDIGO) === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] p-3 rounded-3xl bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl"
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