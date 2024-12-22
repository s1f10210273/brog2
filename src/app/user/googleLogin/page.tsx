"use client";
import useUser from "@/hooks/useUser";
import FullScreenLoader from "@/components/FullScreenLoader";

const SignInPage = () => {
  const { signInWithGoogle, loading } = useUser();

  if (loading) return <FullScreenLoader loading />;

  return (
    <main className="flex justify-center items-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Googleでログイン
      </button>
    </main>
  );
};

export default SignInPage;
