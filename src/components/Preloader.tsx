"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Simulação de carregamento técnico
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center 
                     bg-zinc-50 dark:bg-[#060608] gap-6"
        >
          {/* BACKGROUND DECORATION: GRID TÉCNICO */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative flex flex-col items-center">
            {/* SCANLINE EFFECT */}
            <motion.div 
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-emerald-500/20 blur-sm z-20"
            />

            {/* NOME COM EFEITO DE REVELAÇÃO */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.1em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-black uppercase select-none text-zinc-900 dark:text-white pb-2 text-center px-4"
            >
              Gonçalo Figueiredo
            </motion.h1>

            {/* BARRA DE PROGRESSO ESTILO TELEMETRIA */}
            <div className="w-48 md:w-64 h-[2px] bg-zinc-200 dark:bg-zinc-800 relative mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
              />
            </div>

            {/* STATUS E CONTADOR */}
            <div className="flex justify-between w-48 md:w-64 mt-2 font-mono text-[10px] text-zinc-400 uppercase tracking-tighter">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                System Booting...
              </motion.span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* DADOS ALEATÓRIOS NOS CANTOS (OPCIONAL) */}
          <div className="absolute bottom-8 left-8 hidden md:block font-mono text-[8px] text-zinc-500/50 space-y-1 uppercase">
            <p>Lat: 41.1579° N</p>
            <p>Lon: 8.6291° W</p>
            <p>Status: Ready</p>
          </div>
          <div className="absolute bottom-8 right-8 hidden md:block font-mono text-[8px] text-zinc-500/50 text-right space-y-1 uppercase">
            <p>Core: v3.2.0</p>
            <p>Engine: Stable</p>
            <p>© 2026</p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}