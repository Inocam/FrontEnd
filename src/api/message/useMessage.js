import { useQuery } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";

const BASE_URL = "/foot/chat/rooms";

export const useGetMessage = () => {
  const userId = useSelector((state) => state.user.Id);
  console.log(userId);

  const query = useQuery({
    queryKey: ["getMessage"],
    queryFn: async () => {
      if (!userId) throw new Error("userId가 없습니다");
      try {
        const response = await http.get(`${BASE_URL}/${userId}`);
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
