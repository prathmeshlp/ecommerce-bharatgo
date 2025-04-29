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
import Input from "../components/basic/Input";
import SectionHeading from "../components/basic/SectionHeading";
import Button from "../components/basic/Button";
import Card from "../components/basic/Card";
import Image from "../components/basic/Image";

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
    <main className="min-h-screen bg-white pt-20 pb-8 flex flex-col items-center">
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center mb-8">
          <SectionHeading className="text-heading font-semibold text-gray-800">
            Home
          </SectionHeading>
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="input-base focus:ring-blue-500"
              ariaLabel="Search products"
            />
          </div>
        </div>
        {status === "loading" && (
          <div className="flex justify-center py-8">
            <PuffLoader color="#2563eb" />
          </div>
        )}
        {status === "failed" && (
          <p className="text-red-500 text-responsive text-center py-8">
            Error loading products
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="relative w-64 h-60 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover  rounded-t-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => dispatch(setSelectedProduct(product))}
                ariaLabel={`View details for ${product.title}`}
              />
              <span className="absolute bottom-16 left-2 bg-white/60 rounded-md text-xs font-semibold text-gray-800 px-2 py-1">
                {product.category.name}
              </span>
              <div className="flex justify-between items-center p-4">
                <p className="text-responsive text-gray-600 truncate">
                  {product.title}
                </p>
                <p className="text-responsive font-medium text-gray-700">
                  ${product.price}
                </p>
              </div>
              <Button
                onClick={() => dispatch(addToCart(product))}
                ariaLabel={
                  cart.some((item) => item.id === product.id)
                    ? "Added to cart"
                    : "Add to cart"
                }
                className="absolute top-2 right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-900 transition-colors"
              >
                {cart.some((item) => item.id === product.id) ? (
                  <IoCheckmarkCircleSharp size={20} />
                ) : (
                  <IoMdAdd size={20} />
                )}
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default React.memo(Home);
