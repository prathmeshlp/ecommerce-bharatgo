import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import ProductDetails from "./components/ProductDetails";
// import Cart from "./components/Cart";
// import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import MyOrders from "./components/MyOrders";
import MyAccount from "./components/MyAccount";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { motion } from "framer-motion";
// import Checkout from "./components/Checkout";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <motion.div
            className="min-h-screen bg-gray-100 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1">
              <Navbar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
                {/* <Route path="/cart" element={<Cart />} /> */}
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/account" element={<MyAccount />} />
              </Routes>
            </div>
            <Sidebar />
          </motion.div>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
