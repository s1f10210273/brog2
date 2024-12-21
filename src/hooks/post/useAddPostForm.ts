import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface PostFormData {
  title: string;
  content: string;
  authorId: number;
}

const useAddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
      authorId: 0,
    },
  });

  const router = useRouter();
  const { user } = useUser();

  const onSubmit: SubmitHandler<{
    title: string;
    content: string;
    authorId: number;
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
