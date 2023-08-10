"use client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  Box,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import {
  formBoxStyles,
  containerStyle,
  fullwidthStyles,
  dividerStyle,
  nextLinkStyles,
} from "./styles";
import NextLink from "@/components/next-link";
import { routes } from "@/constants";
import FormInput from "@/components/form-components/form-input";

const AuthForm = ({ submitHandler, isSignin }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    name: isSignin ? yup.string() : yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: isSignin
      ? yup.string()
      : yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    submitHandler(data);
  };

  const signinWithGoogle = async () => {
    try {
      await signIn("google", {
        callbackUrl: routes.homePage,
      });
      toast.success("welcome!");
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h4" gutterBottom>
        {isSignin ? "Sign In" : "Sign Up"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color={"text.secondary"}>
        Choose your preferred {isSignin ? "sign in" : "sign up"} method.
      </Typography>
      <Box paddingY={2} sx={fullwidthStyles}>
        <GoogleButton onClick={signinWithGoogle} style={fullwidthStyles} />
      </Box>
      <Divider sx={dividerStyle}>OR CONTINUE WITH</Divider>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={formBoxStyles}
      >
        {!isSignin && <FormInput name="name" control={control} label="Name" />}
        <FormInput name="email" control={control} label="Email" />
        <FormInput
          name="password"
          control={control}
          label="Password"
          type="password"
        />
        {!isSignin && (
          <FormInput
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          {isSignin ? "Sign In" : "Sign up"}
        </Button>
      </Box>
      <Typography variant="subtitle1" gutterBottom color={"text.secondary"}>
        {isSignin ? (
          <>
            Don't have an account?{" "}
            <NextLink href={routes.signUp} style={nextLinkStyles}>
              Sign up
            </NextLink>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <NextLink href={routes.signIn} style={nextLinkStyles}>
              Sign in
            </NextLink>
          </>
        )}
      </Typography>
    </Container>
  );
};

export default AuthForm;
