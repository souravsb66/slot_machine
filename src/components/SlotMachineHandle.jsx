import React from "react";
import "../styles/SlotMachineHandle.css"

const SlotMachineHandle = ({onClick}) => {
  return (
    <div class="handle-container">
      <div id="block"></div>
      <div class="slot-machine-handle" onClick={onClick}></div>
    </div>
  );
};

export default SlotMachineHandle;

