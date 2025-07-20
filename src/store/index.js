import { configureStore } from "@reduxjs/toolkit";
import cartUIReducer from "./Cart-ui-slice";
import cartSlice from "./Cart-event-slice";

const store = configureStore({ reducer: { cartUI: cartUIReducer, cart: cartSlice.reducer } });
export default store;
