import { useMutation } from "@tanstack/react-query";
import { http } from "../interceptor";

const MUTATION_KEY = {
  SIGN_UP: "SIGN_UP",
};

export const usePostSignUpData = () => {
  const URL = "api/user/signup";

  return useMutation({
    mutationKey: [MUTATION_KEY.SIGN_IN],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onError: (error) => {
      console.error(error.message);
      // 여기서 에러를 처리하거나 에러 상태를 설정할 수 있습니다.
    },
  });
};
