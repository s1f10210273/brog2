import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserSchema } from "@/schemas/user/userSchema";
import useUser from "@/hooks/useUser";

const useRegisterForm = () => {
  const { signUp, loading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserSchema> = async (formData) => {
    signUp({ email: formData.email, password: formData.password });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
  };
};

export default useRegisterForm;
