import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaBook } from "react-icons/fa";
import axios from 'axios';
import "../style/Detail.css";

function CourseDetail() {
    const { id } = useParams();  // Get the course ID from the URL
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [ExampleVideo, setExampleVideo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:1337/api/courses/${id}?populate=videoExample`) // Populate video1
            .then(response => {
                const courseData = response.data.data;
                setCourse(courseData);

                // Check if video1 exists
                if (courseData.videoExample) {
                    const videoExampleUrl = `http://localhost:1337${courseData.videoExample.url}`; // Construct URL for the video
                    setExampleVideo(videoExampleUrl);
                }
            })
            .catch(error => {
                console.error('Error fetching course detail!', error);
            });
    }, [id]);

    if (!course) return <p>Loading...</p>;

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
                <button onClick={() => navigate(`/course/${id}/videos`)} className="watch-button">
                    ซื้อคอร์สเพื่อดูบทเรียนเพิ่มเติม
                </button>
            </div>
        </div>
    );
}

export default CourseDetail;
