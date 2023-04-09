import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, currentUser, logOut } from "./authoperations";

const pending = (state) => {
    state.isFetching = true;
};

const rejected = (state, { payload }) => {
    state.isFetching = false;
    state.isLoggedIn = false;
    state.error = payload;
};

const initialState = {
    isLoggedIn: false,
    isFetching: false,
    user: {
        uid: null,
        email: null,
        name: null,
        avatar: null,
    },
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoggedIn = true;
            state.isFetching = false;
        });
        builder.addCase(register.pending, pending);
        builder.addCase(register.rejected, rejected);

        builder.addCase(logIn.fulfilled, (state, { payload }) => {
            state.user.uid = payload.uid;
            state.user.email = payload.email;
            state.isLoggedIn = true;
            state.isFetching = false;
            state.error = null;
        });
        builder.addCase(logIn.pending, pending);
        builder.addCase(logIn.rejected, rejected);

        builder.addCase(currentUser.fulfilled, (state, { payload }) => {
            if (payload.currentUser !== null) {
                state.user.uid = payload.currentUser.uid;
                state.user.email = payload.currentUser.email;
                state.user.name = payload.currentUser.displayName;
                state.user.avatar = payload.currentUser.photo;
            }
            state.isLoggedIn = payload.loggedIn;
        });
        builder.addCase(logOut.fulfilled, () => ({ ...initialState }));
    },
});
