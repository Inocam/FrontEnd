import { useQuery } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";

const BASE_URL = "/foot/teams/user/";

export const useGetMessage = () => {
  const userId = useSelector((state) => state.user.Id);

  const query = useQuery({
    queryKey: ["getTeam"],
    queryFn: async () => {
      if (!userId) throw new Error("userId가 없습니다");
      try {
        const response = await http.get(`${BASE_URL}${userId}/teams`);
        console.log(response);
        return response;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];
        }
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return query;
};
