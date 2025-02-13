import React from "react";
import CourseCard from "../Components/CourseCard"; 
import { courses } from "../Components/AllCourse";

function Alevel() {
    // กรองคอร์สที่มี category เป็น "a-level"
    const alevelCourses = courses.filter(course => course.category === "a-level");

    return (
        <div className="alevel-page">
            {/* เพิ่ม Nav ด้านข้าง */}
            <div className="course-list">
                {alevelCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Alevel;
