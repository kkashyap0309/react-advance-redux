import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { cartUIAction } from '../../store/Cart-ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  function handleCartClick() {
    dispatch(cartUIAction.toggle())
  }
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <button className={classes.button} onClick={handleCartClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
