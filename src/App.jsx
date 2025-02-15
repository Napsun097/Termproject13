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

function App() {
  const [user, setUser] = useState(null); 
  const location = useLocation(); // ดึง path ปัจจุบัน

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      {/* 🔥 ซ่อน Navbar และ Footer ถ้าอยู่ที่หน้า /login */}
      {location.pathname !== "/login" && <Navbar user={user} setUser={setUser} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tgat" element={<Tgat />} />
          <Route path="/tpat" element={<Tpat />} />
          <Route path="/a-level" element={<Alevel />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
