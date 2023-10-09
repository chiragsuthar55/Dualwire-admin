import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  currentUser: {
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    gender: 1,
    dob: "",
  },
  changePasswordValues: { new_password: "", password: "", old_password: "" },
  dashboardRafflesChartData: {},
  dashboardSpentChartData: {},
  dashboardUserChartData: {},
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setChangePassword: (state, action) => {
      state.changePasswordValues = action.payload;
    },
    setDashboardRafflesChartData: (state, action) => {
      state.dashboardRafflesChartData = action.payload;
    },
    setDashboardUserChartData: (state, action) => {
      state.dashboardUserChartData = action.payload;
    },
    setDashboardSpentChartData: (state, action) => {
      state.dashboardSpentChartData = action.payload;
    },
  },
});

export const {
  setLoading,
  setCurrentUser,
  setChangePassword,
  setDashboardRafflesChartData,
  setDashboardUserChartData,
  setDashboardChartData,
  setDashboardSpentChartData,
} = commonSlice.actions;

export default commonSlice.reducer;
