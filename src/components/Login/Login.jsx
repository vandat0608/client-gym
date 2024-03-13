import React from "react";
import "./Login.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  // Ẩn hiện mật khẩu
  const [passwordVisibility, setPasswordVisibility] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    console.log("helo");
  };
  // End hide password
  // validate
  const validate = (values) => {
    const errors = {};

    const passsword_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.username === "") {
      errors.username = "Name should not be empty";
    } else {
      errors.username = "";
    }

    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!passsword_pattern.test(values.password)) {
      errors.password = "Password has at least 1 capital letter and number";
    } else {
      errors.password = "";
    }

    return errors;
  };
  // End validate

  // Spinner
  const [loading, setLoading] = useState(false);
  const timeoutSpinner = setTimeout(() => {
    setLoading(false);
  }, 2000);
  // End Spinner
  // reset form
  const formSubmit = useRef();
  // end reset form

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.values(formErrors).every((error) => error === "")) {
      axios
        .post("http://localhost:8081/login", formValues)
        .then((res) => {
          console.log(res.data);
          if (res.data === "no data") {
            alert("Please enter data");
          } else if (res.data === "errorData") {
            alert("Please check again");
          } else if (res.data === "success") {
            setLoading(true);
            navigate("/admin");
          } else {
            alert("Account does not exist");
          }
        })
        .then((json) => {
          // console.log(json);
          setLoading(false);
        })
        .catch((err) => console.error(err));
      setLoading(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  bgLogin vh-100">
      <div className="blurLogin login-blur"></div>
      <div className="bgFormLogin p-3 w-30 h-60 rounded">
        <h2>Login</h2>
        <form action="" id="form-1" onSubmit={handleSubmit} ref={formSubmit}>
          <div className="mb-3 groupInput">
            <label htmlFor="" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              name="username"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Enter name"
            />
            <span className="text-danger ">{formErrors.username}</span>
          </div>
          <div className="mb-3 groupInput">
            <label htmlFor="" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
            />
            <label>
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={showPassword}
              />
              <strong>Show password</strong>
            </label>
          </div>
          <span className="text-danger">{formErrors.password}</span>
          <div className="mb-3 d-grid gap-2">
            <button type="submit" name="" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="mb-3 d-grid gap-2">
            <Link
              to="/signup"
              type="button"
              name=""
              className="btn btn-secondary"
            >
              Signup
            </Link>
          </div>
          <div className="mb-3 d-grid gap-2 justify-content-center">
            <span
              style={{ color: "white", cursor: "pointer" }}
              onClick={handleClick}
            >
              Forgot password ?
            </span>
          </div>
          <div className="spinnerLogin">
            {loading && <Spinner animation="border" variant="primary" />}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
