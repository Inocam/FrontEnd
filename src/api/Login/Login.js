import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { http } from "../interceptor";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/module/User";

const MUTATION_KEY = {
  SIGN_IN: "SIGN_IN",
};

export const usePostSignInData = () => {
  const URL = "/api/user/login";
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: [MUTATION_KEY.SIGN_IN],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
      return response;
    },
    onSuccess: (data) => {
      dispatch(setUser({ Id: data.data.id, UserName: data.data.username }));
      //가지고있는 정보 만료
      Cookies.remove("AccessToken");
      Cookies.set("AccessToken", data.data.accessToken, {
        expires: 1 / 24,
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
