import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserSchema } from "@/schemas/user/userSchema";
import useUser from "@/hooks/useUser";

export default function useLoginForm() {
  const { signIn, loading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserSchema> = async (formData) => {
    signIn({ email: formData.email, password: formData.password });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
  };
}
