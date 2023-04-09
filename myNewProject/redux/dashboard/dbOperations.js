import { createAsyncThunk } from "@reduxjs/toolkit";
import { storage, db } from "../../config";

import "firebase/compat/firestore";

export const addPost = createAsyncThunk(
    "db/addPost",
    async (data, { rejectWithValue }) => {
        try {
            const { userId, image, title, position, location } = data;
            const uploadImage = async (uri, userId) => {
                let URL;
                try {
                    const response = await fetch(uri);
                    const blob = await response.blob();
                    const storageRef = storage.ref();
                    const upload = storageRef.child(
                        `usersPost/${userId}/${"post_" + userId}`
                    );
                    await upload.put(blob);
                    await upload.getDownloadURL().then((url) => {
                        URL = url;
                    });
                    return URL;
                } catch (e) {
                    throw e;
                }
            };

            const url = await uploadImage(image, userId);

            const postData = {
                userId,
                image: url,
                location: { ...location },
                position,
                title,
            };

            const result = await db.collection("posts").add(postData);

            return { ...postData, id: result.id };
        } catch (error) {
            console.dir({ error });
            Toast.error(`${error.code}`);
            return rejectWithValue(error);
        }
    }
);

export const getPosts = createAsyncThunk(
    "db/getPosts",
    async (setPosts, { rejectWithValue }) => {
        try {
            const result = await db.collection("posts").onSnapshot((snapshot) => {
                const allPosts = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    postId: doc.id,
                }));

                const sortedPosts = allPosts.slice().sort(function (a, b) {
                    var dateA = a.date;
                    var dateB = b.date;
                    return dateA < dateB ? 1 : -1;
                });

                setPosts(sortedPosts);
            });

            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addComments = createAsyncThunk(
    "db/addComment",
    async (data, { rejectWithValue }) => {
        const { postId, commentData } = data;

        try {
            const comment = await db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .add({ ...commentData });

            return comment;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getComments = createAsyncThunk(
    "db/addComment",
    async (data, { rejectWithValue }) => {
        const { postId, setComments } = data;

        try {
            const comments = await db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    const allComments = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        commentId: doc.id,
                    }));

                    setComments(
                        allComments.slice().sort(function (a, b) {
                            var dateA = a.timestamp;
                            var dateB = b.timestamp;
                            return dateA > dateB ? 1 : -1;
                        })
                    );
                });

            return comments;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getPostsOwnPosts = createAsyncThunk(
    "db/getPostsOwnPosts",
    async (data, { rejectWithValue }) => {
        try {
            const { setPosts, uid } = data;
            const result = await db.collection("posts").onSnapshot((snapshot) => {
                const allPosts = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    postId: doc.id,
                }));

                const filteredPosts = allPosts.filter((post) => post.userId === uid);

                const sortedPosts = filteredPosts.slice().sort(function (a, b) {
                    var dateA = a.date;
                    var dateB = b.date;
                    return dateA < dateB ? 1 : -1;
                });

                setPosts(sortedPosts);
            });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
