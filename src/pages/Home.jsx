import React, { useState, useEffect } from "react";
import CourseCard from "../Components/CourseCard";
import { fetchCourses } from "../api/api";
import "../style/home.css";
import picpromotion from "../assets/images/promotion.webp";
import Link from "antd/es/typography/Link";

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


        {/* ส่วนของโปรโมชั่น */}
        <div className="head-promotion">
          <div className="head-welcome">
            <h1 className="text-welcome"> Welcome to <span>UniMaster</span> </h1>
            <p className="text-welcome">Master Your Future with UniMaster</p><br />
            <button className="about-welcome-btn">
              <Link to=""> เกี่ยวกับสถาบัน </Link>
            </button>
            
          </div>
          <div className="img-promotion">
            <img src={picpromotion} alt="" />
          </div>

        </div>
        <br />
        <div className="course-container">

           {/* ส่วนของคอร์สยอดนิยม */}
        {premiumCourses.length > 0 ? (
          <div className="course-category">
            <h2>| คอร์สเรียน Hot Selling</h2>
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
            <h2>| คอร์สอื่นๆ</h2>
            <div className="course-list">
              {standardCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <p>No standard courses available at the moment.</p>
        )}

        <br />
        {standardCourses.length > 0 ? (
          <div className="course-category">
            <h2>| คอร์สอื่นๆ</h2>
            <div className="course-list">
              {standardCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <p>No standard courses available at the moment.</p>
        )}

        <br />
        {standardCourses.length > 0 ? (
          <div className="course-category">
            <h2> | แพ็คคู่ มาราธอน </h2>
            <div className="course-list">
              {standardCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <p>No standard courses available at the moment.</p>
        )}
        <br />

        {standardCourses.length > 0 ? (
          <div className="course-category">
            <h2> | คอร์สเสริมตะลุยโจทย์</h2>
            <div className="course-list">
              {standardCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : (
          <p>No standard courses available at the moment.</p>
        )}

        <br />

        {standardCourses.length > 0 ? (
          <div className="course-category">
            <h2>| ทดลองเรียน พื้นฐาน</h2>
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
        </div>
       

    </>
  );
}

export default Home;
