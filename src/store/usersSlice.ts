import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    occupation: string;
    age: number;
    searchHistory: string[];
    likes: string[];
    dislikes: string[];
}

interface UsersState {
    users: User[];
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
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
        }
    }
});

export const { setUsers, setIsLoading } = usersSlice.actions;
export default usersSlice.reducer;
