import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MessageId: 0,
};

const user = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setMessageId: (state, action) => {
      state.TeamId = action.payload.MessageId;
    },
  },
});

export default user.reducer;

export const { setMessageId } = user.actions;
