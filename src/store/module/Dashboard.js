import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavOpen: true,
};

const user = createSlice({
  name: "envState",
  initialState,
  reducers: {
    navopenHandler: (state) => {
      return { ...state, isNavOpen: !state.isNavOpen };
    },
    massagecloseHandler: (state) => {
      return { ...state, isNavOpen: !state.isNavOpen };
    },
    massageopenHandler: (state) => {
      return { ...state, isNavOpen: !state.isNavOpen };
    },
  },
});

export default user.reducer;

export const { navopenHandler } = user.actions;
