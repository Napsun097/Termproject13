import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CartCard from "../Components/CartCard";
import "../style/cart.css";

const Cart = () => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1337/api/carts?populate[course][populate]=image")
            .then(response => {
                console.log("Carts fetched:", response.data);

                if (response.data && response.data.data) {
                    setCarts(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching cart courses!", error);
            });
    }, []);

    const handleRemoveCart = (cartId) => {
        axios.delete(`http://localhost:1337/api/carts/${cartId}`)
            .then(() => {
                setCarts(carts.filter(cart => cart.id !== cartId));
            })
            .catch(error => {
                console.error("Error removing cart courses!", error);
            });
    };

    return (
        <div className="Favorite-page">
            <h1>Cart Courses</h1>

            <div className="course-list">
                {carts.length > 0 ? (
                    carts.map(cart => (
                        <CartCard
                            key={cart.id}
                            cart={cart}
                            onRemoveCart={() => handleRemoveCart(cart.id)}
                        />
                    ))
                ) : (
                    <p className="no-carts">No cart courses found.</p>
                )}
            </div>

            {carts.length > 0 && (
                <div className="payment-section">
                    <Link 
                        to="/payment" 
                        className="payment-button"
                        style={{
                            display: "block",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "12px 24px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            textDecoration: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease, transform 0.3s ease",
                            textAlign: "center",
                            marginTop: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            width: "200px",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#45a049";
                            e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#4CAF50";
                            e.target.style.transform = "scale(1)";
                        }}
                    >
                        Proceed to Payment
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
