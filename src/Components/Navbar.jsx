import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../style/navbar.css";

function Navbar({ user, setUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State สำหรับควบคุมการเปิด/ปิด Navbar
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    setIsNavbarOpen(false); // ปิด Navbar เมื่อออกจากระบบ
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen); // สลับสถานะการเปิด/ปิด Navbar
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false); // ปิด Navbar เมื่อคลิกลิงก์
  };

  return (
    <nav className="navbar">
      {/* ปุ่มเปิด/ปิด Navbar สำหรับโหมดมือถือ */}
      <button className="navbar-toggle" onClick={toggleNavbar}>
        <i className={`fas ${isNavbarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <div className="navbar-container">
        {/* โลโก้ */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeNavbar}>
            <img src={logo} alt="Website Logo" className="logo-img" />
          </Link>
        </div>

        {/* ส่วนอื่นๆ ของ Navbar */}
        <div className={`navbar-content ${isNavbarOpen ? "active" : ""}`}>
          {/* ปุ่มนำทาง */}
          <div className="navbar-links">
            <Link to="/" className="nav-link" onClick={closeNavbar}>หน้าแรก</Link>
            <Link to="/tgat" className="nav-link" onClick={closeNavbar}>TGAT</Link>
            <Link to="/tpat" className="nav-link" onClick={closeNavbar}>TPAT</Link>
            <Link to="/a-level" className="nav-link" onClick={closeNavbar}>A-level</Link>
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
              <button type="submit" className="search-btn" disabled={searchTerm.trim() === ""}>
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* ไอคอนโปรไฟล์พร้อมเมนู */}
          <div className="navbar-icons">
            <Link to="/cart" className="nav-icon" onClick={() => setIsNavbarOpen(false)}>
              <i className="fas fa-shopping-cart"></i>
              {/* เพิ่มข้อความหรือจำนวนในตะกร้า */}
              <span className="cart-item-count">3</span> {/* ตัวอย่างการเพิ่มข้อความจำนวนสินค้า */}
            </Link>

            {user ? (
              <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`}>
                <button
                  className="profile-icon-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  👤 {user.username} <i className="fas fa-caret-down"></i>
                </button>

                {/* เมนู dropdown */}
                <div className="profile-menu">
                  <Link to="/profile" className="profile-menu-item" onClick={closeNavbar}>
                    โปรไฟล์ของฉัน
                  </Link>
                  <button className="profile-menu-item logout-btn" onClick={handleLogout}>
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-button login-btn" onClick={closeNavbar}>
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
