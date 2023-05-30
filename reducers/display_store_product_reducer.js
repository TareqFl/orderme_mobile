import {
  DISPLAY_STORE_PRODUCT,
  REFRESH_DISPLAY_PRODUCT,
} from "../actions/types";

const INITIAL_STATE = null;

export default function store_pro_red(state = INITIAL_STATE, action) {
  if (action.type === DISPLAY_STORE_PRODUCT) {
    return (state = action.payload);
  }
  if (action.type === REFRESH_DISPLAY_PRODUCT) {
    return (state = INITIAL_STATE);
  }
  return state;
}
