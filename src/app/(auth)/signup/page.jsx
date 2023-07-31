"use client";
import AuthForm from "@/components/forms/auth-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (formValues) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        // TODO add toast
        console.log((await res.json()).message);
        return;
      }
      const { user } = await res.json();

      await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: formValues.password,
        name: user.name,
        callbackUrl: "/",
      });

      if (!res?.error) {
        router.push("/");
      } else {
        setError("invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthForm submitHandler={onSubmit} />;
};

export default SignInPage;
