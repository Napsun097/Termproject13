import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCoursesByCategory } from "../api/api";
import "../style/alevel.css";

function Alevel() {
  const [courses, setCourses] = useState([]);                   // State สำหรับเก็บข้อมูลคอร์ส
  const [filteredCourses, setFilteredCourses] = useState([]);     // State สำหรับเก็บคอร์สที่กรองแล้ว
  const [loading, setLoading] = useState(true);                   // State สำหรับโหลดข้อมูล
  const [error, setError] = useState(null);                         // State สำหรับจัดการข้อผิดพลาด

  {/* ดึงข้อมูลคอร์สเมื่อ Component ถูกโหลด */ }
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

  {/* ฟังก์ชันกรองคอร์สตามรหัส A-Level */ }
  function filterCoursesByCode(code) {
    const filtered = courses.filter(course =>
      course.subjectName?.toLowerCase().includes(code.toLowerCase())
    );
    setFilteredCourses(filtered);
  }

  function showAllCourses() {
    setFilteredCourses(courses);
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
    <div className="alevel-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>รายวิชา</h2>
        {["Math1", "Math2", "Physics", "Chemistry", "Biology", "English"].map((subject) => (
          <button key={subject} onClick={() => filterCoursesByCode(subject)}>
            A-Level {subject}
          </button>
        ))}
        <button onClick={showAllCourses}>ทุกวิชา</button>
      </div>
      {/* แสดงรายวิชา */}
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

export default Alevel;
