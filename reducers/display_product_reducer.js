import { DISPLAY_PRODUCT, REFRESH_DISPLAY_PRODUCT } from "../actions/types";

const INITIAL_STATE = null;

export default function display_reducer(state = INITIAL_STATE, action) {
  if (action.type === DISPLAY_PRODUCT) {
    return (state = action.payload);
  }
  if (action.type === REFRESH_DISPLAY_PRODUCT) {
    return (state = INITIAL_STATE);
  }

  return state;
}
