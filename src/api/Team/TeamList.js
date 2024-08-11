import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";

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
export const useGetUsersprefix = () => {
  const BASE_URL = "/api/user/users?prefix=";
  const userId = useSelector((state) => state.user.Id);
  //prefix 가 포함된 유저 불러오기
  const query = useQuery({
    queryKey: ["getPreUsers"],
    queryFn: async () => {
      if (!userId) throw new Error("userId가 없습니다");
      try {
        const response = await http.get(`${BASE_URL}${userId}`);
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
export const useGetMTeamUserList = () => {
  const BASE_URL = "/foot/teams/";
  const userId = useSelector((state) => state.user.Id);
  //foot/teams/{teamId}/members
  //유저가 속한 팀 목록 받아오기
  const query = useQuery({
    queryKey: ["getTeamUserList"],
    queryFn: async () => {
      if (!userId) throw new Error("userId가 없습니다");
      try {
        const response = await http.get(`${BASE_URL}${userId}/members`);
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


export const useInviteTeam = () => {
  const usequery = useQueryClient();
  const URL = "/foot/teams/invitation";
  return useMutation({
    mutationKey: ["TEAM_INVITE"],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: () => {
      usequery.invalidateQueries("getTeam");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
