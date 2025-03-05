import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCoursesByCategory } from "../api/api";
import "../style/tgat.css";
import { Link } from "react-router-dom";
import config from "../config";

function Tpat() {
  const [courses, setCourses] = useState([]); // State for all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [activeLink, setActiveLink] = useState('TPAT'); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

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
    <div className="tgat-page">
      <div className="sidebar-tgat-select">
      <div className="link-tgat-tpat-alevel">
      <Link
        to="/tgat"
        className={`nav-link ${activeLink === 'TGAT' ? 'active' : ''}`}
        onClick={() => handleLinkClick('TGAT')}
      >
        TGAT
      </Link>
      <Link
        to="/tpat"
        className={`nav-link ${activeLink === 'TPAT' ? 'active' : ''}`}
        onClick={() => handleLinkClick('TPAT')}
      >
        TPAT
      </Link>
      <Link
        to="/a-level"
        className={`nav-link ${activeLink === 'A-Level' ? 'active' : ''}`}
        onClick={() => handleLinkClick('A-Level')}
      >
        A-Level
      </Link>
    </div>
        <h2 className="head-select-dropdown">TPAT</h2>
        <select className="dropdown" onChange={handleDropdownChange}>
          <option value="all">ทุกวิชา</option>
          {["TPAT1", "TPAT2", "TPAT3", "TPAT4", "TPAT5"].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="course-list-tgat">
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
