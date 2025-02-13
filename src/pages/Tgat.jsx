import React, { useState } from "react";
import CourseCard from "../Components/CourseCard"; 
import { courses } from "../Components/AllCourse";
import "../style/tgat.css";

function Tgat() {
    // กรองคอร์สที่มี category เป็น "tgat"
    const tgatCourses = courses.filter(course => course.category === "tgat");

    // สร้าง state สำหรับกรองตามรหัสวิชา
    const [filteredCourses, setFilteredCourses] = useState(tgatCourses);

    // ฟังก์ชันกรองคอร์สตามรหัสวิชา
    function filterCoursesByCode(code) {
        const filtered = tgatCourses.filter(course => 
            course.title.toLowerCase().replace(/\s/g, "").includes(code.toLowerCase().replace(/\s/g, ""))
        );
        setFilteredCourses(filtered);
    }
    
    // ฟังก์ชันสำหรับรีเซ็ตการกรองและแสดงคอร์สทั้งหมด
    function showAllCourses() {
        setFilteredCourses(tgatCourses); // รีเซ็ตกลับมาแสดงคอร์สทั้งหมด
    }

    return (
        <div className="tgat-page">
            {/* Sidebar (Nav ด้านข้าง) */}
            <div className="sidebar">
                <h2>รายวิชา</h2>
                <button onClick={() => filterCoursesByCode("TGAT1")}>TGAT 1</button>
                <button onClick={() => filterCoursesByCode("TGAT2")}>TGAT 2</button>
                <button onClick={() => filterCoursesByCode("TGAT3")}>TGAT 3</button>
                {/* ปุ่มรวมทุกวิชา */}
                <button onClick={showAllCourses}>รวมทุกวิชา</button>
            </div>

            {/* แสดงรายการคอร์ส */}
            <div className="course-list">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Tgat;
