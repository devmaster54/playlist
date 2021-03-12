let DEFAULT_API_URL;
// dev
if (process.env.NODE_ENV === "development") {
  DEFAULT_API_URL = "http://192.168.0.147:8000";
}
// prod
else {
  DEFAULT_API_URL = "http://10.20.2.2:8000";
}
export { DEFAULT_API_URL };
