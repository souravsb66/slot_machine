import React, {useState } from 'react';
import '../styles/SlotMachine.css'
import sound3 from "../utils/DRUM ROLL SOUND EFFECT Awarding.mp3";
import errorsound from "../utils/buzzer-or-wrong-answer-20582.mp3"
import winsound from "../utils/winning-218995.mp3"
import loseSound from "../utils/Lose Sound.mp3"
import buttonClick from "../utils/Spin Button Click Sound.mp3"
import sound from "../utils/slot-machine-audio 2 (1).mp3"
 
 
const SlotMachine = () => {
    const [indexes, setIndexes] = useState([0, 0, 0]);
    const [rollCount, setRollCount] = useState(0);
    const [nextWinningRoll, setNextWinningRoll] = useState(Math.floor(Math.random() * 10) + 1); // Randomize the winning roll in a set of 10
    const [isDisabled, setIsDisabled] = useState(false)
    const iconWidth = 118.5;
    const iconHeight = 118.5;
    const numIcons = 9;
    const timePerIcon = 100;
 
    // Function to roll one reel
    const roll = (reel, offset = 0, target = null) => {
        let delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
 
        // If the roll is rigged, target a winning combination (7-7-7)
        if (target) {
            const style = getComputedStyle(reel);
            const backgroundPositionY = parseFloat(style["background-position-y"]);
            const currentIndex = backgroundPositionY / iconHeight;
            delta = target - currentIndex + (offset + 2) * numIcons;
        }
 
        return new Promise((resolve) => {
            const style = getComputedStyle(reel);
            const backgroundPositionY = parseFloat(style["background-position-y"]);
            const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
            const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);
 
            const audio = new Audio(sound);
           
            audio.loop = true; // Loop the sound while spinning
            audio.play();
 
            setTimeout(() => {
                reel.style.transition = `background-position-y ${(8 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
                reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
            }, offset * 150);
 
            setTimeout(() => {
                reel.style.transition = 'none';
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
 
                audio.pause();
                audio.currentTime = 0;
                resolve(delta % numIcons);
            }, (8 + 1 * delta) * timePerIcon + offset * 150);
        });
    };
 
   
   
    const rollAll = () => {
        const buttonClicked = new Audio(buttonClick);
        buttonClicked.play(); // Play the button click sound
        setIsDisabled(true); // Disable the button initially

            const handle = document.querySelector('.slot-machine-handle');
            handle.classList.add('active'); // Rotate to 60 degrees
            
            // After a delay, rotate back to the initial 30 degrees position
            setTimeout(() => {
              handle.classList.remove('active');
            },500); // 1 second delay before it returns to 30 degrees
        
   
        // Use a short timeout to ensure the audio plays before starting the roll
        setTimeout(() => {
            const reelsList = document.querySelectorAll('.reel');
   
            setRollCount((prevRollCount) => {
                const isWinningRoll = prevRollCount + 1 === nextWinningRoll; // Winning condition for this roll
                const targets = isWinningRoll ? [1, 1, 1] : null; // Target 7-7-7 for winning roll (index 1 for "seven")
   
                Promise.all([...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)))
                    .then((deltas) => {
                        const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
                        setIndexes(newIndexes);
   
                        // Check win condition for index 1
                        if (newIndexes[1] === 1 && newIndexes[0] === 1 && newIndexes[2] === 1) {
                            const slots = document.querySelector(".slots");
                            if (slots) {
                                slots.classList.add("win2");
                                setTimeout(() => slots.classList.remove("win2"), 2000);
                            }
                            const winAudio = new Audio(winsound);
                           
                            winAudio.play();
                        } else {
                            // Play lose sound
                            const loseAudio = new Audio(loseSound);
                            loseAudio.play();
                        }
   
                        // Reset after 10 rolls
                        if ((prevRollCount + 1) % 10 === 0) {
                            setNextWinningRoll(Math.floor(Math.random() * 10) + 1); // Randomize the next winning roll
                            setRollCount(0); // Reset roll count after every 10 rolls
                        }
   
                        // Enable the button after processing
                        setIsDisabled(false); // Re-enable the button after rolls complete
                    });
   
                return prevRollCount + 1; // Ensure rollCount is incremented after processing
            });
        },1000); // Adjust the timeout duration as necessary (200ms is just an example)
    };
 
   
 
    return (
        <div id="main-container">            
            <div id="outer-container">
                <div>
                    <div className='slots'>
                    <div className="reel"></div>
                    <div className="reel"></div>
                    <div className="reel"></div>
                    </div>
                <button onClick={rollAll} id="roll" disabled={isDisabled}>Let's Play</button>   
                </div>
                <div class="handle-container">
    <div id="block"></div>
    <div class="slot-machine-handle" onClick={rollAll}></div>
  </div>   
            </div>
        </div>
    );
};
 
export default SlotMachine;