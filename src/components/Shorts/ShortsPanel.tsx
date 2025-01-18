import React, { useState } from "react";
import "./ShortsPanel.css";

const ShortsPanel = () => {
    const [slotsT, setSlotsT] = useState(["Slot 1", "Slot 2", "Slot 3", "Slot 4"]);
    const [slotsR] = useState(["Slot 1", "Slot 2", "Slot 3", "Slot 4",  "Slot 2",
                                "Slot 2",  "Slot 2",  "Slot 2",  "Slot 2", "Slot 2"])

    const addSlot = () => {
        const newSlot = `Slot ${slotsT.length + 1}`;
        setSlotsT([...slotsT, newSlot]);
    };

    return (
        <div id="shorts-panel">
            <div id="trending">
                <h1>Trending</h1>
                <div id="slots">
                    {slotsT.map((slot, index) => (
                        <div key={index} id="indiv-slot">
                            {slot}
                        </div>
                    ))}
                </div>
                <button onClick={addSlot} id="add-slot-button">
                    Add Slot
                </button>
            </div>

            <div id="random">
                <h1>Random</h1>
                <div id="slots">
                    {slotsR.map((slot, index) => (
                        <div key={index} id="indiv-slot">
                            {slot}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortsPanel;
