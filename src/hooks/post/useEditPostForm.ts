"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { postSchema, postSchemaType } from "@/schemas/post/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEditPost } from "@/hooks/post/api";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { PostType } from "@/types/post";

export function useEditPostForm(id: string, post: PostType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postSchemaType>({
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
    resolver: zodResolver(postSchema),
  });

  const { user } = useUser();
  const { mutate, isPending } = useEditPost(id);
  const router = useRouter();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    mutate(
      {
        title: data.title,
        content: data.content,
        authorId: user.id,
      },
      {
        onSuccess: () => {
          toast.success("投稿を編集しました");
          router.push(`/`);
        },
        onError: () => {
          toast.error("投稿の編集に失敗しました");
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
}
