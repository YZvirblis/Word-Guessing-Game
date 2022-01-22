import { createSlice } from "@reduxjs/toolkit";

export const stageSlice = createSlice({
  name: "stage",
  initialState: { value: 0 },
  reducers: {
    advance: (state, action) => {
      console.log("ACTION PAYLOAD: ", action.payload);
      state.value = action.payload;
      console.log("STATE VALUE: ", state.value);
    },
  },
});

export const { advance } = stageSlice.actions;
export default stageSlice.reducer;
