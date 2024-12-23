"use client";
import useUser from "@/hooks/useUser";
import useAddPostForm from "@/hooks/post/useAddPostForm";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const AddPostPage = () => {
  const { session, loading: userLoading } = useUser();
  const { register, handleSubmit, errors, isPending } = useAddPostForm();
  const router = useRouter();
  const loading = userLoading || isPending;

  if (loading) return <FullScreenLoader loading />;

  if (loading && !session) {
    router.push("/");
  }

  return (
    <>
      {session && (
        <main className="max-w-2xl mx-auto p-8">
          <p className="text-3xl font-semibold text-center text-gray-800 mb-8">
            新規投稿
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* タイトル入力 */}
            <div>
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
                className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              {errors.title && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </div>
              )}
            </div>

            {/* 内容入力 */}
            <div>
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
                rows={6}
                className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              {errors.content && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </div>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                投稿する
              </button>
            </div>
          </form>
          {/* 左下の元に戻るボタン */}
          <Link
            href="/"
            className="fixed bottom-8 left-8 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <FaArrowLeft className="text-2xl" />
          </Link>
        </main>
      )}
    </>
  );
};

export default AddPostPage;
