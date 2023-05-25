import { PRODUCT_SEARCH } from "../actions/types";
import fakeData from "../fakeData.json";

const INITIAL_STATE = [...fakeData];

export default function search_reducer(state = INITIAL_STATE, action) {
  if (action.type === PRODUCT_SEARCH) {
    return (state = action.payload);
  }
  return state;
}
