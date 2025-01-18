import bedrotting from "../../../assets/users/bedrotting.gif";
import deskrotting from "../../../assets/users/deskrotting.gif";
import floorrotting from "../../../assets/users/floorrotting.gif";
import "./Icon.css";

const userSprites = [bedrotting, deskrotting, floorrotting];

interface User {
	id: string;
	name: string;
}

interface IconProps {
	user: User;
}


const Icon = ({ user }: IconProps) => {
    
	return (
		<div className="icon_container">
			<img src={userSprites[Math.floor(Math.random() * userSprites.length)]} alt="logo" className="icon" />
		</div>
	);
};

export default Icon;
