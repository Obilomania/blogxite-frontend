import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    comment:"",
}

const commentSlice = createSlice({
  name: "Comments",
  initialState,
    reducers: {
        setComment: (state, action) => {
            state.comment = action.payload
      }
  }
});

export const {setComment} = commentSlice.actions

export const commentReducer = commentSlice.reducer