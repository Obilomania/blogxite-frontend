import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts:[],
}

export const postSlice = createSlice({
    name: "Posts",
    initialState: initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload; 
        }
    }
});



export const { setPosts } = postSlice.actions;
export const postReducer = postSlice.reducer;