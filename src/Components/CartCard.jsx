import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/cartcard.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import config from "../config";

function CartCard({ cart, onRemoveCart }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (!cart || !cart.documentId) return;
        const FetchCartStatus = axios.get(`${config.serverUrlPrefix}/carts/${cart.documentId}`)
        const FetchFavoriteStatus = axios.get(`${config.serverUrlPrefix}/carts/${cart.documentId}?populate[course][populate]=*`)

        Promise.all([FetchCartStatus, FetchFavoriteStatus])
            .then(([cartResponse, favoriteResponse]) => {
                console.log("Cart Response:", cartResponse.data);
                console.log("Favorite Response:", favoriteResponse.data);
                if (cartResponse.data.isInCart) {
                    setIsInCart(true);
                    localStorage.setItem(`cart-${cart.documentId}`, true);
                }
                if (favoriteResponse.data.data.course.favorite) {
                    setIsFavorite(true);
                    localStorage.setItem(`favorite-${cart.documentId}`, true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the cart status!', error);
            });
    }, [cart?.documentId]);

    function onCartClick() {
        // Remove from favorites
        axios.delete(`${config.serverUrlPrefix}/carts/${cart.documentId}`)
            .then(() => {
                console.log("Removed from carts:", cart.documentId);
                setIsInCart(false);
                onRemoveCart(cart.documentId); // Remove from UI
                window.location.reload();
            })
            .catch(error => {
                console.error("Error removing from carts!", error);
            });
    }

    function onFavoriteClick() {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);

        if (newFavoriteStatus) {
            // ✅ Extract correct data from cart.course
            const favoriteData = {
                data: {
                    title: cart.course.title,
                    category: cart.course.category,
                    price: cart.course.price,
                    isPopular: cart.course.isPopular,
                    type: cart.course.type,
                    courseHours: cart.course.courseHours,
                    fullDescription: cart.course.fullDescription,
                    shortDescription: cart.course.shortDescription,
                    subjectName: cart.course.subjectName,
                    course: {
                        connect: [cart.course.id], // ✅ Use cart.course.id
                    }
                }
            };

            console.log("Sending data:", JSON.stringify(favoriteData, null, 2));

            axios.post(`${config.serverUrlPrefix}/favorites`, favoriteData)
                .then(response => {
                    console.log('Course added to favorites:', response.data);
                })
                .catch(error => {
                    console.error('There was an error adding the course to favorites!', error);
                });

        } else {
            // ✅ Fetch the favorite entry correctly
            axios.get(`${config.serverUrlPrefix}/courses/${cart.course.documentId}?populate=favorite`)
                .then(response => {
                    const favoriteId = response.data.data?.favorite?.documentId;
                    if (favoriteId) {
                        axios.delete(`${config.serverUrlPrefix}/favorites/${favoriteId}`)
                            .then(() => {
                                console.log("Course removed from favorites");
                            })
                            .catch(error => {
                                console.error("Error removing course from favorites", error);
                            });
                    }
                })
                .catch(error => {
                    console.error("Error fetching favorite entry", error);
                });
        }
    }

    console.log("Cart Data in CartCard:", cart);

    if (!cart) {
        return <p>Error: Cart data is missing!</p>;
    }

    const imageUrl = cart.course.image?.formats?.large?.url ||
                 cart.course.image?.formats?.medium?.url ||
                 cart.course.image?.formats?.small?.url ||
                 cart.course.image?.url
                 ? `${config.serverUrl}${cart.course.image.url}`
                 : null;

    return (
        <div className="course-card-cart">
            <div className="course-image-cart">
                {imageUrl ? (
                    <img src={imageUrl} alt={cart.title} style={{ width: '100%', height: 'auto' }} />
                ) : (
                    <p>No Image Available</p>
                )}
            </div>

            <div className="course-details-cart">
                <h3 className="course-title-cart">{cart.title}</h3>
                <p className="course-description-cart">{cart.shortDescription}</p>

                <div className="price-and-cart">
                    <p className="course-price">฿ {cart.price}.00</p>
                    <button
                        className="cancel-cart"
                        onClick={onCartClick}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>


    );
}

export default CartCard;