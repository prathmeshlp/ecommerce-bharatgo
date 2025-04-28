import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  ariaLabel?: string;
  onClick?: () => void;
  animate?: {
    rotate?: number;
    height?: string;
    x?: number | string;
    opacity?: number;
    y?: number;
    scale?: number;
  };
  ariaHidden?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  ariaLabel,
  onClick,
  animate,
  ariaHidden
}) => {
  //   const paddingClasses = {
  //     sm: "p-4",
  //     md: "p-card",
  //     lg: "p-8 sm:p-10",
  //   };

  return (
    <motion.div
      className={`${className}`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: -10 }}
      aria-label={ariaLabel}
      onClick={onClick}
      style={animate}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(Card);
