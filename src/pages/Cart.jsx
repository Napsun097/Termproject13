import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CartCard from "../Components/CartCard";
import "../style/cart.css";
import config from "../config"

const Cart = () => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        axios.get(`${config.serverUrlPrefix}/carts?populate[course][populate]=image"`)
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
        axios.delete(`${config.serverUrlPrefix}/carts/${cartId}`)
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
            <div className="cart-head-text">
                <h1 className="cart-head">Cart Courses</h1>
            </div>


            <div className="cart-container">

                <div className="course-list-cart">

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
                        <h2 className="head-cart-summary">รายการชำระเงิน</h2>
                        
                        
                        <p className="number-order">รายการทั้งหมด <strong>{carts.length}</strong> รายการ</p>
                        <p className="cart-text-summary">รวมยอดสั่งซื้อ <strong> ฿ {totalPrice.toFixed(2)}</strong></p>
                        <Link to="/payment" className="payment-button">
                            ดำเนินการชำระเงิน
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
