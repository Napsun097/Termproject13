import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../style/navbar.css";

function Navbar({ user, setUser }) { // รับ user และ setUser จาก App.js
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // รีเซ็ต user โดยไม่ต้องรีเฟรชหน้า
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* โลโก้ */}
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="Website Logo" className="logo-img" />
          </Link>
        </div>

        {/* ปุ่มนำทาง */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">หน้าแรก</Link>
          <Link to="/tgat" className="nav-link">TGAT</Link>
          <Link to="/tpat" className="nav-link">TPAT</Link>
          <Link to="/a-level" className="nav-link">A-level</Link>
          <Link to="/mock-exam" className="nav-link">ข้อสอบจำลอง</Link>
        </div>

        {/* แถบค้นหา */}
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="ค้นหาคอร์สเรียน..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        {/* ไอคอนโปรไฟล์พร้อมเมนู */}
        <div className="navbar-icons">
          <Link to="/cart" className="nav-icon">
            <i className="fas fa-shopping-cart"></i>
          </Link>

          {user ? (
            <div
              className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`}
            >
              <button
                className="profile-icon-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                👤 {user.username} <i className="fas fa-caret-down"></i>
              </button>

              {/* เมนู dropdown */}
              <div className="profile-menu">
                <Link to="/profile" className="profile-menu-item">โปรไฟล์ของฉัน</Link>
                <button className="profile-menu-item logout-btn" onClick={handleLogout}>
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-button login-btn">เข้าสู่ระบบ</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
