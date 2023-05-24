import { CHECK_AUTH, LOGIN, LOGOUT } from "../actions/types";

const INITIAL_STATE = {
  auth: null,
  username: "Guest",
};

export default function auth_reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_AUTH:
      return (state = action.payload);
    case LOGIN:
      return (state = action.payload);
    case LOGOUT:
      return (state = action.payload);
    default:
      state;
  }
}
