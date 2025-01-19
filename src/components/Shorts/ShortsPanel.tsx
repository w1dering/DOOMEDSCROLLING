import React, { useState } from "react";
import Short from "./Short";

import food from "../../assets/thumbnails/food.gif";
import puppy from "../../assets/thumbnails/puppy.gif";
import singer from "../../assets/thumbnails/singer.gif";
import swordFight from "../../assets/thumbnails/swordFight.gif";
import tennis from "../../assets/thumbnails/tennis.gif";
import volcano from "../../assets/thumbnails/volcano.gif";
import anime from "../../assets/thumbnails/anime.gif";
import car from "../../assets/thumbnails/car.gif";
import finance from "../../assets/thumbnails/finance.gif";
import astronomy from "../../assets/thumbnails/astronomy.gif";
import romance from "../../assets/thumbnails/romance.gif";
import boardgame from "../../assets/thumbnails/boardgame.gif";

import "./ShortsPanel.css";

const ShortsPanel = () => {
    const [slotsTrending, setSlotsTrending] = useState(["Slot 1", "Slot 2", "Slot 3", "Slot 4"]);
    const [slotsRandom] = useState(["Slot 1", "Slot 2", "Slot 3", "Slot 4",  "Slot 2",
                                "Slot 2",  "Slot 2",  "Slot 2",  "Slot 2", "Slot 2"])

    const availableGifs = [volcano, anime, car, finance, astronomy, romance, boardgame, food, puppy, singer, swordFight, tennis]; 

    const addSlot = () => {
        const newSlot = `Slot ${slotsTrending.length + 1}`;
        setSlotsTrending([...slotsTrending, newSlot]);
    };

    const getRandomGif = () => {
        const randomIndex = Math.floor(Math.random() * availableGifs.length);
        return availableGifs[randomIndex];
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
                        <Short content={{img: getRandomGif(), text: slot}}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortsPanel;
