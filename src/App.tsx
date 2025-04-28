import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MyOrders from "./components/MyOrders";
import MyAccount from "./components/MyAccount";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/account" element={<MyAccount />} />
          </Routes>
          <Sidebar />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
