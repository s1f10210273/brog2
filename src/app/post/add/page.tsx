"use client";
import useUser from "@/hooks/useUser";
import useAddPostForm from "@/hooks/post/useAddPostForm";

const AddPostPage = () => {
  const { session } = useUser();

  const { register, handleSubmit, errors } = useAddPostForm();

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

  return (
    <main className="max-w-md mx-auto p-6">
      <p className="text-2xl font-bold mb-4">Add Post</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            id="title"
            type="text"
            placeholder="タイトル"
            {...register("title", {
              required: {
                value: true,
                message: "タイトルを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.title && (
            <div className="text-red-500 text-sm">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            id="content"
            type="text"
            placeholder="内容"
            {...register("content", {
              required: {
                value: true,
                message: "内容を入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.content && (
            <div className="text-red-500 text-sm">{errors.content.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          追加
        </button>
      </form>
    </main>
  );
};

export default AddPostPage;
