import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCoursesByCategory } from "../api/api";
import "../style/allcourse.css";
import { Link } from "react-router-dom";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const categories = ["tgat", "tpat", "a-level"];
      let allCourses = [];
      
      for (const category of categories) {
        const { courses: categoryCourses, error } = await fetchCoursesByCategory(category);
        if (error) {
          setError(error);
          setLoading(false);
          return;
        }
        allCourses = [...allCourses, ...categoryCourses];
      }
      setCourses(allCourses);
      setFilteredCourses(allCourses);
      setLoading(false);
    }
    getCourses();
  }, []);

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
        <p>กำลังโหลด...</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="allcourse-page">
      <div className="course-list-all">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <p className="no-courses">ไม่พบรายวิชา</p>
        )}
      </div>
    </div>
  );
}

export default AllCourses;
