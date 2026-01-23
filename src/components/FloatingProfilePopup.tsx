"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, type Variants } from "framer-motion";
import { X } from "lucide-react";

export default function FloatingProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  const particleControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!hasUnread || isOpen) return;

    const triggerDisintegration = async () => {
      buttonControls.start({ opacity: 0, scale: 0.8, transition: { duration: 0.3 } });
      await particleControls.start("exploded");
      await new Promise((resolve) => setTimeout(resolve, 500));
      particleControls.start("assembled");
      await buttonControls.start({ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.4 } });
    };

    const timer = setTimeout(triggerDisintegration, 5000);
    const loopTimer = setInterval(triggerDisintegration, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(loopTimer);
      particleControls.stop();
      buttonControls.stop();
    };
  }, [hasUnread, isOpen, particleControls, buttonControls]);


  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (hasUnread) setHasUnread(false);
    buttonControls.set({ opacity: 1, scale: 1 });
    particleControls.set("assembled");
  };

  const gridSize = 8; 
  const totalParticles = gridSize * gridSize;

  const particleVariants: Variants = {
    assembled: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0, 
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exploded: (i) => {
      // 👇 ALTERADO AQUI: Reduzi de 150 para 60
      // Isto faz com que as partículas não voem para tão longe
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
          delay: (i % gridSize) * 0.02 + Math.random() * 0.1
        }
      };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Botão Flutuante */}
      <div className="relative w-14 h-14 pointer-events-auto overflow-visible mb-2">
        
        {/* Grelha de Partículas */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 z-20 pointer-events-none rounded-full overflow-hidden">
          {[...Array(totalParticles)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={particleVariants}
              initial="assembled"
              animate={particleControls}
              className="w-full h-full bg-zinc-600 dark:bg-zinc-300"
            />
          ))}
        </div>

        {/* Botão Real */}
        <motion.button
          onClick={handleButtonClick}
          animate={buttonControls} 
          className="w-14 h-14 rounded-full shadow-lg border-2 border-white/20 overflow-hidden relative outline-none z-10 bg-zinc-900"
          title="Click to view message"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/profile.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.button>

        {/* Badge */}
        <AnimatePresence>
          {hasUnread && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold shadow-md z-30 pointer-events-none"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              mr-1 max-w-sm bg-background text-foreground shadow-xl border border-border 
              rounded-lg p-4 pr-8 text-sm backdrop-blur-md backdrop-filter 
              origin-bottom-right pointer-events-auto relative
            "
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <p className="leading-relaxed">
              👋 <strong>Welcome!</strong><br />
              Looking for my <strong>Full CV</strong>? Just <strong>hover over</strong> (or tap) my profile picture at the top of the page to reveal the download button.
              <br /><br />
              Feel free to connect via LinkedIn or email!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}