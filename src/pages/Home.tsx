import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import {
  fetchProducts,
  setSearchTerm,
  addToCart,
  setSelectedProduct,
} from "../store/productSlice";
import { useAuth } from "../hooks/useAuth";
import { IoMdAdd } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import PuffLoader from "react-spinners/PuffLoader";
import Input from "../components/Input";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const { products, searchTerm, category, status, cart } = useSelector(
    (state: RootState) => state.products
  );

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
    <div className="bg-white min-h-screen pt-20 pb-6 flex flex-col items-center">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-6">
          <SectionHeading className="text-lg font-semibold text-gray-800 mb-4">
            Home
          </SectionHeading>
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              ariaLabel="Search products"
            />
          </div>
        </div>
        {status === "loading" && (
          <div className="flex justify-center">
            <PuffLoader color="#2563eb" />
          </div>
        )}
        {status === "failed" && (
          <p className="text-red-500 text-center">Error loading products</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 sm:h-64 sm:object-cover object-contain rounded-3xl sm:rounded-lg cursor-pointer"
                onClick={() => dispatch(setSelectedProduct(product))}
                aria-label={`View details for ${product.title}`}
              />
              <h3 className="absolute bottom-12 left-2 bg-white/70 rounded-lg text-black text-xs font-semibold px-2 py-1">
                {product.category.name}
              </h3>
              <div className="flex justify-between items-center p-3">
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {product.title}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  ${product.price}
                </p>
              </div>
              <PrimaryButton
                onClick={() => dispatch(addToCart(product))}
                ariaLabel={
                  cart.some((item) => item.id === product.id)
                    ? "Added to cart"
                    : "Add to cart"
                }
                className="absolute top-2 right-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:scale-50 transition-colors"
              >
                {cart.some((item) => item.id === product.id) ? (
                  <IoCheckmarkCircleSharp
                    size={24}
                    className="rounded-full"
                    color="white"
                  />
                ) : (
                  <IoMdAdd size={24} className="rounded-full" color="white"/>
                )}
              </PrimaryButton>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
