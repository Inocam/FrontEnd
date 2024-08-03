import { configureStore } from "@reduxjs/toolkit";
import nav from "../module/Dashboard";
import user from "../module/User";

export const store = configureStore({
  reducer: {
    nav,
    user,
  },
});
