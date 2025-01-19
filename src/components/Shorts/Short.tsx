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
	type?: "current" | "add" | "trending" | "random" | "pinned" | "dummy";
	content?: ContentProps;
	user?: User;
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

const Short = ({
	type = "random",
	content = { img: "", text: "" },
	user,
}: Props) => {
	const shorts = useSelector((state: RootState) => state.shorts);
	const dispatch = useDispatch();

	const moveAddToCurrentAndJudge = async (user: User) => {
		if (shorts.addShortContent && !shorts.currentShortContent) {
			dispatch(
				setShorts({ currentShortContent: shorts.addShortContent })
			);
			dispatch(setShorts({ addShortContent: null }));
			try {
				const response = await fetch(
					"https://api.openai.com/v1/chat/completions",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${
								import.meta.env.VITE_OPENAI_API_KEY
							}`,
						},
						body: JSON.stringify({
							model: "gpt-3.5-turbo",
							messages: [
								{
									role: "user",
									content: `You are ${
										user.name
									} and you are judging a short. You are a ${
										user.occupation
									} and you are ${
										user.age
									} years old. You enjoy ${user.likes.join(
										", "
									)} and dislike ${user.dislikes.join(
										", "
									)}. You are determining whether or not to give your attention to a short form video represented by giving it a score of 1 to 10. The short has the following title: "${
										shorts.dragState.content
									}". Give it a score of 1 to 10, where a score of 1 is the minimum score, representing an extremely negative reaction to the short, and 10 is the highest possible score, representing an extremely positive reaction to the short. A score of 5 indicates that your reaction to the short is neutral. Return your score as a JSON object in the following format: {"score": 10}. Be reasonably polarized, giving equal weight to all numbers. Do not return anything else.`,
								},
							],
							temperature: 1,
						}),
					}
				);

				const data = await response.json();
				console.log("API Response:", data);

				if (!data.choices?.[0]?.message?.content) {
					throw new Error("Invalid API response structure");
				}

				const content = data.choices[0].message.content;
				console.log("Raw content:", content);

				let score;
				try {
					score = JSON.parse(content);
					console.log("Parsed users:", score);

					if (!score) {
						console.error(`Invalid score`);
						throw new Error(`Score is invalid`);
					}

					dispatch(setShorts({ currentShortScore: score }));

				} catch (parseError) {
					console.error("JSON Parse Error:", parseError);
					console.log("Failed to parse content:", content);
					return;
				}
			} catch (error) {
				console.error("Error judging short:", error);
			}
		}
	};

	if (type == "add") {
		if (!user) {
			console.error("add short doesn't have user");
			return;
		}

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
			moveAddToCurrentAndJudge(user);
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
					<img
						className="add-short-icon"
						src="src\assets\plusIcon.png"
						alt="plus"
						draggable="false"
					/>
				)}
			</div>
		);
	}
	if (type == "current") {
		if (!user) {
			console.log("user not provided for current short");
			return;
		}

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
