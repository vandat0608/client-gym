import React, { useRef } from "react";
import "./Signup.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../pages/formError/formError";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
function Signup() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // Ẩn hiện mật khẩu
  const [passwordVisibility, setPasswordVisibility] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  // End hide password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const navigate = useNavigate();
  // validate
  const validate = (values) => {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passsword_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.username === "") {
      errors.username = "Name should not be empty";
    } else {
      errors.username = "";
    }

    if (values.email === "") {
      errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email did not match";
    } else {
      errors.email = "";
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

  // Spinner
  const [loading, setLoading] = useState(false);
  const timeoutSpinner = setTimeout(() => {
    setLoading(false);
  }, 2000);
  // End Spinner
  // reset form
  const formSubmit = useRef();
  // end reset form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (Object.values(formErrors).every((error) => error === "")) {
      axios
        .post("http://localhost:8081/signup", formValues)
        .then((res) => {
          console.log(res);
          if (res.data === "no data") {
            alert("Please enter data");
          } else if (res.data === "errorData") {
            alert("Please check again");
          } else {
            alert("You have successfully registered");
            navigate("/login");
          }
        })
        .then((json) => {
          // console.log(json);
          setLoading(false);
        })
        .catch((err) => console.log(err));
      setLoading(true);
      formSubmit.current.reset();
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bgSignup vh-100">
      <div className="blurSignup signup-blur"></div>

      <div className="bgFormSignup p-3 w-30 h-70 rounded">
        <h2>Signup</h2>
        <form action="" onSubmit={handleSubmit} ref={formSubmit}>
          <div className="mb-3 groupInput">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              onChange={handleChange}
              type="name"
              className="form-control"
              name="username"
              id=""
              placeholder="Enter name"
              value={formValues.username}
            />
            <span className="text-danger ">{formErrors.username}</span>
          </div>
          <div className="mb-3 groupInput">
            <label htmlFor="email" className="form-label">
              <strong>Email address</strong>
            </label>
            <input
              onChange={handleChange}
              type="email"
              className="form-control"
              name="email"
              id=""
              placeholder="Enter email"
              value={formValues.email}
            />
            <span className="text-danger">{formErrors.email}</span>
          </div>
          <div className="mb-3 groupInput">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              id=""
              placeholder="Enter password"
              value={formValues.password}
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
              Signup
            </button>
          </div>
          <div className="mb-3 d-grid gap-2">
            <Link
              to="/login"
              type="button"
              name=""
              className="btn btn-secondary"
            >
              Login
            </Link>
            <div className="spinnerSignup">
              {loading && <Spinner animation="border" variant="primary" />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
