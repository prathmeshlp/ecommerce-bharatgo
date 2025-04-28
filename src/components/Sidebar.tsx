import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  toggleSidebar,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  createOrder,
} from "../store/productSlice";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, cart, showCheckout, isSidebarOpen } = useSelector(
    (state: RootState) => state.products
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log(isSidebarOpen);

  return (
    <motion.div
      className={`w-96 bg-white shadow-md p-4 min-h-full fixed top-[4.563rem] overflow-y-scroll ${
        isSidebarOpen ? "right-0" : "-right-96"
      }`}
      animate={{ x: isSidebarOpen ? 0 : 200 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="absolute top-4 right-4 text-gray-600"
        onClick={() => dispatch(toggleSidebar(false))}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTimes size={20} />
      </motion.button>
      {selectedProduct && !showCheckout ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center mt-10"
        >
          <h1 className="text-xl font-extrabold">Details</h1>
          <img
            src={selectedProduct.images[0]}
            alt={selectedProduct.title}
            className="w-56 h-full object-cover rounded-lg mt-10"
          />
          <p className="font-medium text-2xl mb-2 mt-2">
            ${selectedProduct.price}
          </p>
          <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.title}</h2>
            <p className="mb-4">{selectedProduct.description}</p>
          </div>
          {/* <motion.button
            onClick={() => dispatch(addToCart(selectedProduct))}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cart.some((item) => item.id === selectedProduct.id) ? (
              <FaCheck className="mr-2" />
            ) : (
              <FaPlus className="mr-2" />
            )}
            Add to Cart
          </motion.button> */}
        </motion.div>
      ) : showCheckout ? (
        <>
         
          <h2 className="text-xl font-bold">Cart</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="cart w-full h-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
          >
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="flex flex-col items-start justify-center mt-10">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center justify-center mb-4 "
                      initial={{ x: -50 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-balance">{item.title}</p>
                        <p>${item.price}</p>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateCartQuantity({
                                productId: item.id,
                                quantity: parseInt(e.target.value),
                              })
                            )
                          }
                          className="w-16 text-center border rounded"
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
                  <p className="text-lg font-bold">
                    Total: ${total.toFixed(2)}
                  </p>
                </div>
                <motion.button
                  onClick={() => {
                    alert("Checkout successful! Thank you for your purchase.");
                    dispatch(createOrder());
                    dispatch(toggleSidebar(false));
                    dispatch(clearCart());
                    navigate("/home");
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Complete Purchase
                </motion.button>
              </>
            )}
          </motion.div>
        </>
      ) : (
        <p>Select a product or add to cart to view details.</p>
      )}
    </motion.div>
  );
};

export default Sidebar;
