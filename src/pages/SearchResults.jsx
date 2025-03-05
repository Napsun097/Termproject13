import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseCard from "../Components/CourseCard";
import "../style/searchresult.css";
import config from "../config";

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query") || "";
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const response = await fetch(`${config.serverUrlPrefix}/courses?populate=*`);
        const data = await response.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setLoading(false);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      (course.category?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (course.subjectName?.toLowerCase() || "").includes(query.toLowerCase())
    );
    
    setFilteredCourses(filtered);
  }, [query, courses]);

  if (loading) // ✅ จัดการโหลดแค่ตรงนี้ (ไม่ต้องซ้ำด้านล่าง)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>⏳ กำลังโหลด... ใจเย็นๆ นะจ้า 😃</p>
      </div>
    );

  return (
    <div>
      <h2 className="search-result-head">ผลลัพธ์การค้นหา: "{query}"</h2>
      <div className="course-list-search">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="search-result-text">ไม่พบคอร์สที่ตรงกับ "{query}"</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
