import React, { useState } from "react";
import Short from "./Short";

import food from "../../assets/thumbnails/food.gif";
import puppy from "../../assets/thumbnails/puppy.gif";
import singer from "../../assets/thumbnails/singer.gif";
import swordFight from "../../assets/thumbnails/swordFight.gif";
import tennis from "../../assets/thumbnails/tennis.gif";
import volcano from "../../assets/thumbnails/volcano.gif";
import anime from "../../assets/thumbnails/anime.gif";


import "./ShortsPanel.css";

const ShortsPanel = () => {
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
                    {slotsTrending.map((slot) => (
                        <Short content={{img: anime, text: slot}}/>
                    ))}
                </div>
                <button onClick={addSlot} id="add-slot-button">
                    Add Slot
                </button>
            </div>

            <div id="random-shorts-panel">
                <h1>Random</h1>
                <div className="slots-wrapper">
                    {slotsRandom.map((slot) => (
                        <Short content={{img: volcano, text: slot}}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortsPanel;
