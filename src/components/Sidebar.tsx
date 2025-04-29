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
import { IoAdd, IoCloseSharp, IoRemove } from "react-icons/io5";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "./basic/Button";
import SectionHeading from "./basic/SectionHeading";
import Input from "./basic/Input";
import Card from "./basic/Card";
import Image from "./basic/Image";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, cart, showCheckout, isSidebarOpen } = useSelector(
    (state: RootState) => state.products
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrement = (productId: number, currentQuantity: number) => {
    dispatch(updateCartQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartQuantity({ productId, quantity: currentQuantity - 1 })
      );
    }
  };

  return (
    <Card
      className={`sm:w-96 w-full p-2 bg-white shadow-lg fixed top-20 right-0 h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden transition-transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      animate={{ x: isSidebarOpen ? 0 : "100%" }}
      ariaHidden={!isSidebarOpen}
    >
      <Button
        className="absolute top-4 right-6 cursor-pointer z-10"
        onClick={() => dispatch(toggleSidebar(false))}
        ariaLabel="Close sidebar"
      >
        <IoCloseSharp size={24} color="black" />
      </Button>
      {selectedProduct && !showCheckout ? (
        <Card
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-4"
        >
          <SectionHeading className="text-lg sm:text-xl font-extrabold text-gray-800">
            Details
          </SectionHeading>
          <div className="product-details flex flex-col items-center justify-center">
            <Image
              src={selectedProduct.images[0]}
              alt={selectedProduct.title}
              className="w-48 sm:w-56 h-48 sm:h-64 object-cover rounded-lg mt-6 sm:mt-8"
            />
            <p className="font-medium text-xl sm:text-2xl text-gray-700 mt-2 mb-2">
              ${selectedProduct.price}
            </p>
            <div className="flex flex-col items-center p-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
                {selectedProduct.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
                {selectedProduct.description}
              </p>
            </div>
          </div>
        </Card>
      ) : showCheckout ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="flex flex-col h-[calc(100vh-5rem)] p-4 relative border-2 overflow-y-scroll overflow-x-hidden"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
            Cart
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center mt-6">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col justify-between h-full mt-6 sm:mt-10">
              <div className="cart-details">
                {cart.map((item) => (
                  <Card
                    key={item.id}
                    className="flex items-center mb-4 w-full"
                    animate={{ x: 0 }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-4"
                    />
                    <div className="flex flex-col items-start justify-start">
                      <p className=" text-sm font-light text-gray-800 text-wrap ">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            handleDecrement(item.id, item.quantity)
                          }
                          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          ariaLabel={`Decrement quantity for ${item.title}`}
                        >
                          <IoRemove size={16} />
                        </Button>
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
                          className="w-12 h-8 text-center border border-gray-300 rounded text-responsive"
                          ariaLabel={`Quantity for ${item.title}`}
                        />
                        <Button
                          onClick={() =>
                            handleIncrement(item.id, item.quantity)
                          }
                          className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                          ariaLabel={`Increment quantity for ${item.title}`}
                        >
                          <IoAdd size={16} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-8 h-8 transition-colors ml-auto"
                      ariaLabel={`Remove ${item.title} from cart`}
                    >
                      <IoCloseSharp size={20} color="black" />
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="totalandcheckout">
                <p className="text-base sm:text-lg font-bold text-gray-800 mt-4">
                  Total: ${total.toFixed(2)}
                </p>
                <Button
                  onClick={() => {
                    alert("Checkout successful! Thank you for your purchase.");
                    dispatch(createOrder());
                    dispatch(toggleSidebar(false));
                    dispatch(clearCart());
                    navigate("/home");
                  }}
                  className="p-2 bg-black text-white rounded w-full mt-4"
                  ariaLabel="Checkout"
                >
                  Checkout
                </Button>
              </div>
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
