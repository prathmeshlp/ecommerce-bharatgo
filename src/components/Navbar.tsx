import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCategory } from "../store/productSlice";
import { useAuth } from "../hooks/useAuth";
import { toggleCheckout } from "../store/productSlice";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import DropdownMenu from "./DropdownMenu";
import PrimaryButton from "./PrimaryButton";
import Card from "./Card";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = ["All", "Clothes", "Electronics", "Furniture", "Shoes"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className="bg-white px-4 py-3 fixed top-0 left-0 w-containerLarge h-navBarHeight z-10"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/home"
            className="text-xl sm:text-2xl font-bold text-gray-800"
          >
            E-Shop
          </Link>
          <div className="hidden sm:flex space-x-2">
            {categories.map((cat) => (
              <span
                key={cat}
                onClick={() => dispatch(setCategory(cat))}
                className="px-2 py-1 text-gray-600 text-sm sm:text-base cursor-pointer hover:bg-gray-200 rounded transition-colors"
             
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          {user && (
            <span className="text-gray-600 text-sm truncate max-w-[150px]">
              {user.email}
            </span>
          )}
          <Card
            className="flex items-center cursor-pointer"
            onClick={() => dispatch(toggleCheckout(true))}
            aria-label="View cart"
          >
            <FaShoppingCart className="text-lg text-gray-600" />
            <span className="ml-1 text-gray-600">({cart.length})</span>
          </Card>
          <Link
            to="/orders"
           className="px-2 py-1 text-gray-600 text-sm sm:text-base cursor-pointer hover:bg-gray-200 rounded transition-colors"
          >
            My Orders
          </Link>
          <Link
            to="/account"
            className="px-2 py-1 text-gray-600 text-sm sm:text-base cursor-pointer hover:bg-gray-200 rounded transition-colors"
          >
            My Account
          </Link>
          {user ? (
            <PrimaryButton
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </PrimaryButton>
          ) : (
            <Link
              to="/"
            className="px-2 py-1 text-gray-600 text-sm sm:text-base cursor-pointer hover:bg-gray-200 rounded transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        <PrimaryButton
          className="sm:hidden text-gray-600"
          onClick={toggleMenu}
          ariaLabel={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </PrimaryButton>

        <DropdownMenu
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          user={user}
          cartLength={cart.length}
          handleLogout={handleLogout}
        />
      </div>
    </motion.nav>
  );
};

export default React.memo(Navbar);
