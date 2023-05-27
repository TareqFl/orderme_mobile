import { CHECK_AUTH, LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  auth: null,
  username: "Guest",
};

export default function auth_reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_AUTH:
      return (state = action.payload);
    case LOGOUT:
      return (state = action.payload);
    default:
      return state;
  }
}
