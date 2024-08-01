import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { http } from "../interceptor";

const MUTATION_KEY = {
  SIGN_IN: "SIGN_IN",
};

export const usePostSignInData = () => {
  const queryClient = useQueryClient();
  const URL = "/api/user/login";

  return useMutation({
    mutationKey: [MUTATION_KEY.SIGN_IN],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: (data) => {
      Cookies.remove("AccessToken");
      Cookies.remove("RefreshToken")
      // console.log(data);
      Cookies.set("AccessToken", data.data.accessToken, {
        expires: 30 / 770,
      });
      Cookies.set("RefreshToken", data.data.refreshToken, { expires: 7 });
    },
    onError: (error) => {
      console.error(error.message);
      // 여기서 에러를 처리하거나 에러 상태를 설정할 수 있습니다.
    },
  });
};
