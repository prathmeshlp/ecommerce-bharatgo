import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const cart = useSelector((state: RootState) => state.products.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Checkout successful! Thank you for your purchase.');
  };

  if (!user) return <div>Please log in to checkout.</div>;

  return (
    <motion.div
      className="container mx-auto p-4"
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
        Checkout
      </motion.h2>
      <motion.div
        className="bg-white p-4 rounded shadow"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold">Order Summary</h3>
        {cart.map(item => (
          <motion.div
            key={item.id}
            className="flex justify-between py-2"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </motion.div>
        ))}
        <div className="border-t mt-2 pt-2">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        </div>
        <motion.button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Complete Purchase
        </motion.button>
        <Link to="/cart" className="mt-2 text-blue-500 inline-block">
          Back to Cart
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Checkout;