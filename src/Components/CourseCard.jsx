import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";
import axios from 'axios';

function CourseCard({ course }) {
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
        const savedCart = localStorage.getItem(`cart-${course.id}`);
        if (savedCart === "true") setIsInCart(true);

        // Fetch favorite status from the database
        axios.get(`http://localhost:1337/api/courses/${course.documentId}`)

            .then(response => {
                console.log("API Response:", response.data);
                if (response.data.isFavorite) {
                    setIsFavorite(true);
                    localStorage.setItem(`favorite-${course.documentId}`, true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the favorite status!', error);
            });
    }, [course.documentId]);

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
                    course: {
                        connect: [course.documentId],
                    }
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

    // ตรวจสอบว่ามีค่า `image` หรือไม่ก่อนแสดงผล
    const imageUrl = course.image && course.image.length > 0
        ? `http://localhost:1337${course.image[0].formats.large.url}`
        : null;

    return (
        <div className="course-card">
            <div className="course-image">
                {/* ตรวจสอบค่า imageUrl ว่ามีหรือไม่ก่อนแสดง */}
                {imageUrl ? (
                    <img src={imageUrl} alt={course.title} />
                ) : (
                    <p>No Image Available</p>
                )}
            </div>

            <div className="course-details">

                <button
                    className={`favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={onFavoriteClick}
                >
                    {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                </button>

                <span
                    className="course-category-badge"
                    style={{ backgroundColor: categoryColors[course.category] }}
                >
                    {course.category.toUpperCase()}
                </span>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.shortDescription}</p>
                <p className="course-hours"> ชั่วโมงเรียน:{course.courseHours} ชั่วโมง</p>
                <p className="course-price"> ราคา: {course.price} บาท</p>

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

export default CourseCard;