const API_URL = "http://localhost:1337/api";

export const login = async (username, password) => {
  const loginData = { identifier: username, password: password };

  try {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Login failed.");

    return data; // return user + jwt
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const register = async (username, email, password) => {
  const registerData = { username, email, password };

  try {
    const response = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Registration failed.");

    // เก็บ token หลังจากสมัครเสร็จ
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
};
