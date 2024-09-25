"use client";
import { useAuthStore } from "@/state/authState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  const router = useRouter();
 
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token]);


  return <>{children}</>;
}
