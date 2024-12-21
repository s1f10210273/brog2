"use client";
import { usePathname } from "next/navigation"; // `useRouter` で URLのパラメータを取得
import { useEditPostForm } from "@/hooks/post/useEditPostForm"; // 編集用のカスタムフック
import useUser from "@/hooks/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useGetPost, useDeletePost } from "@/hooks/post/api";
import { PostType } from "@/types/post";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function EditPostFormMain({ id, post }: { id: string; post: PostType }) {
  const router = useRouter();
  const { register, handleSubmit, errors, isPending } = useEditPostForm(
    id,
    post
  );
  const { session, loading: userLoading } = useUser();
  const { mutate: deletePost, isPending: deletePending } = useDeletePost(id);
  const loading = userLoading || isPending || deletePending;

  const handleDelete = () => {
    deletePost(id, {
      onSuccess: () => {
        toast.success("投稿を削除しました");
        router.push("/post");
      },
      onError: () => {
        toast.error("投稿の削除に失敗しました");
      },
    });
  };
  // ログインしていない場合の処理
  if (!session)
    return (
      <main className="flex justify-center items-center h-screen">
        <p>
          <a href="/user/login" className="text-blue-500 hover:underline">
            ログインしてね！
          </a>
        </p>
      </main>
    );

  // 投稿が読み込まれていない場合の処理
  if (!post) {
    return <FullScreenLoader loading={true} />;
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <FullScreenLoader loading={loading} />
      <p className="text-2xl font-bold mb-4">Edit Post</p>

      <div className="mb-4">
        <input
          id="title"
          placeholder="タイトル"
          {...register("title")}
          defaultValue={post.title}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {errors.title && (
          <div className="text-red-500 text-sm">{errors.title.message}</div>
        )}
      </div>

      <div className="mb-4">
        <input
          id="content"
          placeholder="内容"
          {...register("content")}
          defaultValue={post.content}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        {errors.content && (
          <div className="text-red-500 text-sm">{errors.content.message}</div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
      >
        保存
      </button>

      <button
        onClick={handleDelete}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
      >
        削除
      </button>
    </main>
  );
}

export default function EditPostForm() {
  const pathname = usePathname();
  const id = pathname.split("/post/")[1];
  const { data: post, isLoading } = useGetPost(id);

  if (isLoading) {
    return <FullScreenLoader loading={true} />;
  }
  if (!post) return <h1>エラー</h1>;

  return <EditPostFormMain id={id} post={post} />;
}
