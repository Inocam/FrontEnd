import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Id: "",
  UserName: "",
  TeamId: 1,
  TeamLeader: "",
  name: "",
};

const user = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.Id = action.payload.Id;
      state.UserName = action.payload.UserName;
    },
    clearUser: (state) => {
      state.Id = "";
      state.UserName = "";
    },
    setTeamId: (state, action) => {
      state.TeamId = action.payload.TeamId;
      state.TeamLeader = action.payload.TeamLeader;
      state.TeamName = action.payload.name;
    },
    Logout: () => initialState,
  },
});

export default user.reducer;

export const { setUser, clearUser, setTeamId, Logout } = user.actions;
