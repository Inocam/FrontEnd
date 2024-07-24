import { configureStore } from "@reduxjs/toolkit";
import nav from "../module/Dashboard";

export const store = configureStore({
  reducer: {
    nav,
  },
});
