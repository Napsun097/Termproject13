import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCoursesByCategory } from "../api/api";
import "../style/tgat.css";
import { Link } from "react-router-dom";

function Alevel() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeLink, setActiveLink] = useState('A-Level'); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const { courses, error } = await fetchCoursesByCategory("a-level");
      setCourses(courses);
      setFilteredCourses(courses);
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
        <h2 className="head-select-dropdown"> A-Level </h2>
        <select className="dropdown" onChange={handleDropdownChange}>
          <option value="all">ทุกวิชา</option>
          {["Math1", "Math2", "Physics", "Chemistry", "Biology", "English", "Thai", "Social", "Japan", "Science", "Germany", "Korea", "Bahli", "France"].map((subject) => (
            <option key={subject} value={subject}>
              A-Level {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="course-list-tgat">

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <div className="no-course">
            <p>ไม่พบรายวิชา</p>
          </div>

        )}
      </div>
    </div>
  );
}

export default Alevel;
