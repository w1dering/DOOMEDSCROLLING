import "./App.css";
import ShortsPanel from "./components/Shorts/ShortsPanel";
import UsersPanel from "./components/Users/UsersPanel";
import StartMenu from "./components/StartMenu/StartMenu";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";

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

function throttle(func: Function, delay: number) {
	let lastTime = 0;

	return function (...args: any[]) {
		const now = new Date().getTime();
		if (now - lastTime >= delay) {
			lastTime = now;
			return func(...args);
		}
	};
}

const App = () => {
	const [dragState, setDragState] = useState<DragState>({
		content: null,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		isDragging: false,
	});
	const [addShortContent, setAddShortContent] = useState<ContentProps | null>(
		null
	);
	const [currentShortContent, setCurrentShortContent] =
		useState<ContentProps | null>(null);

	const parseAddShortContent = (arg: string) => {
		if (arg == "drag") {
			setAddShortContent(dragState!.content);
		} else {
			setAddShortContent(null);
		}
	};

	const parseCurrentShortContent = (arg: string) => {
		if (arg == "add") {
			setCurrentShortContent(addShortContent);
		} else {
			setCurrentShortContent(null);
		}
	};

	const [startingTime, setStartingTime] = useState(
		() => Math.floor(Math.random() * 11) + 15
	);
	const [currentShortPercentTimeUsed, setCurrentShortPercentTimeUsed] =
		useState(0);


	const handleMouseMove = throttle((e: MouseEvent) => {
		e.preventDefault();
		setDragState({
			...dragState,
			x: e.clientX,
			y: e.clientY,
		})}, 100);

	document.addEventListener("mousemove", handleMouseMove);

	useEffect(() => {
		if (!currentShortContent) return;
		const interval = setInterval(() => {
			setCurrentShortPercentTimeUsed((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					if (addShortContent) {
						setCurrentShortContent(addShortContent);
						setAddShortContent(null);
						setStartingTime(Math.floor(Math.random() * 11) + 15);
					} else {
						setCurrentShortContent(null);
					}
					return 0;
				}
				return prev + 100 / startingTime;
			});
		}, 1000); // Update every second

		return () => {
			clearInterval(interval);
			document.removeEventListener("mousemove", handleMouseMove);
		}; // Cleanup interval on component unmount
	}, [currentShortContent, addShortContent]);

	return (
		<Provider store={store}>
			<UsersPanel
				setAddShortContent={parseAddShortContent}
				addShortContent={addShortContent}
				setCurrentShortContent={parseCurrentShortContent}
				currentShortContent={currentShortContent}
				currentShortPercentTimeUsed={currentShortPercentTimeUsed}
			/>
			<ShortsPanel setDragState={setDragState} dragState={dragState} />
			<StartMenu />
			{dragState.content && dragState.isDragging && (
				<div
					className="short dummy-short"
					style={{
						left: dragState.x,
						top: dragState.y,
						width: dragState.width,
						height: dragState.height,
					}}
				>
					{dragState.content.img && (
						<img
							src={dragState.content.img}
							className="short-img"
							draggable="false"
						/>
					)}
					<p className="short-text">{dragState.content.text}</p>
				</div>
			)}
		</Provider>
	);
};

export default App;
