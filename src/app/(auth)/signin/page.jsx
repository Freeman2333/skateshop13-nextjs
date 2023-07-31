"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthForm from "@/components/forms/auth-form";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (formValues) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
        callbackUrl: "/",
      });

      if (!res?.error) {
        router.push("/");
      } else {
        console.log("invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm submitHandler={onSubmit} isSignin />;
};

export default SignInPage;
