import { ChevronRight } from "lucide-react";

const barData = [
  { height: 50, color: "bg-[#67E8F9]" },
  { height: 65, color: "bg-[#06B6D4]" },
  { height: 45, color: "bg-[#67E8F9]" },
  { height: 70, color: "bg-[#06B6D4]" },
  { height: 80, color: "bg-[#67E8F9]" },
  { height: 55, color: "bg-[#06B6D4]" },
  { height: 75, color: "bg-[#67E8F9]" },
  { height: 60, color: "bg-[#06B6D4]" },
  { height: 85, color: "bg-[#67E8F9]" },
  { height: 90, color: "bg-[#06B6D4]" },
  { height: 70, color: "bg-[#67E8F9]" },
  { height: 78, color: "bg-[#06B6D4]" },
  { height: 95, color: "bg-[#67E8F9]" },
  { height: 80, color: "bg-[#06B6D4]" },
  { height: 72, color: "bg-[#67E8F9]" },
  { height: 65, color: "bg-[#06B6D4]" },
  { height: 88, color: "bg-[#67E8F9]" },
  { height: 92, color: "bg-[#06B6D4]" },
  { height: 78, color: "bg-[#67E8F9]" },
  { height: 70, color: "bg-[#06B6D4]" },
  { height: 82, color: "bg-[#67E8F9]" },
  { height: 76, color: "bg-[#06B6D4]" },
  { height: 68, color: "bg-[#67E8F9]" },
  { height: 74, color: "bg-[#06B6D4]" },
  { height: 85, color: "bg-[#67E8F9]" },
];

const yAxisLabels = [120, 100, 80, 60];
const xAxisLabels = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

export default function HeartRateChart() {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#1E293B]">Frequência Cardíaca</h2>
        <button className="flex items-center gap-0.5 text-xs font-medium text-[#94A3B8] hover:text-[#06B6D4] transition-colors duration-150">
          Ver tendências
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="text-[28px] font-bold text-[#1E293B]">92</span>
        <p className="text-[11px] text-[#94A3B8] mt-0.5">bpm médio</p>
      </div>

      <div className="relative flex">
        <div className="flex flex-col justify-between h-[120px] pr-2">
          {yAxisLabels.map((val) => (
            <span key={val} className="text-[10px] text-[#94A3B8] leading-none">{val}</span>
          ))}
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {yAxisLabels.map((val, i) => (
              <div key={val} className={`w-full ${i === yAxisLabels.length - 1 ? "" : "border-b border-dashed border-[#E2E8F0]"}`} style={{ height: "0" }} />
            ))}
          </div>
          <div className="relative flex items-end gap-[5px] h-[120px] px-1">
            {barData.map((bar, i) => (
              <div
                key={i}
                className={`w-[6px] ${bar.color} rounded-t-[3px] transition-all duration-200 hover:opacity-80 cursor-pointer`}
                style={{ height: `${(bar.height / 120) * 100}%` }}
                title={`${Math.round(bar.height)} bpm`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2 pl-7">
        {xAxisLabels.map((label) => (
          <span key={label} className={`text-[10px] ${label === "12:00" ? "bg-[#E0F7FA] text-[#06B6D4] font-semibold rounded-full px-2.5 py-0.5" : "text-[#94A3B8]"}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
