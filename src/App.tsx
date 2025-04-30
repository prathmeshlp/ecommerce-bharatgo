import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import MyAccount from "./pages/MyAccount";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center">
      <Toaster position="top-center" />
      <Provider store={store}>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/account" element={<MyAccount />} />
        </Routes>
        <Sidebar />
      </Provider>
    </div>
  );
};

export default App;
