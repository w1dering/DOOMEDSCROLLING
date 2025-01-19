import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import shortsReducer from "./shortSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        shorts: shortsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
