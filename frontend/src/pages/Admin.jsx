import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [showpopup, setshowpopup] = useState(false);
  const [msg, setmsg] = useState(false);
  const [userId, setuserId] = useState(null);
  const [msgText, setmsgText] = useState("");
  const [userlist, setuserlist] = useState([]);
  const [input_formData, setinput_formData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  // AddUser or Update User
  async function handleAddUser() {
    setshowpopup(true);
  }

  function handleClose() {
    setinput_formData({
      username: "",
      email: "",
      password: "",
      phone: "",
    });
    setshowpopup(false);
  }

  function handleEdit(id) {
    const user = userlist.find((user) => user._id === id);

    if (user) {
      setinput_formData(user);
      setuserId(id);
      setshowpopup(true);
    }
  }

  async function handleAddBtn() {
    try {
      if (userId) {
        const res = await axios.put(
          `http://localhost:4000/admin/edituser/${userId}`,
          input_formData
        );

        // state also Update
        setuserlist((pre) =>
          pre.map((el) => (el._id === userId ? { ...el, ...res.data } : el))
        );

        setuserId(null);
      } else {
        console.log(input_formData);
        const res = await axios.post(
          "http://localhost:4000/admin/adduser",
          input_formData
        );
        setuserlist((pre) => [...pre, res.data]);
      }

      setinput_formData({
        username: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);
    }

    setshowpopup(false);
    setmsg(true);
    setmsgText("Added Successfuly!");
    setTimeout(() => {
      setmsg(false);
    }, 2000);
  }
  //
  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `http://localhost:4000/admin/deleteuser/${id}`
      );
      setuserlist((pre) => pre.filter((el) => el._id != id));
    } catch (error) {
      console.log("Error Deleting Msg: " + error);
    }

    setmsg(true);
    setmsgText("Delete Successfuly!");
    setTimeout(() => {
      setmsg(false);
    }, 2000);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setinput_formData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogout() {
    try {
      const res = await axios.post("http://localhost:4000/admin/logout");
      res.then((data) => {
        if (data.status == 201) {
          return navigate("/adminlogin");
        }
      });
    } catch (error) {
      console.log("Login Error: " + error);
    }
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/user");
      setuserlist(res.data);
    } catch (error) {
      console.log("Fetch User: " + error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container">
          <div className="nav-wrapper">
            <h2>Manage Users Data</h2>
            <div className="user_func">
              <button className="newuser" onClick={handleAddUser}>
                Add New user
              </button>
              <button className="logout">
                <Link
                  to="/adminlogin"
                  style={{
                    all: "unset",
                    color: "white",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>

      {msg && (
        <>
          <div
            className="msg_show"
            style={{
              backgroundColor:
                msgText === "Delete Successfuly!" ? "#ff4d4d" : "#007bff",
            }}
          >
            <h3>{msgText}</h3>
          </div>
        </>
      )}

      <section className="viewDetail">
        <div className="container">
          <div className="viewDetail-wrapper">
            <div className="viewDetail_title">
              <table border={1}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userlist.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        No User Found
                      </td>
                    </tr>
                  ) : (
                    userlist.map((el, i) => (
                      <tr key={el?._id || i}>
                        <td>{el?.username || "N/A"}</td>
                        <td>{el?.email || "N/A"}</td>
                        <td>{el?.phone || "N/A"}</td>
                        <td>
                          <FaEdit
                            style={{ color: "#BCC02E", cursor: "pointer" }}
                            onClick={() => handleEdit(el._id)}
                          />
                          <RiDeleteBinLine
                            style={{
                              color: "#BCC02E",
                              cursor: "pointer",
                              marginLeft: "20px",
                            }}
                            onClick={() => handleDelete(el._id)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showpopup && (
        <>
          <section className="popup">
            <div className="container">
              <div className="popup_title">
                <h3>Add Employee</h3>
                <AiOutlineClose
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                />
              </div>
              <div className="popup-wrapper">
                <form action="">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={input_formData.username}
                    placeholder="Username"
                    onChange={handleChange}
                  />
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={input_formData.email}
                    placeholder="email"
                    onChange={handleChange}
                  />
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={input_formData.phone}
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                  <label>Password</label>
                  <input
                    type="text"
                    name="password"
                    value={input_formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </form>
                <div className="popup_btn">
                  <button className="cancel" onClick={handleClose}>
                    Cancel
                  </button>
                  <button className="add" onClick={handleAddBtn}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Admin;
