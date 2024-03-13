import React from "react";
import "./LayoutHome.css";
import Hero from "../../pages/Hero/Hero";
import Programs from "../../pages/Programs/Programs";
import Plans from "../../pages/Plans/Plans";
import Reasons from "../../pages/Reasons/Reasons";
import Testimonials from "../../pages/Testimonials/Testimonials";
import Join from "../../pages/Join/Join";
import Footer from "../../pages/Footer/Footer";

const LayoutHome = () => {
  return (
    <div className="layout">
      <Hero />
      <Programs />
      <Reasons />
      <Plans />
      <Testimonials />
      <Join />
      <Footer />
    </div>
  );
};
export default LayoutHome;
