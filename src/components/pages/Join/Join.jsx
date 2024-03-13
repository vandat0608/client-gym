import React, { useState } from "react";
import "./Join.css";
import axios from "axios";
import { useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import FormError from "../formError/formError";
import { Button } from "react-bootstrap";
const Join = () => {
  const initialValues = { phone: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  // Show spinner
  const [loading, setLoading] = useState(false);
  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, 4000);
  // validate

  // End show spinner
  const formSubmit = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/admin/createPersons", formValues)
      .then((res) => {
        console.log(res);
        if (res.data === "no data") {
          alert("Please enter the phone number");
        } else if (res.data === "errorData") {
          alert(" Please check your phone number again");
        } else {
          alert("Thanks for registering");
          window.location.reload();
        }
      })
      .then((json) => {
        // console.log(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setLoading(true);
    formSubmit.current.reset();
  };
  return (
    <div className="Join" id="join-us">
      <div className="left-j">
        <hr />
        <div>
          <span className="stroke-text">READY TO</span>
          <span>LEVEL UP</span>
        </div>
        <div>
          <span>YOUR BODY</span>
          <span className="stroke-text">WITH US ?</span>
        </div>
      </div>
      <div className="right-j">
        <form
          action=""
          className="email-container"
          onSubmit={handleSubmit}
          ref={formSubmit}
        >
          <input
            type="phone"
            name="phone"
            placeholder="Enter your phone"
            onChange={handleChange}
            value={formValues.phone}
          />
          <div className="spinnerSignup">
            {loading && <Spinner animation="border" variant="primary" />}
          </div>
          <button className="btn btn-j">Join Now</button>
        </form>
      </div>
    </div>
  );
};
export default Join;
