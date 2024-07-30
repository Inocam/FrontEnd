import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../interceptor";

const MUTATION_KEY = {
  SIGN_IN: "SIGN_IN",
};

export const usePostSignInData = () => {
  const queryClient = useQueryClient();
  const URL = "api/user/login";

  return useMutation({
    mutationKey: [MUTATION_KEY.SIGN_IN],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MUTATION_KEY.SIGN_IN] });
      // 로그인 성공 후 추가 작업 (예: 사용자 정보 저장)
      // localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error(error.message);
      // 여기서 에러를 처리하거나 에러 상태를 설정할 수 있습니다.
    },
  });
};
