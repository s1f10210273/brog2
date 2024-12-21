"use client";
import FullScreenLoader from "@/components/FullScreenLoader";
import useLoginForm from "@/hooks/user/useLoginForm";

export default function Login() {
  const { register, handleSubmit, errors, loading } = useLoginForm();

  return (
    <div className="flex justify-center items-center h-screen">
      <FullScreenLoader loading={loading} />
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <input
            id="email"
            placeholder="メールアドレス"
            {...register("email")}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            id="password"
            type="password"
            placeholder="パスワード"
            {...register("password")}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          disabled={loading}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}
