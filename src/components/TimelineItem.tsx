import React from "react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
  isLast?: boolean;
  index: number;
}

export default function TimelineItem({
  title,
  subtitle,
  children,
  isLast,
  index,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-8">
      {/* Coluna Esquerda: Bolinha e Linha */}
      <div className="flex flex-col items-center">
        {/* Bolinha animada */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)] dark:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-zinc-900" />
        </motion.div>

        {/* Linha vertical (se não for o último item) */}
        {!isLast && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
            className="w-0.5 flex-1 bg-gradient-to-b from-emerald-500/50 to-transparent dark:from-emerald-500/30"
          />
        )}
      </div>

      {/* Coluna Direita: Conteúdo */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex-1 pb-12"
      >
        <div className="mb-2">{title}</div>
        <div className="mb-4 text-zinc-600 dark:text-zinc-400">{subtitle}</div>
        
        {/* Aqui é onde o React desenha os detalhes (children) */}
        {children}
      </motion.div>
    </div>
  );
}