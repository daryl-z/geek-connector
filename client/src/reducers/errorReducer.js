import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
