"use client";

import {
  CreateUserSchema,
  CreateUserType,
} from "@/model/users.model";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { SignUpApi } from "@/service/authService";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserType> = async (data) => {
    try {
      await SignUpApi(data);

      toast({
        variant: "default",
        title: "Success",
        description: "User created successfully",
      });

      router.push("/");
    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-start gap-5 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <div>
              <div className="flex">
                <FormItem>
                  <FormLabel className="text-xl">email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="w-[30rem] h-12 bg-white text-lg font-light"
                    />
                  </FormControl>
                </FormItem>
              </div>

              {fieldState.error && (
                <div className="text-red-500 text-sm my-2">
                  {fieldState.error.message}
                </div>
              )}
            </div>
          )}
        />

        {/* password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <div className="flex">
              <FormItem>
                <FormLabel className="text-xl">password</FormLabel>
                <FormControl>
                  <div>
                    <div className="flex">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="w-[30rem] h-12 bg-white text-lg font-light"
                      />
                      <span
                        className="flex justify-around items-center"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOpenIcon className="absolute mr-10 cursor-pointer" />
                        ) : (
                          <EyeClosedIcon className="absolute mr-10 cursor-pointer" />
                        )}
                      </span>
                    </div>
                    {fieldState.error && (
                      <div className="text-red-500 text-sm my-2">
                        {fieldState.error.message}
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            </div>
          )}
        />

        {/* confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <div className="flex">
              <FormItem>
                <FormLabel className="text-xl">Confirm Password</FormLabel>
                <FormControl>
                  <div>
                    <div className="flex">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-[30rem] h-12 bg-white text-lg font-light"
                      />
                      <span
                        className="flex justify-around items-center"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <EyeOpenIcon className="absolute mr-10 cursor-pointer" />
                        ) : (
                          <EyeClosedIcon className="absolute mr-10 cursor-pointer" />
                        )}
                      </span>
                    </div>

                    {fieldState.error && (
                      <div className="text-red-500 text-sm my-2">
                        {fieldState.error.message}
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            </div>
          )}
        />
        <div className="flex justify-between w-full">
          <Button
            type="submit"
            variant={"outline"}
            className="text-lg p-5 mt-2"
          >
            Sign Up
          </Button>

          <Link href="/signin">
            <Button variant={"link"} className="text-lg p-5 m-2">
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
