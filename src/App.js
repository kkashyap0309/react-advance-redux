import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/Cart-action.js";

let initialCall = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector(fetchCartVisibility);
  function fetchCartVisibility(state) {
    return state.cartUI.showcart;
  }

  const notification = useSelector((state) => state.cartUI.notification);

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (initialCall) {
      initialCall = false;
      return;
    }

    if (cart.dataChanged) { //the flag to chek if we need to send data to backend
      //The redux will execute the function sendCartData for us.
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
