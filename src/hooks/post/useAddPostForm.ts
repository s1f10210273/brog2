"use state";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { postSchema, postSchemaType } from "@/schemas/post/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const useAddPostForm = () => {
  const [loading, setLoading] = useState(false);

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

  const router = useRouter();
  const { user } = useUser();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/post/", {
        cache: "no-store", // ssr
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          authorId: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("Failed to add post");
      }
      toast.success("投稿しました");
      router.push("/post");
    } catch {
      toast.error("投稿に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
  };
};

export default useAddPostForm;
