import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../style/Detail.css";

function CourseDetail() {
    const { id } = useParams();  // Get the course ID from the URL
    const [course, setCourse] = useState(null);

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
                
                <div>
                    {/* YouTube Embed */}
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/g64BkZjSNBM?si=_JD5n2x3wesr-yi_"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Sidebar Section */}
            <div className="sidebar">
                <h2>Course Sections</h2>
                <ul>
                    {course.sections && course.sections.map((section, index) => (
                        <li key={index}>
                            <a href={`#${section.id}`}>{section.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CourseDetail;
