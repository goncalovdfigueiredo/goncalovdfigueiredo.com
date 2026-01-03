"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

type JournalEntry = {
  journal: string;
  count: number;
};

type PeerReviewChartProps = {
  company: string; // "IEEE", "Elsevier", "Optica"
};

// =================== DADOS & CONFIGURAÇÃO ===================

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

// Configuração de cores por editora
const themeConfig: Record<string, { id: string; stops: [string, string] }> = {
  IEEE: { id: "gradBlue", stops: ["#3b82f6", "#06b6d4"] }, // Blue -> Cyan
  Elsevier: { id: "gradOrange", stops: ["#f59e0b", "#f97316"] }, // Amber -> Orange
  Optica: { id: "gradEmerald", stops: ["#10b981", "#34d399"] }, // Emerald -> Teal
  Default: { id: "gradGray", stops: ["#71717a", "#a1a1aa"] },
};

// =================== COMPONENTE TOOLTIP PERSONALIZADO ===================

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#09090b]/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl min-w-[200px]">
        <p className="text-xs text-zinc-400 font-medium mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span
            className="block w-2 h-2 rounded-full"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <p className="text-sm font-bold text-white">
            {payload[0].value} Manuscripts
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// =================== COMPONENTE PRINCIPAL ===================

export default function PeerReviewChart({ company }: PeerReviewChartProps) {
  // Identificar a chave (ignora case sensitivity)
  const key = Object.keys(groups).find((k) =>
    company.toLowerCase().includes(k.toLowerCase())
  );

  if (!key) return null;

  // Ordenar dados por contagem (Opcional, mas fica melhor visualmente)
  const data = [...groups[key]].sort((a, b) => b.count - a.count);
  
  // Selecionar tema
  const theme = themeConfig[key] || themeConfig.Default;

  // Altura dinâmica
  const chartHeight = data.length * 60 + 20;

  return (
    <div className="w-full mt-4">
      {/* Container de Vidro Interno */}
      <div className="bg-white/5 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-xl p-4 shadow-inner">
        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 text-center mb-4">
          {key} Journals Breakdown
        </h4>

        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 30, top: 0, bottom: 0 }}
          >
            {/* Definição do Gradiente */}
            <defs>
              <linearGradient id={theme.id} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={theme.stops[0]} stopOpacity={1} />
                <stop offset="100%" stopColor={theme.stops[1]} stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis type="number" hide />
            
            <YAxis
              dataKey="journal"
              type="category"
              axisLine={false}
              tickLine={false}
              width={160} // Ajusta conforme necessário para caber o nome
              tick={{ 
                fill: "#71717a", // Zinc-500 (Funciona bem em light/dark)
                fontSize: 11, 
                fontWeight: 500 
              }}
              // Quebra linhas longas automaticamente (apenas SVG) se necessário, ou usa ellipsis
              style={{ textOverflow: 'ellipsis' }}
            />

            <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />

            <Bar
              dataKey="count"
              barSize={16}
              radius={[4, 4, 4, 4]}
              fill={`url(#${theme.id})`}
              // Background track ("calha" cinzenta atrás da barra)
              background={{ fill: "rgba(128, 128, 128, 0.1)", radius: 4 }}
            >
              <LabelList 
  dataKey="count" 
  position="right" 
  fill="#71717a" 
  fontSize={11} 
  fontWeight="bold" 
  formatter={(val: number | string) => `${val}`} 
/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}