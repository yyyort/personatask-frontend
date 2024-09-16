"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { SignInUserSchema, SignInUserType } from "@/model/users.model";
import { useAuthStore } from "@/state/authState";
import { useToast } from "@/hooks/use-toast";
import { type } from "os";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const signIn = useAuthStore((state) => state.login);
  const { toast } = useToast();
  const router = useRouter();

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
      await signIn(data.email, data.password);

      router.push("/");
      toast({
        title: "Success",
        description: "You have successfully signed in",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      setError("root", {
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

        {errors.root && (
          <span className="text-red-500">{errors.root.message}</span>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className={cn(
            "mt-2 bg-blue-200 p-2 rounded-md hover:bg-blue-400",
            isSubmitting && "bg-slate-50"
          )}
        >
          {isSubmitting ? "submitting" : "submit"}
        </button>
      </form>
    </>
  );
}
