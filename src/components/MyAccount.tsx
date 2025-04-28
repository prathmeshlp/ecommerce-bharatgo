import React from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const MyAccount: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <div>Please log in to view your account.</div>;

  return (
    <motion.div
      className="container mx-auto p-4 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        My Account
      </motion.h2>
      <motion.div
        className="bg-white p-4 rounded shadow"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>User ID:</strong> {user.uid}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MyAccount;
