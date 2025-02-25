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
import AdminDashboard from "./pages/AdminDashboard";
import Payment from "./pages/Payment";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart"; // Import Cart component
import CourseDetail from "./pages/CourseDetail";
import Admin from "./pages/Admin";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get current path

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hide Navbar and Footer on certain pages
  const hideNavbarFooter =
    location.pathname === "/login" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/payment";

  return (
    <div>
      {!hideNavbarFooter && <Navbar user={user} setUser={setUser} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tgat" element={<Tgat />} />
          <Route path="/tpat" element={<Tpat />} />
          <Route path="/a-level" element={<Alevel />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
          <Route path="/course/:id" element={<CourseDetail />} /> {/* กำหนด Route สำหรับ CourseDetail */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
