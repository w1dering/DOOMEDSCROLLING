import React from "react";
import "./Scoreboard.css";

interface ScoreboardProps {
    score: number;
}

const Scoreboard = ({ score }: ScoreboardProps) => {
    return (
        <div className="scoreboard">
            Score: {score}
        </div>
    );
};

export default Scoreboard;