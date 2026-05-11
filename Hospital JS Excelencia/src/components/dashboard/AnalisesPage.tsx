import { Brain, CheckCircle2, AlertTriangle, Sparkles, CalendarPlus } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

function ActionItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-[14px] bg-[#F8FAFB] border border-[#F1F5F9] hover:border-[#A5F3FC] transition-colors duration-150 group">
      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.35)] transition-shadow">
        <CheckCircle2 size={12} className="text-white" strokeWidth={2.5} />
      </div>
      <p className="text-[12.5px] text-[#475569] leading-relaxed">{text}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD 1 — Status Geral (full width)
// ─────────────────────────────────────────────────────────────

function StatusGeralCard() {
  const score = 92;

  return (
    <div
      className="relative overflow-hidden rounded-[20px] border border-[#E0F7FA] p-7"
      style={{
        background:
          "linear-gradient(135deg, rgba(240,253,255,1) 0%, rgba(224,247,250,0.6) 50%, rgba(240,253,255,1) 100%)",
        boxShadow: "0 4px 24px rgba(6,182,212,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Background decorative circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#2DD4BF] opacity-[0.06] pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-[#0EA5E9] opacity-[0.05] pointer-events-none" />

      <div className="relative flex items-center gap-6">
        {/* Glowing brain icon */}
        <div className="relative flex-shrink-0">
          <div
            className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] blur-[14px] opacity-40"
          />
          <div className="relative w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center shadow-lg">
            <Brain size={28} className="text-white" strokeWidth={1.8} />
          </div>
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest">
              IA do Hospital JS Excelência
            </span>
            <Sparkles size={11} className="text-[#06B6D4]" strokeWidth={2} />
          </div>
          <p className="text-[14px] text-[#334155] leading-relaxed">
            Seus parâmetros de saúde estão{" "}
            <span className="font-bold text-[#0EA5E9]">92% dentro da meta</span>{" "}
            estabelecida. A Triagem Inteligente não detectou anomalias críticas nos
            exames recentes.
          </p>
        </div>

        {/* Score ring */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              {/* Track */}
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="#E0F7FA"
                strokeWidth="7"
              />
              {/* Progress */}
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - score / 100)}`}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[20px] font-black text-[#1E293B] leading-none">{score}%</span>
            </div>
          </div>
          <span className="text-[10px] text-[#94A3B8] font-medium text-center leading-tight">
            Score de<br />Saúde Geral
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD 2 — Plano de Ação (2/3 width)
// ─────────────────────────────────────────────────────────────

function PlanoAcaoCard() {
  const actions = [
    "Com base na sua variação glicêmica (estável), sugerimos manter a dieta atual, mas aumentar a ingestão hídrica para 2.5L diários.",
    "Sua pressão arterial manteve-se controlada. Continue com a medicação no horário exato.",
  ];

  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-[#1E293B]">Plano de Ação Sugerido</h3>
          <p className="text-[10px] text-[#94A3B8] font-medium">Recomendações Preventivas</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#F1F5F9]" />

      {/* Action items */}
      <div className="flex flex-col gap-3">
        {actions.map((action, i) => (
          <ActionItem key={i} text={action} />
        ))}
      </div>

      {/* Footer badge */}
      <div className="pt-1 flex items-center gap-2">
        <Sparkles size={12} className="text-[#06B6D4]" strokeWidth={2} />
        <span className="text-[10px] text-[#94A3B8] font-medium italic">
          Gerado pela IA clínica com base nos seus últimos 30 dias de dados.
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD 3 — Alerta Focado (1/3 width)
// ─────────────────────────────────────────────────────────────

function AlertaFocadoCard() {
  return (
    <div
      className="rounded-[20px] border border-[#FDE68A] p-6 flex flex-col gap-4 shadow-[0_4px_24px_rgba(245,158,11,0.08)]"
      style={{
        background:
          "linear-gradient(160deg, #FFFDF0 0%, #FFFBEB 60%, #FFF8E1 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-sm">
          <AlertTriangle size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-[#92400E]">Ponto de Atenção</h3>
          <p className="text-[10px] text-[#B45309] font-medium opacity-80">Observação Clínica</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#FDE68A]" />

      {/* Warning icon + text */}
      <div className="flex flex-col gap-3">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{ background: "rgba(245,158,11,0.12)" }}
        >
          <AlertTriangle size={22} className="text-[#F59E0B]" strokeWidth={1.8} />
        </div>
        <p className="text-[12.5px] text-[#78350F] leading-relaxed">
          Notamos uma leve irregularidade no seu sono relatado. Considere agendar
          uma polissonografia caso o cansaço persista.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-2">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#EF8C0A] text-white text-[12px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all duration-150">
          <CalendarPlus size={13} strokeWidth={2.2} />
          Agendar Exame
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function AnalisesPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9]" />
          <h1 className="text-[26px] font-black text-[#1E293B] leading-tight tracking-tight">
            Triagem Inteligente & Análises
          </h1>
        </div>
        <p className="text-[13px] text-[#94A3B8] pl-3 font-medium">
          Insights gerados por IA baseados no seu histórico clínico.
        </p>
      </div>

      {/* ── Grid Layout ── */}
      <div className="flex flex-col gap-5">

        {/* Row 1 — Full width status card */}
        <StatusGeralCard />

        {/* Row 2 — 2/3 + 1/3 */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "2fr 1fr" }}>
          <PlanoAcaoCard />
          <AlertaFocadoCard />
        </div>

      </div>
    </div>
  );
}
