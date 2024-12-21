import * as z from "zod";

// PostFormDataのZodスキーマ
export const postSchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  content: z.string().min(1, { message: "内容を入力してください" }),
});

export type postSchemaType = z.infer<typeof postSchema>;
