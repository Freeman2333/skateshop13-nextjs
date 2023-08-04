"use client";
import AuthForm from "@/components/forms/auth-form";
import client from "@/config/api";
import { siteConfig } from "@/config/site.consts";
import { routes } from "@/constants";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
        callbackUrl: routes.homePage,
      });
      toast.success(`welcome ${data.user.name}`);
      router.push(routes.homePage);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return <AuthForm submitHandler={onSubmit} />;
};

export default SignUpPage;
