import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  authLoading: false,
  currentUser: {},
  loginValues: { email: "", password: "", remember: false },
  passwordValues: { currentPassword: "", newPassword: "" },
  resetPasswordValues: { confirmPassword: "", newPassword: "" },
  registerValues: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    remember: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoginValues: (state, action) => {
      state.loginValues = action.payload;
    },
    setRegisterValues: (state, action) => {
      state.registerValues = action.payload;
    },
    setPasswordValues: (state, action) => {
      state.passwordValues = action.payload;
    },
    setResetPasswordValues: (state, action) => {
      state.resetPasswordValues = action.payload;
    },
    resetAuthSlice: () => initialState,
  },
});

export const {
  setAuthLoading,
  setCurrentUser,
  resetAuthSlice,
  setLoginValues,
  setRegisterValues,
  setPasswordValues,
  setResetPasswordValues,
} = authSlice.actions;

export default authSlice.reducer;
