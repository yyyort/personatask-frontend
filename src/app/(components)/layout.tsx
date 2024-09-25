import AuthWrapper from "./auth-wrapper";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-full flex">
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </div>
  );
}
