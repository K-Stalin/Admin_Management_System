import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const ID = localStorage.getItem("ID");
  const _id = ID ? JSON.parse(ID) : null;

  const [user_details, setuser_details] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/home/${_id}`);
      setuser_details([res.data]);
    } catch (error) {
      console.error("Error fetching user details:");
    }
  };

  async function handleLogout() {
    try {
      const res = axios.post("http://localhost:4000/user/logout");
      const { data } = res;
      if (data) {
        return localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container">
          <div className="nav-wrapper">
            <h1>Welcome to Careerpod</h1>
            <Link to="/">
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </header>

      <section className="careerpod">
        <div className="container">
          <h4 className="user_details">User Details</h4>
          <div className="careerpod-wrapper">
            <table border={1}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {user_details.length === 0 ? (
                  <tr>
                    <td colSpan="3">No user details available</td>
                  </tr>
                ) : (
                  user_details.map((el) => (
                    <tr key={el._id}>
                      <td>{el.username}</td>
                      <td>{el.email}</td>
                      <td>{el.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
