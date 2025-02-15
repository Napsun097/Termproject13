import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import "../style/tgat.css";
import { fetchCoursesByCategory } from "../api/api";

function Tgat() {
  const [courses, setCourses] = useState([]); // State สำหรับเก็บข้อมูลคอร์ส
  const [filteredCourses, setFilteredCourses] = useState([]); // State สำหรับเก็บคอร์สที่กรองแล้ว
  const [loading, setLoading] = useState(true); // State สำหรับโหลดข้อมูล
  const [error, setError] = useState(null); // State สำหรับจัดการข้อผิดพลาด

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const { courses, error } = await fetchCoursesByCategory("tgat");
      setCourses(courses);
      setFilteredCourses(courses); // เริ่มต้นแสดงทั้งหมด
      setError(error);
      setLoading(false);
    }
    getCourses();
  }, []);

  // ฟังก์ชันกรองคอร์สตามรหัส TGAT
  function filterCoursesByCode(code) {
    const filtered = courses.filter(course =>
      course.subjectName.toLowerCase().includes(code.toLowerCase())
    );
    setFilteredCourses(filtered); // อัพเดตคอร์สที่กรองแล้ว
  }

  

  // ฟังก์ชันรีเซ็ตการกรองทั้งหมด
  function showAllCourses() {
    setFilteredCourses(courses); // แสดงคอร์สทั้งหมด
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
      {/* Sidebar */}
      <div className="sidebar">
        <h2>รายวิชา</h2>
        <button onClick={() => filterCoursesByCode("TGAT1")}>TGAT 1</button>
        <button onClick={() => filterCoursesByCode("TGAT2")}>TGAT 2</button>
        <button onClick={() => filterCoursesByCode("TGAT3")}>TGAT 3</button>
        <button onClick={showAllCourses}>ทุกวิชา</button>
      </div>

      {/* แสดงรายการคอร์ส */}
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

export default Tgat;
