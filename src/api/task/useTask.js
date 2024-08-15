import { useQuery } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
const BASE_URL = "/foot/task/read/";
//탠스택 쿼리로 불러오는과정에서
export const useGetTaskcount = (subdate = []) => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);
  let URL = `${BASE_URL}taskListQuantity/MonthByTeam?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}&teamId=${TeamId}`;
  if (subdate.year) {
    URL = `${BASE_URL}taskListQuantity/MonthByTeam?startDate=${subdate.year}-01-01&endDate=${subdate.year}-12-31&teamId=${subdate.TeamId}`;
  }
  if (subdate.createDate) {
    URL = `${BASE_URL}taskListQuantity/MonthByTeam?startDate=${subdate.createDate}&endDate=${date.year}-${date.month}-${date.day}&teamId=${subdate.TeamId}`;
  }
  const [Taskcount, setTaskcount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const addDate = (date) => {
    console.log(date);
    setTaskcount((prevState) => {
      const existingValue = prevState[date] || 0;
      return {
        ...prevState,
        [date]: existingValue + 1,
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(URL);
        setTaskcount(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TeamId, date.month]);
  return { Taskcount, isLoading, isError, addDate };
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
//
// http://54.180.227.191:8080/foot/task/read/taskList/DayByTeam?dueDate=2024-08-12&teamId=2
// http://54.180.227.191:8080/foot/task/read/taskList/DayByTeam?dueDate=2024-08-02&teamId=1

export const useGetTask = () => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);

  const [TaskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const addTask = (Tdate) => {
    {
      setTaskData((prevstate) => [...prevstate, Tdate]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(
          `${BASE_URL}taskList/DayByTeam?dueDate=${date.year}-${date.month
            .toString()
            .padStart(2, "0")}-${date.day
            .toString()
            .padStart(2, "0")}&teamId=${TeamId}`
        );
        setTaskData(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TeamId, date.day]);

  return { TaskData, isLoading, isError, addTask };
};

export const useGetTaskstatuscount = (subdate = []) => {
  let TeamId = useSelector((state) => state.user.TeamId);
  const date = useSelector((state) => state.Date.date);
  if (subdate.length != 0) {
    TeamId = subdate.TeamId;
  }
  let URL = `${BASE_URL}taskStatusQuantity/MonthByTeam?startDate=${date.year}-${date.month}-01&endDate=${date.year}-${date.month}-${date.lastday}&teamId=${TeamId}`;
  if (subdate.createDate) {
    URL = `${BASE_URL}taskStatusQuantity/MonthByTeam?startDate=${subdate.createDate}&endDate=${date.year}-${date.month}-${date.day}&teamId=${subdate.TeamId}`;
  }
  const [TaskStatuscount, setTaskStatuscount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const AddTTask = (date) => {
    console.log(date);
    setTaskStatuscount((prevState) => {
      const existingValue = prevState[date] || 0;
      return {
        ...prevState,
        [date]: existingValue + 1,
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(URL);
        setTaskStatuscount(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [TeamId, date.month]);

  return { TaskStatuscount, isLoading, isError, AddTTask };
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
