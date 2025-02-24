import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../style/navbar.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

function Navbar({ user, setUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Track cart items
  const navigate = useNavigate();

  // Get cart items from localStorage (or from context/state management)
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    console.log(storedCartItems); // Debug cart items
    setCartItems(storedCartItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    setIsNavbarOpen(false); // Close navbar on logout
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" onClick={closeNavbar}>
            <img src={logo} alt="Website Logo" className="logo-img" />
          </Link>
        </div>

        <div className={`navbar-content ${isNavbarOpen ? "active" : ""}`}>
          <div className="navbar-links">
            <Link to="/" className="nav-link" onClick={closeNavbar}>หน้าแรก</Link>
            <Link to="/tgat" className="nav-link" onClick={closeNavbar}>TGAT</Link>
            <Link to="/tpat" className="nav-link" onClick={closeNavbar}>TPAT</Link>
            <Link to="/a-level" className="nav-link" onClick={closeNavbar}>A-level</Link>
          </div>

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
            <Link to="/favorite" className="nav-link" onClick={closeNavbar}><FaHeart size={30}/></Link>
            <Link to="/cart" className="nav-link" onClick={closeNavbar}><FaShoppingCart size={30}/></Link>
          </div>

          <div className="navbar-icons">
            
            {/* Debug user and roles */}
            {console.log(user)} 

            {user && user.roles && user.roles.includes("User") && (
              <Link to="/cart" className="nav-icon" onClick={() => setIsNavbarOpen(false)}>
                <i className="fas fa-shopping-cart"></i>
                {/* Display cart item count */}
                <span className="cart-item-count">{cartItems.length}</span>
              </Link>
            )}

            {user ? (
              <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`}>
                <button
                  className="profile-icon-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  👤 {user.username} <i className="fas fa-caret-down"></i>
                </button>

                <div className="profile-menu">
                  <Link to="/profile" className="profile-menu-item" onClick={closeNavbar}>
                    โปรไฟล์ของฉัน
                  </Link>
                  {user.roles && user.roles.includes("Admin") && (
                    <Link to="/admin-dashboard" className="profile-menu-item" onClick={closeNavbar}>
                      Administration
                    </Link>
                  )}
                  {user.roles && user.roles.includes("User") && (
                    <Link to="/payment" className="profile-menu-item" onClick={closeNavbar}>
                      ชำระเงิน
                    </Link>
                  )}
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
      <button className="navbar-toggle" onClick={toggleNavbar}>
        <i className={`fas ${isNavbarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>
    </nav>
  );
}

export default Navbar;
