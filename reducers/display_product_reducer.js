import { DISPLAY_PRODUCT } from "../actions/types";

const INITIAL_STATE = null;

export default function display_reducer(state = INITIAL_STATE, action) {
  if (action.type === DISPLAY_PRODUCT) {
    return (state = action.payload);
  }
  return state;
}
