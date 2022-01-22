import { createSlice } from "@reduxjs/toolkit";

export const stageSlice = createSlice({
  name: "stage",
  initialState: { value: 0 },
  reducers: {
    advance: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { advance } = stageSlice.actions;
export default stageSlice.reducer;
