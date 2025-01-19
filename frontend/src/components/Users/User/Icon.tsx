import { useState } from "react";
import bedrotting from "../../../assets/users/bedrotting.gif";
import deskrotting from "../../../assets/users/deskrotting.gif";
import floorrotting from "../../../assets/users/floorrotting.gif";
import carrotting from "../../../assets/users/carrotting.gif";
import couchrotting from "../../../assets/users/couchrotting.gif";
import showerrotting from "../../../assets/users/showerrotting.gif";
import starerotting from "../../../assets/users/starerotting.gif";
import toiletrotting from "../../../assets/users/floorrotting.gif";

import "./Icon.css";

interface User {
	id: string;
	name: string;
}

const userSprites = [
	bedrotting,
	deskrotting,
	floorrotting,
	carrotting,
	couchrotting,
	showerrotting,
	starerotting,
	toiletrotting,
];

interface IconProps {
	user: User;
}

const Icon = ({ user }: IconProps) => {
	const [currentUserIndex, setCurrentUserIndex] = useState(-1);
	if (currentUserIndex == -1) {
		setCurrentUserIndex(Math.floor(Math.random() * userSprites.length));
	}
	return (
		<div className="icon_container">
			<img
				src={userSprites[currentUserIndex]}
				alt="logo"
				className="icon"
			/>
		</div>
	);
};

export default Icon;
