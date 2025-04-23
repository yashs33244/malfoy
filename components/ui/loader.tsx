"use client";

import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: "#03c76e",
            willChange: "transform, opacity",
            contain: "layout paint",
          }}
          initial={{ y: 0 }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
            // Use GPU acceleration for smoother animations
            type: "tween",
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
