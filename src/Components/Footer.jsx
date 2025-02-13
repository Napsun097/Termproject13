import React from 'react';
import "../style/Footer.css"; 

function Footer() {
  return (
    
    <div className="footer">
      <div className="footer-content">
        <p>&copy; 2025 UniMaster </p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
