import { configureStore, createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addUser } = usersSlice.actions;

const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
    },
});

export default store;
