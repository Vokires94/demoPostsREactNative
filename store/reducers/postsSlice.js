import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        value: []
    },
    reducers: {
        addPost: (state, action) => {
            state.value = [
                action.payload,
                ...state.value
            ];
        },
        deletePost: (state, action) => {
            state.value = state.value.filter((post) => post.id !== action.payload);
        },
        setPosts: (state, action) => {
            state.value = [...action.payload];
        },
        editPost: (state, action) => {
            const updatedList = state.value.map(obj => {
                if (obj.id == action.payload.id) {
                    obj.title = action.payload.title;
                    obj.body = action.payload.body;
                }
                return obj;
            })
            state.value = [...updatedList];
        }
    }
})

export const { addPost, deletePost, setPosts, editPost } = postsSlice.actions

export default postsSlice.reducer