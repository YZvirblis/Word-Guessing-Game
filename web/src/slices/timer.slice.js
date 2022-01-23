import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: { value: 0 },
  reducers: {
    setTimer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTimer } = timerSlice.actions;
export default timerSlice.reducer;
