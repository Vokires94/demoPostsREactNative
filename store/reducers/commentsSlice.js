import { createSlice } from '@reduxjs/toolkit'

export const commentsSlice = createSlice({
    name: 'posts',
    initialState: {
        value: []
    },
    reducers: {
        addComment: (state, action) => {
            state.value = [
                action.payload,
                ...state.value
            ];
        },
        deleteComment: (state, action) => {
            state.value = state.value.filter((comment) => comment.id !== action.payload);
        },
        setComments: (state, action) => {
            state.value = [...action.payload];
        },
        editComment: (state, action) => {
            const updatedList = state.value.map(obj => {
                if (obj.id == action.payload.id) {
                    obj.text = action.payload.text;
                }
                return obj;
            })
            state.value = [...updatedList];
        }
    }
})

export const { addComment, deleteComment, setComments, editComment } = commentsSlice.actions

export default commentsSlice.reducer