import { createSlice } from "@reduxjs/toolkit";

const cartUISlice = createSlice({
  name: "cartUI",
  initialState: { showcart: false, notification: null},
  reducers: {
    toggle(state) {
      state.showcart = !state.showcart;
    },
    showNotification(state, action) {
      const message = action.payload.message;
      const status = action.payload.status;
      const title = action.payload.title;
      state.notification = {message, status, title};
    }
  },
});

const cartUIReducer = cartUISlice.reducer;
export default cartUIReducer;
export const cartUIAction = cartUISlice.actions;