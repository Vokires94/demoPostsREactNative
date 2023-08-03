import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        value: []
    },
    reducers: {
        addPost: (state, action) => {
            state.value = [
                ...state.value,
                action.payload
            ];
        },
        deletePost: (state, action) => {
            state.value = state.value.filter((post) => post.id !== action.payload);
        },
        setPosts: (state, action) => {
            state.value = [...action.payload];
        }
    }
})

export const { addPost, deletePost, setPosts } = postsSlice.actions

export default postsSlice.reducer