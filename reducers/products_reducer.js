import { GET_ALL_PRODUCTS } from "../actions/types";
import fakeData from "../fakeData.json";
const INITIA_STATE = fakeData;

export default function get_products(state = INITIA_STATE, action) {
  if (action.type === GET_ALL_PRODUCTS) {
    return (state = action.payload);
  }
  return state;
}
