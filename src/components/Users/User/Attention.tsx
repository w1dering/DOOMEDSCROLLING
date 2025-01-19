import { useDispatch, useSelector } from "react-redux";
import "./Attention.css";
import React, { useState, useEffect } from "react";
import { RootState } from "../../../store/store";
import { setShorts } from "../../../store/shortSlice";

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

interface Props {
	user: User;
	removeUser: (id: string) => void;
}

const Attention = ({user, removeUser}: Props) => {
	const [attention, setAttention] = useState(100);
	const shorts = useSelector((state: RootState) => state.shorts);
	const dispatch = useDispatch();
	const [decayRate, setDecayRate] = useState(1);

	const [currentShortContentEmpty, setCurrentShortContentEmpty] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setAttention((prev) => Math.max(prev - (decayRate / 2), 0)); // Decrease attention by 1 per second, but not below 0
			if (attention <= 0) {
				removeUser(user.id);
			}
		}, 500);

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

    
	const [flashAnimation, setFlashAnimation] = useState("");

	useEffect(() => {
		let rating;
		if (shorts.currentShortScore > 0) {
			if (shorts.currentShortScore < 4) {
				rating = "bad";
			} else if (shorts.currentShortScore < 7) {
				rating = "ok";
			} else {
				rating = "good";
			}

			setFlashAnimation(`${rating} 1s ease-in-out`);

			console.log(flashAnimation);

			dispatch(setShorts({ currentShortScore: 0 }));
			const timeout = setTimeout(() => {
				setFlashAnimation(""); // Reset animation state
			}, 1000);
            updateAttention(shorts.currentShortScore);
		}
	}, [shorts.currentShortScore, dispatch]);

	useEffect(() => {
		if (!shorts.currentShortContent) {
			setCurrentShortContentEmpty(true);
			setDecayRate(3);
			console.log("decay 3");
		} else {
			setCurrentShortContentEmpty(false);
			setDecayRate(1);
			console.log("decay 1");
		}
	}, [shorts.currentShortContent]);

	const updateAttention = (rating: number) => {
		setAttention((prev) => {
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
		<div className="attention-container" style={{borderColor: currentShortContentEmpty ? "#ff004f" : "white"}}>
			<div
				className="attention"
				style={{
					width: `${attention}%`,
					animation: flashAnimation,
					backgroundColor: currentShortContentEmpty ? "#ff004f" : "white",
				}}
			></div>
		</div>
	);
};

export default Attention;
