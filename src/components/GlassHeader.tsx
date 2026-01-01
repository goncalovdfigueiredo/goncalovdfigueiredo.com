// src/components/GlassHeader.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  MapPinned,
  Menu, // ADICIONADO
  X     // ADICIONADO
} from "lucide-react";

const navItems = [
  { id: "experience",   Icon: Briefcase,     label: "Experience" },
  { id: "skills",       Icon: CircuitBoard,  label: "Skills" },
  { id: "projects",     Icon: BrainCircuit,  label: "Projects" },
  { id: "education",    Icon: GraduationCap, label: "Education" },
  { id: "leadership",   Icon: Handshake,     label: "Leadership" },
  { id: "scientific Outreach and Certifications", Icon: Globe, label: "Scientific Outreach" }, // Nota: IDs com espaços podem ser problemáticos em HTML, mas se funcionar no teu scroll, mantém. O ideal seria "scientific-outreach"
  { id: "publications", Icon: BookOpen,      label: "Publications" },
  { id: "map",          Icon: MapPinned,     label: "Global Impact" },
  { id: "awards",       Icon: Trophy,        label: "Awards" },
];

export default function GlassHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 dark:bg-background/40 border-b border-border/40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* === ESQUERDA: Logo + Nome === */}
        <motion.a
          href="/"
          className="flex items-center text-xl md:text-2xl font-medium truncate" // Adicionei truncate para não partir em ecrãs muito pequenos
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/favicon2.svg"
            alt="Logo" 
            className="w-8 h-8 mr-3 object-contain" 
          />
          <span className="truncate">Gonçalo Figueiredo</span>
        </motion.a>

        {/* === DIREITA: Navegação + Toggle + Mobile Button === */}
        <div className="flex items-center gap-4">
          
          {/* 1. NAVEGAÇÃO DESKTOP (Escondida em Mobile) */}
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
                    transition-opacity z-50
                  "
                >
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* 2. Theme Toggle (Sempre visível) */}
          <ThemeToggle />

          {/* 3. BOTÃO HAMBÚRGUER (Só visível em Mobile) */}
          <button
            className="md:hidden p-2 text-foreground/60 hover:text-emerald-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* === MENU MOBILE (Dropdown) === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background/95 border-t border-border/40 backdrop-blur-xl"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map(({ id, Icon, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMobileMenuOpen(false)} // Fecha o menu ao clicar
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors text-foreground/80 font-medium"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Linha de separação fina em gradiente */}
      <div className="h-[1px] w-full bg-gradient-to-r from-emerald-500 to-lime-500" />
    </header>
  );
}