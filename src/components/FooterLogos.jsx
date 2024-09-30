import React from "react";
import '../styles/SlotMachineContainer.css';
import Servicenow from '../utils/servicenow_logo.png';
import KumoriLogo from '../utils/White logo - no background.png'

const FooterLogos = () => {
  return (
    <div className="logo-container">
      <div>
        <img
          src={KumoriLogo}
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
          src={KumoriLogo}
          alt="Logo 3"
        />
      </div>
    </div>
  );
};

export default FooterLogos;
