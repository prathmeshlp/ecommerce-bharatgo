import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateCartQuantity, removeFromCart } from '../store/productSlice';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.products.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) return <div>Please log in to view your cart.</div>;

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
        Shopping Cart
      </motion.h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <motion.div
              key={item.id}
              className="flex items-center border-b py-4"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e =>
                    dispatch(
                      updateCartQuantity({ productId: item.id, quantity: parseInt(e.target.value) })
                    )
                  }
                  className="w-16 p-1 border rounded"
                />
                <motion.button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="mt-4"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;