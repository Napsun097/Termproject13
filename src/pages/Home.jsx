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

const CourseCarousel = ({ title, courses }) => {
  return (
    <div className="course-category">
      <div className="head-card-home"><h2 >{title}</h2>
        <Link to="/" className="see-more">
          เพิ่มเติม&nbsp;&nbsp;<ArrowRight />
        </Link>

      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <p>กำลังโหลด... ใจเย็นๆน่ะจ่ะ...</p>
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

      <div className="course-container-home">
        {premiumCourses.length > 0 && <CourseCarousel title="🔥 คอร์สเรียน Hot Selling" courses={premiumCourses} />}
        {standardCourses.length > 0 && (
          <>
            <CourseCarousel title="📚 คอร์สอื่นๆ" courses={standardCourses} />
            <CourseCarousel title="🏃‍♂️ แพ็คคู่สุดคุ้ม" courses={standardCourses} />
            <CourseCarousel title="📝 คอร์สเสริมตะลุยโจทย์" courses={standardCourses} />
            <CourseCarousel title="🎓 ทดลองเรียน พื้นฐาน" courses={standardCourses} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
