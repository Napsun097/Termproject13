import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCourses } from "../api/api";
import "../style/home.css";
import picpromotion from "../assets/images/TCAS.webp";

function Home() {
  const [courses, setCourses] = useState([]); {/* State สำหรับเก็บข้อมูลคอร์ส */ }
  const [loading, setLoading] = useState(true); {/* State สำหรับโหลดข้อมูล */ }
  const [error, setError] = useState(null); {/* State สำหรับจัดการข้อผิดพลาด */ }

  {/* ดึงข้อมูลคอร์สเมื่อ Component ถูกโหลด */ }
  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      const { courses, error } = await fetchCourses();
      setCourses(courses);
      setError(error);
      setLoading(false);
    }

    getCourses();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>กำลังโหลด... ใจเย็นๆน่ะจ่ะ...</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  // แยกคอร์สเป็น 2 ประเภท: ยอดนิยม และ อื่นๆ
  const premiumCourses = courses.filter(course => course.type === 'premium');
  const standardCourses = courses.filter(course => course.type === 'standard');

  return (
    <>
      <div className="home-page">
        <h1>Welcome to UniMaster</h1>
        <p>Master Your Future with UniMaster</p><br />

        {/* ส่วนของโปรโมชั่น */}
        <div className="promotion">
          <p>promotion</p>
          <img src={picpromotion} alt="" />
          <p>promotion</p>
        </div>
        <br />

        {/* ส่วนของคอร์สยอดนิยม */}
        {premiumCourses.length > 0 ? (
          <div className="course-category">
            <h2>คอร์สยอดนิยม</h2>
            <div className="course-list">
              {premiumCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <p>No premium courses available at the moment.</p>
        )}
        <br />

        {/* ส่วนของคอร์สอื่นๆ */}
        {standardCourses.length > 0 ? (
          <div className="course-category">
            <h2>คอร์สอื่นๆ</h2>
            <div className="course-list">
              {standardCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <p>No standard courses available at the moment.</p>
        )}
      </div>

    </>
  );
}

export default Home;
