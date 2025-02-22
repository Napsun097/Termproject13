import React, { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "../Components/CartCard";
import "../style/cart.css";

const Cart = () => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1337/api/carts?populate[course][populate]=image")
            .then(response => {
                console.log("Carts fetched:", response.data); // Debugging log

                // ✅ Ensure we correctly extract data from Strapi's structure
                if (response.data && response.data.data) {
                    setCarts(response.data.data); // Set entire favorites list
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
                            cart={cart} // ✅ Correctly extract attributes
                            onRemoveCart={() => handleRemoveCart(cart.id)}
                        />
                    ))
                ) : (
                    <p className="no-carts">No cart courses found.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
