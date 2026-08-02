import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { education, workExperience, LeadershipExperience } from "@/lib/data";
import { Briefcase, GraduationCap, Handshake, Building2, Filter } from "lucide-react";

/** =========================
 * Tipos e utilitários
 * ========================= */
type RowType = "Education" | "Experience" | "Leadership";

type Row = {
  id: string;
  label: string;
  org?: string;
  logos: string[];
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

const ICON_BY_TYPE: Record<RowType, any> = {
  Education: GraduationCap,
  Experience: Briefcase,
  Leadership: Handshake,
};

/** =========================
 * Construção das linhas
 * ========================= */
function buildRows(): Row[] {
  const rows: Row[] = [];

  for (const e of education as any[]) {
    const { start, end } = parsePeriod(e.period);
    const logosList = e.logos && e.logos.length > 0 ? e.logos : (e.logo ? [e.logo] : []);
    rows.push({
      id: `edu-${e.institution}-${e.degree}`,
      label: e.degree,
      org: e.institution,
      logos: logosList,
      type: "Education",
      start,
      end,
      color: COLOR_BY_TYPE.Education,
    });
  }

  for (const w of workExperience as any[]) {
    const { start, end } = parsePeriod(w.period);
    const logosList = w.logos && w.logos.length > 0 ? w.logos : (w.logo ? [w.logo] : []);
    rows.push({
      id: `exp-${w.company}-${w.position}-${w.period}`,
      label: w.position,
      org: w.company,
      logos: logosList,
      type: "Experience",
      start,
      end,
      color: COLOR_BY_TYPE.Experience,
    });
  }

  for (const l of LeadershipExperience as any[]) {
    const { start, end } = parsePeriod(l.period);
    const logosList = l.logos && l.logos.length > 0 ? l.logos : (l.logo ? [l.logo] : []);
    rows.push({
      id: `lead-${l.company}-${l.position}-${l.period}`,
      label: l.position,
      org: l.company,
      logos: logosList,
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
 * COMPONENTE 1: Mobile List View
 * ========================= */
function MobileTimeline({ rows }: { rows: Row[] }) {
  return (
    <div className="relative pl-2 pr-2 py-4">
      <div className="absolute left-[24px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-zinc-500/10 via-zinc-500/5 to-transparent rounded-full" />

      <div className="flex flex-col space-y-1">
        <AnimatePresence mode="popLayout">
          {rows.map((row) => {
            const Icon = ICON_BY_TYPE[row.type];
            let iconColorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
            if (row.type === "Experience") iconColorClass = "text-blue-500 bg-blue-500/10 border-blue-500/20";
            if (row.type === "Leadership") iconColorClass = "text-purple-500 bg-purple-500/10 border-purple-500/20";

            const startYear = row.start.getFullYear();
            let endYear = row.end.getFullYear();
            const currentYear = new Date().getFullYear();
            if (endYear >= currentYear) endYear = 2026;
            const yearDisplay = `${startYear}/${endYear}`;

            return (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative pl-12 pr-2 py-2 group flex flex-col gap-0.5"
              >
                <div className={`absolute left-[16px] top-4.5 p-1 rounded-md border shrink-0 z-10 shadow-sm ${iconColorClass}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold text-zinc-100 text-xs leading-snug truncate">
                    {row.label}
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-500/80 shrink-0 tabular-nums">
                    {yearDisplay}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-500">
                  <span className="text-[9px] font-mono opacity-50">&gt;_</span>
                  <span className="text-[10px] font-medium truncate">
                    {row.org}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** =========================
 * COMPONENTE 2: Desktop Gantt
 * ========================= */
function DesktopGantt({ rows, rowHeight, barHeight, fontSize, pxPerDay }: GanttProps & { rows: Row[] }) {
  // Lógica Dinâmica: Encontra a data mais antiga APENAS dos itens filtrados
  const rawMinStart = rows.length > 0 
    ? rows.reduce((m, r) => (r.start < m ? r.start : m), rows[0].start) 
    : new Date(2008, 9, 1);
  
  // O gráfico começa 1 ano antes dessa data visível
  const minStart = new Date(rawMinStart.getFullYear() - 1, 0, 1);
  const maxEnd = new Date();

  const labelW = 400; 
  const padLeft = 16;
  const padRight = 40;
  const padTop = 36;
  const padBottom = 28;
  const headerH = 28;
  const laneGap = 8;

  const totalDays = Math.max(1, daysBetween(minStart, maxEnd));
  const timeW = Math.max(1200, totalDays * (pxPerDay || 0.45));
  const totalRows = rows.length;
  const height = padTop + headerH + padBottom + Math.max(1, totalRows) * ((rowHeight || 56) + laneGap);

  const startXR = (d: Date) => padLeft + (daysBetween(d, maxEnd) * (pxPerDay || 0.45));

  const years: number[] = [];
  const y0 = minStart.getFullYear();
  const y1 = maxEnd.getFullYear();
  for (let y = y1; y >= y0; y--) years.push(y);

  const months: Date[] = [];
  let curr = new Date(y1, 11, 1);
  const limitDate = new Date(y0, 0, 1);
  while (curr >= limitDate) {
    months.push(new Date(curr));
    curr.setMonth(curr.getMonth() - 1);
  }

  const today = new Date();
  const laneTopAt = (i: number) => padTop + headerH + i * ((rowHeight || 56) + laneGap);
  const barYAt = (i: number) => laneTopAt(i) + ((rowHeight || 56) - (barHeight || 22)) / 2;
  const orgFont = Math.max(10, ((fontSize || 12) - 1));

  const colColorX = 16;
  const colLogosX = 38;
  const colLabelX = 100;

  return (
    <div className="w-full">
      <div className="relative flex w-full">
        <div className="shrink-0" style={{ width: labelW + padLeft }}>
          <svg width={labelW + padLeft} height={height} role="img" aria-label="Gantt Labels">
            <rect x={0} y={0} width={labelW + padLeft} height={height} fill="transparent" />
            <g transform={`translate(0, ${padTop})`}>
              <text x={colColorX} y={headerH - 10} fontSize={fontSize} fill="currentColor" opacity={0.5}>
                Item
              </text>
            </g>
            {rows.map((r, i) => {
              const laneTop = laneTopAt(i);
              const sqSize = 10;
              const sqY = laneTop + (rowHeight || 56) / 2 - sqSize / 2;
              const rowCenterY = laneTop + (rowHeight || 56) / 2;

              const logoSize = 22; 
              const logoY = rowCenterY - logoSize / 2;

              return (
                <g key={r.id}>
                  <rect x={0} y={laneTop} width={labelW + padLeft} height={rowHeight} fill={i % 2 ? "rgba(128,128,128,0.03)" : "transparent"} />
                  
                  <rect x={colColorX} y={sqY} width={sqSize} height={sqSize} rx={2} fill={r.color} />

                  {(() => {
                    const logoElements = r.logos.map((logoUrl, lIdx) => {
                      const currentLogoX = colLogosX + (lIdx * 14); 
                      const safeId = `clip-row${i}-logo${lIdx}`; 

                      return (
                        <g key={lIdx}>
                          <circle
                            cx={currentLogoX + logoSize / 2}
                            cy={logoY + logoSize / 2}
                            r={logoSize / 2}
                            fill="#18181b"
                            stroke="rgba(255, 255, 255, 0.25)"
                            strokeWidth="1.5"
                          />
                          <clipPath id={safeId}>
                            <circle cx={currentLogoX + logoSize / 2} cy={logoY + logoSize / 2} r={logoSize / 2 - 1.5} />
                          </clipPath>
                          <image
                            href={logoUrl}
                            x={currentLogoX + 1.5}
                            y={logoY + 1.5}
                            width={logoSize - 3}
                            height={logoSize - 3}
                            preserveAspectRatio="xMidYMid meet"
                            clipPath={`url(#${safeId})`}
                          />
                        </g>
                      );
                    });
                    
                    return logoElements.reverse();
                  })()}

                  <text x={colLabelX} y={rowCenterY} fontSize={fontSize} fill="currentColor" className="text-zinc-800 dark:text-zinc-200 font-medium" dominantBaseline="middle">
                    <tspan x={colLabelX}>{r.label}</tspan>
                    {SHOW_ORG_INLINE && r.org && (
                      <tspan x={colLabelX} dy={orgFont * 1.2} fontSize={orgFont} opacity={0.65}>
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
          <svg width={timeW + padRight} height={height} role="img" aria-label="Gantt Timeline" className="block text-zinc-800 dark:text-zinc-200">
            <rect x={0} y={0} width={timeW + padRight} height={height} fill="transparent" />
            
            <g transform={`translate(0, ${padTop})`}>
              {months.map((m, idx) => {
                const x = startXR(m);
                return (
                  <line
                    key={`month-${idx}`}
                    x1={x}
                    x2={x}
                    y1={0}
                    y2={height}
                    stroke="currentColor"
                    opacity={0.04}
                  />
                );
              })}

              {years.map((y) => {
                const x = startXR(new Date(y, 0, 1));
                return (
                  <g key={`year-${y}`}>
                    <line x1={x} x2={x} y1={0} y2={height} stroke="currentColor" opacity={0.12} />
                    <text x={x - 4} y={headerH - 10} fontSize={fontSize} fill="currentColor" opacity={0.6} textAnchor="end">
                      {y}
                    </text>
                  </g>
                );
              })}

              {/* Linha Tracejada de Hoje */}
              <line x1={startXR(today)} x2={startXR(today)} y1={0} y2={height} stroke="#ef4444" strokeDasharray="4 4" opacity={0.6} />
              
              {/* Linha Tracejada Dinâmica (Início dos dados filtrados) */}
              <line x1={startXR(rawMinStart)} x2={startXR(rawMinStart)} y1={0} y2={height} stroke="#f59e0b" strokeDasharray="6 6" opacity={0.7} />
            </g>

            {rows.map((_, i) => {
              const laneTop = laneTopAt(i);
              return (
                <rect key={`lane-${i}`} x={0} y={laneTop} width={timeW + padRight} height={rowHeight} fill={i % 2 ? "rgba(128,128,128,0.03)" : "transparent"} />
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
                  <rect x={leftX} y={barY} width={w} height={barHeight} rx={4} fill={r.color} opacity={0.9}>
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

/** =========================
 * COMPONENTE PRINCIPAL COM FILTROS E QUANTIDADES
 * ========================= */
export default function GanttTimeline(props: GanttProps) {
  const [selectedFilter, setSelectedFilter] = React.useState<"All" | RowType>("All");
  
  const allRows = React.useMemo(buildRows, []);
  
  const filteredRows = React.useMemo(() => {
    if (selectedFilter === "All") return allRows;
    return allRows.filter((r) => r.type === selectedFilter);
  }, [allRows, selectedFilter]);

  if (allRows.length === 0) return null;

  const counts = {
    All: allRows.length,
    Education: allRows.filter(r => r.type === "Education").length,
    Experience: allRows.filter(r => r.type === "Experience").length,
    Leadership: allRows.filter(r => r.type === "Leadership").length,
  };

  const filters: ("All" | RowType)[] = ["All", "Education", "Experience", "Leadership"];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 pl-2">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          const count = counts[filter];
          let colorDot = "";
          if (filter === "Education") colorDot = COLOR_BY_TYPE.Education;
          if (filter === "Experience") colorDot = COLOR_BY_TYPE.Experience;
          if (filter === "Leadership") colorDot = COLOR_BY_TYPE.Leadership;

          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                isActive
                  ? "bg-zinc-800 text-white border-zinc-700 shadow-md dark:bg-zinc-800 dark:border-zinc-700"
                  : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400"
              }`}
            >
              {filter === "All" ? (
                <Filter className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <span
                  aria-hidden
                  style={{ background: colorDot }}
                  className="inline-block w-2.5 h-2.5 rounded-full"
                />
              )}
              <span>{filter}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-full">
        <div className="hidden md:block">
          <DesktopGantt rows={filteredRows} {...props} />
        </div>
        <div className="block md:hidden">
          <MobileTimeline rows={filteredRows} />
        </div>
      </div>
    </div>
  );
}