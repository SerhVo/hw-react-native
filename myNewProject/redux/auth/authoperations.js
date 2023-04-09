import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage, db } from "../../config";


export const register = createAsyncThunk(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        const { image, login, email, password } = credentials;

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            const user = userCredential.user;

            const uploadImage = async (uri, user) => {
                try {
                    const response = await fetch(uri);
                    const blob = await response.blob();
                    const storageRef = storage.ref();
                    const upload = storageRef.child(
                        `usersAvatar/${user.uid}/${"avatar_" + user.uid}`
                    );
                    await upload.put(blob);
                    const url = await upload.getDownloadURL();
                    return url;
                } catch (error) {
                    throw error;
                }
            };

            const url = await uploadImage(image, user);

            await user.updateProfile({
                displayName: login,
                photoURL: url,
            });

            const newUser = {
                uid: user.uid,
                email: user.email,
                name: login,
                avatar: url,
            };

            await db.collection("users").doc(user.uid).set(newUser);

            return newUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logIn = createAsyncThunk(
    "auth/logIn",
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(
                email,
                password
            );

            return userCredential.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const currentUser = createAsyncThunk(
    "auth/currentState",
    async (_, { rejectWithValue }) => {
        try {
            const user = await new Promise((resolve, reject) => {
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    resolve(user);
                    unsubscribe();
                }, reject);
            });

            if (user) {
                const currentUser = {
                    uid: user?.uid,
                    photo: user?.photoURL,
                    email: user?.email,
                    displayName: user?.displayName,
                };
                return { currentUser, loggedIn: true };
            } else {
                return { currentUser: null, loggedIn: false };
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logOut = createAsyncThunk("auth/LogOut", async (_, thunkAPI) => {
    try {
        await auth.signOut();

    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


