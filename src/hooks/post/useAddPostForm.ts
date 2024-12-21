// hooks/useAddPostForm.ts
import { useForm, SubmitHandler } from "react-hook-form";

interface PostFormData {
  title: string;
  content: string;
  authorId: number;
}

const useAddPostForm = (onSubmit: SubmitHandler<PostFormData>) => {
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

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useAddPostForm;
