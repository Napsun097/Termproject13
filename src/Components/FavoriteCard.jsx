import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";
import axios from 'axios';
import { Link } from "react-router-dom";

function FavoriteCard({ favorite, onRemoveFavorite }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem(`cart-${favorite.id}`);
        if (savedCart === "true") setIsInCart(true);


        const fetchFavoriteStatus = axios.get(`http://localhost:1337/api/favorites/${favorite.documentId}`)
        const fetchCartStatus = axios.get(`http://localhost:1337/api/favorites/${favorite.documentId}?populate[course][populate]=cart`)

        Promise.all([fetchFavoriteStatus, fetchCartStatus])
            .then(([favoriteResponse, cartResponse]) => { // Destructure responses
                console.log("Favorite Response:", favoriteResponse.data);
                console.log("Cart Response:", cartResponse.data);
                if (favoriteResponse.data.isFavorite) {
                    setIsFavorite(true);
                    localStorage.setItem(`favorite-${favorite.documentId}`, true);
                }
                if (cartResponse.data.data.course.cart) {
                    setIsInCart(true);
                    localStorage.setItem(`cart-${favorite.documentId}`, true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the favorite status!', error);
            });
    }, [favorite.documentId]);

    function onFavoriteClick() {
        // Remove from favorites
        axios.delete(`http://localhost:1337/api/favorites/${favorite.documentId}`)
            .then(() => {
                console.log("Removed from favorites:", favorite.documentId);
                setIsFavorite(false);
                onRemoveFavorite(favorite.documentId); // Remove from UI
            })
            .catch(error => {
                console.error("Error removing from favorites!", error);
            });
    }

    function onCartClick() {
        const newCartStatus = !isInCart;
        setIsInCart(newCartStatus);

        if (newCartStatus) {
            // Extract only the required fields
            const cartData = {
                data: {
                    title: favorite.course.title,
                    category: favorite.course.category,
                    price: favorite.course.price,
                    isPopular: favorite.course.isPopular,
                    type: favorite.course.type,
                    courseHours: favorite.course.courseHours,
                    fullDescription: favorite.course.fullDescription,
                    shortDescription: favorite.course.shortDescription,
                    subjectName: favorite.course.subjectName,
                    course: {
                        connect: [favorite.course.documentId],
                    }
                }
            };
            console.log("Sending data:", JSON.stringify(cartData, null, 2));
            if (newCartStatus) {
                axios.post('http://localhost:1337/api/carts', cartData)
                    .then(response => {
                        console.log('Course added to carts:', response.data);
                    })
                    .catch(error => {
                        console.error('There was an error adding the course to carts!', error);
                    });
            }
        } else {
            axios.get(`http://localhost:1337/api/courses/${favorite.course.documentId}?populate=cart`)
                .then(response => {
                    const cartId = response.data.data.cart.documentId;
                    if (cartId) {
                        axios.delete(`http://localhost:1337/api/carts/${cartId}`)
                            .then(() => {
                                console.log("Course removed from carts");
                            })
                            .catch(error => {
                                console.error("Error removing course from carts", error);
                            });
                    }
                })
                .catch(error => {
                    console.error("Error fetching cart entry", error);
                });
        }
    }


    if (!favorite) {
        return <p>Error: Favorite data is missing!</p>;
    }

    const imageUrl = favorite.course.image?.[0]?.formats?.large?.url
        ? `http://localhost:1337${favorite.course.image[0].formats.large.url}`
        : null;

    return (
        <div className="course-card">
            <Link to={`/course/${favorite.documentId}`} className="course-link"> {/* ลิงก์ไปยังหน้ารายละเอียดคอร์ส */}
                <div className="course-image">
                    {imageUrl ? (
                        <img src={imageUrl} alt={favorite.title} />
                    ) : (
                        <p>No Image Available</p>
                    )}
                </div>
            </Link>

            <div className="course-details">
                <div className="type1">
                    <button
                        className={`favorite-btn active`}
                        onClick={onFavoriteClick}
                    >
                        {<FaHeart className="heart-icon" />}
                    </button>
                    <h4 className="course-type"> video course </h4>
                </div>

                <h3 className="course-title">{favorite.title}</h3>
                <p className="course-description">{favorite.shortDescription}</p>

                <div className="course-actions">
                    <p className="course-hours"> ชั่วโมงเรียน: {favorite.courseHours} ชั่วโมง</p>

                    <div className="price-and-cart">
                        <p className="course-price"> ราคา: {favorite.price} บาท</p>
                        <button
                            className={`cart-btn ${isInCart ? "in-cart" : ""}`}
                            onClick={onCartClick}
                        >
                            {isInCart ? <FaShoppingCart className="cart-icon" /> : <FaCartPlus className="cart-icon" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavoriteCard;
