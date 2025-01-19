import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface UsersState {
    users: User[];
    visibleUsers: string[]; // Array of user IDs that should be visible
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    visibleUsers: [], // Initially empty
    isLoading: false
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setVisibleUsers: (state, action: PayloadAction<string[]>) => {
            state.visibleUsers = action.payload;
        },
        addVisibleUser: (state, action: PayloadAction<string>) => {
            if (!state.visibleUsers.includes(action.payload)) {
                state.visibleUsers.push(action.payload);
            }
        },
        removeVisibleUser: (state, action: PayloadAction<string>) => {
            state.visibleUsers = state.visibleUsers.filter(id => id !== action.payload);
        },
        clearVisibleUsers: (state) => {
            state.visibleUsers = [];
        }
    }
});

export const { 
    setUsers, 
    setIsLoading, 
    setVisibleUsers, 
    addVisibleUser, 
    removeVisibleUser, 
    clearVisibleUsers 
} = usersSlice.actions;
export default usersSlice.reducer;
