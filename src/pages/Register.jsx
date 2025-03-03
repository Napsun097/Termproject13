import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import "../style/login.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ โหลด Facebook SDK
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "YOUR_FACEBOOK_APP_ID", // 🔹 ใส่ App ID ของคุณที่นี่
                cookie: true,
                xfbml: true,
                version: "v18.0",
            });
        };

        // โหลด SDK ของ Facebook
        (function (d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    // ✅ จัดการสมัครสมาชิกแบบปกติ
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError("❌ รหัสผ่านไม่ตรงกัน");
            setLoading(false);
            return;
        }

        try {
            const data = await register(username, email, password);
            alert("✅ สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
            navigate("/login");
        } catch (err) {
            setError(err.message || "สมัครสมาชิกไม่สำเร็จ ❌");
        } finally {
            setLoading(false);
        }
    };

    // ✅ จัดการเข้าสู่ระบบด้วย Facebook
    const handleFacebookLogin = () => {
        window.FB.login(
            function (response) {
                if (response.authResponse) {
                    console.log("✅ Facebook Login Success", response);
                    alert("เข้าสู่ระบบด้วย Facebook สำเร็จ!");
                    navigate("/dashboard");
                } else {
                    console.log("❌ Facebook Login Failed");
                    setError("เข้าสู่ระบบด้วย Facebook ไม่สำเร็จ");
                }
            },
            { scope: "public_profile,email" }
        );
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>สมัครสมาชิก</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
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

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                    </button>
                        {/* facebook button */}
                </form>
            </div>
        </div>
    );
};

export default Register;
