import React, { useState } from "react";
import "../style/admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("course");

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
        {activeTab === "course" && <h1>Course Management</h1>}
        {activeTab === "user" && <h1>User Management</h1>}
      </div>
    </div>
  );
};

export default Admin;