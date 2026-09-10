"use client"; 

import { Mail, Linkedin, Github, Briefcase, Cpu, Layers, GraduationCap, Handshake, BookOpenText, FileBadge, Library, Fingerprint } from "lucide-react"; 
import { personalInfo } from "@/lib/data"; 

export default function Footer() { 
  return ( 
    <footer className="w-full pt-20 pb-10 border-t border-zinc-200 dark:border-white/5 relative z-10 mt-10"> 
      <div className="container max-w-6xl mx-auto px-6"> 
        
        {/* ========================================================= */} 
        {/* CONTEÚDO PRINCIPAL DO FOOTER */} 
        {/* ========================================================= */} 
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-8 mb-12 md:mb-16"> 
          
          {/* LADO ESQUERDO: Marca & Bio */} 
          <div className="md:col-span-6 lg:col-span-5 flex flex-col"> 
            {/* Margem inferior removida no mobile (mb-0 md:mb-4) para ficar mais perto dos botões */}
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-0 md:mb-4"> 
              Gonçalo Figueiredo 
            </h3> 
            {/* Texto escondido no mobile (hidden md:block) e justificado */}
            <p className="hidden md:block text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs text-justify"> 
              Ph.D. Candidate in Electrical and Computer Engineering. Bridging the gap between Theoretical Science and Industrial Application. 
            </p> 
          </div> 
          
          {/* ========================================================= */} 
          {/* LADO DIREITO: Colunas de Links (Desktop vs Mobile) */} 
          {/* ========================================================= */} 
          
          {/* 1. VERSÃO DESKTOP (Inalterada: 3 colunas com texto) */}
          <div className="hidden md:grid md:col-span-6 lg:col-span-7 grid-cols-3 gap-8"> 
            {/* Coluna 1: EXPLORE */} 
            <div className="flex flex-col gap-2 pl-5 border-l-2 border-blue-500/30 dark:border-blue-500/40"> 
              <span className="text-[14px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-1"> Explore </span> 
              <a href="#experience" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Briefcase className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Experience 
              </a> 
              <a href="#skills" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Cpu className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Skills 
              </a> 
              <a href="#projects" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Layers className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Projects 
              </a> 
              <a href="#education" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <GraduationCap className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Education 
              </a> 
              <a href="#leadership" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Handshake className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Leadership 
              </a> 
              <a href="#publications" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Library className="w-3.5 h-3.5 opacity-70  group-hover:opacity-100 transition-opacity" /> Publications 
              </a> 
            </div> 

            {/* Coluna 2: CONNECT */} 
            <div className="flex flex-col gap-2 pl-5 border-l-2 border-blue-500/30 dark:border-blue-500/40"> 
              <span className="text-[14px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-1"> Connect </span> 
              <a href={`mailto:${personalInfo?.email || 'goncalovdfigueiredo@gmail.com'}`} className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Mail className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Email 
              </a> 
              <a href={personalInfo?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Linkedin className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> LinkedIn 
              </a> 
              <a href={personalInfo?.github || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Github className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> GitHub 
              </a> 
            </div> 

            {/* Coluna 3: RESEARCH */} 
            <div className="flex flex-col gap-2 pl-5 border-l-2 border-blue-500/30 dark:border-blue-500/40"> 
              <span className="text-[14px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-1 "> Research </span> 
              <a href={personalInfo?.scholar || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <BookOpenText className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> Google Scholar 
              </a> 
              <a href={personalInfo?.cienciavitae || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <FileBadge className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> CiênciaVitae 
              </a> 
              <a href={personalInfo?.orcid || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-fit"> 
                <Fingerprint className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" /> ORCID 
              </a> 
            </div> 
          </div>

          {/* 2. VERSÃO MOBILE (Compacta, icon-based com Títulos) */}
          <div className="flex md:hidden flex-col gap-6">
            
            {/* Secção Explore */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Explore</span>
              <div className="flex flex-wrap gap-3">
                <a href="#experience" aria-label="Experience" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"><Briefcase className="w-4 h-4" /></a>
                <a href="#skills" aria-label="Skills" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"><Cpu className="w-4 h-4" /></a>
                <a href="#projects" aria-label="Projects" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"><Layers className="w-4 h-4" /></a>
                <a href="#education" aria-label="Education" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"><GraduationCap className="w-4 h-4" /></a>
                <a href="#leadership" aria-label="Leadership" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"><Handshake className="w-4 h-4" /></a>
                <a href="#publications" aria-label="Publications" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"><Library className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Secções Connect & Research alinhadas lado a lado para poupar scroll */}
            <div className="grid grid-cols-2 gap-4">
              {/* Connect */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Connect</span>
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${personalInfo?.email || 'goncalovdfigueiredo@gmail.com'}`} aria-label="Email" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 active:scale-95 transition-transform"><Mail className="w-4 h-4" /></a>
                  <a href={personalInfo?.linkedin || "#"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 active:scale-95 transition-transform"><Linkedin className="w-4 h-4" /></a>
                  <a href={personalInfo?.github || "#"} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 active:scale-95 transition-transform"><Github className="w-4 h-4" /></a>
                </div>
              </div>

              {/* Research */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Research</span>
                <div className="flex flex-wrap gap-3">
                  <a href={personalInfo?.scholar || "#"} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 active:scale-95 transition-transform"><BookOpenText className="w-4 h-4" /></a>
                  <a href={personalInfo?.cienciavitae || "#"} target="_blank" rel="noopener noreferrer" aria-label="CiênciaVitae" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 active:scale-95 transition-transform"><FileBadge className="w-4 h-4" /></a>
                  <a href={personalInfo?.orcid || "#"} target="_blank" rel="noopener noreferrer" aria-label="ORCID" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 active:scale-95 transition-transform"><Fingerprint className="w-4 h-4" /></a>
                </div>
              </div>
            </div>

          </div>
        </div> 
        
        {/* ========================================================= */} 
        {/* BARRA INFERIOR: Copyright & Social Icons */} 
        {/* ========================================================= */} 
        {/* gap-2 em mobile aproxima as duas linhas, gap-6 em desktop mantém o espaço normal */}
        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6"> 
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-400 dark:text-zinc-500 font-medium"> 
            <span>© {new Date().getFullYear()} Gonçalo Figueiredo.</span> 
            <span className="hidden sm:block text-zinc-300 dark:text-zinc-700">|</span> 
          </div> 
          <div className="flex items-center gap-5"> 
            <span className="flex items-center gap-2 font-mono text-[10px]"> 
              Engineered with Precision 
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" /> 
            </span> 
          </div> 
        </div> 

      </div> 
    </footer> 
  ); 
}