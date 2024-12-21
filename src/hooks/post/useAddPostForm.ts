import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { postSchema, postSchemaType } from "@/schemas/post/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const router = useRouter();
  const { user } = useUser();

  const onSubmit: SubmitHandler<{
    title: string;
    content: string;
  }> = async (data) => {
    try {
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
      console.log(res);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    onSubmit,
  };
};

export default useAddPostForm;
