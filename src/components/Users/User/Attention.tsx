import "./Attention.css";
import React, { useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    occupation: string;
    age: number;
    searchHistory: string[];
    likes: string[];
    dislikes: string[];
    attention: number;
}

const Attention = ({user}: {user: User}) => {
    const [attention, setAttention] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setAttention(prev => Math.max(prev - 1, 0)); // Decrease attention by 1 per second, but not below 0
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const updateAttention = (rating: number) => {
        setAttention(prev => {
            if (rating < 4) {
                return Math.max(prev - 10, 0); // Decrease by 10, but not below 0
            } else if (rating < 7) {
                return prev;
            } else {
                return Math.min(prev + 10, 100); // Increase by 10, but not above 100
            }
        });
    };

    return (
        <div className="attention-container">
            <div className="attention" style={{ width: `${attention}%` }}>
            </div>
        </div>
    );
};

export default Attention;