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
  if (rows.length === 0) return null;

  const currentYear = new Date().getFullYear();
  const rawMinYear = Math.min(...rows.map(r => r.start.getFullYear()));
  const rawMaxYear = Math.max(...rows.map(r => r.end.getFullYear()));
  const minYear = rawMinYear;
  const maxYear = Math.max(currentYear, rawMaxYear);
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(maxYear);

  const activeRows = selectedYear !== null 
    ? rows.filter(r => {
        const start = r.start.getFullYear();
        const end = r.end.getFullYear();
        return start <= selectedYear && end >= selectedYear;
      })
    : [];

  return (
    <div className="flex flex-col py-2 px-1">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {years.map(year => {
          const itemsInYear = rows.filter(r => r.start.getFullYear() <= year && r.end.getFullYear() >= year);
          const isActive = selectedYear === year;
          const hasItems = itemsInYear.length > 0;

          return (
            <React.Fragment key={year}>
              <button
                onClick={() => setSelectedYear(isActive ? null : year)}
                disabled={!hasItems}
                className={`
                  relative flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all duration-300
                  ${isActive
                    ? "bg-zinc-800 border-zinc-700 text-white shadow-lg dark:bg-white/10 dark:border-white/20 z-10 ring-2 ring-zinc-500/20"
                    : hasItems
                      ? "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:bg-white/10 cursor-pointer"
                      : "bg-transparent border-transparent text-zinc-300 dark:text-zinc-700 cursor-not-allowed opacity-40"
                  }
                `}
              >
                <span className={`text-[11px] font-black tracking-widest ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  {year}
                </span>

                {/* 5 Bolas de atividade no Mobile */}
                <div className="flex gap-[3px] mt-1.5 h-1.5 items-center">
                  {itemsInYear.slice(0, 5).map((item, i) => (
                    <span 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? 'animate-pulse' : ''}`} 
                      style={{ backgroundColor: item.color, animationDelay: `${i * 150}ms` }} 
                    />
                  ))}
                  {itemsInYear.length > 5 && (
                    <span className="text-[6px] leading-[6px] font-bold opacity-70 ml-0.5">+</span>
                  )}
                </div>
              </button>

              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="col-span-4 sm:col-span-5 overflow-hidden flex flex-col gap-3 my-2"
                  >
                    <div className="flex items-center gap-3 px-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-ping" />
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active in {year}</span>
                      <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                    </div>

                    <div className="flex flex-col gap-3">
                      {activeRows.map((row, idx) => {
                        const Icon = ICON_BY_TYPE[row.type];
                        const isPresent = row.end >= new Date();

                        return (
                          <motion.div
                            key={row.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="relative p-4 rounded-2xl border bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border-zinc-200/80 dark:border-white/10 shadow-sm"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between items-start mb-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                                  {fmtMY(row.start)} — <strong className="font-bold">{isPresent ? "Present" : fmtMY(row.end)}</strong>
                                </span>
                                <span 
                                  className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border shrink-0 ml-2" 
                                  style={{ color: row.color, backgroundColor: row.color.replace('0.9', '0.05'), borderColor: row.color.replace('0.9', '0.2') }}
                                >
                                  {row.type}
                                </span>
                              </div>
                              <h3 className="font-bold text-[15px] text-zinc-900 dark:text-white leading-tight mb-2.5">
                                {row.label}
                              </h3>
                              <div className="flex items-center gap-2.5">
                                {row.logos && row.logos.length > 0 ? (
                                  <div className="flex items-center -space-x-1.5 shrink-0">
                                    {row.logos.map((lg, i) => (
                                      <div key={i} className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 p-[1px] z-10 shadow-sm" style={{ zIndex: 10 - i }}>
                                        <img src={lg} alt="logo" className="w-full h-full object-contain rounded-full" />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border" style={{ backgroundColor: row.color.replace('0.9', '0.05'), color: row.color, borderColor: row.color.replace('0.9', '0.2') }}>
                                    <Icon className="w-3 h-3" />
                                  </div>
                                )}
                                <span className="text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                                  {row.org}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/** =========================
 * COMPONENTE 2: Desktop Gantt
 * ========================= */
function DesktopGantt({ rows, rowHeight, barHeight, fontSize, pxPerDay }: GanttProps & { rows: Row[] }) {
  const [selectedDesktopYear, setSelectedDesktopYear] = React.useState<number | null>(null);

  const displayRows = React.useMemo(() => {
    if (selectedDesktopYear === null) return rows;
    return rows.filter(r => r.start.getFullYear() <= selectedDesktopYear && r.end.getFullYear() >= selectedDesktopYear);
  }, [rows, selectedDesktopYear]);

  let minStart = new Date(2008, 9, 1);
  let maxEnd = new Date();

  if (selectedDesktopYear !== null) {
    minStart = new Date(selectedDesktopYear, 0, 1);
    maxEnd = new Date(selectedDesktopYear, 11, 31);
  } else {
    const rawMinStart = displayRows.length > 0 ? new Date(Math.min(...displayRows.map(r => r.start.getTime()))) : new Date(2008, 9, 1);
    minStart = new Date(rawMinStart.getFullYear() - 1, 0, 1);
  }

  const labelW = 400; 
  const padLeft = 16;
  const padRight = 40;
  const padTop = 36;
  const padBottom = 28;
  const headerH = 28;
  const laneGap = 8;
  
  const totalDays = Math.max(1, (maxEnd.getTime() - minStart.getTime()) / 86400000);
  
  let currentPxPerDay = pxPerDay || 0.45;
  if (selectedDesktopYear !== null) {
    currentPxPerDay = Math.max(1000 / totalDays, currentPxPerDay); 
  }
  
  const timeW = Math.max(1000, totalDays * currentPxPerDay);
  const totalRows = displayRows.length;
  const height = padTop + headerH + padBottom + Math.max(1, totalRows) * ((rowHeight || 56) + laneGap);

  const mapX = (d: Date) => {
    const diffDays = (maxEnd.getTime() - d.getTime()) / 86400000;
    return padLeft + diffDays * currentPxPerDay;
  };

  const months: Date[] = [];
  let curr = new Date(maxEnd.getFullYear(), maxEnd.getMonth(), 1);
  const limitDate = new Date(minStart.getFullYear(), 0, 1);
  while (curr >= limitDate) {
    months.push(new Date(curr));
    curr.setMonth(curr.getMonth() - 1);
  }

  const years: number[] = [];
  const y0 = minStart.getFullYear();
  const y1 = maxEnd.getFullYear();
  for (let y = y1; y >= y0; y--) years.push(y);

  const today = new Date();
  const laneTopAt = (i: number) => padTop + headerH + i * ((rowHeight || 56) + laneGap);
  const barYAt = (i: number) => laneTopAt(i) + ((rowHeight || 56) - (barHeight || 22)) / 2;
  const orgFont = Math.max(10, ((fontSize || 12) - 1));

  const colColorX = 16;
  const colLogosX = 38;
  const colLabelX = 100;

  const currentYear = new Date().getFullYear();
  const rawHeatmapMinYear = rows.length > 0 ? Math.min(...rows.map(r => r.start.getFullYear())) : 2008;
  const rawHeatmapMaxYear = rows.length > 0 ? Math.max(...rows.map(r => r.end.getFullYear())) : currentYear;
  const desktopYears = Array.from({ length: Math.max(currentYear, rawHeatmapMaxYear) - rawHeatmapMinYear + 1 }, (_, i) => Math.max(currentYear, rawHeatmapMaxYear) - i);

  return (
    <div className="w-full flex flex-col">
      {/* ================= SVG GANTT ================= */}
      <div className="relative flex w-full">
        <div className="shrink-0" style={{ width: labelW + padLeft, transition: "height 0.4s ease" }}>
          <svg width={labelW + padLeft} height={height} role="img" aria-label="Gantt Labels">
            <rect x={0} y={0} width={labelW + padLeft} height={height} fill="transparent" />
            <g transform={`translate(0, ${padTop})`}>
              <text x={colColorX} y={headerH - 10} fontSize={fontSize} fill="currentColor" opacity={0.5}>
                Item
              </text>
            </g>
            {displayRows.map((r, i) => {
              const laneTop = laneTopAt(i);
              const sqSize = 10;
              const sqY = laneTop + (rowHeight || 56) / 2 - sqSize / 2;
              const rowCenterY = laneTop + (rowHeight || 56) / 2;
              const logoSize = 22; 
              const logoY = rowCenterY - logoSize / 2;

              return (
                <g key={r.id} style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                  <rect x={0} y={laneTop} width={labelW + padLeft} height={rowHeight} fill={i % 2 ? "rgba(128,128,128,0.03)" : "transparent"} />
                  <rect x={colColorX} y={sqY} width={sqSize} height={sqSize} rx={2} fill={r.color} />

                  {(() => {
                    const logoElements = r.logos.map((logoUrl, lIdx) => {
                      const currentLogoX = colLogosX + (lIdx * 14); 
                      const safeId = `clip-desktop-row${i}-logo${lIdx}`; 

                      return (
                        <g key={lIdx}>
                          <circle cx={currentLogoX + logoSize / 2} cy={logoY + logoSize / 2} r={logoSize / 2} fill="#18181b" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
                          <clipPath id={safeId}>
                            <circle cx={currentLogoX + logoSize / 2} cy={logoY + logoSize / 2} r={logoSize / 2 - 1.5} />
                          </clipPath>
                          <image href={logoUrl} x={currentLogoX + 1.5} y={logoY + 1.5} width={logoSize - 3} height={logoSize - 3} preserveAspectRatio="xMidYMid meet" clipPath={`url(#${safeId})`} />
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

        <div className="grow overflow-x-auto no-scrollbar" style={{ transition: "height 0.4s ease" }}>
          <svg width={timeW + padRight} height={height} role="img" aria-label="Gantt Timeline" className="block text-zinc-800 dark:text-zinc-200">
            <rect x={0} y={0} width={timeW + padRight} height={height} fill="transparent" />
            
            <g transform={`translate(0, ${padTop})`}>
              {months.map((m, idx) => {
                const x = mapX(m);
                return (
                  <g key={`month-${idx}`} style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                    <line x1={x} x2={x} y1={0} y2={height} stroke="currentColor" opacity={0.04} />
                    {selectedDesktopYear !== null && (
                      <text x={x - 4} y={headerH - 10} fontSize={10} fill="currentColor" opacity={0.6} textAnchor="end">
                        {m.toLocaleDateString("en-US", { month: "short" })}
                      </text>
                    )}
                  </g>
                );
              })}

              {years.map((y) => {
                const x = mapX(new Date(y, 0, 1));
                return (
                  <g key={`year-${y}`} style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                    <line x1={x} x2={x} y1={0} y2={height} stroke="currentColor" opacity={selectedDesktopYear !== null ? 0.08 : 0.12} />
                    {selectedDesktopYear === null && (
                      <text x={x - 4} y={headerH - 10} fontSize={fontSize} fill="currentColor" opacity={0.6} textAnchor="end">
                        {y}
                      </text>
                    )}
                  </g>
                );
              })}

              {maxEnd >= today && (
                <line x1={mapX(today)} x2={mapX(today)} y1={0} y2={height} stroke="#ef4444" strokeDasharray="4 4" opacity={0.6} style={{ transition: "all 0.4s ease" }} />
              )}
            </g>

            {displayRows.map((_, i) => {
              const laneTop = laneTopAt(i);
              return (
                <rect key={`lane-${i}`} x={0} y={laneTop} width={timeW + padRight} height={rowHeight} fill={i % 2 ? "rgba(128,128,128,0.03)" : "transparent"} style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
              );
            })}

            {displayRows.map((r, i) => {
              const barY = barYAt(i);
              const xa = mapX(r.start);
              const xb = mapX(r.end);
              const leftX = Math.min(xa, xb);
              const rightX = Math.max(xa, xb);
              const w = Math.max(2, Math.abs(xb - xa));

              return (
                <g key={`bar-${r.id}`} className="hover:opacity-80 transition-opacity" style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
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

      {/* ================= ACTIVITY HEATMAP (BAIXADO E COM 5 BOLAS DE LIMITE) ================= */}
      {rows.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-200/50 dark:border-white/10 px-4 flex flex-col gap-1">
          <div className="flex items-center gap-3 mb-3.5">
            <span className={`w-1.5 h-1.5 rounded-full ${selectedDesktopYear !== null ? 'bg-emerald-500 animate-ping' : 'bg-zinc-400 dark:bg-zinc-600'}`} />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {selectedDesktopYear !== null ? `Viewing Details for ${selectedDesktopYear}` : "Activity Heatmap"}
            </span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
            {desktopYears.map(year => {
              const itemsInYear = rows.filter(r => r.start.getFullYear() <= year && r.end.getFullYear() >= year);
              const hasItems = itemsInYear.length > 0;
              const isActive = selectedDesktopYear === year;

              return (
                <button
                  key={year}
                  onClick={() => setSelectedDesktopYear(isActive ? null : year)}
                  disabled={!hasItems}
                  className={`
                    shrink-0 relative flex flex-col items-center justify-center py-2 px-3.5 rounded-xl border transition-all duration-300
                    ${isActive
                      ? "bg-zinc-800 border-zinc-700 text-white shadow-lg dark:bg-white/10 dark:border-white/20 scale-105 z-10 ring-2 ring-zinc-500/20"
                      : hasItems
                        ? "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:bg-white/10 cursor-pointer"
                        : "bg-transparent border-transparent text-zinc-300 dark:text-zinc-700 cursor-not-allowed opacity-40"
                    }
                  `}
                >
                  <span className={`text-[11px] font-black tracking-widest ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                    {year}
                  </span>

                  {/* Mostra até 5 bolas de cor antes do símbolo + */}
                  <div className="flex gap-[3px] mt-1.5 h-1.5 items-center">
                    {itemsInYear.slice(0, 5).map((item, i) => (
                      <span 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full ${isActive ? 'animate-pulse' : ''}`} 
                        style={{ backgroundColor: item.color, animationDelay: `${i * 150}ms` }} 
                      />
                    ))}
                    {itemsInYear.length > 5 && (
                      <span className="text-[6px] leading-[6px] font-bold opacity-70 ml-0.5">+</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
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

  const filters: ("Education" | "Experience" | "Leadership" | "All")[] = ["Education", "Experience", "Leadership", "All"];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 px-1">
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
              className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                isActive
                  ? "bg-zinc-800 text-white border-zinc-700 shadow-md dark:bg-zinc-800 dark:border-zinc-700"
                  : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300"
              }`}
            >
              {filter === "All" ? (
                <Filter className="w-3.5 h-3.5 opacity-70 shrink-0" />
              ) : (
                <span
                  aria-hidden
                  style={{ background: colorDot }}
                  className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
                />
              )}
              <span className="truncate">{filter}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono shrink-0 ${isActive ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'}`}>
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