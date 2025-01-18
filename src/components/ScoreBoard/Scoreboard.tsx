import React from "react";
import "./Scoreboard.css";

interface ScoreboardProps {
    score: number;
}

const Scoreboard = ({ score }: ScoreboardProps) => {
    return (
        <div className="scoreboard">
            <h1>Score: {score}</h1>
        </div>
    );
};

export default Scoreboard;