import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [adminlogin, setadminlogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setadminlogin((prev) => ({ ...prev, [name]: value }));
  }
  const handlelogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/admin/login",
        adminlogin
      );
      const { data } = res;
      if (data) {
        return navigate("/admin");
      }
    } catch (error) {
      console.log("Admin Login" + error);
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
                to="/"
              >
                Click here for User login
              </Link>
            </span>
          </h2>
          <div className="user-wrapper">
            <div className="user_title">
              <div className="user_details">
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  required
                  name="email"
                  value={adminlogin.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  required
                  name="password"
                  value={adminlogin.password}
                  onChange={handleChange}
                />
                <button className="register" onClick={handlelogin}>
                  LOG IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginAdmin;
