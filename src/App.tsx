import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MyOrders from "./components/MyOrders";
import MyAccount from "./components/MyAccount";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();
  return (
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
  );
};

export default App;
