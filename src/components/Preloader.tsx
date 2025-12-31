"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          // 👇 ALTERAÇÃO AQUI: Mudei de 'gap-4' para 'gap-2' para ficarem mais próximos
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center 
                     bg-zinc-50/80 dark:bg-[#09090b]/80 backdrop-blur-xl gap-2"
        >
          {/* NOME COM GRADIENTE (Mantido) */}
          <motion.h1
            initial={{ backgroundPosition: "100% 0%" }}
            animate={{ backgroundPosition: "0% 0%" }}
            transition={{ 
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.3 
            }}
            className="text-4xl md:text-6xl font-bold tracking-tight uppercase select-none text-transparent bg-clip-text pb-3 text-center px-4"
            style={{
              backgroundImage: `linear-gradient(
                to right, 
                #10b981 0%,   #10b981 20%, 
                #2563eb 45%,  #2563eb 55%, 
                #10b981 80%,  #10b981 100%
              )`,
              backgroundSize: "300% 100%", 
            }}
          >
            Gonçalo Figueiredo
          </motion.h1>

          {/* SUBTÍTULO */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
            className="text-xs md:text-sm font-mono font-medium tracking-[0.3em] text-zinc-400 dark:text-zinc-500 uppercase"
          >
            Initializing System...
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}