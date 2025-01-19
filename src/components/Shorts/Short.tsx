import { useState, useRef, useEffect } from "react";
import "./Short.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setShorts } from "../../store/shortSlice";

interface ContentProps {
	img: string;
	text: string;
}

interface ShortContentProps {
	content: ContentProps;
}

const ShortContent = ({ content }: ShortContentProps) => {
	return (
		<>
			<img src={content.img} className="short-img"></img>
			<p className="short-text">{content.text}</p>
		</>
	);
};

interface Props {
	type?: "current" | "add" | "trending" | "random" | "pinned" | "dummy";
	content?: ContentProps;
}

interface DragState {
	content: ContentProps | null;
	x: number;
	y: number;
	width: number;
	height: number;
	isDragging: boolean;
	isTrending: boolean;
}

function throttle(func: Function, delay: number) {
	// forces a delay in between function calls
	let lastTime = 0;

	return function (...args: any[]) {
		const now = new Date().getTime();
		if (now - lastTime >= delay) {
			lastTime = now;
			return func(...args);
		}
	};
}

const Short = ({ type = "random", content = { img: "", text: "" } }: Props) => {
	const shorts = useSelector((state: RootState) => state.shorts);
	const dispatch = useDispatch();
	if (type == "add") {
		const handleDropShort = () => {
			if (shorts.dragState.content) {
				dispatch(
					setShorts({ addShortContent: shorts.dragState.content })
				);
			}
			dispatch(
				setShorts({ dragState: { ...shorts.dragState, content: null } })
			);
		};
		useEffect(() => {
			if (shorts.addShortContent && !shorts.currentShortContent) {
				dispatch(
					setShorts({ currentShortContent: shorts.addShortContent })
				);
				dispatch(setShorts({ addShortContent: null }));
			}
		}, [shorts.addShortContent, shorts.currentShortContent]);

		return (
			<div
				className="short add-short"
				onMouseUp={handleDropShort}
				style={
					shorts.addShortContent
						? { borderStyle: "solid" }
						: undefined
				}
			>
				{shorts.addShortContent ? (
					<ShortContent content={shorts.addShortContent} />
				) : (
					<img className="add-short-icon" src="src\assets\plusIcon.png" alt="plus" draggable="false"/>
				)}
			</div>
		);
	}
	if (type == "current") {
		const [currentShortDuration, setCurrentShortDuration] = useState(
			Math.floor(Math.random() * 11) + 15
		);
		const [percentTimeUsed, setPercentTimeUsed] = useState(0);

		useEffect(() => {
			if (!shorts.currentShortContent && !shorts.addShortContent) {
				return;
			}
			const interval = setInterval(() => {
				setPercentTimeUsed((prev) => {
					if (prev < 100) {
						return prev + 100 / currentShortDuration;
					} else {
                        clearInterval(interval);
						if (shorts.addShortContent) {
							dispatch(
								setShorts({
									currentShortContent: shorts.addShortContent,
								})
							);
							dispatch(setShorts({ addShortContent: null }));
							setCurrentShortDuration(
								Math.floor(Math.random() * 11) + 15
							);
						} else {
							dispatch(setShorts({ currentShortContent: null }));
						}
                        return 0;
					}
				});
			}, 1000); // Update every second

			return () => clearInterval(interval!); // Cleanup interval on component unmount
		}, [shorts]);

		return (
			<div className={`short current-short`}>
				{shorts.currentShortContent && (
					<>
						<ShortContent content={shorts.currentShortContent} />
						<img
							id="current-timer"
							src="/src/assets/logo.png"
							style={{
								clipPath: `inset(${percentTimeUsed}% 0% 0% 0%)`,
							}}
						></img>
					</>
				)}
			</div>
		);
	}

	const [dragState, setDragState] = useState<DragState>({
		content: null,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		isDragging: false,
		isTrending: false,
	});

	const originalShortRef = useRef<HTMLDivElement | null>(null);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (originalShortRef.current) {
			const { width, height } =
				originalShortRef.current.getBoundingClientRect();
			setDragState(() => ({
				content,
				x: e.clientX,
				y: e.clientY,
				isDragging: true,
				width,
				height,
				isTrending: type == "trending",
			}));
			dispatch(
				setShorts({
					dragState: { ...shorts.dragState, content: content },
				})
			);

			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		} else {
			console.log("bruh");
		}
	};

	const handleMouseMove = throttle((e: MouseEvent) => {
		e.preventDefault();
		setDragState((prev) => ({
			...prev,
			x: e.clientX,
			y: e.clientY,
		}));
	}, 16);

	const handleMouseUp = (e: MouseEvent) => {
		e.preventDefault();
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);

		if (originalShortRef.current) {
			setDragState({
				content: null,
				x: 0,
				y: 0,
				isDragging: false,
				width: 0,
				height: 0,
				isTrending: false,
			});
			setTimeout(() => {
				dispatch(
					setShorts({
						dragState: { ...shorts.dragState, content: null },
					})
				);
			}, 100);
		}
	};

	return (
		<>
			<div
				className={`short ${type}-short`}
				onMouseDown={handleMouseDown}
				style={dragState.isDragging ? { opacity: "50%" } : undefined}
				ref={originalShortRef}
			>
				<ShortContent content={content} />
			</div>
			{dragState.isDragging && (
				<div
					className="short dummy-short"
					style={{
						left: dragState.x,
						top: dragState.y,
						width: dragState.width,
						height: dragState.height,
						borderColor: dragState.isTrending ? "#ff8b54" : "white",
					}}
				>
					<ShortContent content={content} />
				</div>
			)}
		</>
	);
};

export default Short;
