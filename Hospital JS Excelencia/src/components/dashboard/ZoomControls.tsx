import { motion } from "framer-motion";
import { Minus, Plus, MoveHorizontal } from "lucide-react";

const buttons = [
  { icon: Minus, size: 40 },
  { icon: MoveHorizontal, size: 48 },
  { icon: Plus, size: 40 },
];

export default function ZoomControls() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
      {buttons.map(({ icon: Icon, size }, i) => (
        <motion.button
          key={i}
          className="flex items-center justify-center rounded-full bg-white border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-pointer"
          style={{ width: size, height: size }}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            size={i === 1 ? 18 : 16}
            className="text-[#64748B]"
            strokeWidth={1.5}
          />
        </motion.button>
      ))}
    </div>
  );
}
