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
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config.url !== "/api/user/login"
    ) {
      console.log(error.response.status, error.config.url);
      // 엑세스 토큰이 만료되었고 인증되지 않았을 경우
      originalRequest._retry = true;
      const accessToken = Cookies.get("AccessToken");
      try {
        const res = await axios.get("/api/user/refresh", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }); // 리프레시 토큰을 이용하여 새로운 엑세스 토큰 발급 요청 아직 * api 만들어있지않음 임의 주소
        if (res.data.data.accessToken) {
          Cookies.set("AccessToken", res.data.data.accessToken, {
            expires: 1 / 24,
            overwrite: true,
          }); // 발급받은 새로운 엑세스 토큰을 저장
          originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return axios(originalRequest); // 저장되어있는 마지막 요청을 새토큰으로 재요청
        } else {
          alert("사용자 인증에 실패했습니다. 1재 로그인 해주세요");
          Cookies.remove("AccessToken");
          window.location.href = "/";
        }
      } catch (error) {
        alert("로그인 인증이 만료 되었습니다. 1로그아웃됩니다.");
        Cookies.remove("AccessToken");
        window.location.href = "/";
      }
    } else {
      return Promise.reject(error); //만약 인증오류가 아닐경우 리턴
    }
  }
);

export const http = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, data = "") => axios.post(url, data).then((res) => res),
  put: (url, data = "") => axios.put(url, data).then((res) => res.data),
  patch: (url, data = "") => axios.patch(url, data).then((res) => res.data),
  delete: (url) => axios.delete(url).then((res) => res.data),
};
