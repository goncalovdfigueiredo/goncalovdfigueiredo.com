"use client";

import { useState } from "react";
import { personalInfo } from "@/lib/data";
import { 
  Mail, Github, Linkedin, Globe, 
  User, Microscope, Download, Sparkles, MapPin, FileText,
  Cpu, Lightbulb, Users, Layers, Terminal, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

/* =========================
   FLIP CARD (Mantido igual)
   ========================= */
function FlipCard() {
  return (
    <div className="relative w-40 h-40 md:w-56 md:h-56 perspective group cursor-pointer">
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 540 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* FRENTE */}
        <div className="absolute w-full h-full backface-hidden rounded-full p-1.5 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 shadow-2xl">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#09090b]">
              <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-2 border-white dark:border-[#09090b] rounded-full flex items-center justify-center shadow-lg z-10">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
        
        {/* VERSO */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#09090b] flex flex-col items-center justify-center p-4 rounded-full border border-zinc-700 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="p-2 rounded-full bg-white/10">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">Full Curriculum</p>
                <a 
                  href="/CV_Goncalo_Figueiredo.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-900/20"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <Download className="w-3 h-3" />
                  Download CV
                </a>
              </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}


   const skillGroups = [
    {
      title: "Core Engineering",
      subtitle: "Hardware & Instrumentation",
      icon: Cpu,
      color: "text-blue-500",
      border: "group-hover:border-blue-500/50",
      bgHover: "group-hover:bg-blue-500/5",
      barColor: "bg-blue-500",
      skills: [
        "FPGA & Verilog", 
        "PCB Design", 
        "Embedded Systems & Firmware", 
        "Hardware Prototyping", 
        "Python & MATLAB"
      ]
    },
    {
      title: "Research Domains",
      subtitle: "Scientific Focus",
      icon: Microscope,
      color: "text-purple-500",
      border: "group-hover:border-purple-500/50",
      bgHover: "group-hover:bg-purple-500/5",
      barColor: "bg-purple-500",
      skills: [
        "Optical Communications",
        "Data Encryption & Security", 
        "Smart Cities & IoT Solutions", 
        "Photonic Devices",
        "Energy Harvesting", 
        "Luminescent Solar Concentrators", 
        
      ]
    },
    {
      title: "Professional Capabilities",
      subtitle: "Leadership & Management",
      icon: Users,
      color: "text-emerald-500",
      border: "group-hover:border-emerald-500/50",
      bgHover: "group-hover:bg-emerald-500/5",
      barColor: "bg-emerald-500",
      skills: [
        "R&D Project Leadership", 
        "Technical Communication",
        "Community & Event Management", 
        "Science Outreach", 
        "Mentoring",
      ]
    }
  ];

/* =========================
   HERO SECTION
   ========================= */
export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contactsRow1 = [
    { icon: <MapPin className="h-4 w-4" />, text: "Lisbon, Portugal", href: null },
    { icon: <Mail className="h-4 w-4" />, text: "goncalovdfigueiredo@gmail.com", href: `mailto:goncalovdfigueiredo@gmail.com` },
    { icon: <Linkedin className="h-4 w-4" />, text: "LinkedIn", href: personalInfo.linkedin },
    { icon: <Github className="h-4 w-4" />, text: "GitHub", href: personalInfo.github },
  ];

  const contactsRow2 = [
    { icon: <Globe className="h-4 w-4" />, text: "Google Scholar", href: personalInfo.scholar },
    { icon: <Globe className="h-4 w-4" />, text: "Ciênciavitae", href: personalInfo.cienciavitae },
    { icon: <Globe className="h-4 w-4" />, text: "ORCID", href: personalInfo.orcid },
  ];

  const renderContact = (contact: any, i: number) => {
    const isLink = !!contact.href;
    const Wrapper = isLink ? "a" : "div";
    const props = isLink ? { href: contact.href, target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <Wrapper
        key={i}
        {...(props as any)}
        className={`flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 ${isLink ? "hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors" : "cursor-default"}`}
      >
        <span className={`${isLink ? "text-zinc-400 group-hover:text-emerald-500" : "text-emerald-500/80"}`}>{contact.icon}</span>
        <span className="font-medium">{contact.text}</span>
      </Wrapper>
    );
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* HEADER AREA */}
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between mb-20 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* TEXTO ESQUERDA */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]" variants={childVariants}>
              Hello, I am{" "}
              <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-emerald-400 dark:via-teal-400 dark:to-blue-500">
                {personalInfo.name}
              </span>
            </motion.h1>
            
            <motion.p className="text-xl text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed" variants={childVariants}>
              Electrical and Computer Engineering PhD Student
            </motion.p>
            
            <motion.div variants={childVariants} className="flex flex-col gap-3 pt-2">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
                {contactsRow1.map((c, i) => renderContact(c, i))}
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
                 {contactsRow2.map((c, i) => renderContact(c, i))}
              </div>
            </motion.div>
          </div>

          {/* FOTO DIREITA */}
          <motion.div variants={childVariants} className="relative pt-4 lg:pt-0">
             <FlipCard />
             <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 1.5 }}
               className="lg:hidden text-[10px] text-center text-zinc-400 mt-4 uppercase tracking-widest"
             >
               Tap photo for CV
             </motion.p>
          </motion.div>
        </motion.div>

        {/* SECÇÃO "ABOUT ME" */}
        <MotionWrapper delay={0.3}>
          <div className="relative rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-70" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 dark:divide-white/5">
              
              {/* ESQUERDA: NARRATIVA (Col 1-5) */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <User className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Professional Profile</h3>
                </div>
                
                <div className="space-y-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
                  <p>
                   {personalInfo.heroDescription}
                  </p>
                  
                  {/* 👇 PARÁGRAFOS ALTERADOS PARA 3ª PESSOA */}
                  <p>
                    With a unique dual-background in <span className="font-semibold text-zinc-900 dark:text-white">Physics Engineering</span> and <span className="font-semibold text-zinc-900 dark:text-white">Electrical Engineering</span>, he bridges the gap between theoretical science and industrial application.
                  </p>
                  <p>
                    His focus is on developing robust hardware prototypes and intelligent systems that solve real-world problems, from <span className="text-emerald-600 dark:text-emerald-400 font-medium">Smart Cities</span> to <span className="text-blue-600 dark:text-blue-400 font-medium">Industrial IoT</span>.
                  </p>
                </div>
              </div>

              {/* DIREITA: TECH MODULES VISUAIS (Col 6-12) */}
              <div className="lg:col-span-7 bg-zinc-50/50 dark:bg-black/20 p-8 md:p-10">
                 
                 {/* GRID DE CARTÕES */}
                 <div className="grid grid-cols-1 gap-4 h-full">
                    
                    {skillGroups.map((group, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`
                          group relative p-5 rounded-xl border border-zinc-200 dark:border-white/5 
                          bg-white dark:bg-white/5 backdrop-blur-sm transition-all duration-500
                          ${group.border} hover:shadow-lg
                        `}
                      >
                        {/* Fundo colorido ao passar o rato */}
                        <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${group.bgHover} rounded-xl`} />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
                            
                            {/* Ícone + Título */}
                            <div className="flex items-center gap-4 min-w-[160px]">
                                <div className={`p-2.5 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 ${group.color}`}>
                                    <group.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-none mb-1">
                                        {group.title}
                                    </h4>
                                    <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                                        {group.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Separador Vertical (apenas desktop) */}
                            <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-white/10 mx-2" />

                            {/* Lista de Skills (Chips) */}
                            <div className="flex flex-wrap gap-2 flex-1">
                                {group.skills.map((skill) => (
                                    <span 
                                    key={skill} 
                                    className="
                                        px-2.5 py-1 rounded-md text-[11px] font-medium 
                                        bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 
                                        text-zinc-600 dark:text-zinc-300
                                        group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-colors
                                    "
                                    >
                                    {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Barra Decorativa "Tech" em baixo */}
                        <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-zinc-100 dark:bg-white/5 overflow-hidden rounded-full">
                            <div className={`h-full w-2/3 ${group.barColor} opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:w-full`} />
                        </div>

                      </motion.div>
                    ))}

                 </div>
              </div>

            </div>
          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}