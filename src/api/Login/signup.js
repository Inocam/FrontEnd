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
    },
  });
};
