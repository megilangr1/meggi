"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "../main/loading/loading-screen";
import { useSession } from "@/lib/core/auth/auth-client";

const AuthClientGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/auth/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) return <LoadingScreen topIndex={true} />;

  return <>{children}</>;
};

export default AuthClientGuard;
