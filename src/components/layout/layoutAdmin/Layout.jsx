import React, { useState, useEffect } from "react";
import "./Layout.css";
import logo from "../../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Persons from "../../pages/persons/Persons";
import Users from "../../pages/user/Users";
import CreateUser from "../../pages/CreateUser/CreateUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateUser from "../../pages/UpdateUser/UpdateUser";
const Layout = () => {
  const { pathname } = useLocation();
  // Active item sidebar khi click Vào
  const sideLinks = document.querySelectorAll(".side-menu li a:not(.logout)");
  // console.log(closeDashboard);
  sideLinks.forEach((item) => {
    const li = item.parentElement;
    item.addEventListener("click", () => {
      sideLinks.forEach((i) => {
        i.parentElement.classList.remove("active");
      });
      li.classList.add("active");
    });
  });

  // Mở đóng sidebar
  const menuBar = () => {
    const sideBar = document.querySelector(".sidebar");
    sideBar.classList.toggle("close");
  };

  // sự kiện đổi dark mode
  const [isChecked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!isChecked);
    document.body.classList = isChecked ? "" : "dark";
  };

  // xử lý sidebar khi resize window
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Theo dõi khi window thay đổi size

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // hiển thị size window khi thay đổi
    console.log(windowWidth);

    // window lắng nhe sự kiện resize, gọi tới handleResize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // [] đảm bảo use effect chỉ chạy 1 lần sau khi gắn thành phần
  // logout
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main">
      {/* Sidebar */}
      <div className={`sidebar ${windowWidth < 768 ? "close" : ""}`}>
        <a href="#" className="logo">
          <img src={logo} alt="" />
          <div className="logo-name">SEADRAGON</div>
        </a>
        <ul className="side-menu">
          <li className="active">
            <NavLink to="/admin/dashboard">
              <i className="bx bxs-dashboard"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/persons">
              <i class="bx bx-category"></i>Customer List
            </NavLink>
          </li>
          {/* <li>
            <a href="#">
              <i className="bx bx-analyse"></i>Analytics
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-message-square-dots"></i>Tickets
            </a>
          </li> */}
          <li>
            <NavLink to="/admin/users">
              <i className="bx bx-group"></i>Users
            </NavLink>
          </li>
          {/* <li>
            <a href="#">
              <i className="bx bx-cog"></i>Settings
            </a>
          </li> */}
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout" onClick={handleLogout}>
              <i className="bx bx-log-out-circle"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content  */}
      <div class="content ">
        {/* Navbar  */}
        <nav>
          <i onClick={menuBar} id="menu" class="bx bx-menu"></i>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleClick}
            id="theme-toggle"
            hidden
          />
          <label for="theme-toggle" className="theme-toggle"></label>
          <a href="#" className="notif">
            <i className="bx bx-bell"></i>
            <span className="count">12</span>
          </a>
          <a href="#" className="profile">
            <i className="bx bx-user"></i>
          </a>
        </nav>

        {/* End of Navbar  */}
        {/* main */}
        {pathname === "/admin" && <Navigate to="dashboard" />}
        <Routes>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="persons" element={<Persons />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="createUser" element={<CreateUser />}></Route>
          <Route path="updateUser/:id" element={<UpdateUser />}></Route>
        </Routes>
      </div>
    </div>
  );
};
export default Layout;
