import axios from "axios";
import { useMutation, QueryClient } from "@tanstack/react-query";

export const useEditPost = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (data: { title: string; content: string; authorId: number }) =>
      axios.post("/api/post/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
