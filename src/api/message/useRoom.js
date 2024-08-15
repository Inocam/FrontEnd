import { useSelector } from "react-redux";
import { http } from "../interceptor";
import { useMutation } from "@tanstack/react-query";
// export const useCreateRoom = () => {
//   const URL = "/foot/teams/invite";

//   return {
//     mutationKey: [ "CREATE_ROOM"],
//     mutationFn: async (body) => {
//       const response = await http.post(URL, body);
//       return response;
//     },
//     onSuccess: (data) => {
//       console.log(data);
//     },
//     onError: (error) => {
//       console.error(error.message);
//     },
//   };
// };
export const useCreateChatRoom = () => {
  const URL = "/foot/chat/rooms";
  const userId = useSelector((state) => state.user.Id);
  return useMutation({
    mutationKey: ["CREATE_ROOM"],
    mutationFn: async (body) => {
      const response = await http.post(URL, {
        userId: userId,
        roomName: String(body.userId) + String(userId),
        targetId: body.userId,
      });
      return response;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error.message);
    },
  });
};
// export const useCreateRoom = () => {
//   const URL = "/foot/teams/invite";

//   return {
//     mutationKey: [MUTATION_KEY.CREATE_ROOM],
//     mutationFn: async (body) => {
//       const response = await http.post(URL, body);
//       return response;
//     },
//     onSuccess: (data) => {
//       console.log(data);
//     },
//     onError: (error) => {
//       console.error(error.message);
//     },
//   };
// };
