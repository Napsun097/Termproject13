import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "../style/login.css";
import logo from "../assets/images/logo.png";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("username", data.user.username);
      setUser(data.user);

      if (data.user.roles && data.user.roles.includes("Admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img className="logo-login-page" src={logo} alt="logo-web" />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">username:</label>
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
            <label htmlFor="password">password:</label>
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

          {/* ปุ่มสมัครสมาชิก */}
          <button
            type="button"
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            สมัครสมาชิก
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
