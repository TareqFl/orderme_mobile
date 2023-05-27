import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Products from "./products_reducer";
import SearchedProduct from "./search_reducer";
import Cart from "./Cart";
import Auth from "./auth_reducer";
import Display_Product from "./display_product_reducer";
import Store_Products from "./store_products_reducer";

export const store = createStore(
  combineReducers({
    Products,
    SearchedProduct,
    Cart,
    Auth,
    Display_Product,
    Store_Products,
  }),
  applyMiddleware(thunk)
);
