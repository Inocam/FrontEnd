import { useQuery } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";

const BASE_URL = "/foot/task/mainview/";

export const useGetTaskcount = () => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);
  const query = useQuery({
    queryKey: ["getTask"],
    queryFn: async () => {
      // /foot/task/mainview/countTask?startDate=2024-08-01&endDate=2024-08-31

      const response = await http.get(
        `${BASE_URL}countTask/${TeamId}?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}`
      );
      return response;
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return query;
};

export const useGetTask = () => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);
  const query = useQuery({
    queryKey: ["getTask"],
    queryFn: async () => {
      // /foot/task/mainview/?dueDate=2024-08-17

      const response = await http.get(
        `${BASE_URL}${TeamId}?dueDate=${date.year}-${date.month}-${date.day}`
      );
      return response;
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return query;
};

export const useGetTaskstatuscount = () => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);
  const query = useQuery({
    queryKey: ["getTask"],
    queryFn: async () => {
      //foot/task/mainview/countTaskStatus?startDate=2000-01-01&endDate=2099-12-31

      const response = await http.get(
        `${BASE_URL}countTaskStatus/${TeamId}?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}`
      );
      return response;
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return query;
};
