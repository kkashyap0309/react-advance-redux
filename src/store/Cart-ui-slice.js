import { createSlice } from "@reduxjs/toolkit";

const cartUISlice = createSlice({
  name: "cartUI",
  initialState: { showcart: false },
  reducers: {
    toggle(state) {
      state.showcart = !state.showcart;
    },
  },
});

const cartUIReducer = cartUISlice.reducer;
export default cartUIReducer;
export const cartUIAction = cartUISlice.actions;