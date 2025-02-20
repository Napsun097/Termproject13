import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";
import axios from 'axios';

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
        axios.get(`http://localhost:1337/api/courses/${favorite.documentId}`)

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
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        localStorage.setItem(`favorite-${course.documentId}`, newFavoriteStatus);

        if (newFavoriteStatus) {
            // Extract only the required fields
            const favoriteData = {
                data: {
                    title: course.title,
                    category: course.category,
                    price: course.price,
                    isPopular: course.isPopular,
                    type: course.type,
                    courseHours: course.courseHours,
                    fullDescription: course.fullDescription,
                    shortDescription: course.shortDescription,
                    subjectName: course.subjectName,
                }
            };
            console.log("Sending data:", JSON.stringify(favoriteData, null, 2));
            if (newFavoriteStatus) {
                axios.post('http://localhost:1337/api/favorites', favoriteData)
                    .then(response => {
                        console.log('Course added to favorites:', response.data);
                    })
                    .catch(error => {
                        console.error('There was an error adding the course to favorites!', error);
                    });
            }
        } else {
            // Optionally, handle removing the course from favorites here
        }
    }

    function onCartClick() {
        setIsInCart(!isInCart);
        localStorage.setItem(`cart-${course.id}`, !isInCart);
    }

    const categoryColors = {
        "tgat": "#FF5733",
        "tpat": "#3498DB",
        "a-level": "#2ECC71"
    };
    
    if (!favorite) {
        return <p>Error: Favorite data is missing!</p>;
    }

    return (
            <div className="course-card">
    
                <div className="course-details">
    
                    <button
                        className={`favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                    </button>
    
                    <span
                        className="course-category-badge"
                        style={{ backgroundColor: categoryColors[favorite.category] }}
                    >
                        {favorite.category.toUpperCase()}
                    </span>
                    <h3 className="course-title">{favorite.title}</h3>
                    <p className="course-description">{favorite.shortDescription}</p>
                    <p className="course-hours"> ชั่วโมงเรียน:{favorite.courseHours} ชั่วโมง</p>
                    <p className="course-price"> ราคา: {favorite.price} บาท</p>
    
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

export default FavoriteCard;
