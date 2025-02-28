import React, { useState, useEffect } from "react";
import "../style/profile.css";  // Updated CSS styles
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Your Profile</h1>
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <label className="profile-label">Username</label>
            <p className="profile-value">{user.username}</p>
          </div>
          <div className="profile-item">
            <label className="profile-label">Email</label>
            <p className="profile-value">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
