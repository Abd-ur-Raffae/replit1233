import { motion } from "framer-motion";

export default function FloatingShapes() {
  return (
    <div className="absolute w-full h-full overflow-hidden pointer-events-none">
      <motion.div
        className="floating-shape"
        animate={{
          y: [0, -20, -40, -20, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "80px",
          height: "80px",
          top: "10%",
          left: "10%",
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="floating-shape"
        animate={{
          y: [0, -20, -40, -20, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          width: "120px",
          height: "120px",
          top: "60%",
          right: "15%",
          transform: "rotate(45deg)",
        }}
      />
      <motion.div
        className="floating-shape"
        animate={{
          y: [0, -20, -40, -20, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
        style={{
          width: "60px",
          height: "60px",
          bottom: "20%",
          left: "20%",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />
    </div>
  );
}
