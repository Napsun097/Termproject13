import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import CourseCard from "../Components/CourseCard";
import { fetchCourses } from "../api/api";
import "../style/home.css";
import picpromotion from "../assets/images/promotion.webp";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CourseCarousel = ({ title, courses, userId }) => {
  return (
    <div className="course-category">
      <div className="head-card-home"><h2 >{title}</h2>
        <Link to="/" className="see-more">
          ดูเพิ่มเติม&nbsp;&nbsp;<ArrowRight />
        </Link>

      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}  // เปลี่ยนค่าเริ่มต้นเป็น 4 คอร์ส
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },  // หน้าจอเล็กสุดแสดง 1 คอร์ส
          1024: { slidesPerView: 2 }, // แท็บเล็ตแสดง 2 คอร์ส
          1280: { slidesPerView: 3 }, // หน้าจอใหญ่ปานกลางแสดง 3 คอร์ส
          1440: { slidesPerView: 4 }, // หน้าจอใหญ่แสดง 4 คอร์ส
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} userId={userId} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

function Home({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = user ? user.id : null;

  async function getCourses() {
    setLoading(true);
    const { courses, error } = await fetchCourses();
    setCourses(courses);
    setError(error);
    setLoading(false);
  }

  useEffect(() => {
    getCourses();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>กำลังโหลด...</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  // แยกประเภทคอร์ส
  const premiumCourses = courses.filter((course) => course.type === "premium");
  const standardCourses = courses.filter((course) => course.type === "standard");

  return (
    <div className="home-page">
      {/* ส่วนของโปรโมชั่น */}
      <div className="head-promotion">
        <div className="head-welcome">
          <h1 className="text-welcome">
            Welcome to <span>UniMaster</span>
          </h1>
          <p className="text-welcome-sub">Master Your Future with UniMaster</p>
          <br />
          <Link to="/about" className="about-page-go">
            <button>
              More About Us <ArrowRight />
            </button>
          </Link>
        </div>
        <div className="img-promotion">
          <img src={picpromotion} alt="Promotion" />
        </div>
      </div>
      <div className="type-area-home">
        <div className="head-type-navlink-home">
          <h1>ประเภทคอร์ส</h1>
        </div>
        <div className="type-course-container">
          <div className="course-box">
            <Link to="/tgat" className="nav-link-type-course">
              <h1>TGAT</h1>
              <p>Thai General Aptitude Test</p>
              <p>วิชาความถนัดทั่วไป</p>
            </Link>
          </div>
          <div className="course-box">
            <Link to="/tpat" className="nav-link-type-course">
              <h1>TPAT</h1>
              <p>Thai Professional Aptitute Test</p>
              <p>ข้อสอบวัดความถนัดทางวิชาชีพ</p>
            </Link>
          </div>
          <div className="course-box">
            <Link to="/a-level" className="nav-link-type-course">
              <h1>A-level</h1>
              <p>Applied Knowledge Level</p>
              <p>ข้อสอบวัดความรู้พื้นฐานทางวิชาการ</p>
            </Link>
          </div>
        </div>
      </div>


      <div className="head-course-home">
        <h1>คอร์สเรียน</h1>
      </div>
      <div className="course-container-home">
        {premiumCourses.length > 0 && <CourseCarousel title="🔥 คอร์สเรียน A-level / TGAT / TPAT สุดฮิต ไม่เรียนไม่ได้แล้ว!!!" courses={premiumCourses} userId={userId} />}
        {standardCourses.length > 0 && (
          <>

            <CourseCarousel title="😵‍💫 คอร์ส One Night Miracle เรียนคืนเดียว ไม่ได้ไรเลย" courses={standardCourses} userId={userId} />
            <CourseCarousel title="📚 คอร์สสุดคุ้ม" courses={standardCourses} userId={userId} />
            <CourseCarousel title="📝 คอร์สเสริมตะลุยโจทย์" courses={standardCourses} userId={userId} />
            <CourseCarousel title="🎓 ทดลองเรียน พื้นฐาน" courses={standardCourses} userId={userId} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
