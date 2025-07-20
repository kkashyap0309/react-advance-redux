import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      state.quantity++;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.id
      );
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const itemId = action.payload;
      state.quantity--;
      const deletingItem = state.items.find((item) => item.itemId === itemId);

      if (deletingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== itemId);
      } else {
        deletingItem.quantity = deletingItem.quantity - 1;
        deletingItem.totalPrice = deletingItem.totalPrice - deletingItem.price;
      }
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
