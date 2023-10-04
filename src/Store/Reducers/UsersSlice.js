import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  usersLoading: false,
  usersList: [],
  singleUser: {
    first_name: "",
    last_name: "",
    language: "en",
    email: "",
    password: "",
    status: 0,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersLoading: (state, action) => {
      state.usersLoading = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
});

export const { setUsersLoading, setUsersList, setSingleUser } =
  usersSlice.actions;

export default usersSlice.reducer;
