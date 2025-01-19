import { useState, useRef, useEffect } from "react";
import "./Short.css";

export interface ContentProps {
	img: string;
	text: string;
}

interface ShortContentProps {
	content: ContentProps;
}

const ShortContent = ({ content }: ShortContentProps) => {
	return (
		<>
			{content.img && <img src={content.img} className="short-img" draggable="false"/>}
			<p className="short-text">{content.text}</p>
		</>
	);
};

interface DragState {
	content: ContentProps | null;
	x: number;
	y: number;
	width: number;
	height: number;
	isDragging: boolean;
}

interface Props {
	type?: "current" | "add" | "trending" | "random" | "pinned" | "dummy";
	content?: ContentProps;
	setCurrentShortContent?: (arg: string) => void;
	setAddShortContent?: (arg: string) => void;
	currentShortPercentTimeUsed?: number;
	dragState?: DragState;
	setDragState?: (dragState: DragState) => void;
}

const Short = ({
	type = "random",
	content = { img: "", text: "" },
	setAddShortContent,
	setCurrentShortContent,
	currentShortPercentTimeUsed = 0,
	dragState,
	setDragState,
}: Props) => {
	if (type == "add") {
		const handleDropShort = () => {
			console.log("trying to drop");
			if (setAddShortContent) {
				setAddShortContent("drag");
			}
		};

		return (
			<div
				className="short add-short"
				onMouseUp={handleDropShort}
				style={content ? { borderStyle: "solid" } : undefined}
			>
				{content.img ? (
					<ShortContent content={content} />
				) : (
					<img className="add-short-icon" src="src\assets\plusIcon.png" alt="plus" draggable="false"/>
				)}
			</div>
		);
	}
	if (type == "current") {
		return (
			<div className={`short current-short`}>
				<ShortContent content={content} />
				{content.img && (
					<img
						id="current-timer"
						src="/src/assets/logo.png"
						style={{
							clipPath: `inset(${currentShortPercentTimeUsed}% 0% 0% 0%)`,
						}}
					></img>
				)}
			</div>
		);
	}

    if (!dragState) {
        console.log("dragState null");
        return;
    }

	if (!setDragState) {
		console.log("setDragState null");
		return;
	}

	const originalShortRef = useRef<HTMLDivElement | null>(null);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (originalShortRef.current) {
			const { width, height } =
				originalShortRef.current.getBoundingClientRect();
			setDragState({
				content,
				x: e.clientX,
				y: e.clientY,
				width,
				height,
				isDragging: true,
			});

			document.removeEventListener("mouseup", handleMouseUp);
			document.addEventListener("mouseup", handleMouseUp);
		} else {
			console.log("bruh");
		}
	};

	const handleMouseUp = (e: MouseEvent) => {
		e.preventDefault();
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
		</>
	);
};

export default Short;
