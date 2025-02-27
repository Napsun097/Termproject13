import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import "../style/login.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }

        try {
            await register(username, email, password); 
            alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
            navigate("/login");
        } catch (err) {
            setError("สมัครสมาชิกไม่สำเร็จ");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>สมัครสมาชิก</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username">username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">อีเมล:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-btn">สมัครสมาชิก</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
