import React from "react";
import "./ShortsQueue.css";

interface User {
    id: string;
    name: string;
}

interface ShortsQueueProps {
    user: User;
}

const ShortsQueue = ({ user }: ShortsQueueProps) => {
    return <div className="shorts-queue">ShortsQueue for {user.name}</div>;
};

export default ShortsQueue;