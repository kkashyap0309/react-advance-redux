import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/Cart-event-slice";

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
    if (initialCall) {
      initialCall=false;
      return;
    }

    //The redux will execute the function sendCartData for us.
    dispatch(sendCartData(cart));
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
