import { createSlice } from "@reduxjs/toolkit";

export const blob = createSlice({
  name: "blob",
  initialState: { value: "" },
  reducers: {
    setBlob: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBlob } = blob.actions;
export default blob.reducer;
