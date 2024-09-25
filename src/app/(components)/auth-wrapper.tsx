"use client";
import PathBreadcrumbs from "@/components/path-breadcrumbs";
import Sidebar from "@/components/sidebar/sidebar";
import { RefreshTokenApi } from "@/service/authService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const {
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => RefreshTokenApi(),
    queryKey: ["refreshToken"],
    staleTime: Infinity,
    retry: 3,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>Loading...</p>
      </div>
    );
  } else if (isError) {
    router.push("/signin");
  } else {
    return (
      <>
        (
        <div className="min-h-screen min-w-full flex">
          <nav>
            <Sidebar />
          </nav>
          <main className="w-full max-h-screen p-10 overflow-auto">
            <PathBreadcrumbs />
            {children}
          </main>
        </div>
        )
      </>
    );
  }
}
