"use client";

import { useToast } from "@/hooks/use-toast";
import {
  CreateUserType,
  GetUserType,
  SignInUserType,
  UserModelType,
} from "@/model/users.model";
import { SignInApi, SignUpApi } from "@/service/authService";
import { useRouter, usePathname } from "next/navigation";
import React, {
  createContext,
  use,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { set } from "zod";

type AuthContextType = {
  user: GetUserType | null;
  auth: boolean;
  SignIn: (form: SignInUserType) => void;
  SignUp: (form: CreateUserType) => void;
  SignOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<GetUserType | null>(null);
  const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
        setAuth(true);
        router.push('/');
        } else {
        setAuth(false);
        router.push("/signin");
        }
    }, [user]);


  const SignInUser = async (formData: SignInUserType) => {
    try {
      const data: GetUserType = await SignInApi(formData);

      setUser({
        id: data.id,
        email: data.email,
      });


      router.refresh();

      toast({
        title: "Sign in success",
        description: "You have successfully signed in",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    }
  };

  const SignUpUser = async (formData: CreateUserType) => {
    try {
      const data = await SignUpApi(formData);

      setUser(data.user);

      toast({
        title: "Sign up success",
        description: "You have successfully signed up",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    }
  };

  const SignOutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        auth: auth,
        SignIn: SignInUser,
        SignOut: SignOutUser,
        SignUp: SignUpUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
