import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  // const cart = useSelector((state: RootState) => state.products.cart);
  const orders = useSelector((state: RootState) => state.products.orders);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Simulated orders (since no backend persists orders)
  // const orders: Order[] = [
  //   {
  //     id: 1,
  //     date: '2025-04-27',
  //     items: cart.map(item => ({
  //       id: item.id,
  //       title: item.title,
  //       price: item.price,
  //       quantity: item.quantity,
  //       image: item.images[0],
  //     })),
  //     totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
  //     totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  //   },
  // ];

  if (!user) return <div>Please log in to view your orders.</div>;

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
        My Orders
      </motion.h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <motion.div
            key={order.id}
            className="bg-white p-4 rounded shadow mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div>
                <p className="font-semibold">Order Date: {order.date}</p>
                <p>Total Items: {order.totalItems}</p>
                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
              </div>
              <motion.div
                animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.div>
            </div>
            {expandedOrder === order.id && (
              <motion.div
                className="mt-4"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {order.items.map(item => (
                  <motion.div
                    key={item.id}
                    className="flex items-center py-2 border-t"
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default MyOrders;