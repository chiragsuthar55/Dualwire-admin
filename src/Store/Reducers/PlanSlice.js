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
  subscriptionsList: [],
  rafflesList: [],
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
    setSubscriptionsList: (state, action) => {
      state.subscriptionsList = action.payload;
    },
    setRafflesList: (state, action) => {
      state.rafflesList = action.payload;
    },
  },
});

export const {
  setPlanLoading,
  setPlans,
  setSinglePlan,
  setSubscriptionsList,
  setRafflesList,
} = planSlice.actions;

export default planSlice.reducer;
