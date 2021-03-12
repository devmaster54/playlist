import { SET_TOKEN, LOG_OUT } from "../actions/auth";

const defaultState = {
  isAuthenticated: false,
  token: "",
  refresh_token: ""
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, ...action, isAuthenticated: true };
    case LOG_OUT:
      return defaultState;
    default:
      return state;
  }
};
