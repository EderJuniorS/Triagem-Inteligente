import { motion } from "framer-motion";

interface PulseDotProps {
  top: string;
  left: string;
}

export default function PulseDot({ top, left }: PulseDotProps) {
  return (
    <motion.div
      className="absolute w-3 h-3 bg-[#06B6D4] rounded-full z-10"
      style={{
        top,
        left,
        boxShadow: "0 0 12px rgba(6,182,212,0.5)",
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [1, 0.6, 1],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
}
