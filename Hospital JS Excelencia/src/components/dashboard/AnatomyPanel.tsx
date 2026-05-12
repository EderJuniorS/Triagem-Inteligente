import PulseDot from "./PulseDot";
import OxygenWidget from "./OxygenWidget";
import ZoomControls from "./ZoomControls";

const pulseDots = [
  { top: "28%", left: "62%" },
  { top: "52%", left: "30%" },
  { top: "68%", left: "58%" },
  { top: "42%", left: "68%" },
];

export default function AnatomyPanel() {
  return (
    <div
      className="w-[340px] flex-shrink-0 relative overflow-hidden rounded-r-[0px]"
      style={{
        background: "linear-gradient(180deg, #E8F4F8 0%, #D0EBF4 50%, #B8E0F0 100%)",
      }}
    >
      {/* Layout: Oxygen widget on left, body model on right */}
      <div className="absolute inset-0 flex items-center">
        {/* Left column: Oxygen widget */}
        <div className="flex flex-col items-start justify-center pl-4 z-20" style={{ width: "168px" }}>
          <OxygenWidget />
        </div>

        {/* Right column: Body model */}
        <div className="flex-1 flex items-center justify-center h-full">
          <img
            src="/body-model.png"
            alt="Modelo Corporal 3D"
            className="h-[75%] object-contain opacity-90"
          />
        </div>
      </div>

      {/* Pulse Dots — positioned relative to full panel */}
      {pulseDots.map((dot, i) => (
        <PulseDot key={i} {...dot} />
      ))}

      {/* Zoom Controls */}
      <ZoomControls />
    </div>
  );
}
