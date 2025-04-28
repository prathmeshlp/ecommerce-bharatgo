import React from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "none";
  className?: string;
  ariaLabel?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  type = "button",
  children,
  color = "none",
  className = "",
  ariaLabel,
}) => {
  const colorClasses = {
    none: "",
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`text-white ${colorClasses[color]} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

export default React.memo(PrimaryButton);
