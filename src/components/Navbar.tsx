import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCategory } from "../store/productSlice";
import { useAuth } from "../hooks/useAuth";
import { toggleCheckout } from "../store/productSlice";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = ["All", "Clothes", "Electronics", "Furniture", "Shoes"];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.nav
      className="bg-white shadow-md p-4 flex justify-between items-center w-full fixed top-0 left-0 z-10"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center">
        <Link to="/home" className="text-xl sm:text-2xl font-bold">
          E-Shop
        </Link>

        <div className="flex ml-5 justify-center items-center ">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className="px-2 py-1 text-gray-600 hover:text-blue-500 text-sm sm:text-base"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span>{user?.email}</span>
        <Link to="/orders" className="text-gray-600 hover:text-blue-500">
          My Orders
        </Link>
        <Link to="/account" className="text-gray-600 hover:text-blue-500">
          My Account
        </Link>
        <div
          className="cart flex items-center cursor-pointer"
          onClick={() => dispatch(toggleCheckout(true))}
        >
          <FaShoppingCart className="text-xl" />
          <motion.button className="ml-1">({cart.length})</motion.button>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
