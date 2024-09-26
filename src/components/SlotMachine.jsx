// import React, { useEffect, useRef, useState } from 'react';
// import './SlotMachine.css'; // Import your CSS for styling
// import sound from "./player-wins-94889.mp3"


// const SlotMachine = () => {
//     const [indexes, setIndexes] = useState([0, 0, 0]);
//     // const debugEl = useRef(null);
//     // const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
//     const iconWidth = 118.5;
//     const iconHeight = 118.5;
//     const numIcons = 9;
//     const timePerIcon = 100;
    

//     const roll = (reel, offset = 0) => {
//         const delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
//         return new Promise((resolve) => {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
//             const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);


//             const audio = new Audio(sound);
//             audio.loop = true;  // Loop the sound while spinning
//             audio.play(); 

//             setTimeout(() => {
//                 reel.style.transition = `background-position-y ${(8 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
//                 reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
                
//             }, offset * 150);

//             setTimeout(() => {
//                 reel.style.transition = 'none';
//                 reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;

//                 audio.pause();
//             audio.currentTime = 0; 
//                 resolve(delta % numIcons);
//             }, (8 + 1 * delta) * timePerIcon + offset * 150);
//         });
//     };

//     const rollAll = () => {

//         const reelsList = document.querySelectorAll('.reel');
//         Promise.all([...reelsList].map((reel, i) => roll(reel, i)))
//             .then((deltas) => {
//                 const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
//                 setIndexes(newIndexes);
                
//                 // Update debug info
//                 // if (debugEl.current) {
//                 //     debugEl.current.textContent = newIndexes.map(i => iconMap[i]).join(' - ');
//                 // }

//                 // Win conditions
//                 if (newIndexes[0] === newIndexes[1] || newIndexes[1] === newIndexes[2]) {
//                     const winClass = newIndexes[0] === newIndexes[2] ? "win2" : "win1";
//                     const slots = document.querySelector(".slots");
//                     if (slots) {
//                         slots.classList.add(winClass);
//                         setTimeout(() => slots.classList.remove(winClass), 2000);
//                     }
//                 }
//             });

//     };

//     const reloadMachine=()=>{
//       window.location.reload()
//     }

//     return (
//         <div id='main-container'>

//         <div id="outer-container">
//             <div className="slots">
//                 <div className="reel"></div>
//                 <div className="reel"></div>
//                 <div className="reel"></div>
//             </div>
//             <button onClick={rollAll} id="roll">Let's Play</button>
//             {/* <div id="debug" className="debug" ref={debugEl}></div> */}
//             <button onClick={reloadMachine}>Reset</button>
            
//         </div>
//         </div>
//     );
// };

// export default SlotMachine;




// import React, { useState } from 'react';
// import './SlotMachine.css'; // Import your CSS for styling
// import sound from "./player-wins-94889.mp3";

// const SlotMachine = () => {
//     const [indexes, setIndexes] = useState([0, 0, 0]);
//     const iconWidth = 118.5;
//     const iconHeight = 118.5;
//     const numIcons = 9;
//     const timePerIcon = 100;
    
//     // Variables to track winning logic
//     let nextWinningRoll = Math.floor(Math.random() * 5) + 1; // Randomize the winning roll in a set of 10
//     let rollCount = 0; // Track how many rolls have been made

//     // Function to roll one reel
//     const roll = (reel, offset = 0, target = null) => {
//         let delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons); 
        
//         // If the roll is rigged, target a winning combination (7-7-7)
//         if (target) {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const currentIndex = backgroundPositionY / iconHeight;
//             delta = target - currentIndex + (offset + 2) * numIcons;
//         }
        
//         return new Promise((resolve) => {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
//             const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

//             const audio = new Audio(sound);
//             audio.loop = true;  // Loop the sound while spinning
//             audio.play();

//             setTimeout(() => {
//                 reel.style.transition = `background-position-y ${(8 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
//                 reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
//             }, offset * 150);

//             setTimeout(() => {
//                 reel.style.transition = 'none';
//                 reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;

//                 audio.pause();
//                 audio.currentTime = 0;
//                 resolve(delta % numIcons);
//             }, (8 + 1 * delta) * timePerIcon + offset * 150);
//         });
//     };

//     // Function to roll all reels
//     const rollAll = () => {
//         rollCount++; // Increment the roll count
        
//         const reelsList = document.querySelectorAll('.reel');
        
//         // Check if the current roll is the winning roll
//         const isWinningRoll = rollCount === nextWinningRoll;
//         const targets = isWinningRoll ? [1, 1, 1] : null; // Target 7-7-7 for winning roll (index 1 for "seven")

//         Promise.all([...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)))
//             .then((deltas) => {
//                 const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
//                 setIndexes(newIndexes);

//                 // Win conditions
//                 if (newIndexes[0] === newIndexes[1] && newIndexes[1] === newIndexes[2]) {
//                     const slots = document.querySelector(".slots");
//                     if (slots) {
//                         slots.classList.add("win2");
//                         setTimeout(() => slots.classList.remove("win2"), 2000);
//                     }
//                 }

//                 // If 10 rolls have passed, randomize the next winning roll
//                 if (rollCount % 5 === 0) {
//                     nextWinningRoll = Math.floor(Math.random() * 5) + 1;
//                     rollCount = 0; // Reset the roll count after 10 rolls
//                 }
//             });
//     };

//     // Function to reload the slot machine
//     const reloadMachine = () => {
//         window.location.reload();
//     };

//     return (
//         <div id='main-container'>
//             <div id="outer-container">
//                 <div className="slots">
//                     <div className="reel"></div>
//                     <div className="reel"></div>
//                     <div className="reel"></div>
//                 </div>
//                 <button onClick={rollAll} id="roll">Let's Play</button>
//                 <button onClick={reloadMachine}>Reset</button>
//             </div>
//         </div>
//     );
// };

// export default SlotMachine;

// import React, { useState } from 'react';
// import './SlotMachine.css'; // Import your CSS for styling
// import sound from "./player-wins-94889.mp3";

// const SlotMachine = () => {
//     const [indexes, setIndexes] = useState([0, 0, 0]);
//     const [attempts, setAttempts] = useState(0); // Counter for attempts
//     const [wins, setWins] = useState(0); // Counter for wins

//     const iconWidth = 118.5;
//     const iconHeight = 118.5;
//     const numIcons = 9;
//     const timePerIcon = 100;
    
//     // Variables to track winning logic
//     let nextWinningRoll = Math.floor(Math.random() * 4) + 1; // Randomize the winning roll in a set of 10
//     let rollCount = 0; // Track how many rolls have been made

//     // Function to roll one reel
//     const roll = (reel, offset = 0, target = null) => {
//         let delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons); 
        
//         // If the roll is rigged, target a winning combination (7-7-7)
//         if (target) {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const currentIndex = backgroundPositionY / iconHeight;
//             delta = target - currentIndex + (offset + 2) * numIcons;
//         }
        
//         return new Promise((resolve) => {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
//             const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

//             const audio = new Audio(sound);
//             audio.loop = true;  // Loop the sound while spinning
//             audio.play();

//             setTimeout(() => {
//                 reel.style.transition = `background-position-y ${(8 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
//                 reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
//             }, offset * 150);

//             setTimeout(() => {
//                 reel.style.transition = 'none';
//                 reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;

//                 audio.pause();
//                 audio.currentTime = 0;
//                 resolve(delta % numIcons);
//             }, (8 + 1 * delta) * timePerIcon + offset * 150);
//         });
//     };
//     console.log(rollCount)
//     // Function to roll all reels
//     const rollAll = () => {
//         rollCount++; // Increment the roll count
        
//         setAttempts(prevAttempts => prevAttempts + 1); // Increment attempts on each roll
        
//         const reelsList = document.querySelectorAll('.reel');
        
//         // Check if the current roll is the winning roll
//         const isWinningRoll = rollCount === nextWinningRoll;
//         const targets = isWinningRoll ? [1, 1, 1] : null; // Target 7-7-7 for winning roll (index 1 for "seven")

//         Promise.all([...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)))
//             .then((deltas) => {
//                 const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
//                 setIndexes(newIndexes);

//                 // Win conditions
//                 if (newIndexes[0] === newIndexes[1] && newIndexes[1] === newIndexes[2]) {
//                     const slots = document.querySelector(".slots");
//                     if (slots) {
//                         slots.classList.add("win2");
//                         setTimeout(() => slots.classList.remove("win2"), 2000);
//                     }
//                     // Increment wins counter
//                     setWins(prevWins => prevWins + 1);
//                 }

//                 // If 10 rolls have passed, randomize the next winning roll
//                 if (rollCount % 4 === 0) {
//                     nextWinningRoll = Math.floor(Math.random() * 4) + 1;
//                     rollCount = 0; // Reset the roll count after 10 rolls
                    
//                 }
                
//             });

//     };
   

//     // Function to reload the slot machine
//     const reloadMachine = () => {
//         window.location.reload();
//     };

//     return (
//         <div id='main-container'>
//             <div id="outer-container">
//                 <div className="slots">
//                     <div className="reel"></div>
//                     <div className="reel"></div>
//                     <div className="reel"></div>
//                 </div>
//                 <button onClick={rollAll} id="roll">Let's Play</button>
//                 <button onClick={reloadMachine}>Reset</button>

//                 {/* Display the counters */}
//                 <div className="counters">
//                     <p>Total Attempts: {attempts}</p>
//                     <p>Total Wins: {wins}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SlotMachine;


// import React, { useState } from 'react';
// import './SlotMachine.css'; // Import your CSS for styling
// import sound from "./player-wins-94889.mp3";

// const SlotMachine = () => {
//     const [indexes, setIndexes] = useState([0, 0, 0]);
//     const [attempts, setAttempts] = useState(0); // Counter for attempts
//     const [wins, setWins] = useState(0); // Counter for wins
//     const [rollCount, setRollCount] = useState(0); // Track how many rolls have been made
//     const [nextWinningRoll, setNextWinningRoll] = useState(Math.floor(Math.random() * 10) + 1); // Randomize the winning roll in a set of 10

//     const iconWidth = 118.5;
//     const iconHeight = 118.5;
//     const numIcons = 9;
//     const timePerIcon = 100;

//     // Function to roll one reel
//     const roll = (reel, offset = 0, target = null) => {
//         let delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons); 
        
//         // If the roll is rigged, target a winning combination (7-7-7)
//         if (target) {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const currentIndex = backgroundPositionY / iconHeight;
//             delta = target - currentIndex + (offset + 2) * numIcons;
//         }
        
//         return new Promise((resolve) => {
//             const style = getComputedStyle(reel);
//             const backgroundPositionY = parseFloat(style["background-position-y"]);
//             const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
//             const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

//             const audio = new Audio(sound);
//             audio.loop = true;  // Loop the sound while spinning
//             audio.play();

//             setTimeout(() => {
//                 reel.style.transition = `background-position-y ${(8 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
//                 reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
//             }, offset * 150);

//             setTimeout(() => {
//                 reel.style.transition = 'none';
//                 reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;

//                 audio.pause();
//                 audio.currentTime = 0;
//                 resolve(delta % numIcons);
//             }, (8 + 1 * delta) * timePerIcon + offset * 150);
//         });
//     };

//     // Function to roll all reels
//     const rollAll = () => {
//         setRollCount(prevRollCount => prevRollCount + 1); // Increment the roll count
//         setAttempts(prevAttempts => prevAttempts + 1); // Increment attempts on each roll
        
//         const reelsList = document.querySelectorAll('.reel');
        
//         // Check if the current roll is the winning roll
//         const isWinningRoll = rollCount === nextWinningRoll;
//         const targets = isWinningRoll ? [1, 1, 1] : null; // Target 7-7-7 for winning roll (index 1 for "seven")

//         Promise.all([...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)))
//             .then((deltas) => {
//                 const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
//                 setIndexes(newIndexes);

//                 // Win conditions
//                 if (newIndexes[0] === newIndexes[1] && newIndexes[1] === newIndexes[2]) {
//                     const slots = document.querySelector(".slots");
//                     if (slots) {
//                         slots.classList.add("win2");
//                         setTimeout(() => slots.classList.remove("win2"), 2000);
//                     }
//                     // Increment wins counter
//                     setWins(prevWins => prevWins + 1);
//                 }

//                 // If 10 rolls have passed, randomize the next winning roll
//                 if (rollCount % 5 === 0) {
//                     setNextWinningRoll(Math.floor(Math.random() * 5) + 1); // Randomize new winning roll
//                     setRollCount(0); // Reset the roll count after 10 rolls
//                 }
//             });
//     };
//   console.log(nextWinningRoll)
//   console.log(rollCount)
//     // Function to reload the slot machine
//     const reloadMachine = () => {
//         window.location.reload();
//     };

//     return (
//         <div id='main-container'>
//             <div id="outer-container">
//                 <div className="slots">
//                     <div className="reel"></div>
//                     <div className="reel"></div>
//                     <div className="reel"></div>
//                 </div>
//                 <button onClick={rollAll} id="roll">Let's Play</button>
//                 <button onClick={reloadMachine}>Reset</button>

//                 {/* Display the counters */}
//                 <div className="counters">
//                     <p>Total Attempts: {attempts}</p>
//                     <p>Total Wins: {wins}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SlotMachine;


import React, { useState } from 'react';
import '../styles/SlotMachine.css'
import sound from "../utils/mixkit-slot-machine-wheel-1932.wav";
import sound1 from "../utils/game-music-loop-3-144252.mp3";
import sound2 from "../utils/short-game-music-loop-38898.mp3";
import sound3 from "../utils/drum-roll-please-6386.mp3";

import errorsound from "../utils/buzzer-or-wrong-answer-20582.mp3"
import winsound from "../utils/winning-218995.mp3"
const SlotMachine = () => {
    const [indexes, setIndexes] = useState([0, 0, 0]);
    const [attempts, setAttempts] = useState(0); // Counter for attempts
    const [wins, setWins] = useState(0); // Counter for wins
    const [rollCount, setRollCount] = useState(0); // Track how many rolls have been made
    const [nextWinningRoll, setNextWinningRoll] = useState(Math.floor(Math.random() * 10) + 1); // Randomize the winning roll in a set of 10

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

            const audio = new Audio(sound3);
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

    // Function to roll all reels
    const rollAll = () => {
        // setRollCount((prevRollCount) => {
        //     const newRollCount = prevRollCount + 1;
        //     return newRollCount;
        // });

        setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts on each roll

        const reelsList = document.querySelectorAll('.reel');

        setRollCount((prevRollCount) => {
            // Check if the current roll is the winning roll
            const isWinningRoll = prevRollCount + 1 === nextWinningRoll; // Winning condition for this roll
            const targets = isWinningRoll ? [1, 1, 1] : null; // Target 7-7-7 for winning roll (index 1 for "seven")

            Promise.all([...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)))
                .then((deltas) => {
                    const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
                    setIndexes(newIndexes);

                    // Check win condition for 7-7-7
                    if (newIndexes[0] === newIndexes[1] && newIndexes[1] === newIndexes[2]) {
                        const slots = document.querySelector(".slots");
                        if (slots) {
                            slots.classList.add("win2");
                            setTimeout(() => slots.classList.remove("win2"), 2000);
                        }
                        setWins((prevWins) => prevWins + 1); // Increment wins counter if win happens
                        const winAudio = new Audio(winsound);
                        winAudio.play();
                    }
                        else {
                            // Play lose sound
                            const loseAudio = new Audio(errorsound);
                            loseAudio.play();
                        
                    }

                    // Reset after 10 rolls
                    if ((prevRollCount + 1) % 10 === 0) {
                        setNextWinningRoll(Math.floor(Math.random() * 10) + 1); // Randomize the next winning roll
                        setRollCount(0); // Reset roll count after every 10 rolls
                    }
                });

            return prevRollCount + 1; // Ensure rollCount is incremented after processing
        });
    };

    // Function to reload the slot machine
    const reloadMachine = () => {
        window.location.reload();
    };

    return (
        <div id="main-container">
            
            <div id="outer-container">
                {/* <img id="board" src="https://www.shutterstock.com/shutterstock/photos/2172548835/display_1500/stock-vector-vip-poker-luxury-red-gold-chip-rhomboid-frame-shiny-led-light-bulbs-vector-casino-logo-royal-2172548835.jpg" alt="" /> */}
                    <div className='slots'>
                    <div className="reel"></div>
                    <div className="reel"></div>
                    <div className="reel"></div>
                    </div>
                <button onClick={rollAll} id="roll">Let's Play</button>
                

                {/* Display the counters
                <div className="counters">
                    <p>Total Attempts: {attempts}</p>
                    <p>Total Wins: {wins}</p>
                </div> */}
            </div>
            <button onClick={reloadMachine} id="reset">Reset</button>
        </div>
    );
};

export default SlotMachine;





