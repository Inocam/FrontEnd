import { useMutation } from "@tanstack/react-query";
import { http } from "../interceptor";
import { setRefetch } from "../../store/module/Date";
import { useDispatch } from "react-redux";

const MUTATION_KEY = {
  SIGN_UP: "TASK_CREATE",
};

export const useCreateTask = () => {
  const URL = "/foot/task/create";
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: [MUTATION_KEY.SIGN_IN],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: () => {
      // dispatch(setRefetch()); //탠스택 쿼리를 사용하지 않아서 axios를 만료 하는거 처럼 사용
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
