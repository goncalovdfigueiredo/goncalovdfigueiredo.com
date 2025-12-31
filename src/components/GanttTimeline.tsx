// src/components/GanttTimeline.tsx
import * as React from "react";
import { education, workExperience, LeadershipExperience } from "@/lib/data";

/** =========================
 *  Tipos e utilitários
 *  ========================= */
type RowType = "Education" | "Experience" | "Leadership";

type Row = {
  id: string;
  label: string;     // título curto (degree/position)
  org?: string;      // instituição/empresa (opcional)
  type: RowType;
  start: Date;
  end: Date;
  color: string;
};

type GanttProps = {
  /** Altura de cada linha (label + barra) */
  rowHeight?: number;
  /** Altura da barra dentro da linha */
  barHeight?: number;
  /** Tamanho do texto (labels) */
  fontSize?: number;
  /** Pixels por dia (controla a largura total do gráfico) */
  pxPerDay?: number;
};

/** Mostrar a organização em linha secundária sob o título? */
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

/** Paleta por tipo */
const COLOR_BY_TYPE: Record<RowType, string> = {
  Education: "rgba(16,185,129,0.9)",  // emerald-500
  Experience: "rgba(59,130,246,0.9)", // blue-500
  Leadership: "rgba(168,85,247,0.9)", // purple-600
};

/** =========================
 *  Construção das linhas a partir do teu data.ts
 *  ========================= */
function buildRows(): Row[] {
  const rows: Row[] = [];

  // Education
  for (const e of education as any[]) {
    const { start, end } = parsePeriod(e.period);
    rows.push({
      id: `edu-${e.institution}-${e.degree}`,
      label: e.degree,              // 👈 só o degree
      org: e.institution,           // 👈 instituição separada
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
      label: w.position,            // 👈 só a posição
      org: w.company,               // 👈 empresa separada
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
      label: l.position,            // 👈 só a posição
      org: l.company,               // 👈 organização separada
      type: "Leadership",
      start,
      end,
      color: COLOR_BY_TYPE.Leadership,
    });
  }

  // ===== ORDEM: start DESC; em empate → Leadership acima, depois Experience, depois Education; depois end DESC; depois label ASC
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

    const byEnd = b.end.getTime() - a.end.getTime();
    if (byEnd !== 0) return byEnd;

    return a.label.localeCompare(b.label);
  });

  return rows;
}

/** =========================
 *  Componente principal — labels FIXOS + timeline SCROLL
 *  ========================= */
export default function GanttTimeline({
  rowHeight = 56,
  barHeight = 22,
  fontSize = 12,
  pxPerDay = 0.35,
}: GanttProps) {
  const rows = React.useMemo(buildRows, []);
  if (rows.length === 0) return null;

  const minStart = rows.reduce((m, r) => (r.start < m ? r.start : m), rows[0].start);
  const maxEnd   = rows.reduce((m, r) => (r.end > m ? r.end : m), rows[0].end);

  // Layout/margens
  const labelW = 300; // largura da coluna de labels (fixa)
  const padLeft = 16; // padding interno em ambas as colunas
  const padRight = 40;
  const padTop = 36;
  const padBottom = 28;
  const headerH = 28;
  const laneGap = 8;

  // largura temporal (direita)
  const totalDays = Math.max(1, daysBetween(minStart, maxEnd));
  const timeW = Math.max(600, totalDays * pxPerDay);

  // alturas
  const totalRows = rows.length;
  const height = padTop + headerH + padBottom + totalRows * (rowHeight + laneGap);

  // EIXO INVERTIDO (presente à esquerda) — só para a PARTE DIREITA
  const startXR = (d: Date) => padLeft + (daysBetween(d, maxEnd) * pxPerDay);

  // Ticks de anos (desc)
  const years: number[] = [];
  const y0 = minStart.getFullYear();
  const y1 = maxEnd.getFullYear();
  for (let y = y1; y >= y0; y--) years.push(y);

  const today = new Date();

  // Helpers verticais
  const laneTopAt = (i: number) => padTop + headerH + i * (rowHeight + laneGap);
  const barYAt = (i: number) => laneTopAt(i) + (rowHeight - barHeight) / 2;

  const orgFont = Math.max(10, (fontSize || 12) - 1);

  return (
    <div className="w-full">
      {/* Legenda simples (HTML) */}
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
            <span>{k.t}</span>
          </div>
        ))}
      </div>

      <div className="relative flex w-full">
        {/* ====================== COLUNA ESQUERDA (FIXA) ====================== */}
        <div className="shrink-0" style={{ width: labelW + padLeft }}>
          <svg width={labelW + padLeft} height={height} role="img" aria-label="Gantt Labels">
            {/* Fundo */}
            <rect x={0} y={0} width={labelW + padLeft} height={height} fill="transparent" />
            {/* Cabeçalho: título da coluna */}
            <g transform={`translate(0, ${padTop})`}>
              <text x={12} y={headerH - 10} fontSize={fontSize} fill="currentColor" opacity={0.7}>
                Item
              </text>
            </g>

            {/* Linhas + Labels (com quadradinho de cor) */}
            {rows.map((r, i) => {
              const laneTop = laneTopAt(i);
              const sqSize = 10;
              const sqX = 12;
              const sqY = laneTop + rowHeight / 2 - sqSize / 2;
              const labelX = sqX + sqSize + 6;

              // Ajuste vertical se for 2 linhas
              const baseY = SHOW_ORG_INLINE
                ? laneTop + rowHeight / 2 - (orgFont * 0.6) / 2
                : laneTop + rowHeight / 2;

              return (
                <g key={r.id}>
                  {/* faixa alternada (só na coluna esquerda) */}
                  <rect
                    x={0}
                    y={laneTop}
                    width={labelW + padLeft}
                    height={rowHeight}
                    fill={i % 2 ? "rgba(0,0,0,0.02)" : "transparent"}
                  />
                  {/* quadrado + label (1 ou 2 linhas) */}
                  <rect
                    x={sqX}
                    y={sqY}
                    width={sqSize}
                    height={sqSize}
                    rx={2}
                    fill={r.color}
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth={0.5}
                  />
                  <text
                    x={labelX}
                    y={baseY}
                    fontSize={fontSize}
                    fill="currentColor"
                    opacity={0.92}
                    dominantBaseline="middle"
                  >
                    <tspan x={labelX}>{r.label}</tspan>
                    {SHOW_ORG_INLINE && r.org && (
                      <tspan
                        x={labelX}
                        dy={orgFont * 1.2}
                        fontSize={orgFont}
                        opacity={0.65}
                      >
                        {r.org}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ====================== COLUNA DIREITA (SCROLL HORIZONTAL) ====================== */}
        <div className="grow overflow-x-auto">
          <svg
            width={timeW + padRight}
            height={height}
            role="img"
            aria-label="Gantt Timeline"
            className="block"
          >
            {/* Fundo */}
            <rect x={0} y={0} width={timeW + padRight} height={height} fill="transparent" />

            {/* Cabeçalho: grelha de anos (desc) */}
            <g transform={`translate(0, ${padTop})`}>
              {years.map((y) => {
                const x = startXR(new Date(y, 0, 1));
                return (
                  <g key={`year-${y}`}>
                    <line x1={x} x2={x} y1={0} y2={height} stroke="currentColor" opacity={0.08} />
                    {/* ano à ESQUERDA do traço */}
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

              {/* Hoje */}
              {today >= minStart && today <= maxEnd && (
                <line
                  x1={startXR(today)}
                  x2={startXR(today)}
                  y1={0}
                  y2={height}
                  stroke="rgba(244,63,94,0.9)" // rose-500
                  strokeDasharray="4 4"
                />
              )}
            </g>

            {/* Linhas/lanes: mesmas faixas alternadas para alinhar com a esquerda */}
            {rows.map((_, i) => {
              const laneTop = laneTopAt(i);
              return (
                <rect
                  key={`lane-${i}`}
                  x={0}
                  y={laneTop}
                  width={timeW + padRight}
                  height={rowHeight}
                  fill={i % 2 ? "rgba(0,0,0,0.02)" : "transparent"}
                />
              );
            })}

            {/* Barras + datas */}
            {rows.map((r, i) => {
              const barY = barYAt(i);
              const xa = startXR(r.start); // mais antigo → x maior (direita)
              const xb = startXR(r.end);   // mais recente → x menor (esquerda)
              const leftX = Math.min(xa, xb);
              const rightX = Math.max(xa, xb);
              const w = Math.max(2, Math.abs(xb - xa));

              return (
                <g key={`bar-${r.id}`} className="transition-transform">
                  <rect
                    x={leftX}
                    y={barY}
                    width={w}
                    height={barHeight}
                    rx={6}
                    fill={r.color}
                    stroke="rgba(0,0,0,0.22)"
                    strokeWidth={0.5}
                  >
                    <title>
                      {`${r.label}${r.org ? ` — ${r.org}` : ""}\n${fmtMY(r.end)} — ${fmtMY(r.start)}`}
                    </title>
                  </rect>

                  {/* datas nas pontas (coerentes com o eixo invertido) */}
                  <text x={leftX} y={barY + 14} fontSize={10} fill="currentColor" opacity={0.55}>
                    {fmtMY(r.end)} {/* ESQ = recente */}
                  </text>
                  <text
                    x={rightX + 47}
                    y={barY + 14}
                    fontSize={10}
                    fill="currentColor"
                    opacity={0.55}
                    textAnchor="end"
                  >
                    {fmtMY(r.start)} {/* DIR = antigo */}
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
