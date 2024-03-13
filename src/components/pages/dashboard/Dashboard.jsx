import React from "react";
import "./Dashboard.css";
import logo from "../../../assets/logo.png";
import { color } from "framer-motion";
const Dashboard = () => {
  return (
    <main>
      <div className="header">
        <div className="left">
          <h1
            className="title"
            style={{
              color: "blue",
            }}
          >
            Dashboard
          </h1>
        </div>
        <a href="#" className="report">
          <i className="bx bx-cloud-download"></i>
          <span>Download CSV</span>
        </a>
      </div>

      {/* Insights  */}
      <ul className="insights">
        <li>
          <img src={logo} alt="" />
          <span className="info">
            <h3>1,100</h3>
            <p>Sự kiện tết</p>
          </span>
        </li>

        <li>
          <img src={logo} alt="" />
          <span className="info">
            <h3>1,212</h3>
            <p>Sự kiện Noel</p>
          </span>
        </li>
        <li>
          <img src={logo} alt="" />
          <span className="info">
            <h3>1,320</h3>
            <p>Sự kiện hè</p>
          </span>
        </li>
        <li>
          <img src={logo} alt="" />
          <span className="info">
            <h3>2,340</h3>
            <p>Sự kiện trung thu</p>
          </span>
        </li>
      </ul>
      {/* End of Insights */}
    </main>
  );
};
export default Dashboard;
