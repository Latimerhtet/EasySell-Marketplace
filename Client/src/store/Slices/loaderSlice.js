import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isProcessing: null,
};
export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
