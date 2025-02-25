import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";
import axios from 'axios';
import { Link } from "react-router-dom";

function FavoriteCard({ favorite, onRemoveFavorite }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        /*const savedFavorite = localStorage.getItem(`favorite-${course.id}`);
        const savedCart = localStorage.getItem(`cart-${course.id}`);

        if (savedFavorite === "true") setIsFavorite(true);
        if (savedCart === "true") setIsInCart(true);
    }, [course.id]);

    function onFavoriteClick() {
        setIsFavorite(!isFavorite);
        localStorage.setItem(`favorite-${course.id}`, !isFavorite);
    }*/
        const savedCart = localStorage.getItem(`cart-${favorite.id}`);
        if (savedCart === "true") setIsInCart(true);

        // Fetch favorite status from the database
        axios.get(`http://localhost:1337/api/favorites/${favorite.documentId}`)

            .then(response => {
                console.log("API Response:", response.data);
                if (response.data.isFavorite) {
                    setIsFavorite(true);
                    localStorage.setItem(`favorite-${favorite.documentId}`, true);
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
        setIsInCart(!isInCart);
        localStorage.setItem(`cart-${course.id}`, !isInCart);
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
                        className={`favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
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
