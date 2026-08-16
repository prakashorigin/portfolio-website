"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PortfolioIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        setIsVisible(false);
      },
      prefersReducedMotion ? 0 : 1400,
    );

    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#09090b]"
          aria-label="Loading portfolio"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-sm uppercase tracking-[0.35em] text-purple-300"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="keep-white mt-3 text-4xl font-bold text-white sm:text-6xl"
            >
              Prakash <span className="gradient-text">Sharma</span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.9, ease: "easeInOut" }}
              className="mx-auto mt-8 h-1 w-40 origin-left rounded-full bg-gradient-to-r from-purple-600 to-cyan-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
