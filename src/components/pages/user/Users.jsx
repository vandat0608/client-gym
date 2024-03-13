import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./Users.css";
const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <main>
      <div className="bottom-data">
        <div className="orders">
          <div className="header">
            <i className="bx bx-receipt"></i>
            <h3>
              Users Admin
              {/* <button type="button" className="btn btn-outline-danger">
                Delete
              </button> */}
            </h3>
            <NavLink
              to="/admin/createUser"
              type="button"
              className="btn btn-outline-primary"
            >
              Create User
            </NavLink>
          </div>
          <table className="table-secondary">
            <thead>
              <tr>
                <th className="col-1">
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                  />
                </th>

                <th className="col-3">Tài khoản</th>
                <th className="col-4">Email</th>
                <th className="col-2">Password</th>
              </tr>
            </thead>
            <tbody size="3" aria-label="size 3 select example">
              {users?.map((user, i) => (
                <tr key={i}>
                  <th>
                    <input
                      // checked={isChecked}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                  </th>

                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(user._id)}
                        className="btn btn-outline-danger"
                      >
                        Xóa
                      </button>
                      <NavLink
                        to={`/admin/updateUser/${user._id}`}
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Sửa
                      </NavLink>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
export default Users;
