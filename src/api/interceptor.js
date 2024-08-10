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

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config.url !== "/api/auth/sign-in"
//     ) {
//       originalRequest._retry = true;
//       const refreshToken = Cookies.get("RefreshToken"); // 쿠키에서 리프레시 토큰을 가져옴
//       if (refreshToken) {
//         try {
//           const res = await axios.get("/api/refresh", {
//             headers: {
//               refresh: `Bearerd${refreshToken}`,
//             },
//           }); // 리프레시 토큰을 이용하여 새로운 엑세스 토큰 발급 d요청
//           if (res.data.data.newAccessToken) {
//             Cookies.set("AccessToken", res.data.data.newAccessToken, {
//               expires: 1 / 24,
//               sameSite: "strict",
//               overwrite: true,
//             }); // 발급받은 새로운 엑세스 토큰을 저장
//             Cookies.set("RefreshToken", res.data.data.newRefreshToken, {
//               expires: 30,
//               sameSite: "strict",
//               overwrite: true,
//             });
//             originalRequest.headers.Authorization = `Bearer ${res.data.data.newAccessToken}`; // 새로운 엑세스 토큰으로 재요청
//             return axios(originalRequest); // 재요청
//           } else {
//             alert("사용자 인증에 실패했습니다. 재 로그인 해주세요");
//             Cookies.remove("AccessToken");
//             Cookies.remove("RefreshToken");
//             window.location.href = "/Login";
//           }
//         } catch (error) {
//           alert("로그인 인증이 만료 되었습니다. 로그아웃됩니다.");
//           Cookies.remove("AccessToken");
//           Cookies.remove("RefreshToken");
//           window.location.href = "/Login";
//         }
//       } else {
//         alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
//         window.location.href = "/Login";
//       }
//     }
//     return Promise.reject(error);
//     // 명시적으로 실패한 경우를 처리하기 위해
//     // Promise.reject(error)를 반환함으로써 오류가 호출자에게 전파되고 이에 대한 적절한 처리가 가능
//   }
// );

export const http = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, data = "") => axios.post(url, data).then((res) => res),
  put: (url, data = "") => axios.put(url, data).then((res) => res.data),
  patch: (url, data = "") => axios.patch(url, data).then((res) => res.data),
  delete: (url) => axios.delete(url).then((res) => res.data),
};
