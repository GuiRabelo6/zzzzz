import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-km-cream flex flex-col items-center justify-center text-center px-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 uppercase"
      >
        Monólogos Silenciosos
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl md:text-2xl font-serif italic text-km-maroon"
      >
        "O que temos em comum é a espera."
      </motion.p>
    </motion.div>
  );
}
