import { http } from "../interceptor";
const MUTATION_KEY = {
  CREATE_ROOM: "CREATE_ROOM",
};
export const useCreateRoom = () => {
  const URL = "/foot/teams/invite";

  return  ({
    mutationKey: [MUTATION_KEY.CREATE_ROOM],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error.message);
      // 여기서 에러를 처리하거나 에러 상태를 설정할 수 있습니다.
    },
  });
};
