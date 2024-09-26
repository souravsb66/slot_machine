import React from "react";
import '../styles/CasinoKumoriBanner.css'

const CasinoKumoriBanner = () => {
  return (
    <div>
      <div className="casino-box">
        <div className="casino-label">CASINO</div>

        {/* Logo inside the box */}
        <img
          src={require("../utils/kumori-logo-1.png")} // Adjust the path to your image file accordingly
          alt="Casino Logo"
          className="casino-logo"
        />

        {/* Lights around the box */}
        {[...Array(28)].map((_, index) => (
          <div key={index} className="light"></div>
        ))}
      </div>
    </div>
  );
};

export default CasinoKumoriBanner;
