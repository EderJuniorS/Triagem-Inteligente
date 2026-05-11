import { motion } from "framer-motion";

export default function ScanRing() {
  return (
    <motion.div
      className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <motion.svg
        width="200"
        height="70"
        viewBox="0 0 200 70"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <ellipse
          cx="100"
          cy="35"
          rx="90"
          ry="28"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="2"
        />
      </motion.svg>
    </motion.div>
  );
}
