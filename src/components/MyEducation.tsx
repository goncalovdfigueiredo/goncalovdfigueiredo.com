// src/components/EducationSection.tsx
import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import {
  Award,
  Calendar,
  MapPin,
  GraduationCap,
  BarChart3,
  FileText,
  ListChecks,
  ExternalLink, // 👈 IMPORTAR O ÍCONE NOVO
} from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <MotionWrapper>
          {/* Header + Buttons */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-4 backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Education
            </h2>

            {/* Button Group */}
            <div className="flex gap-3">
              <a
                href="#map"
                className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-900/5 dark:shadow-emerald-900/20"
                aria-label="Jump to global map"
              >
                <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Global Footprint
              </a>

              <a
                href="#timeline"
                className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 text-sm font-medium text-blue-700 dark:text-blue-400 transition-all duration-300 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20"
                aria-label="Jump to full timeline"
              >
                <BarChart3 className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Timeline
              </a>
            </div>
          </div>
        </MotionWrapper>

        <div className="space-y-12">
          {education.map((edu, index) => {
            const thesisText =
              edu.achievements?.find(
                (a: string) => a && !a.trim().startsWith("-")
              ) || "";

            const curriculumItems = (edu.achievements || [])
              .filter((a: string) => a && a.trim().startsWith("-"))
              .map((a: string) =>
                a
                  .replace(/^-+\s*/, "")
                  .replace(/[;,.]\s*$/, "")
              );

            const STRIP_TRAILERS: RegExp[] = [
              /[:.\s]*relevant curricular units include[:.\s]*$/i,
              /[:.\s]*with the following curriculum plan[:.\s]*$/i,
            ];
            let thesisClean = thesisText.trim();
            STRIP_TRAILERS.forEach((re) => {
              thesisClean = thesisClean.replace(re, "");
            });

            return (
              <TimelineItem
                key={edu.institution + edu.period}
                title={
                  <div className="flex flex-col gap-2">
                    {/* DATA */}
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        {edu.period}
                      </span>
                      <div className="h-px w-8 bg-emerald-500/20" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="p-2 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 w-fit backdrop-blur-sm">
                          <img
                          src={edu.logo}
                          alt={edu.institution}
                          className="w-8 h-8 object-contain"
                          />
                      </div>
                      <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {edu.degree}
                      </span>
                    </div>
                  </div>
                }
                subtitle={
                  <div className="mt-2 pl-1">
                    {/* 👇 NOME DA INSTITUIÇÃO COM LINK */}
                    {(edu as any).url ? (
                      <a 
                        href={(edu as any).url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 w-fit text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-2 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                      >
                        {edu.institution}
                        <ExternalLink className="h-4 w-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                      </a>
                    ) : (
                      <span className="text-lg text-emerald-600 dark:text-emerald-400 font-medium block mb-2">
                        {edu.institution}
                      </span>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-white/5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{typeof edu.location === 'string' ? edu.location : edu.location.city}</span>
                      </div>
                    </div>
                  </div>
                }
                isLast={index === education.length - 1}
                index={index}
              >
                {(thesisClean || curriculumItems.length > 0) && (
                  <motion.div
                    tabIndex={0}
                    className="group relative mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-900/10 focus:outline-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Header Strip */}
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-white/5">
                        <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 tracking-wide uppercase">
                            Education Details
                        </h4>
                    </div>

                    {/* Content Container */}
                    <div className="p-5">
                        <div
                        className="
                            max-h-0 overflow-hidden opacity-0
                            transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                            group-hover:max-h-[1000px] group-hover:opacity-100
                            group-focus-within:max-h-[1000px] group-focus-within:opacity-100
                        "
                        >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                            {/* Thesis / Description */}
                            {thesisClean && (
                            <div className="relative p-4 rounded-lg bg-zinc-100 dark:bg-black/20 border border-zinc-200 dark:border-white/5 hover:border-emerald-500/20 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
                                <FileText className="h-4 w-4" />
                                <h5 className="text-sm font-semibold tracking-wide uppercase">
                                    Thesis / Description
                                </h5>
                                </div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                                {thesisClean}
                                </p>
                            </div>
                            )}

                            {/* Curriculum Overview */}
                            {curriculumItems.length > 0 && (
                            <div className="relative p-4 rounded-lg bg-zinc-100 dark:bg-black/20 border border-zinc-200 dark:border-white/5 hover:border-emerald-500/20 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
                                <ListChecks className="h-4 w-4" />
                                <h5 className="text-sm font-semibold tracking-wide uppercase">
                                    Curriculum Overview
                                </h5>
                                </div>

                                <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-3 font-medium uppercase tracking-wider">
                                Relevant Curricular Units:
                                </p>

                                <ul className="space-y-1.5">
                                {curriculumItems.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-light">
                                    <span className="block mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 shrink-0" />
                                    <span className="leading-snug">{item}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            )}
                        </div>
                        </div>

                        {/* Hover Hint */}
                        <div className="absolute bottom-3 right-4 flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                            <span className="text-[10px] uppercase tracking-widest font-medium text-emerald-600/60 dark:text-emerald-500/60">
                                Hover to reveal
                            </span>
                            <div className="w-1 h-1 rounded-full bg-emerald-500/40 animate-pulse" />
                        </div>
                    </div>
                  </motion.div>
                )}
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}