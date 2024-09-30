import React from "react";
import '../styles/SlotMachineContainer.css';
import Servicenow from '../utils/servicenow_logo.png';

const FooterLogos = () => {
  return (
    <div className="logo-container">
      <div>
        <img
          src="https://kumoritechnologies.com/wp-content/uploads/2024/03/kumori-logo-1.png"
          alt="Logo 1"
        />
      </div>
      <div>
        <img
          src={Servicenow}
          alt="Logo 2"
        />
      </div>
      <div>
        <img
          src="https://kumoritechnologies.com/wp-content/uploads/2024/03/kumori-logo-1.png"
          alt="Logo 3"
        />
      </div>
    </div>
  );
};

export default FooterLogos;
