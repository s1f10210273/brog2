"use client";
import useUser from "@/hooks/useUser";
import { PostType } from "@/types/post";
import Link from "next/link";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useRouter } from "next/navigation";

const AddPostPage = () => {
  const router = useRouter();
  const { session, user, loading } = useUser();

  if (loading) return <FullScreenLoader loading />;

  if (loading && !session) {
    router.push("/");
  }

  return (
    <>
      {user && (
        <main className="max-w-md mx-auto p-6">
          <p className="text-2xl font-bold mb-4">Your Post</p>

          {user?.posts.length != 0 ? (
            user?.posts.map((p: PostType, index: number) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <p className="text-lg font-semibold">{p.title}</p>
                <p className="text-gray-600">{p.content}</p>

                {/* 編集ページへのリンク */}
                <Link
                  href={`/post/${p.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  編集
                </Link>
              </div>
            ))
          ) : (
            <p>post not found</p>
          )}
        </main>
      )}
    </>
  );
};

export default AddPostPage;
