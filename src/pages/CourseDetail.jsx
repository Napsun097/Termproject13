import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaBook } from "react-icons/fa";
import axios from 'axios';
import "../style/Detail.css";
import config from "../config"

function CourseDetail() {
    const { id } = useParams();  // Get the course ID from the URL
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [ExampleVideo, setExampleVideo] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        axios.get(`${config.serverUrlPrefix}/courses/${id}?populate=videoExample&populate=cart`) // Populate video1
            .then(response => {
                const courseData = response.data.data;
                setCourse(courseData);

                // Check if video1 exists
                if (courseData.videoExample) {
                    const videoExampleUrl = `${config.serverUrl}${courseData.videoExample.url}`; // Construct URL for the video
                    setExampleVideo(videoExampleUrl);
                }
                if (courseData.cart?.documentId) {
                    setCartId(courseData.cart.documentId);  // Store cart ID
                }
            })
            .catch(error => {
                console.error('Error fetching course detail!', error);
            });
    }, [id]);

    if (!course) return <p>Loading...</p>;

    function onCartClick() {
        if (cartId) {
            // 🗑️ Remove from cart
            axios.delete(`${config.serverUrlPrefix}/carts/${cartId}`)
                .then(() => {
                    console.log("Course removed from cart");
                    setCartId(null);  // Update state to reflect removal
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Error removing course from cart", error);
                });
        } else {
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

            axios.post(`${config.serverUrlPrefix}/carts`, cartData)
                .then(response => {
                    console.log('Course added to carts:', response.data);
                    setCartId(response.data.data.documentId);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('There was an error adding the course to carts!', error);
                });


        }
    }

    return (
        <div className="course-detail-container">
            {/* Left Section */}
            <div className="left-section-detail">
                <h1>{course.title}</h1>
                <p>{course.fullDescription}</p>
                <p className="course-hours-detail">
                    <FaClock className="clock-icon" /> {course.courseHours} ชั่วโมง
                </p>
                <p className="number-lesson-detail">
                    <FaBook className="lesson-icon" /> {course.lesson} บทเรียน
                </p>
            </div>

            {/* Right Section */}
            <div className="right-section-detail">
                {/* If there's a video, show it. Otherwise, display the "ไม่มีบทเรียน" message */}
                {ExampleVideo ? (
                    <video className="course-video" controls>
                        <source src={ExampleVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p className="no-lesson-message">ไม่มีบทเรียน</p>
                )}
                <button onClick={onCartClick} className={`watch-button ${cartId ? "in-cart" : ""}`}>
                    {cartId ? "ลบจากตะกร้า" : "เพิ่มลงตะกร้า"}
                </button>
            </div>
        </div>
    );
}
export default CourseDetail;
