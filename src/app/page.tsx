"use client";
import useUser from "@/hooks/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";

export default function Home() {
  const { session, user, signOut, signInWithGoogle, loading } = useUser();

  if (loading) return <FullScreenLoader loading />;
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-lg">
        <p className="text-2xl font-bold mb-4">Top Page</p>

        {session ? (
          <div>
            <p className="mb-2">ログイン中です {user?.email}</p>
            <div className="mb-2">
              <Link href="/post" className="text-blue-500 hover:underline">
                post一覧
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/post/add" className="text-blue-500 hover:underline">
                post追加
              </Link>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2">ログアウト中</p>
            <div className="mb-2">
              <button
                onClick={signInWithGoogle}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Googleでログイン
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
