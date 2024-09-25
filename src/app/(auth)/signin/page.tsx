import SignInForm from "@/components/auth/signin-form";

export default function SignIn() {
  return (
    <>
      <main className="h-screen flex gap-10 items-center justify-center">
        <div className="bg-slate-100 p-10 rounded-md shadow-md">
          <SignInForm />
        </div>
      </main>
    </>
  );
}
