import React, { useState, useEffect } from "react";
import "../style/profile.css";  // ถ้าคุณมีไฟล์สไตล์
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);  // เก็บข้อมูลผู้ใช้
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");  // หากไม่พบข้อมูลผู้ใช้ให้ไปหน้า Login
    } else {
      setUser(storedUser);
    }
  }, [navigate]);


  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <label>Username</label>
          <p>{user.username}</p>
        </div>
        <div className="profile-item">
          <label>Email</label>
          <p>{user.email}</p>
        </div>
        <div className="profile-item">
          <label>Role</label>
          <p>{user.role?.type || "User"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
