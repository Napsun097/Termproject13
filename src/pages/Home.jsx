import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCourses } from "../api/api"; 
import "../style/home.css";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const { courses, error } = await fetchCourses();
      setCourses(courses);
      setError(error);
      setLoading(false);
    }

    getCourses();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>กำลังโหลด... ใจเย็นๆ น่ะจ่ะ</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <h1>Welcome to UniMaster</h1>
      <p>Master Your Future with UniMaster</p>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Home;
