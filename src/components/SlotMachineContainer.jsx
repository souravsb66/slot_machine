import React from 'react'
import SlotMachine from './SlotMachine.jsx';
import '../styles/SlotMachineContainer.css'
import PokerChip1 from '../utils/poker-chip (1).png';
import PokerChip2 from '../utils/casinoChip2.png';
import FooterLogos from './FooterLogos';
import CasinoKumoriBanner from './CasinoKumoriBanner';

const SlotMachineContainer = () => {

  // Function to reload the slot machine
  const reloadMachine = () => {
    window.location.reload();
  };
    
  return (
    <div className="slot-machine-container">
      <div className="overlay"></div>

      <CasinoKumoriBanner />
      <SlotMachine />
      <FooterLogos />

      {/* Floating Chips */}
      <img className="chips chip1" src={PokerChip1} alt="Chip Icon" />
      <img className="chips chip2" src={PokerChip2} alt="Chip Icon" />
      <img className="chips chip3" src={PokerChip1} alt="Chip Icon" />
      <img className="chips chip4" src={PokerChip2} alt="Chip Icon" />

      
      <button onClick={reloadMachine} id="reset">Reset</button>

    </div>
  )
}

export default SlotMachineContainer;