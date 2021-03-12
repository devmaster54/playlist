import { storeData, removeData } from "../../services";

export const SET_TOKEN = "SET_TOKEN";
export const LOG_OUT = "LOG_OUT";

export const setToken = ({ token, refresh_token }) => {
  storeData("token", { token, refresh_token }, { json: true });
  return { type: SET_TOKEN, token, refresh_token };
};

export const logout = () => {
  removeData("token");
  return { type: LOG_OUT };
};
