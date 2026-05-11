import { ArrowUp } from "lucide-react";

export default function BloodSugarCard() {
  return (
    <div className="rounded-[20px] bg-white border border-[#E2E8F0] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-medium text-[#94A3B8]">mg / dL</span>
        <div className="flex items-center gap-1">
          <ArrowUp size={12} className="text-[#EF4444]" />
          <span className="text-[11px] font-medium text-[#EF4444]">+ 2.1%</span>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-xs font-medium text-[#1E293B]">Glicemia</span>
      </div>
      <div className="mt-4">
        <span className="text-[32px] font-bold text-[#1E293B]">120</span>
        <span className="text-[32px] font-normal text-[#64748B] mx-1">/</span>
        <span className="text-[32px] font-bold text-[#1E293B]">160</span>
      </div>
    </div>
  );
}
