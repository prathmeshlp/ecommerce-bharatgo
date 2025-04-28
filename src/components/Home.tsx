import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { fetchProducts, setSearchTerm, addToCart, setSelectedProduct } from "../store/productSlice";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const { products, searchTerm, category, status,cart } = useSelector(
    (state: RootState) => state.products
  );

  console.log(products)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" ||
        product.category.name.toLowerCase().includes(category.toLowerCase()))
  );

  if (!user) return null;

  return (
    <div className="container flex flex-col mt-24 items-center mx-auto w-full">
      <div className="flex items-center justify-center">
        <span className="mb-2">Home</span>
      </div>
      <div className="search-input flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="rounded-lg border border-black w-80 p-4 focus:outline-none "
        />
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error loading products</p>}
      <div className="grid place-items-center justify-center xl:gap-4 md:gap-3 sm:gap-2 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full max-w-screen-lg ">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-transparent rounded shadow hover:shadow-lg transition relative w-full h-4/5 "
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => dispatch(setSelectedProduct(product))}
              />
            <h3 className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2 font-semibold">
              {product.category.name}
            </h3>
            <div className="flex justify-between items-center p-2">
              <p className="text-sm text-gray-500">{product.title}</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
            {/* <button>
              <IoMdAdd
                onClick={() => dispatch(addToCart(product))}
                className="absolute m-2 top-0 right-0 bg-white rounded-full p-0"
                size={30}
              />
            </button> */}
            {/* <GiConfirmed /> */}
            {/* <motion.button
              onClick={() => dispatch(addToCart(product))}
              className="absolute m-2 top-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            > */}
              {cart.some(item => item.id === product.id) ? (
                <IoCheckmarkCircleSharp  size={24} onClick={() => dispatch(addToCart(product))} className="absolute m-2 top-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center"/>
              ) : (
                <IoMdAdd size={28} onClick={() => dispatch(addToCart(product))} className="absolute m-2 top-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center"/>
              )}
            {/* </motion.button> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
