import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MessageId: 0,
};

const user = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setMessageId: (state, action) => {
      state.MessageId = action.payload.TeamId;
    },
  },
});

export default user.reducer;

export const { setMessageId } = user.actions;
