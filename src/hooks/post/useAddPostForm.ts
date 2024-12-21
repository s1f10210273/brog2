"use state";
import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { postSchema, postSchemaType } from "@/schemas/post/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";
import { useEditPost } from "./api";
import { useRouter } from "next/navigation";

const useAddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postSchemaType>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(postSchema),
  });
  const queryClient = new QueryClient();
  const router = useRouter();
  const { user } = useUser();

  const { mutate, isPending } = useEditPost();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    if (!user) {
      toast.error("User not found");
      return;
    }
    mutate(
      { title: data.title, content: data.content, authorId: user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          toast.success("投稿しました");
          router.push("/post");
        },
        onError: () => {
          toast.error("投稿に失敗しました");
        },
      }
    );
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
  };
};

export default useAddPostForm;
