"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { SignInUserSchema, SignInUserType } from "@/model/users.model";

export default function SignInForm() {
  const { SignIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInUserType>({
    resolver: zodResolver(SignInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInUserType> = async (data) => {
    try {
      SignIn(data);
      isSubmitting
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <>
      <form
        className="flex flex-col items-start gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="">email</label>
        <input
          type="text"
          placeholder="email@email.com"
          className="border-2 border-gray-300 p-2 rounded-sm"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="">password</label>
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 p-2 rounded-sm"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className={cn(
            "mt-2 bg-blue-200 p-2 rounded-md hover:bg-blue-400",
            isSubmitting && "bg-slate-50"
          )}
        >
          {isSubmitting ? "..." : "submit"}
        </button>
      </form>
    </>
  );
}
