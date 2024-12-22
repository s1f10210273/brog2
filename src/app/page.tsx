"use client";
import useUser from "@/hooks/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";
import { PostType } from "@/types/post";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaPlusCircle,
  FaEdit,
} from "react-icons/fa";

export default function Home() {
  const { session, user, signOut, signInWithGoogle, loading } = useUser();

  if (loading) return <FullScreenLoader loading />;

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6">
      {/* 投稿一覧セクション */}
      {user && (
        <section className="w-full max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user?.posts.length !== 0 ? (
              user?.posts.map((p: PostType, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition duration-300"
                >
                  <Link
                    href={`/post/${p.id}`}
                    className="text-lg font-semibold text-gray-800 w-full"
                  >
                    {p.title}
                  </Link>

                  <div className="flex items-center gap-4">
                    {/* 編集ボタン */}
                    <Link href={`/post/${p.id}`}>
                      <FaEdit
                        size={20}
                        className="text-blue-500 hover:text-blue-600"
                      />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">まだ投稿がありません</p>
            )}
          </div>
        </section>
      )}

      {/* 右下ボタンエリア */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {user && (
          <Link
            href="/post/add"
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <FaPlusCircle size={30} />
          </Link>
        )}

        {/* ログイン/ログアウトボタン */}
        {session ? (
          <button
            onClick={signOut}
            className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
          >
            <FaSignOutAlt size={24} />
          </button>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
          >
            <FaSignInAlt size={24} />
          </button>
        )}
      </div>
    </main>
  );
}
