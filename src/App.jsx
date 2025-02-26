import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./style/App.css";
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

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation(); // Get current path

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    refreshCart();
  }, []);

  const refreshCart = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/carts?populate=*");
      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Hide Navbar and Footer on certain pages
  const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/payment" ||
    location.pathname === "/admin";

  return (
    <div>
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
          <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
          <Route path="/empty-cart" element={<EmptyCart />} />
          <Route path="/course/:id" element={<CourseDetail />} /> {/* กำหนด Route สำหรับ CourseDetail */}
          <Route path="/admin" element={<Admin user={user} setUser={setUser} />} />



        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
