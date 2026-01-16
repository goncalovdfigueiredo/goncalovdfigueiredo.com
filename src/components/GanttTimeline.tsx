// src/components/GanttTimeline.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { education, workExperience, LeadershipExperience } from "@/lib/data";
// 👇 Adicionei Building2 aqui para o ícone da empresa
import { Briefcase, GraduationCap, Handshake, Calendar, Building2 } from "lucide-react";

/** =========================
 * Tipos e utilitários
 * ========================= */
type RowType = "Education" | "Experience" | "Leadership";

type Row = {
  id: string;
  label: string;     
  org?: string;      
  type: RowType;
  start: Date;
  end: Date;
  color: string;
};

type GanttProps = {
  rowHeight?: number;
  barHeight?: number;
  fontSize?: number;
  pxPerDay?: number;
};

const SHOW_ORG_INLINE = false;

const MONTHS: Record<string, number> = {
  jan: 0, january: 0,
  fev: 1, feb: 1, february: 1,
  mar: 2, march: 2,
  abr: 3, apr: 3, april: 3,
  mai: 4, may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  ago: 7, aug: 7, august: 7,
  set: 8, sep: 8, sept: 8, september: 8,
  out: 9, oct: 9, october: 9,
  nov: 10, november: 10,
  dez: 11, dec: 11, december: 11,
};

function parseMonthYear(token: string): Date | null {
  const t = token.trim().replace(",", "").toLowerCase();
  if (!t) return null;
  const parts = t.split(/\s+/);
  if (parts.length === 1) {
    const y = parseInt(parts[0], 10);
    return isNaN(y) ? null : new Date(y, 0, 1);
  }
  const mIdx = MONTHS[parts[0]];
  const y = parseInt(parts[1], 10);
  if (mIdx == null || isNaN(y)) return null;
  return new Date(y, mIdx, 1);
}

function parsePeriod(period: string): { start: Date; end: Date } {
  const now = new Date();
  const [a, b] = period.split("-").map((s) => s.trim());
  const start = parseMonthYear(a) ?? now;
  const end = !b || /present/i.test(b) ? now : parseMonthYear(b) ?? now;
  return { start, end };
}

function daysBetween(a: Date, b: Date) {
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000));
}

function fmtMY(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const COLOR_BY_TYPE: Record<RowType, string> = {
  Education: "rgba(16,185,129,0.9)",  // emerald-500
  Experience: "rgba(59,130,246,0.9)", // blue-500
  Leadership: "rgba(168,85,247,0.9)", // purple-600
};

/** Ícones para a versão Mobile */
const ICON_BY_TYPE: Record<RowType, any> = {
  Education: GraduationCap,
  Experience: Briefcase,
  Leadership: Handshake,
};

/** =========================
 * Construção das linhas (Lógica partilhada)
 * ========================= */
function buildRows(): Row[] {
  const rows: Row[] = [];

  // Education
  for (const e of education as any[]) {
    const { start, end } = parsePeriod(e.period);
    rows.push({
      id: `edu-${e.institution}-${e.degree}`,
      label: e.degree,
      org: e.institution,
      type: "Education",
      start,
      end,
      color: COLOR_BY_TYPE.Education,
    });
  }

  // Experience
  for (const w of workExperience as any[]) {
    const { start, end } = parsePeriod(w.period);
    rows.push({
      id: `exp-${w.company}-${w.position}-${w.period}`,
      label: w.position,
      org: w.company,
      type: "Experience",
      start,
      end,
      color: COLOR_BY_TYPE.Experience,
    });
  }

  // Leadership
  for (const l of LeadershipExperience as any[]) {
    const { start, end } = parsePeriod(l.period);
    rows.push({
      id: `lead-${l.company}-${l.position}-${l.period}`,
      label: l.position,
      org: l.company,
      type: "Leadership",
      start,
      end,
      color: COLOR_BY_TYPE.Leadership,
    });
  }

  const TYPE_RANK: Record<RowType, number> = {
    Leadership: 0,
    Experience: 1,
    Education: 2,
  };

  rows.sort((a, b) => {
    const byStart = b.start.getTime() - a.start.getTime();
    if (byStart !== 0) return byStart;
    const byType = TYPE_RANK[a.type] - TYPE_RANK[b.type];
    if (byType !== 0) return byType;
    return b.end.getTime() - a.end.getTime();
  });

  return rows;
}

/** =========================
 * COMPONENTE 1: Mobile List View (ULTRA COMPACTO)
 * ========================= */
function MobileTimeline({ rows }: { rows: Row[] }) {
  return (
    <div className="relative pl-4 pr-2 py-4">
      {/* Linha Vertical de Fundo */}
      <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-zinc-500/20 via-zinc-500/10 to-transparent rounded-full" />

      <div className="flex flex-col space-y-4"> {/* Reduzi space-y-6 para space-y-4 */}
        {rows.map((row, i) => {
          const Icon = ICON_BY_TYPE[row.type];
          
          let iconColorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
          let glowColor = "group-hover:shadow-emerald-500/10";
          
          if (row.type === "Experience") {
            iconColorClass = "text-blue-500 bg-blue-500/10 border-blue-500/20";
            glowColor = "group-hover:shadow-blue-500/10";
          }
          if (row.type === "Leadership") {
            iconColorClass = "text-purple-500 bg-purple-500/10 border-purple-500/20";
            glowColor = "group-hover:shadow-purple-500/10";
          }

          return (
            <motion.div 
              key={row.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative pl-10"
            >
              {/* Bolinha no eixo */}
              <div 
                className="absolute left-[21px] top-5 h-3.5 w-3.5 rounded-full border-[3px] border-[#09090b] z-10 shadow-sm"
                style={{ backgroundColor: row.color }}
              />

              {/* O CARTÃO GLASS (Compacto) */}
              <div className={`
                group relative p-3 rounded-xl border border-zinc-200 dark:border-white/5 
                bg-white/50 dark:bg-white/5 backdrop-blur-md 
                transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10 
                hover:border-zinc-300 dark:hover:border-white/10 hover:-translate-y-0.5
                shadow-sm ${glowColor}
              `}>
                
                {/* Layout Horizontal: Texto à Esquerda, Ícone à Direita */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex flex-col min-w-0"> {/* min-w-0 para permitir truncate */}
                    
                    {/* Data */}
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-medium text-zinc-500 uppercase tracking-wider mb-1">
                      <Calendar className="w-2.5 h-2.5 opacity-70" />
                      <span>{fmtMY(row.start)} — {fmtMY(row.end)}</span>
                    </div>
                    
                    {/* Título (Cargo) */}
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-tight mb-1">
                      {row.label}
                    </h3>

                    {/* Empresa (Com Ícone Building) - Agora logo abaixo do título! */}
                    <div className="flex items-center gap-1.5">
                       <Building2 className="w-3 h-3 text-zinc-400 dark:text-zinc-500 shrink-0" />
                       <span className="text-zinc-600 dark:text-zinc-400 font-medium text-xs truncate">
                         {row.org}
                       </span>
                    </div>
                  </div>

                  {/* Icon Quadrado da Categoria (Direita) */}
                  <div className={`p-1.5 rounded-md border shrink-0 ${iconColorClass}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* SEM RODAPÉ - O cartão acaba aqui, poupando imenso espaço */}

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** =========================
 * COMPONENTE 2: Desktop Gantt (Original SVG)
 * ========================= */
function DesktopGantt({ 
  rows, 
  rowHeight, 
  barHeight, 
  fontSize, 
  pxPerDay 
}: GanttProps & { rows: Row[] }) {
  const minStart = rows.reduce((m, r) => (r.start < m ? r.start : m), rows[0].start);
  const maxEnd   = rows.reduce((m, r) => (r.end > m ? r.end : m), rows[0].end);

  const labelW = 300; 
  const padLeft = 16; 
  const padRight = 40;
  const padTop = 36;
  const padBottom = 28;
  const headerH = 28;
  const laneGap = 8;

  const totalDays = Math.max(1, daysBetween(minStart, maxEnd));
  const timeW = Math.max(600, totalDays * (pxPerDay || 0.35));

  const totalRows = rows.length;
  const height = padTop + headerH + padBottom + totalRows * ((rowHeight || 56) + laneGap);

  const startXR = (d: Date) => padLeft + (daysBetween(d, maxEnd) * (pxPerDay || 0.35));

  const years: number[] = [];
  const y0 = minStart.getFullYear();
  const y1 = maxEnd.getFullYear();
  for (let y = y1; y >= y0; y--) years.push(y);

  const today = new Date();
  const laneTopAt = (i: number) => padTop + headerH + i * ((rowHeight || 56) + laneGap);
  const barYAt = (i: number) => laneTopAt(i) + ((rowHeight || 56) - (barHeight || 22)) / 2;
  const orgFont = Math.max(10, ((fontSize || 12) - 1));

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-2 pl-2">
        {[
          { t: "Education", c: COLOR_BY_TYPE.Education },
          { t: "Experience", c: COLOR_BY_TYPE.Experience },
          { t: "Leadership", c: COLOR_BY_TYPE.Leadership },
        ].map((k) => (
          <div key={k.t} className="flex items-center gap-2 text-sm opacity-90">
            <span
              aria-hidden
              style={{ background: k.c }}
              className="inline-block w-3 h-3 rounded-[3px] ring-1 ring-black/10"
            />
            <span className="text-zinc-600 dark:text-zinc-400">{k.t}</span>
          </div>
        ))}
      </div>

      <div className="relative flex w-full">
        <div className="shrink-0" style={{ width: labelW + padLeft }}>
          <svg width={labelW + padLeft} height={height} role="img" aria-label="Gantt Labels">
            <rect x={0} y={0} width={labelW + padLeft} height={height} fill="transparent" />
            <g transform={`translate(0, ${padTop})`}>
              <text x={12} y={headerH - 10} fontSize={fontSize} fill="currentColor" opacity={0.5}>
                Item
              </text>
            </g>

            {rows.map((r, i) => {
              const laneTop = laneTopAt(i);
              const sqSize = 10;
              const sqX = 12;
              const sqY = laneTop + (rowHeight || 56) / 2 - sqSize / 2;
              const labelX = sqX + sqSize + 6;
              const baseY = SHOW_ORG_INLINE
                ? laneTop + (rowHeight || 56) / 2 - (orgFont * 0.6) / 2
                : laneTop + (rowHeight || 56) / 2;

              return (
                <g key={r.id}>
                  <rect
                    x={0}
                    y={laneTop}
                    width={labelW + padLeft}
                    height={rowHeight}
                    fill={i % 2 ? "rgba(128,128,128,0.03)" : "transparent"}
                  />
                  <rect
                    x={sqX}
                    y={sqY}
                    width={sqSize}
                    height={sqSize}
                    rx={2}
                    fill={r.color}
                  />
                  <text
                    x={labelX}
                    y={baseY}
                    fontSize={fontSize}
                    fill="currentColor"
                    className="text-zinc-800 dark:text-zinc-200"
                    dominantBaseline="middle"
                  >
                    <tspan x={labelX}>{r.label}</tspan>
                    {SHOW_ORG_INLINE && r.org && (
                      <tspan x={labelX} dy={orgFont * 1.2} fontSize={orgFont} opacity={0.65}>
                        {r.org}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grow overflow-x-auto no-scrollbar">
          <svg
            width={timeW + padRight}
            height={height}
            role="img"
            aria-label="Gantt Timeline"
            className="block text-zinc-800 dark:text-zinc-200"
          >
            <rect x={0} y={0} width={timeW + padRight} height={height} fill="transparent" />

            <g transform={`translate(0, ${padTop})`}>
              {years.map((y) => {
                const x = startXR(new Date(y, 0, 1));
                return (
                  <g key={`year-${y}`}>
                    <line x1={x} x2={x} y1={0} y2={height} stroke="currentColor" opacity={0.1} />
                    <text
                      x={x - 4}
                      y={headerH - 10}
                      fontSize={fontSize}
                      fill="currentColor"
                      opacity={0.6}
                      textAnchor="end"
                    >
                      {y}
                    </text>
                  </g>
                );
              })}

              {today >= minStart && today <= maxEnd && (
                <line
                  x1={startXR(today)}
                  x2={startXR(today)}
                  y1={0}
                  y2={height}
                  stroke="#ef4444" 
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              )}
            </g>

            {rows.map((_, i) => {
              const laneTop = laneTopAt(i);
              return (
                <rect
                  key={`lane-${i}`}
                  x={0}
                  y={laneTop}
                  width={timeW + padRight}
                  height={rowHeight}
                  fill={i % 2 ? "rgba(128,128,128,0.03)" : "transparent"}
                />
              );
            })}

            {rows.map((r, i) => {
              const barY = barYAt(i);
              const xa = startXR(r.start);
              const xb = startXR(r.end);
              const leftX = Math.min(xa, xb);
              const rightX = Math.max(xa, xb);
              const w = Math.max(2, Math.abs(xb - xa));

              return (
                <g key={`bar-${r.id}`} className="hover:opacity-80 transition-opacity">
                  <rect
                    x={leftX}
                    y={barY}
                    width={w}
                    height={barHeight}
                    rx={4}
                    fill={r.color}
                    opacity={0.9}
                  >
                    <title>{`${r.label}${r.org ? ` — ${r.org}` : ""}\n${fmtMY(r.end)} — ${fmtMY(r.start)}`}</title>
                  </rect>
                  <text x={leftX} y={barY + 14} fontSize={10} fill="currentColor" opacity={0.6}>
                    {fmtMY(r.end)}
                  </text>
                  <text x={rightX + 47} y={barY + 14} fontSize={10} fill="currentColor" opacity={0.6} textAnchor="end">
                    {fmtMY(r.start)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function GanttTimeline(props: GanttProps) {
  const rows = React.useMemo(buildRows, []);
  
  if (rows.length === 0) return null;

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <DesktopGantt rows={rows} {...props} />
      </div>

      <div className="block md:hidden">
        <MobileTimeline rows={rows} />
      </div>
    </div>
  );
}