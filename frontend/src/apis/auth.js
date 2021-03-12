import { FETCH } from "../mocks";
import { store } from "../services";

export const Api_Login = async (email, password) => {
  const res = await FETCH("POST /auth/login", {
    json: true,
    body: JSON.stringify({
      email,
      password
    })
  });
  return res;
};

export const Api_Logout = async refresh_token => {
  const res = await FETCH("POST /auth/logout", {
    json: true,
    body: JSON.stringify({
      refresh_token
    })
  });
  return res;
};

export const Api_Detail = async dispatch => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /auth/detail", {
    token,
    dispatch
  });
  return res;
};
