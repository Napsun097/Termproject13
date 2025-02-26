import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css"; // ✅ Import ไฟล์ CSS
import axios from "axios";
import { Button } from "antd";
import { Input } from "antd";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courseCount, setCourseCount] = useState(0); // จำนวนคอร์ส
  const [totalRevenue, setTotalRevenue] = useState(0); // รายได้ทั้งหมด
  const [studentCount, setStudentCount] = useState(0); // จำนวนนักเรียน
  const [teacherCount, setTeacherCount] = useState(0);
  const [newTeacherCount, setNewTeacherCount] = useState(teacherCount); // จำนวนครูผู้สอน
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // ✅ ตรวจสอบว่า User มี role เป็น Admin หรือไม่
    if (!storedUser || !storedUser.roles || !storedUser.roles.includes("Admin")) {
      navigate("/"); // 🔥 ถ้าไม่ใช่ Admin ให้กลับไปหน้า Home
    }
  }, [navigate]);

  // จำลองข้อมูลที่สามารถดึงจาก API หรือ Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        if (!token) {
          console.error("No JWT token found in localStorage");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        // Fetch total courses
        const coursesResponse = await axios.get("http://localhost:1337/api/courses");
        setCourseCount(coursesResponse.data.data.length);

        // Fetch sold courses (orders)
        const soldsResponse = await axios.get("http://localhost:1337/api/solds");
        const soldItems = soldsResponse.data.data;
        setTotalRevenue(soldItems.reduce((total, item) => total + item.price, 0));

        // Fetch total users (students)
        const usersResponse = await axios.get("http://localhost:1337/api/users?populate=*", { headers });
        const allUsers = usersResponse.data;
        const userRoleUsers = allUsers.filter(user => user.roles && user.roles === "User");
        setStudentCount(userRoleUsers.length);

        const teachersResponse = await axios.get("http://localhost:1337/api/teachers", { headers });
        if (teachersResponse.data.data.length > 0) {
          const teacherData = teachersResponse.data.data[0]; // Assuming there's only one teacher record
          setTeacherId(teacherData.documentId);
          setTeacherCount(teacherData.count);
          setNewTeacherCount(teacherData.count);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateTeacherCount = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        console.error("No JWT token found in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.put(`http://localhost:1337/api/teachers/${teacherId}`, {
        data: {
          count: newTeacherCount
        }
      }, { headers });

      setTeacherCount(newTeacherCount); // ✅ Update UI after successful update
      alert("Teacher count updated successfully!");
    } catch (error) {
      console.error("Error updating teacher count:", error);
    }
  };

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
          <Input
            type="number"
            value={newTeacherCount}
            onChange={(e) => setNewTeacherCount(parseInt(e.target.value, 10))}
            className="teacher-input"
          />
          <Button type="primary" onClick={updateTeacherCount} className="save-button">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
