import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = null;
        },
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;