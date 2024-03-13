import React from "react";
import "./Plans.css";
import { useState, useRef } from "react";
import { plansData } from "../../../data/plansData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import whiteTick from "../../../assets/whiteTick.png";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
const Plans = () => {
  const initialValues = { username: "", email: "", phone: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  // Show modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // End show modal
  // Show spinner
  const [loading, setLoading] = useState(false);
  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, 4000);
  // validate
  const validate = (values) => {
    const errors = {};

    const pattern_phone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (values.phone === "") {
      errors.phone = "Phone should not be empty";
    } else if (!pattern_phone.test(values.phone)) {
      errors.phone = "Phone did not match";
    } else {
      errors.phone = "";
    }

    return errors;
  };

  // End show spinner
  const formSubmit = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (Object.values(formErrors).every((error) => error === "")) {
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
    }
  };
  return (
    <div className="plans-container">
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div className="programs-header">
        <span className="stroke-text">READY TO START</span>
        <span>YOUR JOURNEY</span>
        <span className="stroke-text">NOW WITHUS</span>
      </div>
      {/* plans card */}
      <div className="plans">
        {plansData.map((plan, i) => (
          <div className="plan" key={i}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>{plan.price}</span>

            <div className="features">
              {plan.features.map((feature, i) => (
                <div className="feature">
                  <img src={whiteTick} alt="" />
                  <span key={i}>{feature}</span>
                </div>
              ))}
            </div>
            <div>
              <span>See more benefits</span>
            </div>
            <button onClick={handleShow} className="btn">
              Join Now
            </button>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="title">Signup</Modal.Title>
          <CloseButton variant="white" onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit} ref={formSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="title">Name</Form.Label>
              <Form.Control
                type="name"
                name="username"
                placeholder="Enter your name"
                onChange={handleChange}
                value={formValues.username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="title">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                value={formValues.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="title">PhoneNumber</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
                value={formValues.phone}
              />
              <span className="text-danger ">{formErrors.phone}</span>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {loading && (
              <Spinner
                animation="border"
                variant="primary"
                className=""
                role="status"
              />
            )}
            <Button
              variant="outline-secondary"
              className="btnClose"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button type="submit" variant="outline-primary" className="btnSave">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
export default Plans;
