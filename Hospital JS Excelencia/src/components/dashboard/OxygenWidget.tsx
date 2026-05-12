import { ArrowUp } from "lucide-react";

const miniBars = [30, 50, 70, 60, 80];

export default function OxygenWidget() {
  return (
    <div
      className="w-[152px] rounded-2xl p-4 flex-shrink-0"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#1E293B]">Nível de Oxigênio</span>
        <div className="flex items-center gap-0.5">
          <ArrowUp size={10} className="text-[#22C55E]" />
          <span className="text-[11px] font-semibold text-[#22C55E]">+1.2%</span>
        </div>
      </div>
      <div className="mb-3">
        <span className="text-[28px] font-bold text-[#1E293B]">95</span>
        <span className="text-lg font-normal text-[#64748B] ml-0.5">%</span>
      </div>
      <div className="flex items-end gap-1.5 h-8">
        {miniBars.map((h, i) => (
          <div
            key={i}
            className={`w-1 rounded-sm ${i % 2 === 0 ? "bg-[#A5F3FC]" : "bg-[#67E8F9]"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
