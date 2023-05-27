import { GET_STORE_PRODUCT } from "../actions/types";

const INITIAL_STATE = null;

export default function store_products_reducer(state = INITIAL_STATE, action) {
  if (action.type === GET_STORE_PRODUCT) {
    return (state = action.payload);
  }
  return state;
}
