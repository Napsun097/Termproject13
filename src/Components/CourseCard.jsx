import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";

function CourseCard({ course }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const savedFavorite = localStorage.getItem(`favorite-${course.id}`);
        const savedCart = localStorage.getItem(`cart-${course.id}`);

        if (savedFavorite === "true") setIsFavorite(true);
        if (savedCart === "true") setIsInCart(true);
    }, [course.id]);

    function onFavoriteClick() {
        setIsFavorite(!isFavorite);
        localStorage.setItem(`favorite-${course.id}`, !isFavorite);
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
                <div className="course-overlay">
                    <button
                        className={`favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                    </button>
                </div>
            </div>

            <div className="course-details">
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
lrml;gm;lewmg;lweflewkfewkfkkfelwkfewl