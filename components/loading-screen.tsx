"use client";

import React, { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./ui/loader";
import Image from "next/image";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  // Use a local state to prevent hydration issues
  const [clientLoading, setClientLoading] = useState(true);

  useLayoutEffect(() => {
    setClientLoading(isLoading);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {clientLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm"
          style={{
            contain: "content",
            willChange: "opacity",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: "easeInOut",
            },
          }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-24 h-24 relative overflow-hidden">
                <img
                  src="https://ysingla.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fe12b42ac-4e54-476f-a4f5-7d6bdb1e61e2%2F714beba9-2afc-440e-b1c8-8d95f9c03bda%2Fproductnerd_a_modern_logo_for_a_company_called_greenmind_that_2b7c439c-f8f7-48bc-8446-0d129b699a3f_2-removebg-preview.png?table=block&id=1cfe6255-f338-81c4-9a65-c21f3b88d852&spaceId=e6b92090-480d-4e79-a4a6-82eca60a06b3&width=250&userId=&cache=v2"
                  alt="Malfoy Logo"
                  className="w-24 h-24 object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ willChange: "opacity" }}
            >
              <Loader />
            </motion.div>
            <motion.p
              className="mt-1 text-sm text-gray-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ willChange: "opacity" }}
            >
              Loading amazing stuff...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
