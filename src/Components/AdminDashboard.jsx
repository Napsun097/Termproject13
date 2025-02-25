import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css"; // ✅ Import ไฟล์ CSS

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courseCount, setCourseCount] = useState(0); // จำนวนคอร์ส
  const [totalRevenue, setTotalRevenue] = useState(0); // รายได้ทั้งหมด
  const [studentCount, setStudentCount] = useState(0); // จำนวนนักเรียน
  const [teacherCount, setTeacherCount] = useState(0); // จำนวนครูผู้สอน

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // ✅ ตรวจสอบว่า User มี role เป็น Admin หรือไม่
    if (!storedUser || !storedUser.roles || !storedUser.roles.includes("Admin")) {
      navigate("/"); // 🔥 ถ้าไม่ใช่ Admin ให้กลับไปหน้า Home
    }
  }, [navigate]);

  // จำลองข้อมูลที่สามารถดึงจาก API หรือ Database
  useEffect(() => {
    // ในที่นี้ใช้ setTimeout เพื่อจำลองการดึงข้อมูลจาก API
    setTimeout(() => {
      setCourseCount(25); // จำนวนคอร์ส
      setTotalRevenue(1000000); // รายได้ทั้งหมด
      setStudentCount(500); // จำนวนนักเรียน
      setTeacherCount(30); // จำนวนครูผู้สอน
    }, 1000);
  }, []);

  return (
    <div className="admin-container">

      {/* แสดงข้อมูลสถิติ */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>จำนวนคอร์ส</h3>
          <p>{courseCount}</p>
        </div>
        <div className="stat-card">
          <h3>รายได้ทั้งหมด</h3>
          <p>{totalRevenue.toLocaleString()} บาท</p>
        </div>
        <div className="stat-card">
          <h3>จำนวนนักเรียน</h3>
          <p>{studentCount}</p>
        </div>
        <div className="stat-card">
          <h3>จำนวนครูผู้สอน</h3>
          <p>{teacherCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
