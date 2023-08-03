import { createSlice } from '@reduxjs/toolkit'

export const commentsSlice = createSlice({
    name: 'posts',
    initialState: {
        value: []
    },
    reducers: {
        addComment: (state, action) => {
            state.value = [
                ...state.value,
                action.payload
            ];
        },
        deleteComment: (state, action) => {
            state.value = state.value.filter((post) => post.id !== action.payload);
        },
        setComments: (state, action) => {
            state.value = [...action.payload];
        }
    }
})

export const { addComment, deleteComment, setComments } = commentsSlice.actions

export default commentsSlice.reducer