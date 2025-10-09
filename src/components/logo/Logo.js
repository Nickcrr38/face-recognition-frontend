import React from "react";
import Tilt from "react-parallax-tilt";
import scanning from "./scanning.png";
import "./Logo.css";

const Logo = () => (
  <div className="logo-container">
    <Tilt glareEnable={true} glareMaxOpacity={0.15} scale={1.1}>
      <img src={scanning} alt="Logo" className="logo-image" />
    </Tilt>
  </div>
);

export default Logo;

