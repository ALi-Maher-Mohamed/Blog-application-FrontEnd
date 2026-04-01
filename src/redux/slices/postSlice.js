import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: 0,
    postsCategories: [],
    loading: false,
    isPostCreated: false,
    post: null,
    // إضافات الـ AI
    aiContent: "",
    aiSummary: "",
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostsCategories: (state, action) => {
      state.postsCategories = action.payload;
    },
    setPostsCount: (state, action) => {
      state.postsCount = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setIsPostCreated: (state) => {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated: (state) => {
      state.isPostCreated = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    // إضافات الـ AI الجديدة
    setAiContent: (state, action) => {
      state.aiContent = action.payload;
      state.loading = false;
    },
    setAiSummary: (state, action) => {
      state.aiSummary = action.payload;
      state.loading = false;
    },
    clearAiData: (state) => {
      state.aiContent = "";
      state.aiSummary = "";
    },
    // بقية الـ reducers الخاصة بك...
    setLike: (state, action) => {
      state.post.likes = action.payload.likes;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    addCommentToPost: (state, action) => {
      state.post.comments.push(action.payload);
    },
    updateCommentPost: (state, action) => {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment,
      );
    },
    deleteCommenFromPost: (state, action) => {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== action.payload,
      );
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;
export { postReducer, postActions };
