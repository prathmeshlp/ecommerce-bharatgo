import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  toggleSidebar,
  updateCartQuantity,
  removeFromCart,
  createOrder,
  clearCart,
} from "../store/productSlice";
import { IoCloseSharp } from "react-icons/io5";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import SectionHeading from "./SectionHeading";
import Input from "./Input";
import Card from "./Card";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, cart, showCheckout, isSidebarOpen } = useSelector(
    (state: RootState) => state.products
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card
      className={`w-full sm:w-96 bg-white shadow-lg p-4 sm:p-6 fixed top-16 right-0 h-[calc(100vh-4rem)] overflow-y-auto transition-transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      animate={{ x: isSidebarOpen ? 0 : "100%" }}
      
      aria-hidden={!isSidebarOpen}
    >
      <PrimaryButton
        className="absolute top-4 right-6  "
        onClick={() => dispatch(toggleSidebar(false))}
        ariaLabel="Close sidebar"
        
      >
        <IoCloseSharp size={24} color="black"/>
      </PrimaryButton>
      {selectedProduct && !showCheckout ? (
        <Card
         
          animate={{ opacity: 1 }}
        
          className="flex flex-col items-center mt-8 sm:mt-10"
        >
          <SectionHeading className="text-lg sm:text-xl font-extrabold text-gray-800">
            Details
          </SectionHeading>
          <img
            src={selectedProduct.images[0]}
            alt={selectedProduct.title}
            className="w-48 sm:w-56 h-48 sm:h-64 object-cover rounded-lg mt-6 sm:mt-10"
          />
          <p className="font-medium text-xl sm:text-2xl text-gray-700 mt-2 mb-2">
            ${selectedProduct.price}
          </p>
          <div className="flex flex-col items-center p-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              {selectedProduct.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {selectedProduct.description}
            </p>
          </div>
        </Card>
      ) : showCheckout ? (
        <motion.div
         
          animate={{ opacity: 1 }}
         
          className="flex flex-col h-full"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center mt-6">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col mt-6 sm:mt-10">
              {cart.map((item) => (
                <Card
                  key={item.id}
                  className="flex items-center mb-4"
                
                  animate={{ x: 0 }}
                 
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                      {item.title}
                    </p>
                    <p className="text-gray-600 text-sm">${item.price}</p>
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateCartQuantity({
                            productId: item.id,
                            quantity: parseInt(e.target.value) || 1,
                          })
                        )
                      }
                      className="w-16 p-1 text-center border rounded text-sm mt-1"
                      ariaLabel={`Quantity for ${item.title}`}
                    />
                    <PrimaryButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-4 rounded px-1"
                      color="red"
                      ariaLabel={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </PrimaryButton>
                  </div>
                </Card>
              ))}
              <p className="text-base sm:text-lg font-bold text-gray-800 mt-4">
                Total: ${total.toFixed(2)}
              </p>
              <PrimaryButton
                onClick={() => {
                  alert("Checkout successful! Thank you for your purchase.");
                  dispatch(createOrder());
                  dispatch(toggleSidebar(false));
                  dispatch(clearCart());
                  navigate("/home");
                }}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
                ariaLabel="Complete purchase"
              >
                Complete Purchase
              </PrimaryButton>
            </div>
          )}
        </motion.div>
      ) : (
        <p className="text-gray-600 text-center mt-6">
          Select a product or add to cart to view details.
        </p>
      )}
    </Card>
  );
};

export default React.memo(Sidebar);
