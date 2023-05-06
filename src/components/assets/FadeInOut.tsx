import { motion } from "framer-motion";
import React from "react";

export interface Props {
  children: React.ReactNode;
  duration?: number;
}

const FadeInOut: React.FC<Props> = ({ children, duration = 0.4 }) => {
  return (
    <motion.section
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, height: "auto" },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{
        duration,
      }}
      className="overflow-hidden"
    >
      {children}
    </motion.section>
  );
};

export default FadeInOut;
