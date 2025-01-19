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

const Attention = ({ user }: { user: User }) => {
	const [attention, setAttention] = useState(100);
	const shorts = useSelector((state: RootState) => state.shorts);
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(() => {
			setAttention((prev) => Math.max(prev - 1, 0)); // Decrease attention by 1 per second, but not below 0
		}, 1000);

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
		}
	}, [shorts.currentShortScore, dispatch]);

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
		<div className="attention-container">
			<div
				className="attention"
				style={{ width: `${attention}%`, animation: flashAnimation }}
			></div>
		</div>
	);
};

export default Attention;
