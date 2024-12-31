import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email("有効なメールアドレスを入力してください")
    .nonempty("メールアドレスを入力してください"),
  password: z
    .string()
    .min(6, "パスワードは6文字以上にしてください.")
    .nonempty("パスワードを入力してください"),
});

export type UserSchema = z.infer<typeof userSchema>;
