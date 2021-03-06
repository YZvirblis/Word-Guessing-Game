import { createSlice } from "@reduxjs/toolkit";

export const wordSlice = createSlice({
  name: "word",
  initialState: { value: { value: "", difficulty: 0 } },
  reducers: {
    setChosenWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenWord } = wordSlice.actions;
export default wordSlice.reducer;
