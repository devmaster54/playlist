import { FETCH } from "../mocks";
import { store } from "../services";

export const Api_GetMusicList = async dispatch => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /playlist/music", {
    token,
    dispatch
  });
  return res;
};

export const Api_GetPlayList = async dispatch => {
  const { token } = store.getState().auth;
  const res = await FETCH("GET /playlist/list", {
    token,
    dispatch
  });
  return res;
};

export const Api_AddPlayList = async (dispatch, music_id) => {
  const { token } = store.getState().auth;
  const res = await FETCH("POST /playlist/update", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify({
      music_id
    })
  });
  return res;
};

export const Api_DeletePlayList = async (dispatch, music_id) => {
  const { token } = store.getState().auth;
  const res = await FETCH("DELETE /playlist/update", {
    token,
    dispatch,
    json: true,
    body: JSON.stringify({
      music_id
    })
  });
  return res;
};
