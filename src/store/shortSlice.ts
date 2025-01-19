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
}

interface Shorts {
	dragState: DragState;
	currentShortContent: ContentProps | null;
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
	},
	currentShortContent: null,
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