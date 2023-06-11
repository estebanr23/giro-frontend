import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'checking', // authenticated, not-authenticated
    user: {},
    errorMessage: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = 'undefined';
        },
        handleLogin: ( state, { payload }) => {
            state.user = payload;
            state.status = 'authenticated';
        },
        handleLogout: ( state ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = 'undefined';
        }
    }
});

export const {
    onChecking,
    handleLogin,
    handleLogout,
} = authSlice.actions;

export default authSlice.reducer;
