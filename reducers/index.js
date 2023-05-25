import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Products from "./products_reducer";
import SearchedProduct from "./search_reducer";
import Cart from "./Cart";

export const store = createStore(
  combineReducers({
    Products,
    SearchedProduct,
    Cart,
  }),
  applyMiddleware(thunk)
);
