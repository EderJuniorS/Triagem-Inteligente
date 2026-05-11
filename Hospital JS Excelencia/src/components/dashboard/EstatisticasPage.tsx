import { useState } from "react";
import { BarChart3, TrendingDown, Scale, Activity, ChevronDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

// 30-day glycemia data (mg/dL) – realistic fluctuation
const glycemiaData = [
  { label: "01/Out", value: 118 },
  { label: "02/Out", value: 124 },
  { label: "03/Out", value: 110 },
  { label: "04/Out", value: 132 },
  { label: "05/Out", value: 121 },
  { label: "06/Out", value: 108 },
  { label: "07/Out", value: 115 },
  { label: "08/Out", value: 128 },
  { label: "09/Out", value: 119 },
  { label: "10/Out", value: 136 },
  { label: "11/Out", value: 112 },
  { label: "12/Out", value: 105 },
  { label: "13/Out", value: 122 },
  { label: "14/Out", value: 130 },
  { label: "15/Out", value: 117 },
  { label: "16/Out", value: 109 },
  { label: "17/Out", value: 125 },
  { label: "18/Out", value: 138 },
  { label: "19/Out", value: 114 },
  { label: "20/Out", value: 107 },
  { label: "21/Out", value: 120 },
  { label: "22/Out", value: 116 },
  { label: "23/Out", value: 128 },
  { label: "24/Out", value: 111 },
  { label: "25/Out", value: 103 },
  { label: "26/Out", value: 118 },
  { label: "27/Out", value: 122 },
  { label: "28/Out", value: 115 },
  { label: "29/Out", value: 108 },
  { label: "30/Out", value: 112 },
];
const xAxisLabels = ["01/Out", "05/Out", "10/Out", "15/Out", "20/Out", "25/Out", "30/Out"];

// Blood pressure readings (last 5)
const bpReadings = [
  { label: "06/Out", systolic: 128, diastolic: 82 },
  { label: "12/Out", systolic: 122, diastolic: 78 },
  { label: "18/Out", systolic: 135, diastolic: 86 },
  { label: "24/Out", systolic: 118, diastolic: 75 },
  { label: "30/Out", systolic: 120, diastolic: 80 },
];

// Weight trend (10 points)
const weightData = [
  { label: "01/Out", value: 80.2 },
  { label: "05/Out", value: 79.8 },
  { label: "10/Out", value: 79.5 },
  { label: "15/Out", value: 79.1 },
  { label: "20/Out", value: 78.8 },
  { label: "25/Out", value: 78.4 },
  { label: "30/Out", value: 78.0 },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function norm(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

// Build SVG polyline points string from array of {x, y} in 0-1 space
function toSvgPoints(
  data: number[],
  min: number,
  max: number,
  svgW: number,
  svgH: number,
  padX = 0,
  padY = 8
) {
  const w = svgW - padX * 2;
  const h = svgH - padY * 2;
  return data
    .map((v, i) => {
      const x = padX + (i / (data.length - 1)) * w;
      const y = padY + (1 - norm(v, min, max)) * h;
      return `${x},${y}`;
    })
    .join(" ");
}

function toAreaPath(
  data: number[],
  min: number,
  max: number,
  svgW: number,
  svgH: number,
  padX = 0,
  padY = 8
) {
  const w = svgW - padX * 2;
  const h = svgH - padY * 2;
  const pts = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * w;
    const y = padY + (1 - norm(v, min, max)) * h;
    return [x, y] as [number, number];
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area =
    `${line} L${pts[pts.length - 1][0]},${svgH} L${pts[0][0]},${svgH} Z`;
  return { line: pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" "), area };
}

// ─────────────────────────────────────────────────────────────
// SHARED CARD WRAPPER
// ─────────────────────────────────────────────────────────────

function Card({
  title,
  icon: Icon,
  kpi,
  kpiSub,
  kpiBadge,
  children,
  className = "",
}: {
  title: string;
  icon: React.ElementType;
  kpi: string;
  kpiSub: string;
  kpiBadge?: { label: string; color: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex flex-col gap-4 ${className}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
            <Icon size={14} className="text-white" strokeWidth={2.2} />
          </div>
          <h3 className="text-[13px] font-bold text-[#1E293B]">{title}</h3>
        </div>
        {kpiBadge && (
          <span
            className="text-[10px] font-bold rounded-full px-2.5 py-1"
            style={{ color: kpiBadge.color, background: `${kpiBadge.color}18`, border: `1px solid ${kpiBadge.color}33` }}
          >
            {kpiBadge.label}
          </span>
        )}
      </div>

      {/* KPI */}
      <div className="flex items-baseline gap-2">
        <span className="text-[22px] font-black text-[#1E293B] leading-none">{kpi}</span>
        <span className="text-[11px] text-[#94A3B8] font-medium">{kpiSub}</span>
      </div>

      {/* Chart slot */}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD 1 – Glycemia Area Chart (full width)
// ─────────────────────────────────────────────────────────────

function GlycemiaChart() {
  const SVG_W = 900;
  const SVG_H = 140;
  const PAD_X = 8;
  const PAD_Y = 12;
  const values = glycemiaData.map((d) => d.value);
  const MIN = 80;
  const MAX = 150;
  const yLabels = [140, 120, 100, 80];

  const { line, area } = toAreaPath(values, MIN, MAX, SVG_W, SVG_H, PAD_X, PAD_Y);

  // Find indices of xAxisLabels
  const xLabelPositions = xAxisLabels.map((lbl) => {
    const idx = glycemiaData.findIndex((d) => d.label === lbl);
    return { lbl, x: PAD_X + (idx / (values.length - 1)) * (SVG_W - PAD_X * 2) };
  });

  return (
    <div className="relative w-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-3 pr-1">
        {yLabels.map((v) => (
          <span key={v} className="text-[10px] text-[#94A3B8] leading-none w-8 text-right">
            {v}
          </span>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="pl-10 pr-1">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ height: 140 }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="glycGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </linearGradient>
            {/* Horizontal grid lines */}
          </defs>

          {/* Grid lines */}
          {yLabels.map((v) => {
            const y = PAD_Y + (1 - norm(v, MIN, MAX)) * (SVG_H - PAD_Y * 2);
            return (
              <line
                key={v}
                x1={PAD_X}
                y1={y}
                x2={SVG_W - PAD_X}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Target zone band (80-120 normal range) */}
          {(() => {
            const y1 = PAD_Y + (1 - norm(120, MIN, MAX)) * (SVG_H - PAD_Y * 2);
            const y2 = PAD_Y + (1 - norm(80, MIN, MAX)) * (SVG_H - PAD_Y * 2);
            return (
              <rect
                x={PAD_X}
                y={y1}
                width={SVG_W - PAD_X * 2}
                height={y2 - y1}
                fill="#2DD4BF"
                fillOpacity="0.04"
              />
            );
          })()}

          {/* Area fill */}
          <path d={area} fill="url(#glycGrad)" />

          {/* Line */}
          <path
            d={line}
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data dots at key points */}
          {[4, 9, 14, 19, 24, 29].map((idx) => {
            const v = values[idx];
            const x = PAD_X + (idx / (values.length - 1)) * (SVG_W - PAD_X * 2);
            const y = PAD_Y + (1 - norm(v, MIN, MAX)) * (SVG_H - PAD_Y * 2);
            return (
              <g key={idx}>
                <circle cx={x} cy={y} r="4" fill="white" stroke="#2DD4BF" strokeWidth="2" />
              </g>
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="relative" style={{ height: 20 }}>
          {xLabelPositions.map(({ lbl, x }) => (
            <span
              key={lbl}
              className="absolute text-[10px] text-[#94A3B8] -translate-x-1/2"
              style={{ left: `${(x / SVG_W) * 100}%` }}
            >
              {lbl}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-1 pl-10">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#2DD4BF] rounded-full" />
          <span className="text-[10px] text-[#94A3B8]">Glicemia (mg/dL)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 bg-[#2DD4BF] rounded-sm opacity-10" />
          <span className="text-[10px] text-[#94A3B8]">Zona normal (80–120)</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD 2 – Blood Pressure Bar Chart
// ─────────────────────────────────────────────────────────────

function BloodPressureChart() {
  const MAX_SYS = 160;
  return (
    <div className="w-full">
      {/* Bars */}
      <div className="flex items-end justify-between gap-3 h-[130px] px-1">
        {bpReadings.map((r) => {
          const sysH = (r.systolic / MAX_SYS) * 100;
          const diaH = (r.diastolic / MAX_SYS) * 100;
          return (
            <div key={r.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-1 h-[110px]">
                {/* Systolic bar */}
                <div
                  className="w-5 rounded-t-[6px] bg-gradient-to-t from-[#0EA5E9] to-[#2DD4BF] relative group cursor-pointer"
                  style={{ height: `${sysH}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E293B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap pointer-events-none">
                    {r.systolic}
                  </div>
                </div>
                {/* Diastolic bar */}
                <div
                  className="w-5 rounded-t-[6px] bg-[#A5F3FC] relative group cursor-pointer"
                  style={{ height: `${diaH}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E293B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap pointer-events-none">
                    {r.diastolic}
                  </div>
                </div>
              </div>
              <span className="text-[9px] text-[#94A3B8] font-medium">{r.label}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#0EA5E9] to-[#2DD4BF]" />
          <span className="text-[10px] text-[#94A3B8]">Sistólica</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#A5F3FC]" />
          <span className="text-[10px] text-[#94A3B8]">Diastólica</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD 3 – Weight & BMI
// ─────────────────────────────────────────────────────────────

function WeightBmiCard() {
  const SVG_W = 400;
  const SVG_H = 70;
  const values = weightData.map((d) => d.value);
  const MIN_W = 76;
  const MAX_W = 82;
  const { line, area } = toAreaPath(values, MIN_W, MAX_W, SVG_W, SVG_H, 4, 8);

  // BMI scale: underweight <18.5, normal 18.5-24.9, overweight 25-29.9, obese 30+
  // Map to 0-40 range for the gauge
  const bmi = 24.1;
  const bmiPercent = Math.min(100, ((bmi - 15) / (40 - 15)) * 100);
  const normalStart = ((18.5 - 15) / 25) * 100;
  const normalEnd = ((24.9 - 15) / 25) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Weight trend mini-chart ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-[#64748B]">Tendência de Peso</span>
          <div className="flex items-center gap-1 text-[#22C55E]">
            <TrendingDown size={12} strokeWidth={2.2} />
            <span className="text-[11px] font-bold">−2.2 kg</span>
          </div>
        </div>

        <div className="relative">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ height: 70 }}
            className="w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#weightGrad)" />
            <path
              d={line}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots */}
            {values.map((v, i) => {
              const x = 4 + (i / (values.length - 1)) * (SVG_W - 8);
              const y = 8 + (1 - norm(v, MIN_W, MAX_W)) * (SVG_H - 16);
              return <circle key={i} cx={x} cy={y} r="3" fill="white" stroke="#2DD4BF" strokeWidth="1.5" />;
            })}
          </svg>

          {/* Start/end labels */}
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#94A3B8]">01/Out · 80 kg</span>
            <span className="text-[10px] text-[#94A3B8]">30/Out · 78 kg</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#F1F5F9]" />

      {/* ── BMI Gauge ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#64748B]">Índice de Massa Corporal</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[18px] font-black text-[#1E293B]">{bmi}</span>
            <span className="text-[10px] font-semibold text-[#22C55E] bg-[#ECFDF5] border border-[#A7F3D0] rounded-full px-2 py-0.5">
              Peso Normal
            </span>
          </div>
        </div>

        {/* BMI spectrum bar */}
        <div className="relative">
          <div className="h-3 w-full rounded-full overflow-hidden flex">
            {/* Underweight */}
            <div className="h-full bg-[#BAE6FD]" style={{ width: `${normalStart}%` }} />
            {/* Normal - cyan highlight */}
            <div
              className="h-full bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] relative"
              style={{ width: `${normalEnd - normalStart}%` }}
            />
            {/* Overweight */}
            <div className="h-full bg-[#FDE68A]" style={{ width: "20%" }} />
            {/* Obese */}
            <div className="h-full bg-[#FECACA] flex-1" />
          </div>

          {/* Indicator needle */}
          <div
            className="absolute top-0 -translate-x-1/2"
            style={{ left: `${bmiPercent}%` }}
          >
            <div className="w-0.5 h-3 bg-[#1E293B] mx-auto" />
            <div className="w-2 h-2 bg-[#1E293B] rounded-full -mt-0.5 -translate-x-[3px]" />
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-1.5">
          {["15", "18.5", "24.9", "29.9", "40"].map((l) => (
            <span key={l} className="text-[9px] text-[#CBD5E1] font-medium">{l}</span>
          ))}
        </div>

        <div className="flex gap-3 mt-2 flex-wrap">
          {[
            { label: "Abaixo do peso", color: "#BAE6FD" },
            { label: "Normal", color: "#2DD4BF" },
            { label: "Sobrepeso", color: "#FDE68A" },
            { label: "Obeso", color: "#FECACA" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
              <span className="text-[9px] text-[#94A3B8]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function EstatisticasPage() {
  const [period, setPeriod] = useState("Últimos 30 dias");
  const [open, setOpen] = useState(false);
  const options = ["Últimos 7 dias", "Últimos 30 dias", "Últimos 90 dias", "Este Ano"];

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9]" />
            <h1 className="text-[26px] font-black text-[#1E293B] leading-tight tracking-tight">
              Estatísticas
            </h1>
          </div>
          <p className="text-[13px] text-[#94A3B8] pl-3 font-medium">
            Monitoramento contínuo e histórico de métricas vitais.
          </p>
        </div>

        {/* Period selector */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 text-[12px] font-semibold text-[#06B6D4] bg-[#E0F7FA] border border-[#A5F3FC] rounded-full px-4 py-2 hover:bg-[#CFFAFE] transition-colors duration-150"
          >
            <Activity size={13} strokeWidth={2} />
            {period}
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-1.5 bg-white border border-[#E2E8F0] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden z-30 w-44">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setPeriod(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-[12px] font-medium transition-colors duration-100 ${
                    opt === period
                      ? "text-[#06B6D4] bg-[#F0FDFE] font-semibold"
                      : "text-[#475569] hover:bg-[#F8FAFB]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="flex flex-col gap-5">

        {/* Row 1 — Full width glycemia card */}
        <Card
          title="Variação Glicêmica"
          icon={Activity}
          kpi="Média: 115 mg/dL"
          kpiSub="últimos 30 dias"
          kpiBadge={{ label: "Estável", color: "#059669" }}
        >
          <GlycemiaChart />
        </Card>

        {/* Row 2 — Two equal cards */}
        <div className="grid grid-cols-2 gap-5">

          <Card
            title="Pressão Arterial"
            icon={BarChart3}
            kpi="Média: 120/80"
            kpiSub="mmHg"
            kpiBadge={{ label: "Controlada", color: "#06B6D4" }}
          >
            <BloodPressureChart />
          </Card>

          <Card
            title="Peso e IMC"
            icon={Scale}
            kpi="78.0 kg"
            kpiSub="IMC 24.1 · Peso Normal"
            kpiBadge={{ label: "↓ −2.2 kg", color: "#059669" }}
          >
            <WeightBmiCard />
          </Card>

        </div>
      </div>
    </div>
  );
}
