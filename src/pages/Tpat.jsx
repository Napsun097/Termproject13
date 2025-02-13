import React from "react";
import CourseCard from "../Components/CourseCard"; 
import { courses } from "../Components/AllCourse";

function Tpat() {
    // กรองคอร์สที่มี category เป็น "tpat"
    const tpatCourses = courses.filter(course => course.category === "tpat");

    return (
        <div className="tpat-page">
            {/* เพิ่ม Nav ด้านข้าง */}
            <div className="course-list">
                {tpatCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Tpat;