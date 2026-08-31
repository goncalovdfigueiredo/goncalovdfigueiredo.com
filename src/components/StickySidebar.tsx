"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  BookOpen, 
  FileBadge, 
  Fingerprint, 
  PanelLeftClose, 
  PanelLeftOpen 
} from "lucide-react";
import { personalInfo } from "@/lib/data"; 

export default function StickySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [time, setTime] = useState<string>("00:00");

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

  const links = [
    { label: "Aveiro, Portugal", icon: MapPin, href: null, isLocation: true },
    { label: "Email", icon: Mail, href: `mailto:${personalInfo?.email || "email@example.com"}` },
    { label: "LinkedIn", icon: Linkedin, href: personalInfo?.linkedin || "#" },
    { label: "GitHub", icon: Github, href: personalInfo?.github || "#" },
    { label: "Scholar", icon: BookOpen, href: personalInfo?.scholar || "#" },
    { label: "CiênciaVitae", icon: FileBadge, href: personalInfo?.cienciavitae || "#" },
    { label: "ORCID", icon: Fingerprint, href: personalInfo?.orcid || "#" },
  ];

  const waveVariants = {
    animate: (i: number) => ({
      color: ["#71717a", "#10b981", "#71717a"],
      filter: [
        "drop-shadow(0px 0px 0px rgba(16,185,129,0))",
        "drop-shadow(0px 0px 8px rgba(16,185,129,0.8))",
        "drop-shadow(0px 0px 0px rgba(16,185,129,0))"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 0 : "auto" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="hidden lg:flex flex-col shrink-0 sticky top-32 h-[calc(100vh-8rem)] z-40 relative"
    >
      
      {/* =========================================
          BOTÃO DE TOGGLE
      ========================================= */}
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

      {/* =========================================
          LINHA VERTICAL (Acompanha o botão e a barra)
      ========================================= */}
      <motion.div
        initial={false}
        animate={{
          // Quando fechado, vai para os 30px + 17px (centro do botão). Quando aberto, usa a posição normal à direita.
          left: isCollapsed ? "47px" : "100%",
          x: isCollapsed ? 0 : 49,
          opacity: isCollapsed ? 0.4 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-10 bottom-0 w-px bg-gradient-to-b from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/10 to-transparent z-30"
      />

      {/* =========================================
          CONTEÚDO DA BARRA LATERAL
      ========================================= */}
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
        <div className="relative flex flex-col gap-1 pl-4">
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

        {/* STATUS NO FUNDO */}
        <div className="mt-auto pl-5 pb-4">
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

      </motion.div>
    </motion.aside>
  );
}