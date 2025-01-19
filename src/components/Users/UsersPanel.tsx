import "./UsersPanel.css";
import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import Icon from "./User/Icon";
import Preferences from "./User/Preferences";
import Attention from "./User/Attention";
import Short from "../Shorts/Short";
import Scoreboard from "../ScoreBoard/Scoreboard";
import DayTimer from "../DayTimer/DayTimer";


interface ContentProps {
	img: string;
	text: string;
}

interface Props {
	setCurrentShortContent: (arg: string) => void;
	currentShortContent: ContentProps | null;
	setAddShortContent: (arg: string) => void;
	addShortContent: ContentProps | null;
	currentShortPercentTimeUsed: number;
}

const UsersPanel = ({
	setCurrentShortContent,
	currentShortContent,
	setAddShortContent,
	addShortContent,
	currentShortPercentTimeUsed,
}: Props) => {
	const users = useAppSelector((state) => state.users.users);
	const visibleUserIds = useAppSelector((state) => state.users.visibleUsers);

	const visibleUsers = users.filter((user) =>
		visibleUserIds.includes(user.id)
	);

	const [score, setScore] = useState(0); // initialize score
	const [percentTimeUsed, setPercentTimeUsed] = useState(0); // initialize percent time used

	const updateScore = (newScore: number) => {
		setScore((prevScore) => prevScore + newScore); // function to update score
	};

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


	return (
		<div id="users-panel">
			<div className="top-panel">
				<DayTimer percentTimeUsed={percentTimeUsed} />
				<Scoreboard score={score} />
			</div>
			<div className="users-list">
				{visibleUsers.map((user) => (
					<div key={user.id} className="user-item">
						<Icon user={user} />
						<div className="preferences-attention-container">
							<Preferences user={user} />
							<Attention user={user} />
						</div>
						<Short
							type="current"
							content={
								currentShortContent || {
									img: "",
									text: "Add something!",
								}
							}
							setCurrentShortContent={setCurrentShortContent}
							setAddShortContent={setAddShortContent}
							currentShortPercentTimeUsed={
								currentShortPercentTimeUsed
							}
						/>
						<Short
							type="add"
							content={
								addShortContent || { img: "", text: "" }
							}
							setCurrentShortContent={setCurrentShortContent}
							setAddShortContent={setAddShortContent}
						/>
							<Icon user={user} />
							<div className="preferences-attention-container">
								<Preferences user={user} />
								<Attention user={user} />
							</div>
							<Short 
								type="current" 
							/>
							<Short 
								type="add" 
							/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersPanel;
