import React, { useState, useEffect } from "react";
import "../style/admin.css";
import axios from "axios";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("course");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1337/api/courses?populate=image")
        .then(response => {
            console.log("Courses fetched:", response.data); // Debugging log

            // ✅ Ensure we correctly extract data from Strapi's structure
            if (response.data && response.data.data) {
                setCourses(response.data.data); // Set entire favorites list
            }
        })
        .catch(error => {
            console.error("Error fetching courses!", error);
        });
}, []);


  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li
            className={activeTab === "course" ? "active" : ""}
            onClick={() => setActiveTab("course")}
          >
            📚 Course
          </li>
          <li
            className={activeTab === "user" ? "active" : ""}
            onClick={() => setActiveTab("user")}
          >
            👤 User
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {activeTab === "course" && (
          <div>
            <h1>Course Management</h1>
            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((course) => {
                  // Extract attributes
                  const title = course.title;
                  const image = course.image[0];

                  // ✅ Extract large image URL
                  const imageUrl =
                    image && image.formats && image.formats.large
                      ? `http://localhost:1337${image.formats.large.url}`
                      : null;

                  return (
                    <div key={course.id} className="course-card">
                      <h3>{title}</h3>
                      {imageUrl ? (
                        <img src={imageUrl} alt={title} className="course-image" />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>Loading courses...</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "user" && <h1>User Management</h1>}
      </div>
    </div>
  );
};

export default Admin;