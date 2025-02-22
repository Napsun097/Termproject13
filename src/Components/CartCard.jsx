import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";
import axios from 'axios';

function CartCard({ cart, onRemoveCart }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (!cart || !cart.documentId) return;
        axios.get(`http://localhost:1337/api/carts/${cart.documentId}`)

            .then(response => {
                console.log("API Response:", response.data);
                if (response.data.isInCart) {
                    setIsInCart(true);
                    localStorage.setItem(`cart-${cart.documentId}`, true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the cart status!', error);
            });
    }, [cart?.documentId]);

    function onCartClick() {
            // Remove from favorites
            axios.delete(`http://localhost:1337/api/carts/${cart.documentId}`)
                .then(() => {
                    console.log("Removed from carts:", cart.documentId);
                    setIsInCart(false);
                    onRemoveCart(cart.documentId); // Remove from UI
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
    
            axios.post('http://localhost:1337/api/favorites', favoriteData)
                .then(response => {
                    console.log('Course added to favorites:', response.data);
                })
                .catch(error => {
                    console.error('There was an error adding the course to favorites!', error);
                });
    
        } else {
            // ✅ Fetch the favorite entry correctly
            axios.get(`http://localhost:1337/api/courses/${cart.course.id}?populate=favorite`)
                .then(response => {
                    const favoriteId = response.data.data?.favorite?.id;
                    if (favoriteId) {
                        axios.delete(`http://localhost:1337/api/favorites/${favoriteId}`)
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

    const categoryColors = {
        "tgat": "#FF5733",
        "tpat": "#3498DB",
        "a-level": "#2ECC71"
    };

    console.log("Cart Data in CartCard:", cart);

    if (!cart) {
        return <p>Error: Cart data is missing!</p>;
    }

    const imageUrl = cart.course.image?.[0]?.formats?.large?.url
        ? `http://localhost:1337${cart.course.image[0].formats.large.url}`
        : null;

    return (
        <div className="course-card">
            <div className="course-image">
                {imageUrl ? (
                    <img src={imageUrl} alt={cart.course.title} />
                ) : (
                    <p>No Image Available</p>
                )}
            </div>

            <div className="course-details">

                <button
                    className="favorite-btn active"
                    onClick={onFavoriteClick}
                >
                    {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                </button>

                <span
                    className="course-category-badge"
                    style={{ backgroundColor: categoryColors[cart.category] }}
                >
                    {cart.category.toUpperCase()}
                </span>
                <h3 className="course-title">{cart.title}</h3>
                <p className="course-description">{cart.shortDescription}</p>
                <p className="course-hours"> ชั่วโมงเรียน:{cart.courseHours} ชั่วโมง</p>
                <p className="course-price"> ราคา: {cart.price} บาท</p>

                <div className="course-actions">
                    <button className="course-learn-more-btn">รายละเอียด</button>
                    <button
                        className={`cart-btn ${isInCart ? "in-cart" : ""}`}
                        onClick={onCartClick}
                    >
                        {isInCart ? <FaShoppingCart className="cart-icon" /> : <FaCartPlus className="cart-icon" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartCard;