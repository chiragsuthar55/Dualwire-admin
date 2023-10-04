import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./Reducers/AuthSlice";
import common from "./Reducers/CommonSlice";
import plan from "./Reducers/PlanSlice";
import users from "./Reducers/UsersSlice";

const reducers = combineReducers({
  auth,
  common,
  plan,
  users,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
