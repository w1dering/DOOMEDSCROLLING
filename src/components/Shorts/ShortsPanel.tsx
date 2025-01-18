import React, { useState } from "react";
import Short from "./Short";

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
                        <Short content={{imgSrc: "", text: slot}}/>
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
                        <Short content={{imgSrc: "", text: slot}}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortsPanel;
