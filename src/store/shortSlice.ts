// shortsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
	isTrending: boolean;
}

interface Shorts {
	dragState: DragState;
	currentShortContent: ContentProps | null;
	currentShortScore: number;
	addShortContent: ContentProps | null;
}

const initialState: Shorts = {
	dragState: {
		content: null,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		isDragging: false,
		isTrending: false,
	},
	currentShortContent: {
		img: "src/assets/thumbnails/puppy.gif",
		text: "Cuteness overload with adorable puppies! #puppies #animals #cute",
	},
	currentShortScore: 0,
	addShortContent: null,
};

const shortsSlice = createSlice({
	name: "shortsSlice",
	initialState,
	reducers: {
		setShorts: (state, action: PayloadAction<Partial<Shorts>>) => {
			Object.assign(state, action.payload);
		},
		resetShorts: (state) => {
			state.dragState = initialState.dragState;
			state.currentShortContent = initialState.currentShortContent;
			state.addShortContent = initialState.addShortContent;
		},
	},
});

export const { setShorts, resetShorts } = shortsSlice.actions;

export default shortsSlice.reducer;