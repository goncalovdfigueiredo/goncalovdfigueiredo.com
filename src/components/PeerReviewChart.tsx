"use client";

import { motion } from "framer-motion";

type JournalEntry = {
  journal: string;
  count: number;
};

type PeerReviewChartProps = {
  company: string;
  forceAnimation?: boolean; // <--- NOVA PROP
};

// =================== DADOS ===================
const groups: Record<string, JournalEntry[]> = {
  IEEE: [
    { journal: "IEEE Internet of Things Journal", count: 21 },
    { journal: "Photonics Journal", count: 2 },
  ],
  Elsevier: [
    { journal: "Computer Communications", count: 1 },
    { journal: "Optics & Laser Technology", count: 1 },
    { journal: "Physical Communication", count: 3 },
  ],
  Optica: [
    { journal: "Applied Optics", count: 5 },
    { journal: "Optics Continuum", count: 2 },
    { journal: "Optics Express", count: 13 },
    { journal: "Optics Letters", count: 2 },
  ],
};

const gradients: Record<string, string> = {
  IEEE: "bg-gradient-to-r from-blue-500 to-cyan-400",
  Elsevier: "bg-gradient-to-r from-amber-500 to-orange-500",
  Optica: "bg-gradient-to-r from-emerald-500 to-teal-400",
  Default: "bg-gradient-to-r from-zinc-500 to-zinc-400",
};

export default function PeerReviewChart({ company, forceAnimation = false }: PeerReviewChartProps) {
  const key = Object.keys(groups).find((k) =>
    company.toLowerCase().includes(k.toLowerCase())
  );

  if (!key) return null;

  const data = [...groups[key]].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...data.map((d) => d.count));
  const gradientClass = gradients[key] || gradients.Default;

  return (
    <div className="w-full mt-3">
      <div className="bg-white/30 dark:bg-black/10 border border-zinc-200/50 dark:border-white/5 rounded-xl p-3 shadow-sm backdrop-blur-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 text-center mb-3">
          {key} Journals Breakdown
        </h4>

        <div className="space-y-3">
          {data.map((item, idx) => {
            const targetWidth = `${(item.count / maxCount) * 100}%`;

            return (
              <div key={idx} className="w-full">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 max-w-[80%] leading-tight truncate">
                    {item.journal}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
                
                <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    // LÓGICA HÍBRIDA:
                    // Se forceAnimation (Mobile) for true, usa 'animate'.
                    // Se não (Desktop), usa 'whileInView'.
                    animate={forceAnimation ? { width: targetWidth } : undefined}
                    whileInView={!forceAnimation ? { width: targetWidth } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${gradientClass}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}