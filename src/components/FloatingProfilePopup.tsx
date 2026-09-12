// src/components/FloatingProfilePopup.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, type Variants } from "framer-motion";
import { X, Info } from "lucide-react";

export default function FloatingProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const particleControls = useAnimation();
  const buttonControls = useAnimation();

  // Fecha o popup ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Efeito de desintegração intermitente
  useEffect(() => {
    if (isOpen) return;

    const triggerDisintegration = async () => {
      buttonControls.start({ opacity: 0, scale: 0.5, transition: { duration: 0.3 } });
      await particleControls.start("exploded");
      await new Promise((resolve) => setTimeout(resolve, 600));
      particleControls.start("assembled");
      await buttonControls.start({ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5, type: "spring" } });
    };

    const timer = setTimeout(triggerDisintegration, 3000);
    const loopTimer = setInterval(triggerDisintegration, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(loopTimer);
      particleControls.stop();
      buttonControls.stop();
    };
  }, [isOpen, particleControls, buttonControls]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (hasUnread) {
      setHasUnread(false);
    }
    buttonControls.set({ opacity: 1, scale: 1 });
    particleControls.set("assembled");
  };

  // Configuração das Partículas
  const gridSize = 8;
  const totalParticles = gridSize * gridSize;
  const particleVariants: Variants = {
    assembled: { 
      x: 0, y: 0, scale: 1, opacity: 0, 
      transition: { duration: 0.4, ease: "easeInOut" } 
    },
    exploded: (i) => {
      const randomX = (Math.random() - 0.5) * 80;
      const randomY = (Math.random() - 0.5) * 80;
      const randomRotation = (Math.random() - 0.5) * 360;
      return { 
        x: randomX, y: randomY, scale: 0, rotate: randomRotation, opacity: 1, 
        transition: { duration: 0.8, ease: "easeOut", delay: (i % gridSize) * 0.015 + Math.random() * 0.1 } 
      };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* WRAPPER FLUTUANTE - Ajustado para ser mais pequeno no mobile (w-12 h-12) e normal no PC (md:w-14 md:h-14) */}
      <motion.div 
        className="relative w-12 h-12 md:w-14 md:h-14 pointer-events-auto overflow-visible mb-2"
        animate={hasUnread ? { y: [0, -8, 0] } : { y: 0 }}
        transition={hasUnread ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { duration: 0.5 }}
      >
        
        {/* Grelha de Partículas */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-20 pointer-events-none rounded-full overflow-hidden">
          {[...Array(totalParticles)].map((_, i) => (
            <motion.div 
              key={i} custom={i} variants={particleVariants} 
              initial="assembled" animate={particleControls} 
              className={`w-full h-full ${
                hasUnread ? "bg-emerald-400 dark:bg-emerald-500" : "bg-zinc-500 dark:bg-zinc-600"
              }`} 
            />
          ))}
        </div>

        {/* BOTÃO REAL - Classes responsivas aplicadas ao tamanho e borda */}
        <motion.button
          onClick={handleButtonClick}
          animate={buttonControls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl overflow-hidden relative outline-none z-10 transition-all duration-700 ease-out border-[1.5px] md:border-[2px] ${
            hasUnread 
              ? "border-emerald-500/50 shadow-emerald-500/20" 
              : "border-zinc-300 dark:border-zinc-700 opacity-80" 
          }`}
          title="Click to view message"
        >
          <img 
            src="/profile.jpeg" 
            alt="Profile" 
            className={`w-full h-full object-cover transition-all duration-1000 ${
              hasUnread ? "grayscale-0" : "grayscale sepia-[0.2]"
            }`} 
          />
          <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${hasUnread ? "opacity-0" : "opacity-30"}`} />
        </motion.button>

        {/* BADGE - Mais pequeno no mobile (w-[20px]) e normal no PC (md:w-[22px]) */}
        <AnimatePresence>
          {hasUnread && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.25, 1], boxShadow: ["0px 0px 0px rgba(239,68,68,0)", "0px 0px 12px rgba(239,68,68,0.8)", "0px 0px 0px rgba(239,68,68,0)"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              className="absolute -top-1 -right-1 flex items-center justify-center w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-full bg-red-500 border-2 border-zinc-900 text-white text-[9px] md:text-[10px] font-extrabold shadow-md z-30 pointer-events-none"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>
        
      </motion.div>

      {/* POPUP - Mais estreito (max-w-[280px]) e com fonte ligeiramente menor (text-xs) no mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            style={{ transformOrigin: "bottom right" }}
            className="mt-2 mr-0 md:mr-2 max-w-[280px] md:max-w-[320px] bg-white dark:bg-[#18181b] text-zinc-800 dark:text-zinc-200 shadow-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 pr-8 md:p-5 md:pr-10 text-xs md:text-sm backdrop-blur-xl relative pointer-events-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 md:top-3 md:right-3 p-1 md:p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            
            <div className="flex items-center gap-2 mb-2 md:mb-3">
  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
    <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
  </div>
  <h3 className="font-bold text-sm md:text-base text-zinc-900 dark:text-white">Welcome! 👋</h3>
</div>

<p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
  I'm Gonçalo. Interested in <strong>Secure IoT</strong> and <strong>Hardware-Software Integration</strong>?
</p>

{/* Botão de Download Integrado */}
<a 
  href="/caminho-para-o-teu-cv.pdf" 
  download
  className="mt-4 mb-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white transition-colors shadow-md"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  Download Full CV
</a>

<p className="mt-2 text-[11px] text-center text-zinc-500">
  Feel free to connect via LinkedIn or Email!
</p>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}