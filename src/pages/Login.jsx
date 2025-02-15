import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // ฟังก์ชัน login API
import "../style/login.css"; // ใช้ไฟล์ CSS ที่แก้ไข

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // เรียกฟังก์ชัน login และจัดการการเข้าสู่ระบบ
      const data = await login(username, password);
      localStorage.setItem("token", data.jwt); // เก็บ token ใน localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // เก็บข้อมูลผู้ใช้ใน localStorage
      setUser(data.user); // ตั้งค่าผู้ใช้ในแอป
      navigate("/"); // ไปที่หน้า Home หลังจากเข้าสู่ระบบสำเร็จ
    } catch (err) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); // แสดงข้อความเมื่อเกิดข้อผิดพลาด
    }
  };

  return (
    <div className="login-container">
      {/* ฝั่งซ้าย: รูปภาพ */}
      <div className="login-image"></div>

      {/* ฝั่งขวา: ฟอร์มล็อกอิน */}
      <div className="login-form">
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">ชื่อผู้ใช้:</label>
            <input
              type="text"
              id="username"
              placeholder="กรอกชื่อผู้ใช้"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">รหัสผ่าน:</label>
            <input
              type="password"
              id="password"
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
