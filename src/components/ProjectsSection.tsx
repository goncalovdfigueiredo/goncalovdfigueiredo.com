"use client";

import React from "react";
import { projects } from "@/lib/data";
import { 
  Github, 
  ArrowUpRight, 
  ChevronRight, 
  BrainCircuit,
  Construction, 
  Lock 
} from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative scroll-mt-17 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-6 md:px-4 relative z-10">
        
        {/* CABEÇALHO */}
        <MotionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center md:justify-start gap-4 text-zinc-900 dark:text-white tracking-tight">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm relative">
              <BrainCircuit className="h-8 w-8 text-emerald-600 dark:text-emerald-400 relative z-10" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl z-0 rounded-full" />
            </div>
            Projects
          </h2>
        </MotionWrapper>

        {/* 👇 CONTAINER COM O EFEITO DE BLOQUEIO */}
        <div className="relative">

          {/* 1. A CAMADA DE PROTEÇÃO (O Vidro Fosco + Mensagem) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {/* Fundo desfocado extra para garantir ilegibilidade */}
            <div className="absolute inset-0 bg-zinc-50/60 dark:bg-[#09090b]/60 backdrop-blur-[6px]" />
            
            {/* O Cartão de Aviso no Centro */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-30 p-8 rounded-2xl border border-emerald-500/20 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl text-center max-w-md mx-4"
            >
              <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                <Construction className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Under Construction
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                I am currently documenting my latest research and engineering projects. This section will be updated very soon with detailed case studies.
              </p>
            </motion.div>
          </div>

          {/* 2. O CONTEÚDO (Grelha de Projetos) - Desfocado e Bloqueado */}
          {/* Adicionei: blur-sm, opacity-50, pointer-events-none, select-none */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 filter blur-[4px] opacity-40 pointer-events-none select-none grayscale-[50%]">
            {projects.map((project, index) => (
              <GlassCard
                key={index}
                className="
                  h-full flex flex-col p-6 sm:p-8 rounded-2xl
                  bg-zinc-50 border-zinc-200 
                  dark:border-emerald-500/10 dark:bg-emerald-500/5 
                "
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                    {project.title}
                  </h3>
                  <div className="h-1 w-12 bg-emerald-500/30 rounded-full mt-3" />
                </div>

                <div className="flex-grow mb-8">
                  <ul className="space-y-3">
                    {project.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 font-light text-[15px]">
                        <ChevronRight className="h-5 w-5 text-emerald-600/50 flex-shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-emerald-500/10 flex justify-end">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-emerald-500/5 border border-zinc-200 dark:border-emerald-500/10 text-zinc-400 dark:text-emerald-400/50">
                    <Github className="h-4 w-4" />
                    <span>View Code</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}