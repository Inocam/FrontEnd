import { useMutation } from "@tanstack/react-query";
import { http } from "../interceptor";

const MUTATION_KEY = {
  SIGN_UP: "TASK_CREATE",
};

export const useCreateTask = () => {
  const URL = "/foot/task/create";
  return useMutation({
    mutationKey: [MUTATION_KEY.SIGN_IN],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: () => {
      // dispatch(setRefetch()); //탠스택 쿼리를 사용하지 않아서 axios를 만료 하는거 처럼 사용
      alert("등록완료")
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
