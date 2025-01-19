import "./UsersPanel.css";
import { useAppSelector } from '../../store/hooks';
import { useState } from "react";
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import Attention from "./User/Attention";
import Short from "../Shorts/Short";
import Scoreboard from "../ScoreBoard/Scoreboard";


const UsersPanel = () => {
	const users = useAppSelector(state => state.users.users);
	const visibleUserIds = useAppSelector(state => state.users.visibleUsers);
	
	const visibleUsers = users.filter(user => visibleUserIds.includes(user.id));

	const [score, setScore] = useState(0); // initialize score

	const updateScore = (newScore: number) => {
		setScore(newScore); // function to update score
	}

	return (
		<div id="users-panel">
			<Scoreboard score={score} /> 
			<div className="users-list">
				{visibleUsers.map((user) => (
					<div key={user.id} className="user-item">
							<Icon user={user} />
							<div className="preferences-attention-container">
								<Preferences user={user} />
								<Attention user={user} />
							</div>
							<Short type="current" content={{
								img: "food", text: "balls"
								}} />
                            <Short type="add"/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;
