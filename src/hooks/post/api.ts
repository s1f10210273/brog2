import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 1. **Create a Post (POST)** - for creating a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; content: string; authorId: number }) =>
      axios.post("/api/post/", data), // Sends a POST request to create a new post
    onSuccess: () => {
      // Invalidate the "todos" query after a successful post creation
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// 2. **Edit a Post (PUT)** - for updating an existing post
export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      content: string;
      authorId: number;
    }) => axios.put(`/api/post/${data.id}`, data), // Sends a PUT request to update an existing post
    onSuccess: () => {
      // Invalidate the "todos" query after a successful post update
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// 3. **Delete a Post (DELETE)** - for deleting a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => axios.delete(`/api/post/${id}`), // Sends a DELETE request to remove the post
    onSuccess: () => {
      // Invalidate the "todos" query after a successful delete
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// 4. **Get All Posts (GET)** - for fetching all posts
export const useGetPosts = () => {
  return useQuery({
    queryKey: ["todos"], // The query key used for caching and invalidation
    queryFn: () => axios.get("/api/post/").then((res) => res.data.posts), // Sends a GET request to fetch all posts
  });
};

// 5. **Get a Single Post (GET) by ID**
export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ["post", id], // The query key to fetch a single post, including its ID
    queryFn: () => axios.get(`/api/post/${id}`).then((res) => res.data.post), // Fetch post by ID
    enabled: !!id, // Ensures the query is only run when `id` is available
  });
};
