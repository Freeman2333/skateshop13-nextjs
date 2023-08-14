"use client";
import AuthForm from "@/components/forms/auth-form";
import client from "@/config/api";
import { routes } from "@/constants";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (formValues) => {
    try {
      const { user } = await client.post("/signup", formValues);

      await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: formValues.password,
        name: user.name,
        callbackUrl: routes.homePage,
      });
      toast.success(`welcome ${user.name}`);
      router.push(routes.homePage);
    } catch (error) {}
  };

  return <AuthForm submitHandler={onSubmit} />;
};

export default SignUpPage;
