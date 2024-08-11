import Axios from "axios";
import Cookies from "js-cookie";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("AccessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const http = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, data = "") => axios.post(url, data).then((res) => res),
  put: (url, data = "") => axios.put(url, data).then((res) => res.data),
  patch: (url, data = "") => axios.patch(url, data).then((res) => res.data),
  delete: (url) => axios.delete(url).then((res) => res.data),
};
