import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsSlice';
import commentsReducer from './reducers/commentsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});