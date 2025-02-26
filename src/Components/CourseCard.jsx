import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom'; // นำเข้า Link จาก react-router-dom
import axios from 'axios';
import "../style/coursecard.css";


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
        // Fetch favorite status from the database
        axios.get(`http://localhost:1337/api/courses/${course.documentId}?populate=*`)
            .then(response => {
                console.log("API Response:", response.data);
                console.log("fav response:", response.data.data.favorite);
                if (response.data.data.favorite && response.data.data.favorite) {
                    setIsFavorite(true);
                }
                if (response.data.data.cart && response.data.data.cart) {
                    setIsInCart(true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the favorite or cart status!', error);
            });
    }, [course.documentId]);

    function onFavoriteClick() {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);

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
            axios.get(`http://localhost:1337/api/courses/${course.documentId}?populate=favorite`)
                .then(response => {
                    const favoriteId = response.data.data.favorite.documentId;
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

    function onCartClick() {
        const newCartStatus = !isInCart;
        setIsInCart(newCartStatus);

        if (newCartStatus) {
            // Extract only the required fields
            const cartData = {
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
            axios.get(`http://localhost:1337/api/courses/${course.documentId}?populate=cart`)
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
    // ตรวจสอบว่ามีค่า `image` หรือไม่ก่อนแสดงผล
    const imageUrl = course.image
    ? `http://localhost:1337${course.image.formats.large.url}`
    : null;

    return (
        <div className="course-card">
            <Link to={`/course/${course.documentId}`} className="course-link"> {/* ลิงก์ไปยังหน้ารายละเอียดคอร์ส */}
                <div className="course-image">
                    {imageUrl ? (
                        <img src={imageUrl} alt={course.title} />
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

                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.shortDescription}</p>

                <div className="course-actions">
                    <p className="course-hours"> {course.courseHours} ชั่วโมง</p>

                    <div className="price-and-cart">
                        <p className="course-price"> ฿ {course.price}.00</p>
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

export default CourseCard;
