import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

import { API_URL } from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid username or password");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        err.message.includes("Failed to fetch")
          ? "Backend server is not running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-logo">
          ☁ Mini Drive
        </h1>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="switch-text">
          Don't have an account?
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;