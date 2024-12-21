import * as z from "zod";

// PostFormDataのZodスキーマ
export const postSchema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  content: z.string().min(1, { message: "内容を入力してください" }),
  authorId: z.number().min(1, { message: "著者情報が不正です" }), // 必要に応じて変更
});
