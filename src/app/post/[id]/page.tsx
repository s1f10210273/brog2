"use client";
import { usePathname } from "next/navigation"; // `useRouter` で URLのパラメータを取得
import { useEditPostForm } from "@/hooks/post/useEditPostForm"; // 編集用のカスタムフック
import useUser from "@/hooks/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useGetPost, useDeletePost } from "@/hooks/post/api";
import { PostType } from "@/types/post";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

function EditPostFormMain({ id, post }: { id: string; post: PostType }) {
  const router = useRouter();
  const { register, handleSubmit, errors, isPending } = useEditPostForm(
    id,
    post
  );
  const { session, loading: userLoading } = useUser();
  const { mutate: deletePost, isPending: deletePending } = useDeletePost();
  const loading = userLoading || isPending || deletePending;

  const handleDelete = () => {
    deletePost(id, {
      onSuccess: () => {
        toast.success("投稿を削除しました");
        router.push("/");
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
    <main className="max-w-2xl mx-auto p-8">
      <FullScreenLoader loading={loading} />
      <p className="text-3xl font-semibold text-center text-gray-800 mb-8">
        編集
      </p>

      {/* タイトル入力 */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          タイトル
        </label>
        <input
          id="title"
          placeholder="タイトルを入力"
          {...register("title")}
          defaultValue={post.title}
          className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        />
        {errors.title && (
          <div className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </div>
        )}
      </div>

      {/* 内容入力 */}
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          内容
        </label>
        <textarea
          id="content"
          placeholder="投稿内容を入力"
          {...register("content")}
          defaultValue={post.content}
          rows={6}
          className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        />
        {errors.content && (
          <div className="text-red-500 text-sm mt-1">
            {errors.content.message}
          </div>
        )}
      </div>

      {/* 保存ボタン */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
        >
          保存
        </button>

        {/* 削除ボタン */}
        <button
          onClick={handleDelete}
          type="button"
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 w-full"
        >
          削除
        </button>
      </div>
      {/* 左下の元に戻るボタン */}
      <Link
        href="/"
        className="fixed bottom-8 left-8 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
      >
        <FaArrowLeft className="text-2xl" />
      </Link>
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
