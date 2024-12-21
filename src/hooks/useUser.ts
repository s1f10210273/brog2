"use client";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { UserType } from "@/types/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useUser() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      if (session?.user.id) {
        setLoading(true);
        const response = await fetch(`/api/user/${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
        setLoading(false);
      }
    };
    if (session?.user) {
      setupUser();
    }
  }, [session]);

  async function signUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(`Sign Up Error: ${error.message}`);
      } else {
        toast.success("Sign Up successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error(`Sign Up Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(`Sign In Error: ${error.message}`);
      } else {
        toast.success("Sign In successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error(`Sign In Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully!");
      router.push("/");
    } catch (error) {
      toast.error(`Sign Out Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return { session, user, loading, signUp, signIn, signOut };
}
