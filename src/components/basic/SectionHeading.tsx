import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className = '' }) => {
  return (
    <motion.h2
      className={`text-heading font-bold text-gray-800 mb-6 ${className}`}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.h2>
  );
};

export default React.memo(SectionHeading);