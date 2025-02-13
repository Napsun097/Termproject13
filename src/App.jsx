import React, { useState, useEffect } from "react";
import "./style/App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Tgat from "./pages/Tgat";
import Tpat from "./pages/Tpat";
import Alevel from "./pages/Alevel";
import MockExam from "./pages/MockExam";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import Footer from "./Components/Footer";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null); // เก็บข้อมูล user

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} /> {/* ส่ง user และ setUser ไป Navbar */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tgat" element={<Tgat />} />
          <Route path="/tpat" element={<Tpat />} />
          <Route path="/a-level" element={<Alevel />} />
          <Route path="/mock-exam" element={<MockExam />} />
          <Route path="/login" element={<Login setUser={setUser} />} /> {/* ส่ง setUser ไป Login */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
