import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignUp = () => {
  const [login, setLogin] = useState(false); // Toggle between login and register
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loginform_data, setloginform_data] = useState({
    email: "",
    password: "",
  });

  // Toggle Login/Register View
  const handleToggle = (view) => setLogin(view === "login");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Register Form Submission
  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:4000/user/", formData);
      const { _id } = res.data;

      // Store user ID in localStorage
      localStorage.setItem("ID", JSON.stringify(_id));

      // Reset form and navigate to home
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  const handleloginChange = (e) => {
    const { name, value } = e.target;
    setloginform_data((pres) => ({ ...pres, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        loginform_data
      );
      const { _id } = res.data;

      // Store user ID in localStorage
      localStorage.setItem("ID", JSON.stringify(_id));

      setloginform_data({
        email: "",
        password: "",
      });
      navigate("/home");
    } catch (error) {
      console.log("Login failed: " + error);
    }
  };

  return (
    <>
      <section className="user">
        <div className="container">
          <h2 className="click_here">
            <span>
              <Link
                style={{
                  all: "unset", // Resets all inherited styles
                  color: "white", // Ensures no specific color is applied
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                to="/adminlogin"
              >
                Click Here for Admin Login
              </Link>
            </span>
          </h2>
          <div className="user-wrapper">
            <div className="user_title">
              <span
                onClick={() => handleToggle("login")}
                style={{ color: login ? "#FFFF00" : "white" }}
              >
                Login
              </span>
              <span
                onClick={() => handleToggle("register")}
                style={{ color: login ? "white" : "#FFFF00" }}
              >
                Register
              </span>
            </div>
            {login ? (
              <div className="user_details">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={loginform_data.email}
                  onChange={handleloginChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginform_data.password}
                  onChange={handleloginChange}
                />
                <button className="login" onClick={handleLogin}>
                  LOG IN
                </button>
              </div>
            ) : (
              <div className="user_details">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button className="register" onClick={handleRegister}>
                  REGISTER NOW
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSignUp;
