import { cartUIAction } from "./Cart-ui-slice";
import { cartActions } from "./Cart-event-slice";

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
          body: JSON.stringify({ 
            //destructured the update payload to backend since we dont want to send "dataChanged" flag to backend
            cart:{
              items: cart.items,
              quantity: cart.quantity,
            }
           }),
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

export function fetchCartData() {
  return async (dispatch) => {
    async function fetchCart() {
      const response = await fetch("http://localhost:4000/cart");
      const resData = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      return resData.cart;
    }

    try {
      const cartData = await fetchCart();
      dispatch(cartActions.replaceItem(cartData));
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
