import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  planLoading: false,
  planList: [],
  singlePlan: {
    name: "",
    description: "",
    status: 0,
    prices: [
      {
        price: 0,
        duration: "month",
      },
      {
        price: 0,
        duration: "year",
      },
    ],
    monthly: 0,
    yearly: 0,
    metadata: {
      "Facebook Giveaways": false,
      "Instagram Giveaways": false,
      "List Giveaway": false,
      "Multi-Network Giveaway": false,
      "Twitter Giveaways": false,
      "Youtube Giveaways": false,
      "Tiktok Giveaways": false,
    },
  },
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlanLoading: (state, action) => {
      state.planLoading = action.payload;
    },
    setPlans: (state, action) => {
      state.planList = action.payload;
    },
    setSinglePlan: (state, action) => {
      state.singlePlan = action.payload;
    },
  },
});

export const { setPlanLoading, setPlans, setSinglePlan } = planSlice.actions;

export default planSlice.reducer;
