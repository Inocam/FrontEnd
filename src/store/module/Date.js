import { createSlice } from "@reduxjs/toolkit";
const currentDate = new Date();

const initialState = {
  date: {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1, // 0부터 시작하므로 +1 필요
    day: currentDate.getDate(),
    lastday: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(), // 해당 월의 마지막 날 계산
  },
};
const user = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.Date;
    },
  },
});
 
export default user.reducer;

export const { setDate } = user.actions;
