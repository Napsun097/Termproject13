import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../style/navbar.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axios from 'axios';

function Navbar({ user, setUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Track cart items
  const navigate = useNavigate();

  // Reference to the dropdown for detecting outside clicks
  const dropdownRef = useRef(null);

  // Get cart items from localStorage (or from context/state management)

  // Close dropdown if clicked outside

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/carts");
        console.log("Cart Items:", response.data);
        setCartItems(response.data.data || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Runs once when the component mounts

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const handlePaymentClick = async (e) => {
    try {
      const response = await axios.get("http://localhost:1337/api/carts");
      console.log("Cart Items:", response.data);

      if (response.data.data.length === 0) {
        e.preventDefault(); // Prevent navigation
        navigate("/empty-cart");
      } else {
        navigate("/payment");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
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
              <div className="search-box">
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
              </div>
            </form>
          </div>



          <div className="navbar-icons">
            {/* Debug user and roles */}
            {console.log(user)}
            {user && user.roles && user.roles.includes("User") && (
              <Link to="/favorite" className="nav-link-icon" onClick={closeNavbar}>
                <FaHeart size={24} />
              </Link>
            )}

            {user && user.roles && user.roles.includes("User") && (
              <Link to="/cart" className="nav-icon" onClick={() => setIsNavbarOpen(false)}>
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-item-count">{cartItems.length}</span>
              </Link>
            )}


            {user ? (
              <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`} ref={dropdownRef}>
                <button
                  className="profile-icon-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={user.profileImage ? user.profileImage : "/3135715.png"}
                    alt="Profile"
                    className="profile-image"
                  />
                  {user.username} <i className="fas fa-caret-down"></i>
                </button>

                <div className="profile-menu">
                  <Link to="/profile" onClick={closeNavbar}>
                    <button className="my-profile-link">โปรไฟล์ของฉัน</button>
                  </Link>
                  {user.roles && user.roles.includes("Admin") && (
                    <Link to="/admin" onClick={closeNavbar}>
                      <button className="admin-page-link">Administration</button>
                    </Link>
                  )}
                  {user.roles && user.roles.includes("User") && (

                    <button onClick={handlePaymentClick} className="payment-menu">ชำระเงิน</button>

                  )}
                  <button className="logout-btn-navbar" onClick={handleLogout}>
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={closeNavbar}>
                <button className="login-btn"> เข้าสู่ระบบ </button>
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
