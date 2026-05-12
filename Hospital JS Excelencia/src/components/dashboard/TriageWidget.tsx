import { AlertCircle, Activity } from "lucide-react";

export default function TriageWidget() {
  const progress = 85;

  return (
    <div className="rounded-[20px] bg-white border border-[#E2E8F0] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#1E293B]">Status da Triagem Inteligente</h3>
        <Activity size={16} className="text-[#06B6D4]" strokeWidth={2} />
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-[#94A3B8] font-medium">Progresso da análise</span>
          <span className="text-[12px] font-bold text-[#06B6D4]">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-[#E0F7FA] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Subtext */}
      <p className="text-[11px] text-[#64748B] mb-4 leading-relaxed">
        Análise de sintomas em andamento. Aguardando liberação médica.
      </p>

      {/* Badge */}
      <div className="flex items-center gap-2 bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] px-3 py-2 w-fit">
        <AlertCircle size={13} className="text-[#F59E0B] flex-shrink-0" strokeWidth={2} />
        <span className="text-[11px] font-semibold text-[#92400E]">Prioridade: Normal</span>
      </div>
    </div>
  );
}
