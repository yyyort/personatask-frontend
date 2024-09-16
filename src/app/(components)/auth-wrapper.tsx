"use client";
import { useAuthStore } from "@/state/authState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  useEffect(() => {
    console.log("token", token);
    if (!token) {
      router.push("/signin");
    }
  }, [token]);

  return <>{children}</>;
}
