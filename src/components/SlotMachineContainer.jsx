import React from 'react'
import SlotMachine from './SlotMachine.jsx';
import '../styles/SlotMachineContainer.css'
import PokerChip1 from '../utils/image/bluePokerChip.png';
import PokerChip2 from '../utils/image/redBlackPokerChip.png';
import PokerChip3 from '../utils/image/yellowChip.webp';
import FooterLogos from './FooterLogos';
import CasinoKumoriBanner from './CasinoKumoriBanner';

const SlotMachineContainer = () => {

  const reloadMachine = () => {
    window.location.reload();
  };
    
  return (
    <div className="slot-machine-container">

      <CasinoKumoriBanner />
      <SlotMachine />
      <FooterLogos />

      <img className="chips chip1" src={PokerChip1} alt="Chip Icon" />
      <img className="chips chip2" src={PokerChip2} alt="Chip Icon" />
      <img className="chips chip5" src={PokerChip3} alt="Chip Icon" />
      <img className="chips chip3" src={PokerChip1} alt="Chip Icon" />
      <img className="chips chip4" src={PokerChip2} alt="Chip Icon" />

      <button onClick={reloadMachine} id="reset">Reset</button>

    </div>
  )
}

export default SlotMachineContainer;