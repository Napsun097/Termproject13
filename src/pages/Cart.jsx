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

    // Calculate total price
    const totalPrice = carts.reduce((acc, cart) => {
        return acc + (cart.course.price || 0);
    }, 0);

    return (
        <div className="cart-page">
            <h1>Cart Courses</h1>

            <div className="cart-container">
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

                {/* Total price and payment button section */}
                {carts.length > 0 && (
                    <div className="cart-summary">
                        <h2>Total Price: {totalPrice.toFixed(2)} Baht</h2>
                        <Link 
                            to="/payment" 
                            className="payment-button"
                        >
                            Proceed to Payment
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
