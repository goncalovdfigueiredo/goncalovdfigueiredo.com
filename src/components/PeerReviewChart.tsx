// src/components/PeerReviewChart.tsx
"use client";

import { motion } from "framer-motion";

type PeerReviewChartProps = {
  company: string;
  forceAnimation?: boolean;
};

// =================== DADOS CENTRALIZADOS ===================
// Aqui definimos todos os jornais, a contagem e a cor/editora associada
const ALL_JOURNALS = [
  // --- IEEE (Roxo/Azul) ---
  { name: "IEEE Internet of Things Journal", count: 23, color: "bg-purple-500", publisher: "IEEE" },
  { name: "IEEE Photonics Technology Letters", count: 2, color: "bg-purple-500", publisher: "IEEE" }, // Ajustei o nome baseado no teu código anterior "Photonics Journal"
  
  // --- Elsevier (Laranja) ---
  { name: "Physical Communication", count: 3, color: "bg-orange-500", publisher: "Elsevier" },
  { name: "Computer Communications", count: 1, color: "bg-orange-500", publisher: "Elsevier" },
  { name: "Optics & Laser Technology", count: 1, color: "bg-orange-500", publisher: "Elsevier" },

  // --- Optica (Verde/Esmeralda) ---
  { name: "Optics Express", count: 13, color: "bg-emerald-500", publisher: "Optica" },
  { name: "Applied Optics", count: 6, color: "bg-emerald-500", publisher: "Optica" },
  { name: "Optics Continuum", count: 2, color: "bg-emerald-500", publisher: "Optica" },
  { name: "Optics Letters", count: 2, color: "bg-emerald-500", publisher: "Optica" },
];

export default function PeerReviewChart({ company, forceAnimation = false }: PeerReviewChartProps) {
  
  // 1. Lógica de Filtragem
  let filteredJournals = [];
  let isCombinedView = false;

  // Se o título da "company" for o novo combo (ex: "IEEE, Elsevier & Optica")
  if (company.includes("IEEE") && company.includes("Elsevier")) {
    filteredJournals = [...ALL_JOURNALS];
    isCombinedView = true;
  } else {
    // Fallback para comportamento antigo (filtra apenas se o nome da editora estiver na string 'company')
    filteredJournals = ALL_JOURNALS.filter(j => 
      company.toLowerCase().includes(j.publisher.toLowerCase())
    );
  }

  // Se não houver dados, não renderiza nada
  if (filteredJournals.length === 0) return null;

  // 2. Ordenação (Maior número de reviews primeiro)
  filteredJournals.sort((a, b) => b.count - a.count);

  // 3. Cálculo do Máximo para a barra de progresso (Escala)
  // Define um máximo fixo (ex: 25) para as barras não ficarem sempre a 100%, 
  // ou usa o maior valor encontrado se for superior a 25.
  const maxVal = Math.max(...filteredJournals.map(d => d.count));
  const scaleMax = Math.max(maxVal, 25); 

  return (
    <div className="w-full mt-3">
      <div className="bg-white/30 dark:bg-black/10 border border-zinc-200/50 dark:border-white/5 rounded-xl p-4 shadow-sm backdrop-blur-sm">
        
        {/* Título da Caixa */}
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 text-center mb-4">
          Manuscripts Reviewed Breakdown
        </h4>

        <div className="space-y-3">
          {filteredJournals.map((item, idx) => {
            // Cálculo da largura da barra
            const targetWidth = `${(item.count / scaleMax) * 100}%`;

            return (
              <div key={idx} className="w-full group">
                <div className="flex justify-between items-end mb-1.5">
                  <span 
                    className="text-xs font-medium text-zinc-700 dark:text-zinc-300 max-w-[85%] leading-tight truncate" 
                    title={item.name} // Tooltip nativo
                  >
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
                
                {/* Barra de Fundo */}
                <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    // Lógica Híbrida de Animação (Mobile vs Desktop)
                    animate={forceAnimation ? { width: targetWidth } : undefined}
                    whileInView={!forceAnimation ? { width: targetWidth } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.05, ease: "easeOut" }} // Stagger suave
                    className={`h-full rounded-full ${item.color} relative`}
                  >
                    {/* Brilho decorativo na ponta da barra */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda (Só aparece se for a vista combinada com muitas entradas) */}
        {isCombinedView && (
          <div className="mt-5 pt-3 border-t border-zinc-200/50 dark:border-white/5 flex flex-wrap justify-center gap-3 md:gap-5">
             <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-sm"></span>
                <span className="text-[9px] uppercase font-bold text-zinc-500 dark:text-zinc-400">IEEE</span>
             </div>
             <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-sm"></span>
                <span className="text-[9px] uppercase font-bold text-zinc-500 dark:text-zinc-400">Elsevier</span>
             </div>
             <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></span>
                <span className="text-[9px] uppercase font-bold text-zinc-500 dark:text-zinc-400">Optica</span>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}