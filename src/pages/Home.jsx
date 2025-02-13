import React from 'react';
import CourseCard from '../Components/CourseCard';
import "../style/home.css";
import { courses } from '../Components/AllCourse'; 

function Home() {
  return (
    <>
    <div className="home-page">
      <h1>Welcome to UniMaster</h1>
      <p>Master Your Feature with UniMaster</p>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;
