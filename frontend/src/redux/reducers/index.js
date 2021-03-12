import { combineReducers } from "redux";
import auth from "./auth";
import global from "./global";

const appReducer = combineReducers({
  auth,
  global
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state.auth = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
