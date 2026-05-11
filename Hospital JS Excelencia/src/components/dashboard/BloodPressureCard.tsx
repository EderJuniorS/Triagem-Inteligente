export default function BloodPressureCard() {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] p-5 text-white">
      <svg className="absolute bottom-4 left-0 w-full opacity-[0.15]" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
        <path d="M0 20 Q25 5, 50 20 T100 20 T150 20 T200 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="relative z-10 flex items-start justify-between">
        <span className="text-[11px] font-medium opacity-90">mmHg</span>
        <span className="text-[11px] font-semibold bg-white/20 rounded-md px-2 py-0.5">+ 0.4%</span>
      </div>
      <div className="relative z-10 mt-1">
        <span className="text-xs font-medium opacity-90">Pressão Arterial</span>
      </div>
      <div className="relative z-10 mt-4">
        <span className="text-[32px] font-bold">80</span>
        <span className="text-[32px] font-normal mx-1 opacity-80">/</span>
        <span className="text-[32px] font-bold">120</span>
      </div>
    </div>
  );
}
