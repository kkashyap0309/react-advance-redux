import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { cartUIAction } from "./store/Cart-ui-slice";
import Notification from "./components/UI/Notification";

let initialCall = true;

function App() {
  const dispatch  = useDispatch();
  
  const showCart = useSelector(fetchCartVisibility);
  function fetchCartVisibility(state) {
    return state.cartUI.showcart;
  }

  const notification = useSelector((state) => state.cartUI.notification);

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    const updateCartData  = async () => {
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
      dispatch(cartUIAction.showNotification({
        title: "Success",
        status: "success",
        message: "Cart updated successfully!!"
      }))
    };

    if (initialCall) {
      initialCall=false;
      return;
    }

    updateCartData().catch(err => {
      dispatch(cartUIAction.showNotification({
        title: "Error",
        status: "error",
        message: "Cart update Failed!!"
      }));
    })
  }, [cart, dispatch]);

  return (
    <>
    {notification && <Notification {...notification}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
