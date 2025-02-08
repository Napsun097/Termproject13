import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <h2> Login </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-login">
          <label> Username </label>
          <input
            type="username"
            placeholder="Enter Your Username....."
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-login">
          <label>Password </label>
          <input
            type="password"
            placeholder="Enter Your Password....."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn"> Login </button>
      </form>
    </div>
  );
}

export default Login;
