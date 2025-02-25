import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css"; // ✅ Import ไฟล์ CSS

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // ✅ ตรวจสอบว่า User มี role เป็น Admin หรือไม่
    if (!storedUser || !storedUser.roles || !storedUser.roles.includes("Admin")) {
      navigate("/"); // 🔥 ถ้าไม่ใช่ Admin ให้กลับไปหน้า Home
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-text">ยินดีต้อนรับสู่แผงควบคุมของแอดมิน</p>

      {/* ✅ ปุ่มกลับหน้า Home */}
      <div className="button-group">
        <button className="admin-button" onClick={() => navigate("/")}>
          กลับหน้า Home
        </button>
        <button className="admin-button" onClick={() => navigate("/admin")}>
          Admin Panel
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;