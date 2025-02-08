import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../assets/images/logo.png';

function Header() {
  return (
    <header className="header">

      <div className="container">
        {/* nav 1 */}
        {/* โลโก้ */}
        <nav className="main-nav">
          <Link to="/">
            <img src={logo} alt="Website Logo" className="logo-img" />
          </Link>

          {/* ฝั่งขวา */}
          <div className="navbar-right">
            {/* ค้นหาคอร์ส */}
            <div className="search-container">
              <input
                type="text"
                placeholder="พิมพ์รหัส, ชื่อคอร์ส"
                className="search-bar"
              />
              <button className="search-btn" >
                <i className="fas fa-search"></i>
              </button>
            </div>

            {/* ปุ่มตะกร้า */}
            <i className="fas fa-shopping-cart cart-icon"></i>

            {/* ปุ่มล็อคอินและลงทะเบียน */}
            <Link to="/login">
              <button className="login-btn">เข้าสู่ระบบ</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">ลงทะเบียน</button>
            </Link>
          </div>
        </nav>

        {/* nav 2 ---> ปุ่มเพื่อไปหน้าต่างๆ  */}
        <nav className="course-nav">
          <ul className="nav-course">
            <li><Link to="/">หน้าแรก</Link></li>
            <li><Link to="/all-course">คอร์สทั้งหมด</Link></li>
            <li><Link to="/tgat">TGAT</Link></li>
            <li><Link to="/tpat">TPAT</Link></li>
            <li><Link to="/a-level">A-level</Link></li>
            <li><Link to="/mock-exam">ข้อสอบจำลอง</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
