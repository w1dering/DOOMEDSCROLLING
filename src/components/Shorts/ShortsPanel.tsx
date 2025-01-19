import React, { useState } from "react";
import Short from "./Short";
import { useAppSelector } from '../../store/hooks';

import food from "../../assets/thumbnails/food.gif";
import puppy from "../../assets/thumbnails/puppy.gif";
import singer from "../../assets/thumbnails/singer.gif";
import swordFight from "../../assets/thumbnails/swordFight.gif";
import tennis from "../../assets/thumbnails/tennis.gif";
import volcano from "../../assets/thumbnails/volcano.gif";
import anime from "../../assets/thumbnails/anime.gif";


import "./ShortsPanel.css";

const ShortsPanel = () => {
    const shorts = useAppSelector(state => state.users.shorts);
    const [slotsTrending, setSlotsTrending] = useState(["Slot 1", "Slot 2", "Slot 3", "Slot 4"]);
    const [slotsRandom] = useState(["Slot 1", "Slot 2", "Slot 3", "Slot 4",  "Slot 2",
                                "Slot 2",  "Slot 2",  "Slot 2",  "Slot 2", "Slot 2"])

    const addSlot = () => {
        const newSlot = `Slot ${slotsTrending.length + 1}`;
        setSlotsTrending([...slotsTrending, newSlot]);
    };

    return (
        <div id="shorts-panel">
            <div id="trending-shorts-panel">
                <h1>Trending</h1>
                <div className="slots-wrapper">
                    {shorts.slice(0, 5).map((short, index) => (
                        <Short key={index} content={{img: short.imgSrc, text: short.text}}/>
                    ))}
                </div>
                <button onClick={addSlot} id="add-slot-button">
                    Add Slot
                </button>
            </div>

            <div id="random-shorts-panel">
                <h1>Random</h1>
                <div className="slots-wrapper">
                    {shorts.slice(5).map((short, index) => (
                        <Short key={index} content={{img: short.imgSrc, text: short.text}}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortsPanel;
