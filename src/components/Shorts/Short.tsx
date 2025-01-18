import { useState, useRef } from "react";
import "./Short.css";

interface ContentProps {
    imgSrc: string,
    text: string,
}


interface Props {
	type?: "current" | "add" | "trending" | "random" | "pinned" | "dummy";
	content?: ContentProps
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

const Short = ({
	type = "random",
	content = { imgSrc: "", text: "" },
}: Props) => {
	if (type == "add") {
        const [currentContent, setCurrentContent] = useState<ContentProps>();
        const handleDropShort = () => {
            if (draggedShortContent) {
                setCurrentContent(draggedShortContent!);
            }
            draggedShortContent = null;
        }  
		return (
			<div className="short add-short" onMouseUp={handleDropShort}>
				{currentContent ? (
					currentContent.text
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
						<img src={content.imgSrc} alt="short thumbnail" />
						<p>{content.text}</p>
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
        if (originalShortRef.current) {
            const {width, height} = originalShortRef.current.getBoundingClientRect();
            setDragState(() => ({
				content,
				x: e.clientX,
				y: e.clientY,
				isDragging: true,
				width,
                height,
			}));
            draggedShortContent = content;
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
        } else {
            console.log("bruh");
        }
		
	};

	const handleMouseMove = (e: MouseEvent) => {
        setDragState((prev) => ({
            ...prev,
            x: e.clientX,
            y: e.clientY,
        }));
	};

	const handleMouseUp = (e: MouseEvent) => {
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
            }, 100)
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
				{content.text}
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
				>{content.text}</div>
			)}
		</>
	);
};

export default Short;
