import React, { useState } from "react";
import Short from "./Short";
import { useAppSelector } from "../../store/hooks";

import food from "../../assets/thumbnails/food.gif";
import puppy from "../../assets/thumbnails/puppy.gif";
import singer from "../../assets/thumbnails/singer.gif";
import swordFight from "../../assets/thumbnails/swordFight.gif";
import tennis from "../../assets/thumbnails/tennis.gif";
import volcano from "../../assets/thumbnails/volcano.gif";
import anime from "../../assets/thumbnails/anime.gif";
import car from "../../assets/thumbnails/car.gif";
import finance from "../../assets/thumbnails/finance.gif";
import astronomy from "../../assets/thumbnails/astronomy.gif";
import romance from "../../assets/thumbnails/romance.gif";
import boardgame from "../../assets/thumbnails/boardgame.gif";
import basketball from "../../assets/thumbnails/basketball.gif";
import soccer from "../../assets/thumbnails/soccer.gif";


import "./ShortsPanel.css";


interface ContentProps {
	img: string;
	text: string;
}

interface DragState {
	content: ContentProps | null;
	x: number;
	y: number;
	width: number;
	height: number;
	isDragging: boolean;
}

interface Props {
	setDragState: (dragState: DragState) => void;
	dragState: DragState;
}

const ShortsPanel = ({ setDragState, dragState }: Props) => {
	const shorts = useAppSelector((state) => state.users.shorts);
	const [slotsTrending, setSlotsTrending] = useState("");
	const [slotsRandom] = useState("");

	return (
		<div id="shorts-panel">
			<div id="trending-shorts-panel">
				<h1>Trending</h1>
				<div className="slots-wrapper">
					{shorts.slice(0, 5).map((short, index) => (
						<Short
							key={index}
							content={{ img: short.imgSrc, text: short.text }}
							dragState={dragState}
							setDragState={setDragState}
						/>
					))}
				</div>
			</div>

			<div id="random-shorts-panel">
				<h1>Random</h1>
				<div className="slots-wrapper">
					{shorts.slice(5).map((short, index) => (
						<Short
							key={index}
							content={{ img: short.imgSrc, text: short.text }}
							dragState={dragState}
							setDragState={setDragState}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ShortsPanel;
