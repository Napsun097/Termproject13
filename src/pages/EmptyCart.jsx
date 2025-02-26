import React from "react";
import { Link } from "react-router-dom";
import "../style/emptycart.css";

const EmptyCart = () => {
    return (
        <div className="empty-cart-container">
            <h2>🛒 Your cart is empty</h2>
            <p>You don't have any items in your cart yet.</p>
            <Link to="/">
                <button className="go-home-btn">Go to Home</button>
            </Link>
        </div>
    );
};

export default EmptyCart;