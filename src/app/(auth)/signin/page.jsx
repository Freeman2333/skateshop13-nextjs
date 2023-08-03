"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import AuthForm from "@/components/forms/auth-form";
import { siteConfig } from "@/config/site.consts";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (formValues) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
        callbackUrl: siteConfig.devHomeUrl,
      });
      if (!res?.error) {
        toast.success(`welcome!`);
        router.push(siteConfig.devHomeUrl);
      } else {
        toast.error("invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm submitHandler={onSubmit} isSignin />;
};

export default SignInPage;
