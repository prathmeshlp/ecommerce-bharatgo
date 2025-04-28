import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleCheckout } from "../store/productSlice";
import { FaShoppingCart } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";
import PrimaryButton from "./PrimaryButton";

// DropdownMenu component for small screens
const DropdownMenu: React.FC<{
  isOpen: boolean;
  toggleMenu: () => void;
  user: { email: string | null } | null;
  cartLength: number;
  handleLogout: () => Promise<void>;
}> = ({ isOpen, toggleMenu, user, cartLength, handleLogout }) => {
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {isOpen && (
        <Card className="absolute top-16 right-0 w-full bg-white shadow-lg rounded-b-lg z-20 sm:hidden">
          <div className="flex flex-col items-center p-4 space-y-4">
            {user && (
              <span className="text-gray-600 text-sm">{user.email}</span>
            )}
            <Card
              className="flex items-center cursor-pointer"
              onClick={() => {
                dispatch(toggleCheckout(true));
                toggleMenu();
              }}
            >
              <FaShoppingCart className="text-lg" />
              <span className="ml-1 text-gray-600">({cartLength})</span>
            </Card>
            <Link
              to="/orders"
              className="text-gray-600 hover:text-blue-500 text-sm"
              onClick={toggleMenu}
            >
              My Orders
            </Link>
            <Link
              to="/account"
              className="text-gray-600 hover:text-blue-500 text-sm"
              onClick={toggleMenu}
            >
              My Account
            </Link>
            {user ? (
              <PrimaryButton
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm"
         
              >
                Logout
              </PrimaryButton>
            ) : (
              <Link
                to="/"
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </Card>
      )}
    </AnimatePresence>
  );
};

export default memo(DropdownMenu);
