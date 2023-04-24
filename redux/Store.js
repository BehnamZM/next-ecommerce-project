import { combineReducers, createStore, applyMiddleware } from "redux";
import cartReducer from "./cart/cartReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  shoppingCart: cartReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;
