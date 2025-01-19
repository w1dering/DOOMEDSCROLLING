import { useState, useRef } from "react";
import "./Short.css";

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
}

let draggedShortContent: ContentProps | null;

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
	if (type == "add") {
		const [currentContent, setCurrentContent] = useState<ContentProps>();
		const handleDropShort = () => {
			if (draggedShortContent) {
				setCurrentContent(draggedShortContent!);
			}
			draggedShortContent = null;
		};
		return (
			<div
				className="short add-short"
				onMouseUp={handleDropShort}
				style={currentContent ? { borderStyle: "solid" } : undefined}
			>
				{currentContent ? (
					<ShortContent content={currentContent} />
				) : (
					<img src="src\assets\plusIcon.png" alt="plus" />
				)}
			</div>
		);
	}
	if (type == "current") {
		return (
			<div className={`short current-short`}>
				{content && (
					<>
						<ShortContent content={content} />
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
			}));
			draggedShortContent = content;

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
			});
			setTimeout(() => {
				draggedShortContent = null;
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
					}}
				>
					<ShortContent content={content} />
				</div>
			)}
		</>
	);
};

export default Short;
