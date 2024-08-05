import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../interceptor";

const MUTATION_KEY = {
  TEAM_CREATE: "TEAM_CREATE",
};

export const useCreateTeam = () => {
  const usequery = useQueryClient();
  const URL = "/foot/teams";
  // const dispatch = useDispatch();

  return useMutation({
    mutationKey: [MUTATION_KEY.TEAM_CREATE],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: () => {
      usequery.invalidateQueries("getTeam");
    },
    onError: (error) => {
      console.error(error.message);
      // 여기서 에러를 처리하거나 에러 상태를 설정할 수 있습니다.
    },
  });
};
