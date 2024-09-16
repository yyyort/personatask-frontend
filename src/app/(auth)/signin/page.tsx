import SignInForm from "@/components/auth/signin-form";

export default function SignIn() {
  return (
    <>
      <main className="h-screen flex gap-10 items-center justify-center">
        <section>
          <h1 className="text-[6rem]">Personatask</h1>
          <div className="flex flex-col items-end text-[1.3rem]">
            <p>
              personalize your <strong>routines</strong>
            </p>
            <p>
              personalize your <strong>goals</strong>
            </p>
            <p>
              and <strong>life</strong>
            </p>
          </div>
        </section>

        <section className="flex flex-col">
          <SignInForm />
        </section>
      </main>
    </>
  );
}
