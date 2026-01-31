"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Dumbbell, 
  BookOpen, 
  Cpu, 
  Activity, 
  Layers, 
  BrainCircuit,
  Coffee
} from "lucide-react";
import { GlassCard } from "./ui/glass-card"; // Usa o teu componente existente se tiveres, ou divs normais

// Simula o componente SpotlightCard se não o quiseres importar de outro lado
function SpotlightCard({ children, className = "" }: any) {
  return (
    <div className={`relative overflow-hidden bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 ${className}`}>
      <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function InterestsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Título da Secção */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Coffee className="w-3.5 h-3.5" />
            Personal Interests
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight"
          >
            Beyond the Lab
          </motion.h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-96">
          
          {/* 1. CARD GRANDE: ENDURANCE & DISCIPLINE (Ginásio/Corrida) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 row-span-1 md:row-span-2 group"
          >
            <SpotlightCard className="h-full rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/30 transition-colors duration-500">
              <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                     <Dumbbell className="w-5 h-5 text-emerald-500" />
                     Discipline & Endurance
                   </h3>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">
                     Just as in engineering, physical training requires consistency, data tracking, and pushing limits.
                   </p>
                </div>
                {/* Visualização Fake de "Batimento Cardíaco" */}
                <div className="flex items-center gap-1">
                   <Activity className="w-5 h-5 text-rose-500 animate-pulse" />
                   <span className="text-xs font-mono font-bold text-rose-500">ACTIVE</span>
                </div>
              </div>

              {/* Gráfico Abstrato de "Atividade" */}
              <div className="mt-8 flex items-end gap-1 h-32 w-full opacity-50 mask-image-gradient-to-t">
                 {[40, 60, 55, 70, 45, 80, 65, 90, 75, 50, 60, 85, 95, 60, 40].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className="flex-1 bg-zinc-900 dark:bg-white rounded-t-sm"
                    />
                 ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 2. CARD PEQUENO: MAKER MINDSET (3D Printing / DIY) */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="md:col-span-1 h-48 md:h-auto group"
          >
            <SpotlightCard className="h-full rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors duration-500">
               <div className="flex items-center justify-between">
                 <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                   <Layers className="w-4 h-4 text-blue-500" />
                   The Maker Mindset
                 </h3>
               </div>
               <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                 Exploring <strong>3D Printing</strong> and prototyping. Turning digital CAD designs into physical reality.
               </p>
               {/* Ícone 3D abstrato */}
               <div className="self-end mt-2 p-3 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-blue-500" />
               </div>
            </SpotlightCard>
          </motion.div>

          {/* 3. CARD PEQUENO: CONTINUOUS LEARNING (Leitura) */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="md:col-span-1 h-48 md:h-auto group"
          >
            <SpotlightCard className="h-full rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/30 transition-colors duration-500">
               <div>
                 <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                   <BookOpen className="w-4 h-4 text-purple-500" />
                   Always Learning
                 </h3>
                 <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                    Reading about tech, science, and history. Currently exploring new perspectives.
                 </p>
               </div>
               
               <div className="mt-4 w-full bg-zinc-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[65%]" />
               </div>
               <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-zinc-400 uppercase font-bold">Current Read</span>
                  <span className="text-[9px] text-purple-400 font-bold">65%</span>
               </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}