"use client";
import AuthForm from "@/components/forms/auth-form";
import client from "@/config/api";
import { siteConfig } from "@/config/site.consts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (formValues) => {
    try {
      const { data } = await client.post("/signup", formValues);

      await signIn("credentials", {
        redirect: false,
        email: data.user.email,
        password: formValues.password,
        name: data.user.name,
        callbackUrl: siteConfig.devHomeUrl,
      });

      router.push(siteConfig.devHomeUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm submitHandler={onSubmit} />;
};

export default SignUpPage;
