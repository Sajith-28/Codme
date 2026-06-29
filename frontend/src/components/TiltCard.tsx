import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
