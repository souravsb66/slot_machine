import React, { useEffect, useRef, useState } from 'react';
import '../styles/SlotMachine.css';

const SlotMachine = () => {
    const [indexes, setIndexes] = useState([0, 0, 0]);
    // const debugEl = useRef(null);
    // const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
    const iconWidth = 158;
    const iconHeight = 118.5
    const numIcons = 9;
    const timePerIcon = 100;
    

    const roll = (reel, offset = 0) => {
        const delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
        return new Promise((resolve) => {
            const style = getComputedStyle(reel);
            const backgroundPositionY = parseFloat(style["background-position-y"]);
            const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
            const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

            setTimeout(() => {
                reel.style.transition = `background-position-y ${(8 + 1 * delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
                reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
            }, offset * 150);

            setTimeout(() => {
                reel.style.transition = 'none';
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                resolve(delta % numIcons);
            }, (8 + 1 * delta) * timePerIcon + offset * 150);
        });
    };

    const rollAll = () => {
        const reelsList = document.querySelectorAll('.reel');
        Promise.all([...reelsList].map((reel, i) => roll(reel, i)))
            .then((deltas) => {
                const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
                setIndexes(newIndexes);
                
                // Update debug info
                // if (debugEl.current) {
                //     debugEl.current.textContent = newIndexes.map(i => iconMap[i]).join(' - ');
                // }

                // Win conditions
                if (newIndexes[0] === newIndexes[1] || newIndexes[1] === newIndexes[2]) {
                    const winClass = newIndexes[0] === newIndexes[2] ? "win2" : "win1";
                    const slots = document.querySelector(".slots");
                    if (slots) {
                        slots.classList.add(winClass);
                        setTimeout(() => slots.classList.remove(winClass), 2000);
                    }
                }
            });

    };

    const reloadMachine=()=>{
      window.location.reload()
    }

    return (
        <div>
            <div className="slots">
                <div className="reel"></div>
                <div className="reel"></div>
                <div className="reel"></div>
            </div>
            {/* <div id="debug" className="debug" ref={debugEl}></div> */}
            <button onClick={rollAll}>Roll</button>
            <button onClick={reloadMachine}>Reset</button>
            
        </div>
    );
};

export default SlotMachine;







