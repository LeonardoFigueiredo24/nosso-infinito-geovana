'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .07 }}
    transition={{ duration: reduced ? 0 : .6, delay }}>
    {children}
  </motion.div>;
}
