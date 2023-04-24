import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT,
  INCREMENT,
  REMOVE_FROM_CART,
} from "./actionTypes";
import { getStorage, saveStorage } from "./localStorage";

const initialState = {
  cart: getStorage(),
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state.cart = [
        ...state.cart,
        { ...action.payload.product, qty: action.payload.qty },
      ];
      saveStorage(state.cart);
      return {
        ...state,
        cart: state.cart,
      };
    case REMOVE_FROM_CART:
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: state.cart,
      };
    case INCREMENT:
      state.cart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
      saveStorage(state.cart);
      return {
        ...state,
        cart: state.cart,
      };
    case DECREMENT:
      state.cart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
      );
      saveStorage(state.cart);
      return {
        ...state,
        cart: state.cart,
      };
    case CLEAR_CART:
      saveStorage([]);
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
