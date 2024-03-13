import React from "react";
import "./Hero.css";
import { useState, useRef } from "react";
import Header from "../Header/Header";
import Heart from "../../../assets/heart.png";
import hero_image from "../../../assets/hero_image.png";
import hero_image_back from "../../../assets/hero_image_back.png";
import Calories from "../../../assets/calories.png";
import { motion } from "framer-motion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";
import "./Hero.css";
import axios from "axios";

const Hero = () => {
  const initialValues = {
    username: "",
    email: "",
    phone: "",
    date: Date.now(),
  };
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
  const transition = { type: "spring", duration: 3 };
  const mobile = window.innerWidth <= 768 ? true : false;
  const formSubmit = useRef();

  const handleSubmit = async (e) => {
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
    <div className="hero">
      <div className="blur hero-blur"></div>
      <div className="left-h">
        <Header />
        {/* the best add */}
        <div className="the-best-ad">
          <motion.div
            initial={{ left: mobile ? "158px" : "208px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>the best fitness club in the town</span>
        </div>

        {/* Hero Headeing */}
        <div className="hero-text">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Idea Body</span>
          </div>
          <div className="span">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              excepturi atque voluptates eius ullam earum illum consequatur
              nobis a reprehenderit?
            </span>
          </div>
        </div>

        {/* figures */}
        <div className="figures">
          <div>
            <span>+ 140</span>
            <span>EXPERT COACHES</span>
          </div>
          <div>
            <span>+ 978</span>
            <span>MEMBERS JOINED</span>
          </div>
          <div>
            <span>+ 50</span>
            <span>FITNESS PROGRAMS</span>
          </div>
        </div>
        {/* end figures */}
        {/* hero buttons */}
        <div className="hero-buttons">
          <div className="btn">Get Started</div>
          <div className="btn">Learn More</div>
        </div>
      </div>
      <div className="right-h">
        <button onClick={handleShow} className="btn">
          Join Now
        </button>

        <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          trannsition={transition}
          className="heart-rate"
        >
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div>

        {/* hero images */}
        <img src={hero_image} alt="" className="hero-image" />
        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "20rem" }}
          transition={transition}
          src={hero_image_back}
          alt=""
          className="hero-image-back"
        />
        {/* calories */}
        <motion.div
          initial={{ right: "37rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          className="calories"
        >
          <img src={Calories} alt="" />
          <div>
            <span>Calories Burned</span>
            <span>220 kcal</span>
          </div>
        </motion.div>
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
export default Hero;
