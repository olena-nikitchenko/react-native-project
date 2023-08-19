import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    name: null,
    email: null,
    avatar: null,
    stateChange: false,
    isCurrentUser: false,
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            email: payload.email,
            name: payload.name,
            avatar: payload.avatar,
            isCurrentUser: payload.isCurrentUser,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),
        updateIsLoading: (state, { payload }) => ({
            ...state,
            isLoading: payload.isLoading,
        }),
        authSignOut: () => state,
    },
});
