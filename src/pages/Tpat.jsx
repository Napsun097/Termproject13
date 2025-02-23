import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCoursesByCategory } from "../api/api";
import "../style/tpat.css";

function Tpat() {
  const [courses, setCourses] = useState([]); // State for all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State to handle screen size for mobile responsiveness

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const { courses, error } = await fetchCoursesByCategory("tpat");
      setCourses(courses);
      setFilteredCourses(courses); // Initially show all courses
      setError(error);
      setLoading(false);
    }
    getCourses();
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle dropdown selection
  function handleDropdownChange(event) {
    const selectedValue = event.target.value;
    if (selectedValue === "all") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.subjectName?.toLowerCase().includes(selectedValue.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>กำลังโหลด... ใจเย็นๆ น่ะจ่ะ</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="tpat-page">
      <div className="subject-selector">
        <h2></h2>
        <select className="dropdown" onChange={handleDropdownChange}>
          <option value="all">ทุกวิชา</option>
          {["TPAT1", "TPAT2", "TPAT3", "TPAT4", "TPAT5"].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <p className="no-courses">ไม่พบรายวิชา</p>
        )}
      </div>
    </div>
  );
}

export default Tpat;
