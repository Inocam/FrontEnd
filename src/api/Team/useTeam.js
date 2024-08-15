import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export const useGetMTeamList = () => {
  const BASE_URL = "/foot/teams/user/";
  const userId = useSelector((state) => state.user.Id);
  //유저가 속한 팀 목록 받아오기
  const query = useQuery({
    queryKey: ["getTeam"],
    queryFn: async () => {
      if (!userId) throw new Error("userId가 없습니다");
      try {
        const response = await http.get(`${BASE_URL}${userId}/teams`);
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
export const useGetMTeamUserList = (teamNum) => {
  const BASE_URL = "/foot/teams/";
  let teamId = useSelector((state) => state.user.TeamId);
  if (teamNum) {
    teamId = teamNum;
  }
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const doREfetch = () => {
    setRefetch((prevstate) => !prevstate);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(`${BASE_URL}${teamId}/members`);
        setData(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [teamId, refetch]);
  return { data, isLoading, isError, doREfetch };
};
export const useGetUsersprefix = (name) => {
  const TeamId = useSelector((state) => state.user.TeamId);
  const BASE_URL = "/api/users?prefix=";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await http.get(`${BASE_URL}${name}`);
        setData(response);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching task count:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [TeamId, name]);
  return { data, isLoading, isError };
};
export const useInviteTeam = () => {
  const URL = "/foot/teams/invite";
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationKey: ["TEAM_INVITE"],
    mutationFn: async (body) => {
      const response = await http.post(URL, {
        teamId: user.TeamId,
        userId: body.targetId,
        requesterId: user.Id,
      });
      return response;
    },
    onSuccess: () => {
      alert("초대완료")
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

export const useDeleteTeam = () => {
  const URL = (teamId, userId, requesterId) =>
    `/foot/teams/${teamId}/members/${userId}/requester/${requesterId}`;
  const user = useSelector((state) => state.user);
  return useMutation({
    mutationKey: ["TEAM_DELETE"],
    mutationFn: async (body) => {
      const response = await http.delete(
        URL(user.TeamId, body.targetId, user.Id)
      );
      return response;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error.message);
    },
  });
};

export const useAcceptTeam = () => {
  const QueryClient = useQueryClient();
  const URL = `/foot/teams/invite/processing`;
  return useMutation({
    mutationKey: ["TEAM_ACCEPT"],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["getinvite", "getTeam"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

export const useGetinvite = () => {
  const Id = useSelector((state) => state.user.Id);

  const query = useQuery({
    queryKey: ["getinvite"],
    queryFn: async () => {
      try {
        const response = await http.get(`/foot/teams/user/${Id}/all`);
        return response;
      } catch (error) {
        //에러 발생 핸들링
        if (error.response && error.response.status === 404) {
          return []; // 404 에러 발생 시 빈 배열 반환
        }
        throw error;
      }
    },
    retry: (error) => {
      if (error.response && error.response.status === 404) {
        return false; // 404 에러 발생 시 재시도하지 않음
      }
      return true; // 그 외의 경우에는 재시도
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return query;
};

export const useGetTeam = () => {
  const userId = useSelector((state) => state.user.Id);
  const query = useQuery({
    queryKey: ["getMuser"],
    queryFn: async () => {
      try {
        if (!userId) throw new Error("userId가 없습니다"); //userId가 없으면 실행안됨
        const response = await http.get(`${TEAMBASE_URL}/${userId}`);
        return response;
      } catch (error) {
        //에러 발생 핸들링
        if (error.response && error.response.status === 400) {
          return []; // 404 에러 발생 시 빈 배열 반환
        }
        throw error;
      }
    },
    retry: (error) => {
      if (error.response && error.response.status === 400) {
        return false; // 404 에러 발생 시 재시도하지 않음
      }
      return true; // 그 외의 경우에는 재시도
    },
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  return query;
};

// export const useDeleteTeam = () => {
//   const URL = (teamId, userId, requesterId) =>
//     `/foot/teams/${teamId}/members/${userId}/requester/${requesterId}`;
//   const user = useSelector((state) => state.user);
//   return useMutation({
//     mutationKey: ["TEAM_DELETE"],
//     mutationFn: async (body) => {
//       const response = await http.delete(
//         URL(user.TeamId, body.targetId, user.Id)
//       );
//       return response;
//     },
//     onSuccess: () => {},
//     onError: (error) => {
//       console.error(error.message);
//     },
//   });
// };
