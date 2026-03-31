import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    registerMeassage: null,
    isEmailVerified: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.registerMessage = null;
    },
    logout: (state) => {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setProfilePhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUserName(state, action) {
      state.user.username = action.payload;
    },
    setIsEmailVerified(state, action) {
      state.isEmailVerified = true;
      state.registerMeassage = null;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authReducer, authActions };
