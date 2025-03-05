import React from "react";
import axios from "axios";
import "../style/admin.css";
import { Button, message } from "antd";
import config from "../config"

const UserCard = ({ user, onUserDeleted }) => {
  if (!user) return <p>No user selected</p>;

  const handleDelete = async () => {
    if (!user || !user.id) return;
  
    try {
      console.log("🗑️ Attempting to delete user:", user.id);
  
      const response = await axios.delete(`${config.serverUrlPrefix}/users/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      console.log("✅ Delete Response:", response);
  
      if (response.status === 200 || response.status === 204) {
        message.success(`User ${user.username} deleted successfully`);
        onUserDeleted(user.id);
      } else {
        message.error("Failed to delete user: Unexpected response");
      }
    } catch (error) {
      console.error("❌ Error deleting user:", error?.response?.data || error.message);
      message.error("Failed to delete user");
    }
  };

  return (
    <div className="user-card">
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <Button type="primary" danger onClick={handleDelete}>
        Delete User
      </Button>
    </div>
  );
};

export default UserCard;