import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./style/index.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Tgat from "./pages/Tgat";
import Tpat from "./pages/Tpat";
import Alevel from "./pages/Alevel";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import Footer from "./Components/Footer";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart"; // Import Cart component
import CourseDetail from "./pages/CourseDetail";
import Admin from "./pages/Admin";
import EmptyCart from "./pages/EmptyCart";
import axios from "axios";
import Register from "./pages/Register"; // เพิ่มหน้า Register
import Abouts from "./pages/About";
import AllCourses from "./pages/AllCourse";
import config from "./config";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    refreshCart();
  }, []);

  const refreshCart = async () => {
    try {
      const response = await axios.get(`${config.serverUrlPrefix}/carts?populate=*`);
      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/payment" ||
    location.pathname === "/admin";

  return (
    <div className="app-container">
      {!hideNavbarFooter && <Navbar user={user} setUser={setUser} refreshCart={refreshCart} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tgat" element={<Tgat />} />
          <Route path="/tpat" element={<Tpat />} />
          <Route path="/a-level" element={<Alevel />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/empty-cart" element={<EmptyCart />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/admin" element={<Admin user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<Abouts />} />
          <Route path="/allcourse" element={<AllCourses />} />
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;