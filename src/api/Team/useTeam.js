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
// export const useGetMTeamList = () => {
//   const BASE_URL = "/foot/teams/user/";
//   const userId = useSelector((state) => state.user.Id);
//   //유저가 초대 받은팀 목록 받아오기
//   const query = useQuery({
//     queryKey: ["getTeaminvite"],
//     queryFn: async () => {
//       try {
//         const response = await http.get(`${BASE_URL}${userId}/all`);
//         return response;
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           return [];
//         }
//         throw error;
//       }
//     },
//     onError: (error) => {
//       console.error("Error fetching messages:", error);
//     },
//   });
//   return query;
// };
// export const useGetMTeamUserList = () => {
//   const BASE_URL = "/foot/teams/";
//   const teamId = useSelector((state) => state.user.TeamId);
//   //유저가 속한 팀 목록 받아오기
//   const query = useQuery({
//     queryKey: ["getTeamuser"],
//     queryFn: async () => {
//       try {
//         const response = await http.get(`${BASE_URL}${teamId}/members`);
//         return response;
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           return [];
//         }
//         throw error;
//       }
//     },
//     onError: (error) => {
//       console.error("Error fetching messages:", error);
//     },
//   });

//   return query;
// };
export const useGetMTeamUserList = () => {
  const BASE_URL = "/foot/teams/";
  const teamId = useSelector((state) => state.user.TeamId);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
  }, [teamId]);
  return { data, isLoading, isError };
};
// export const useGetUsersprefix = (name) => {
//   const BASE_URL = "/api/users?prefix=";
//   //prefix 가 포함된 유저 불러오기
//   const query = useQuery({
//     queryKey: ["getPreUsers", name],
//     queryFn: async () => {
//       try {
//         const response = await http.get(`${BASE_URL}${name}`);
//         return response;
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           return [];
//         }
//         throw error;
//       }
//     },
//     onError: (error) => {
//       console.error("Error fetching messages:", error);
//     },
//   });

//   return query;
// };
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
        status: "pending",
      });
      return response;
    },
    onSuccess: () => {},
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
