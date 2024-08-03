import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Id: "",
  UserName: "",
};

const user = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action)
      state.Id = action.payload.Id;
      state.UserName = action.payload.UserName;
    },
    clearUser: (state) => {
      state.Id = "";
      state.UserName = "";
    },
  },
});

export default user.reducer;

export const { setUser, clearUser } = user.actions;
