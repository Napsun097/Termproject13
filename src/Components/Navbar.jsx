import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../style/navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  // ฟังก์ชันค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        {/* โลโก้  สามารถกดกลับหน้าแรก*/}
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
              placeholder="พิมพ์รหัส, ชื่อคอร์ส"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search for courses"
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        

        {/* ปุ่มไอคอนต่าง ๆ */}
        <div className="navbar-icons">
          <Link to="/cart" className="nav-icon">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link to="/login" className="nav-button login-btn">เข้าสู่ระบบ</Link>
        </div>
        
      </div>
      
    </nav>
   
    </>
  );
}

export default Navbar;
