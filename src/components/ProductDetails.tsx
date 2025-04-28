import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, setSelectedProduct } from '../store/productSlice';
import { useAuth } from '../hooks/useAuth';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductDetails: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { products, cart } = useSelector((state: RootState) => state.products);
  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product || !user) return <div>Loading...</div>;

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/home" className="mb-4 text-blue-500">
          Back to Home
        </Link>
      </motion.div>
      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-cover"
          onClick={() => dispatch(setSelectedProduct(product))}
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600 my-2">${product.price}</p>
          <p>{product.description}</p>
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <motion.button
            onClick={() => dispatch(addToCart(product))}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cart.some(item => item.id === product.id) ? (
              <FaCheck className="mr-2" />
            ) : (
              <FaPlus className="mr-2" />
            )}
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;