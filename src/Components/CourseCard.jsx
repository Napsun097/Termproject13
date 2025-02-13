import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import "../style/coursecard.css";

function CourseCard({ course }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    // ตรวจสอบค่า Favorite และ Cart จาก localStorage
    useEffect(() => {
        const savedFavorite = localStorage.getItem(`favorite-${course.id}`);
        const savedCart = localStorage.getItem(`cart-${course.id}`);

        if (savedFavorite === "true") setIsFavorite(true);
        if (savedCart === "true") setIsInCart(true);
    }, [course.id]);

    // ฟังก์ชันเมื่อคลิก Favorite
    function onFavoriteClick() {
        setIsFavorite(!isFavorite);
        localStorage.setItem(`favorite-${course.id}`, !isFavorite);
    }

    // ฟังก์ชันเมื่อคลิกเพิ่มลงตะกร้า
    function onCartClick() {
        setIsInCart(!isInCart);
        localStorage.setItem(`cart-${course.id}`, !isInCart);
    }

    // สีของหมวดหมู่คอร์ส
    const categoryColors = {
        "tgat": "#FF5733",  // สีส้ม
        "tpat": "#3498DB",  // สีน้ำเงิน
        "a-level": "#2ECC71" // สีเขียว
    };

    return (
        <div className="course-card">
            {/* แสดงรูปภาพคอร์ส */}
            <div className="course-image">
                <img src={course.image} alt={course.title} />
                {/* ปุ่ม Favorite */}
                <div className="course-overlay">
                    <button
                        className={`favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                    </button>
                </div>
            </div>

            {/* แสดงรายละเอียดคอร์ส */}
            <div className="course-details">
                {/* แสดงหมวดหมู่ */}
                <span 
                    className="course-category-badge" 
                    style={{ backgroundColor: categoryColors[course.category] }}
                >
                    {course.category.toUpperCase()}
                </span>
                {/* แสดงชื่อคอร์ส */}
                <h3>{course.title}</h3>
                {/* แสดงคำอธิบาย */}
                <p className="course-description">{course.description}</p>
                
                {/* แสดงราคา */}
                <p className="course-price">ราคา: {course.price} บาท</p>

                {/* ปุ่มดูรายละเอียด และ เพิ่มลงตะกร้า */}
                <div className="course-actions">
                    <button className="course-learn-more-btn">ดูรายละเอียด</button>
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
