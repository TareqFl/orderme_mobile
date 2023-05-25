import { ADD_TO_CART } from "../actions/types";

const INITIAL_STATE = [];

export default function cart_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  if (type === ADD_TO_CART) {
    return (state = payload);
  }
  return state;
}
