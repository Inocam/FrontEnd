import { useQuery } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const BASE_URL = "/foot/task/mainview";
//탠스택 쿼리로 불러오는과정에서
export const useGetTaskcount = () => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);

  const [Taskcount, setTaskcount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(
          `${BASE_URL}/countTask?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}&teamId=${TeamId}`
        );
        setTaskcount(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TeamId, date]);
  return { Taskcount, isLoading, isError };
};

// export const useGetTask = () => {
//   const TeamId = useSelector((state) => state.user.TeamId);
//   const date = useSelector((state) => state.Date.date);
//   const query = useQuery({
//     queryKey: ["getTask"],
//     queryFn: async () => {
//       // /foot/task/mainview/?dueDate=2024-08-17

//       const response = await http.get(
//         `${BASE_URL}?dueDate=${date.year}-${date.month}-${date.day}&teamId=${TeamId}`
//       );
//       return response;
//     },
//     onError: (error) => {
//       console.error("Error fetching messages:", error);
//     },
//   });

//   return query;
// };

export const useGetTaskstatuscount = () => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);

  const [TaskStatuscount, setTaskStatuscount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(
          `${BASE_URL}/countTaskStatus?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}&teamId=${TeamId}`
        );
        setTaskStatuscount(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TeamId, date]);

  return { TaskStatuscount, isLoading, isError };
};
// export const useGetTaskstatuscount = () => {
//   const TeamId = useSelector((state) => state.user.TeamId);
//   const date = useSelector((state) => state.Date.date);
//   const query = useQuery({
//     queryKey: ["GetTaskstatus", date],
//     queryFn: async () => {
//       //foot/task/mainview/countTaskStatus?startDate=2000-01-01&endDate=2099-12-31
//       const response = await http.get(
//         `${BASE_URL}/countTaskStatus?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}&teamId=${TeamId}`
//       );
//       return response;
//     },
//     onError: (error) => {
//       console.error("Error fetching messages:", error);
//     },
//   });

//   return query;
// };
