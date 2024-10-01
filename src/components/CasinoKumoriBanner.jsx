import React from "react";
import "../styles/CasinoKumoriBanner.css";
import banner from "../utils/image/casinoBanner.png";

const CasinoKumoriBanner = () => {
  return (
    <div>
      <div className="casino-box">
        
        <div id="casino-banner-div">
          <img src={banner} id="casino-banner" />
          <img
            src={require("../utils/image/kumori_logo.png")}
            alt="Casino Logo"
            className="casino-logo"
          />

        </div>

        {/* {[...Array(24)].map((_, index) => (
          <div key={index} className="light"></div>
        ))} */}
      </div>
    </div>
  );
};

export default CasinoKumoriBanner;
