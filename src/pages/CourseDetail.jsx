import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../style/Detail.css";

function CourseDetail() {
    const { id } = useParams();  // Get the course ID from the URL
    const [course, setCourse] = useState(null);
    const videos = [
        "https://www.youtube.com/embed/g64BkZjSNBM?si=_JD5n2x3wesr-yi_", // Chapter 1
        "https://www.youtube.com/embed/oBokMzyNz8o?si=oWuJfQ43wlHw2h9T", // Chapter 2
        "https://www.youtube.com/embed/u5LJYVoWnIU?si=_wFPBVcOR_G6nITp", // Chapter 3
        "https://www.youtube.com/embed/nA-7PjZrlpE?si=L4SGbro_liJ06PHt", // Chapter 4
        "https://www.youtube.com/embed/465t5t8T4pU?si=NJReemoERN6k1LGb"  // Chapter 5
    ];

    const [currentVideo, setCurrentVideo] = useState(videos[0]);

    useEffect(() => {
        axios.get(`http://localhost:1337/api/courses/${id}?populate=*`)
            .then(response => {
                setCourse(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching course detail!', error);
            });
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div className="course-detail-container">
            {/* Video Section */}
            <div className="video-section">
                <h1>{course.title}</h1>
                <p>{course.fullDescription}</p>

                {/* วิดีโอหลักที่เปลี่ยนตาม Sidebar */}
                <iframe
                    width="100%"
                    height="400"
                    src={currentVideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Sidebar Section */}
            <div className="sidebar-detail">
                <h2>Lessons</h2>
                <ul>
                    {videos.map((video, index) => (
                        <li key={index} onClick={() => setCurrentVideo(video)} style={{ cursor: "pointer" }}>
                            Chapter {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CourseDetail;
