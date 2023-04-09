import { createSlice } from "@reduxjs/toolkit";
import {
    addPost,
    getPosts,
    getPostsOwnPosts,
    addComments,

} from "./dbOperations";

const pending = (state) => {
    state.isFetching = true;
};

const rejected = (state, { payload }) => {
    initialState;
};

const initialState = {
    isFetching: false,
    posts: [],
};

export const dbSlice = createSlice({
    name: "db",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addPost.fulfilled, (state, { payload }) => {
            state.posts = payload;
            state.isFetching = false;
        });
        builder.addCase(addPost.pending, pending);
        builder.addCase(addPost.rejected, rejected);

        builder.addCase(getPosts.fulfilled, (state, { payload }) => {
            state.posts = payload;
            state.isFetching = false;
        });
        builder.addCase(getPosts.pending, pending);
        builder.addCase(getPosts.rejected, rejected);

        builder.addCase(addComments.fulfilled, (state) => {
            state.isFetching = false;
        });

        builder.addCase(getPostsOwnPosts.fulfilled, (state, { payload }) => {
            state.posts = payload;
            state.isFetching = false;
        });
        builder.addCase(getPostsOwnPosts.pending, pending);
        builder.addCase(getPostsOwnPosts.rejected, rejected);
    },
});
