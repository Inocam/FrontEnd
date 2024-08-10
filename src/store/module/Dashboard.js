import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: true,
  ismassageOpen: false,
};

const user = createSlice({
  name: "envState",
  initialState,
  reducers: {
    navopenHandler: (state) => {
      return { ...state, isNavOpen: !state.isNavOpen };
    },
    massagecloseHandler: (state) => {
      return { ...state, ismassageOpen: false};
    },
    massageopenHandler: (state) => {
      return { ...state, ismassageOpen: true };
    },
  },
});

export default user.reducer;

export const { navopenHandler, massagecloseHandler, massageopenHandler } =
  user.actions;
