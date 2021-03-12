import { DEFAULT_API_URL as _DEFAULT_API_URL } from "../config";
export const DEFAULT_API_URL = _DEFAULT_API_URL;

import { logout } from "../redux/actions/auth";

function getQueryString(p) {
  const e = encodeURIComponent;
  return p
    ? `?${Object.keys(p)
        .map(k => `${e(k)}=${e(p[k])}`)
        .join("&")}`
    : "";
}

export const FETCH = async (
  _path,
  {
    stringify,
    token,
    path = "",
    headers = {},
    params,
    body,
    method = "GET",
    json = false,
    isFile = false,
    dispatch = () => {}
  } = {}
) => {
  const req = {
    method,
    headers
  };
  let __path = path || _path;
  if (__path.indexOf(" ") > -1) {
    __path = __path.split(" ");
    req.method = __path[0];
    __path = __path[1];
  }
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  if (json) {
    req.headers["Content-Type"] = "application/json";
    req.headers["Accept"] = "application/json";
  }
  if (body) {
    req.body = stringify ? JSON.stringify(body) : body;
  }
  const res = await fetch(
    `${DEFAULT_API_URL}${__path}${getQueryString(params)}`,
    req
  );
  if (res.status === 200) {
    return isFile ? res : res.json();
  } else if (res.status === 401) {
    dispatch(logout());
    return { success: false };
  } else {
    return res.json();
  }
};

export const idx = (p, o, d = null) => {
  return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : d), o);
};

export const stateDelete = (a, k, v) => {
  return k ? a.filter(i => i[k] !== v) : a.filter(i => i !== v);
};

export const stateUpdate = (a, k, v) => {
  return a.map(i => {
    return i[k] === v[k] ? v : i;
  });
};

export const isKeyinArray = (k, v, a) => {
  return a.some(function(e) {
    return e[k] === v;
  });
};
