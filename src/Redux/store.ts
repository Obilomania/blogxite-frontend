import { configureStore } from "@reduxjs/toolkit";
import postApi from "./Apis/postApi";
import { postReducer } from "./postSlice";

import authApi from "./Apis/authApi";
import { authReducer } from "./authSlice";

import commentApi from "./Apis/commentApi"
import {commentReducer} from "./commentSlice"

const store = configureStore({
    reducer: {
        postStore: postReducer,
        authStore: authReducer,
        commentStore : commentReducer,
        [postApi.reducerPath]: postApi.reducer,  
        [authApi.reducerPath]: authApi.reducer,
        [commentApi.reducerPath] : commentApi.reducer
    }, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(postApi.middleware)
            .concat(authApi.middleware)
            .concat(commentApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export default store;