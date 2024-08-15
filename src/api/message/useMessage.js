import { useQuery } from "@tanstack/react-query";
import { http } from "../interceptor";
import { useSelector } from "react-redux";

const TEAMBASE_URL = "/foot/chat/rooms";
const MESSEGE_URL = (Id) => `/foot/chat/rooms/${Id}/messages`;

export const useGetTeam = () => {
  const userId = useSelector((state) => state.user.Id);
  const query = useQuery({
    queryKey: ["getMmuser"],
    queryFn: async () => {
      try {
        if (!userId) throw new Error("userId가 없습니다"); //userId가 없으면 실행안됨
        const response = await http.get(`${TEAMBASE_URL}/${userId}?size=100`);
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

export const useGetMessage = () => {
  const teamId = useSelector((state) => state.team.MessageId);
  const query = useQuery({
    queryKey: ["getMessage", teamId],
    queryFn: async () => {
      try {
        const response = await http.get(`${MESSEGE_URL(teamId)}`);
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

//특정 데이터 있다고 하면
//채팅 ui 구현 까다롭다
