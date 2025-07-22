import { createSlice } from "@reduxjs/toolkit";
import { cartUIAction } from "./Cart-ui-slice";

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

//creating a thunk, A thunk is another way  to keep sideEffect and reducer separelty
// Its works as action creator. 

export function sendCartData(cart) {

  //The redux will execute this method and it will give us dispatch argument automatically  so that inside this 
  // function we can execute dispach again 
  return async (dispatch) => {
    dispatch(
      cartUIAction.showNotification({
        title: "pending",
        status: "Sending...",
        message: "Sending Cart Data",
      })
    );

    async function sendRequest() {
      const updateResponse = await fetch(
        "http://localhost:4000/user-cart-product",
        {
          method: "PUT",
          body: JSON.stringify({ cart }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updateResponse.ok) {
        throw new Error();
      }
    }

    try {
      await sendRequest();
      dispatch(
        cartUIAction.showNotification({
          title: "Success",
          status: "success",
          message: "Cart updated successfully!!",
        })
      );
    } catch (error) {
      dispatch(
        cartUIAction.showNotification({
          title: "Error",
          status: "error",
          message: "Cart update Failed!!",
        })
      );
    }
  };
}

export default cartSlice;
export const cartActions = cartSlice.actions;
