import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCoursesByCategory } from "../api/api"; 
import "../style/alevel.css";

function Alevel() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const { courses, error } = await fetchCoursesByCategory("a-level");
      setCourses(courses);
      setFilteredCourses(courses); // เริ่มต้นแสดงทั้งหมด
      setError(error);
      setLoading(false);
    }
    getCourses();
  }, []);

  function filterCoursesByCode(code) {
    const filtered = courses.filter(course =>
      course.subjectName?.toLowerCase().includes(code.toLowerCase())
    );
    setFilteredCourses(filtered);
  }

  function showAllCourses() {
    setFilteredCourses(courses);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="alevel-page">
      <div className="sidebar">
        <h2>เลือก A-Level</h2>
        {["Math1", "Math2", "Physics", "Chemistry", "Biology", "English"].map((subject) => (
          <button key={subject} onClick={() => filterCoursesByCode(subject)}>
            A-Level {subject}
          </button>
        ))}
        <button onClick={showAllCourses}>แสดงทั้งหมด</button>
      </div>

      <div className="course-list">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Alevel;
