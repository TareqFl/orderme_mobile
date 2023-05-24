import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Products from "./products_reducer";

export const store = createStore(
  combineReducers({
    Products,
  }),
  applyMiddleware(thunk)
);
