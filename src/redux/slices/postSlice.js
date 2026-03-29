import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: 0, // خليها 0 بدل null للأمان
    postsCategories: [], // تأكد من الاسم هنا
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostsCategories: (state, action) => {
      // تصحيح الاسم هنا ليتطابق مع الـ initialState
      state.postsCategories = action.payload;
    },
    setPostsCount: (state, action) => {
      state.postsCount = action.payload;
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;
export { postReducer, postActions };
