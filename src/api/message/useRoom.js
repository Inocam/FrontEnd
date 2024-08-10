import { http } from "../interceptor";
const MUTATION_KEY = {
  CREATE_ROOM: "CREATE_ROOM",
};
export const useCreateRoom = () => {
  const URL = "/foot/teams/invite";

  return {
    mutationKey: [MUTATION_KEY.CREATE_ROOM],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error.message);
    },
  };
};
