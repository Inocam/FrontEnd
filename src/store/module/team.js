import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Id: "",
  UserName: "",
  TeamId: 1,
};

const user = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.Id = action.payload.Id;
      state.UserName = action.payload.UserName;
    },
    clearUser: (state) => {
      state.Id = "";
      state.UserName = "";
    },
    setTeamId: (state, action) => {
      state.TeamId = action.payload.TeamId;
    },
    setTeamId: (state, action) => {
      state.TeamId = action.payload.TeamId;
    },
  },
});

export default user.reducer;

export const { setUser, clearUser, setTeamId } = user.actions;
