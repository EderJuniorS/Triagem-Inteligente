export default function TemperatureCard() {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] p-5 text-white">
      <svg
        className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-[0.15]"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 6" strokeLinecap="round" />
      </svg>
      <div className="relative z-10 flex items-start justify-between">
        <span className="text-xs font-medium opacity-90">Temperatura</span>
        <span className="text-[11px] font-semibold bg-white/20 rounded-md px-2 py-0.5">+ 1.4%</span>
      </div>
      <div className="relative z-10 mt-8">
        <span className="text-4xl font-bold">36,6°</span>
      </div>
    </div>
  );
}
