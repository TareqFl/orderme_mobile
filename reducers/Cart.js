import { ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from "../actions/types";

const INITIAL_STATE = [];

export default function cart_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return (state = payload);
    case DELETE_FROM_CART:
      return (state = payload);

    case CLEAR_CART:
      return (state = []);
    default:
      return state;
  }
}
