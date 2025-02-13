import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // นำเข้าฟังก์ชัน login
import "../style/login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // เคลียร์ error ก่อน

    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      navigate("/"); // ไปหน้า Home หลังล็อกอิน
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
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
  );
};

export default Login;
