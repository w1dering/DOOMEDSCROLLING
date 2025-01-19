import "./UsersPanel.css";
import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import Attention from "./User/Attention";
import Short from "../Shorts/Short";
import Scoreboard from "../ScoreBoard/Scoreboard";
// import DayTimer from "../DayTimer/DayTimer";
// import { useDispatch } from "react-redux";
// import { setUsers } from "../../store/usersSlice";

const UsersPanel = () => {
	const users = useAppSelector((state) => state.users.users);
	const visibleUserIds = useAppSelector((state) => state.users.visibleUsers);
	const [lastVisibleIndex, setLastVisibleIndex] = useState(0);
	// const dispatch = useDispatch();

	const visibleUsers = users.filter((user) =>
		visibleUserIds.includes(user.id)
	);

	const [score, setScore] = useState(0); // initialize score
	const [percentTimeUsed, setPercentTimeUsed] = useState(0); // initialize percent time used
	const [timeUntilNextUser, setTimeUntilNextUser] = useState(3);

	score;
	percentTimeUsed;

	const updateScore = (newScore: number) => {
		setScore((prevScore) => prevScore + newScore); // function to update score
	};

	updateScore(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setPercentTimeUsed((prev) => {
				if (prev < 100) {
					return prev + 100 / 60; // Increment by 1.67% every second
				} else {
					clearInterval(interval);
					return 100;
				}
			});
		}, 1000); // Update every second


		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (visibleUsers.length < 3) {
				visibleUserIds.push(users[lastVisibleIndex + 1].id);
			}
			setLastVisibleIndex(prev => prev + 1);
			setTimeUntilNextUser(Math.floor(Math.random() * 30 + 30));
		}, timeUntilNextUser * 1000);
	})

	const removeUser = (id: string) => {
		let index = visibleUserIds.findIndex((i) => i == id);
		if (index != -1) {
			visibleUserIds.splice(index, 1);
		}
	}

	return (
		<div className="users-panel">
			<div className="top-panel">
				{/* <DayTimer percentTimeUsed={percentTimeUsed} /> */}
				<Scoreboard/>
			</div>
			<div className="users-list">
				{visibleUsers.map((user) => (
					<div key={user.id} className="user-item">
						<Icon user={user} />
						<div className="preferences-attention-container">
							<Preferences user={user} />
							<Attention user={user} removeUser={removeUser}/>
						</div>
						<Short
							user={user}
							type="current"
							content={{
								img: "food",
								text: "balls",
							}}
						/>
						<Short type="add" user={user}/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;
