import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../interceptor";
// import { header } from "../../styles/index.style";

const MUTATION_KEY = {
  TEAM_CREATE: "TEAM_CREATE",
};

export const useCreateTeam = () => {
  const usequery = useQueryClient();
  const URL = "/foot/teams";

  return useMutation({
    mutationKey: [MUTATION_KEY.TEAM_CREATE],
    mutationFn: async (body) => {
      const formData = new FormData();

      console.log(body.team);
      formData.append(
        "team",
        new Blob([JSON.stringify(body.team)], { type: "application/json" })
      );
      if (body.image) {
        formData.append("image", body.image);
      } else {
        formData.append("image", []);
      }
      const response = await http.post(URL, formData);
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
