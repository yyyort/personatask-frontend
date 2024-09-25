import SignUpForm from "@/components/auth/signup-form";
import React from "react";

export default function SignUp() {
  return (
    <main className="flex gap-10 items-center">
      <div className="bg-slate-100 p-10 rounded-md shadow-md">
        <SignUpForm />
      </div>
    </main>
  );
}
