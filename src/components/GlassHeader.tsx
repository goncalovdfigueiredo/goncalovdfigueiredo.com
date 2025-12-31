// src/components/GlassHeader.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ui/theme-toggle";
import {
  GraduationCap,
  Briefcase,
  Handshake,
  Globe,
  BookOpen,
  Trophy,
  CircuitBoard,
  BrainCircuit,
  MapPinned
} from "lucide-react";

const navItems = [
  { id: "experience",   Icon: Briefcase,     label: "Experience" },
  { id: "skills",       Icon: CircuitBoard,  label: "Skills" },
  { id: "projects",     Icon: BrainCircuit,  label: "Projects" },
  { id: "education",    Icon: GraduationCap, label: "Education" },
  { id: "leadership",   Icon: Handshake,     label: "Leadership" },
  { id: "scientific Outreach and Certifications", Icon: Globe, label: "Scientific Outreach" },
  { id: "publications", Icon: BookOpen,      label: "Publications" },
  { id: "map", Icon: MapPinned, label: "Global Impact & Footprint" },
  { id: "awards",       Icon: Trophy,        label: "Awards" },
];

export default function GlassHeader() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 dark:bg-background/40 border-b border-border/40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Nome */}
        <motion.a
          href="/"
          className="flex items-center text-2xl font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* 👇 LOGÓTIPO ADICIONADO AQUI */}
          <img 
            src="/favicon2.svg"  // Confirma se o nome na pasta 'public' é 'favicon.svg' ou 'favicon2.svg'
            alt="Logo" 
            className="w-8 h-8 mr-3 object-contain" 
          />
          Gonçalo Figueiredo
        </motion.a>

        {/* Navegação e Tema */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ id, Icon, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative group p-1"
                aria-label={label}
              >
                <Icon className="w-6 h-6 text-foreground/60 group-hover:text-emerald-500 transition-colors" />
                {/* Tooltip */}
                <span
                  className="
                    absolute -bottom-8 left-1/2 transform -translate-x-1/2
                    whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    transition-opacity
                  "
                >
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* Theme switcher */}
          <ThemeToggle />
        </div>
      </div>

      {/* Linha de separação fina em gradiente */}
      <div className="h-[1px] w-full bg-gradient-to-r from-emerald-500 to-lime-500" />
    </header>
  );
}